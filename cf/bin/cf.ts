#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HeartpokeStack } from '../lib/heartpoke-stack';

const app = new cdk.App();
new HeartpokeStack(app, 'HeartpokeStack', {
    env: {
        account: process.env.CDK_ACCOUNT,
        region: process.env.CDK_REGION
    }
});
