import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DockerImageAsset, Platform } from "aws-cdk-lib/aws-ecr-assets";
import * as apprunner from "@aws-cdk/aws-apprunner-alpha";
import * as path from "path";

export class FormationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const asset = new DockerImageAsset(this, "NextjsSampleImage", {
      directory: path.join(__dirname, "../../"),
      platform: Platform.custom("linux/x86_64"),
    });
    const app = new apprunner.Service(this, "NextjsSampleAppRunner", {
      source: apprunner.Source.fromAsset({
        imageConfiguration: { port: 3000 },
        asset,
      }),
    });

    new CfnOutput(this, "NextjsSampleAppRunnerUrl", {
      value: app.serviceUrl,
    });
  }
}
