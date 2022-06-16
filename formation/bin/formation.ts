#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FormationStack } from "../lib/formation-stack";

const app = new cdk.App();
new FormationStack(app, "NestJsSampleStack", {});
