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


export class HeartpokeCfStack extends cdk.Stack {
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
      code: Code.fromAsset(path.join(__dirname, 'book'))
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
      methods: [apigatewayv2.HttpMethod.POST],
      integration: lambdaIntegration,
    });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      "CloudFrontOAI",
      {
        comment: `Allows CloudFront access to S3 bucket`,
      }
    );

    const websiteBucket = new s3.Bucket(this, "HeartpokeBucket", {
      removalPolicy: RemovalPolicy.DESTROY, // Using destroy so when you delete this stack, we will remove the S3 bucket created as well
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedOrigins: ["*"],
          allowedMethods: [s3.HttpMethods.GET],
          maxAge: 3000,
        },
      ],
    });

    // uploads index.html to s3 bucket
    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset(`${__dirname}/frontend`)],
      destinationBucket: websiteBucket,
    });

    websiteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: "Grant Cloudfront Origin Access Identity access to S3 bucket",
        actions: ["s3:GetObject"],
        resources: [websiteBucket.bucketArn + "/*"],
        principals: [cloudfrontOAI.grantPrincipal],
      })
    );

    new cloudfront.CloudFrontWebDistribution(this, "HeartPokeDistribution", {
      comment: "CDN for HeartPoke App",
      defaultRootObject: "index.html",
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      viewerCertificate: {
        aliases: ['stg.heartpoke.co.uk', 'heartpoke.co.uk'],
        props: {
          acmCertificateArn: 'arn:aws:acm:us-east-1:543420290672:certificate/2cca1708-ae60-4665-a108-419f97d1c932',
          sslSupportMethod: 'sni-only',
          minimumProtocolVersion: 'TLSv1.1_2016'
        }
      },
      originConfigs: [
        {
          // make sure your backend origin is first in the originConfigs list so it takes precedence over the S3 origin
          customOriginSource: {
            domainName: `${httpApi.httpApiId}.execute-api.${this.region}.amazonaws.com`,
          },
          behaviors: [
            {
              pathPattern: "/api/*", // CloudFront will forward `/api/*` to the backend so make sure all your routes are prepended with `/api/`
              allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
              defaultTtl: Duration.seconds(0),
              forwardedValues: {
                queryString: true,
                headers: ["Authorization"], // By default CloudFront will not forward any headers through so if your API needs authentication make sure you forward auth headers across
              },
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
              defaultTtl: Duration.seconds(0),
              allowedMethods:
                cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              lambdaFunctionAssociations: [
                {
                  lambdaFunction: redirectLambda.currentVersion,
                  eventType: LambdaEdgeEventType.ORIGIN_RESPONSE,
                },
              ],
            },
          ],
        },
      ],
    });
  }
}
