import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
export declare type LambdaOptions = {
    filepath: string;
    role: aws.iam.Role;
    handlerName: string;
    lambdaOptions?: Omit<aws.lambda.FunctionArgs, "runtime" | "code" | "timeout" | "memorySize" | "handler" | "role" | "name">;
};
export declare const createLambdaFunction: (name: string, options: LambdaOptions, customResourceOptions?: pulumi.CustomResourceOptions | undefined) => aws.lambda.Function;
