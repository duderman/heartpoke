import * as cdk from "@aws-cdk/core";
import {Duration, RemovalPolicy} from "@aws-cdk/core";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import {LambdaEdgeEventType} from "@aws-cdk/aws-cloudfront";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";
import {Effect} from "@aws-cdk/aws-iam";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import {Code, Function, Runtime} from "@aws-cdk/aws-lambda";
import * as apigatewayv2 from "@aws-cdk/aws-apigatewayv2";
import {LambdaProxyIntegration} from "@aws-cdk/aws-apigatewayv2-integrations"
import * as path from "path";


export class HeartpokeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const redirectLambda = new cloudfront.experimental.EdgeFunction(this, "RedirectLambda", {
      code: Code.fromAsset(path.join(__dirname, 'redirect')),
      handler: "index.handler",
      runtime: Runtime.NODEJS_12_X,
    });

    const httpApi = new apigatewayv2.HttpApi(this, "HeartpokeApiGateway");

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL

    if (!ADMIN_EMAIL) {
      throw "ADMIN_EMAIL must be set"
    }

    const bookLambda = new Function(this, 'BookLambda', {
      runtime: Runtime.GO_1_X,
      handler: 'main',
      code: Code.fromAsset(path.join(__dirname, 'book')),
      timeout: Duration.minutes(1)
    })

    bookLambda.addEnvironment('ADMIN_EMAIL', ADMIN_EMAIL)

    bookLambda.addToRolePolicy(new iam.PolicyStatement({
      sid: 'SESSendEmailPolicy',
      effect: Effect.ALLOW,
      actions: ['ses:SendEmail', 'ses:SendRawEmail'],
      resources: ['*']
    }))

    const lambdaIntegration = new LambdaProxyIntegration({
      handler: bookLambda,
    });

    httpApi.addRoutes({
      path: "/api/book",
      methods: [apigatewayv2.HttpMethod.POST, apigatewayv2.HttpMethod.OPTIONS],
      integration: lambdaIntegration,
    });

    const SIX_MONTHS = 31 * 6

    const referencesBucket = new s3.Bucket(this, "ReferencesBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      lifecycleRules: [{
        expiration: cdk.Duration.days(SIX_MONTHS)
      }],
      cors: [
        {
          allowedOrigins: ["*"],
          allowedMethods: [s3.HttpMethods.PUT],
          allowedHeaders: ['Content-Type'],
          maxAge: 3000,
        },
      ],
    })

    const presignLambda = new Function(this, 'UploadLambda', {
      runtime: Runtime.GO_1_X,
      handler: 'main',
      code: Code.fromAsset(path.join(__dirname, 'presign'))
    })

    presignLambda.addEnvironment('S3_BUCKET', referencesBucket.bucketName)

    presignLambda.addToRolePolicy(new iam.PolicyStatement({
      sid: 'PresignPolicy',
      effect: Effect.ALLOW,
      actions: ['s3:PutObject', 's3:PutObjectACL'],
      resources: [`${referencesBucket.bucketArn}/*`]
    }))

    const presignLambdaIntegration = new LambdaProxyIntegration({
      handler: presignLambda,
    });

    httpApi.addRoutes({
      path: "/api/presign",
      methods: [apigatewayv2.HttpMethod.POST, apigatewayv2.HttpMethod.OPTIONS],
      integration: presignLambdaIntegration
    });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      "CloudFrontOAI",
      {
        comment: `Allows CloudFront access to S3 bucket`,
      }
    );

    const websiteBucket = new s3.Bucket(this, "HeartpokeBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    });

    websiteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: "Grant Cloudfront Origin Access Identity access to S3 bucket",
        actions: ["s3:GetObject"],
        resources: [websiteBucket.bucketArn + "/*"],
        principals: [cloudfrontOAI.grantPrincipal],
      })
    );

    referencesBucket.addToResourcePolicy(
        new iam.PolicyStatement({
          sid: "Grant Cloudfront Origin Access Identity access to S3 bucket with refs",
          actions: ["s3:GetObject"],
          resources: [referencesBucket.bucketArn + "/*"],
          principals: [cloudfrontOAI.grantPrincipal],
        })
    );

    const distribution = new cloudfront.CloudFrontWebDistribution(this, "HeartPokeDistribution", {
      comment: "CDN for HeartPoke App",
      defaultRootObject: "index.html",
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      viewerCertificate: {
        aliases: ['heartpoke.co.uk'],
        props: {
          acmCertificateArn: 'arn:aws:acm:us-east-1:543420290672:certificate/97586151-8b39-4b70-8363-72ea28ca47f9',
          sslSupportMethod: 'sni-only',
          minimumProtocolVersion: 'TLSv1.2_2019'
        }
      },
      originConfigs: [
        {
          customOriginSource: {
            domainName: `${httpApi.httpApiId}.execute-api.${this.region}.amazonaws.com`,
          },
          behaviors: [
            {
              pathPattern: "/api/*",
              allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
              defaultTtl: Duration.seconds(0),
            },
          ],
        },
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket,
            originAccessIdentity: cloudfrontOAI,
          },
          behaviors: [
            {
              compress: true,
              isDefaultBehavior: true,
              allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              lambdaFunctionAssociations: [
                {
                  lambdaFunction: redirectLambda.currentVersion,
                  eventType: LambdaEdgeEventType.ORIGIN_RESPONSE,
                },
              ],
            },
          ],
        },
        {
          s3OriginSource: {
            s3BucketSource: referencesBucket,
            originAccessIdentity: cloudfrontOAI,
          },
          behaviors: [
            {
              compress: true,
              allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              pathPattern: "/references/*"
            },
          ],
        },
      ],
    });

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset(`${__dirname}/frontend`)],
      destinationBucket: websiteBucket,
      distributionPaths: ['/index.html', '/logo.png', '/favicon.ico'],
      distribution
    });
  }
}
