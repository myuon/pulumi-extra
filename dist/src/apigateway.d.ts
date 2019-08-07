import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
export declare const createCORSResource: (name: string, option: {
    parentId: pulumi.Input<string>;
    pathPart: pulumi.Input<string>;
    restApi: aws.apigateway.RestApi;
}) => aws.apigateway.Resource;
export declare const createLambdaMethod: (name: string, option: {
    authorization: pulumi.Input<string>;
    httpMethod: pulumi.Input<string>;
    resource: aws.apigateway.Resource;
    restApi: aws.apigateway.RestApi;
    integration: Pick<aws.apigateway.IntegrationArgs, "type" | "cacheKeyParameters" | "cacheNamespace" | "connectionId" | "connectionType" | "contentHandling" | "credentials" | "passthroughBehavior" | "requestParameters" | "requestTemplates" | "timeoutMilliseconds">;
    handler: aws.lambda.Function;
    method?: Pick<aws.apigateway.MethodArgs, "requestParameters" | "apiKeyRequired" | "authorizationScopes" | "authorizerId" | "requestModels" | "requestValidatorId"> | undefined;
}) => aws.apigateway.Integration;
