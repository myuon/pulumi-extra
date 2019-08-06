import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
export declare const createLambdaSubscription: (name: string, options: {
    function: aws.lambda.Function;
    snsTopicArn: pulumi.Output<string>;
}) => aws.sns.TopicSubscription;
