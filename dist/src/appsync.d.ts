import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { LambdaOptions } from "./lambda";
export declare const createDataSource: (name: string, options: {
    api: aws.appsync.GraphQLApi;
    dataSourceName: string;
    dataSource: Pick<aws.appsync.DataSourceArgs, "description" | "type" | "dynamodbConfig" | "elasticsearchConfig" | "httpConfig" | "lambdaConfig">;
    rolePolicyDocument: pulumi.Output<string>;
}) => aws.appsync.DataSource;
export declare const createLambdaDataSource: (name: string, options: {
    api: aws.appsync.GraphQLApi;
    dataSourceName: string;
    function: aws.lambda.Function;
    dataSource?: Pick<aws.appsync.DataSourceArgs, "description" | "dynamodbConfig" | "elasticsearchConfig" | "httpConfig"> | undefined;
}) => aws.appsync.DataSource;
export declare const createDynamoDBDataSource: (name: string, options: {
    api: aws.appsync.GraphQLApi;
    dataSourceName: string;
    table: aws.dynamodb.Table;
    dataSource?: Pick<aws.appsync.DataSourceArgs, "description" | "elasticsearchConfig" | "httpConfig" | "lambdaConfig"> | undefined;
}) => aws.appsync.DataSource;
export declare const createPipelineResolver: (name: string, options: {
    api: aws.appsync.GraphQLApi;
    field: string;
    type: "Query" | "Mutation";
    pipeline: aws.appsync.Function[];
}) => aws.appsync.Resolver;
export declare const createLambdaResolverFunction: (name: string, options: {
    lambda: LambdaOptions;
    api: aws.appsync.GraphQLApi;
}) => aws.appsync.Function;
