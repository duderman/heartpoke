import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import {HeartpokeCfStack} from "../lib/heartpoke-cf-stack";

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new HeartpokeCfStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
