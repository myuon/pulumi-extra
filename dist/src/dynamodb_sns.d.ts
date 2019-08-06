import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as lambda from "./lambda";
export declare const hookDynamoDB: (name: string, options: {
    topic: aws.sns.TopicArgs;
    lambda: (topicArn: pulumi.Output<string>) => lambda.LambdaOptions;
    table: aws.dynamodb.Table;
}) => {
    topic: aws.sns.Topic;
    hookFunction: aws.lambda.Function;
    subscription: aws.dynamodb.TableEventSubscription;
};
