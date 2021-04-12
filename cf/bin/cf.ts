#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HeartpokeCfStack } from '../lib/heartpoke-cf-stack';

const app = new cdk.App();
new HeartpokeCfStack(app, 'HeartpokeCfStack', {
    env: {
        account: process.env.CDK_ACCOUNT,
        region: process.env.CDK_REGION
    }
});
