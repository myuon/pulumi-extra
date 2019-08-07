"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pulumi = __importStar(require("@pulumi/pulumi"));
var aws = __importStar(require("@pulumi/aws"));
var current = pulumi.output(aws.getCallerIdentity({}));
exports.createCORSResource = function (name, option) {
    var resource = new aws.apigateway.Resource(name, option);
    var optionsMethod = new aws.apigateway.Method(name + "-options", {
        authorization: "NONE",
        httpMethod: "OPTIONS",
        resourceId: resource.id,
        restApi: option.restApi
    }, { dependsOn: [resource] });
    new aws.apigateway.Integration(name + "-options", {
        httpMethod: "OPTIONS",
        resourceId: resource.id,
        restApi: option.restApi,
        type: "MOCK",
        passthroughBehavior: "WHEN_NO_MATCH",
        requestTemplates: {
            "application/json": '{"statusCode": 200}'
        }
    }, { dependsOn: [optionsMethod] });
    var response200 = new aws.apigateway.MethodResponse(name + "-response-200", {
        httpMethod: optionsMethod.httpMethod,
        resourceId: resource.id,
        restApi: option.restApi,
        statusCode: "200",
        responseModels: {
            "application/json": "Empty"
        },
        responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": false,
            "method.response.header.Access-Control-Allow-Methods": false,
            "method.response.header.Access-Control-Allow-Origin": false
        }
    }, { dependsOn: [optionsMethod] });
    new aws.apigateway.IntegrationResponse(name + "-post-options", {
        httpMethod: "OPTIONS",
        resourceId: resource.id,
        restApi: option.restApi,
        statusCode: response200.statusCode,
        responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": "'Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'",
            "method.response.header.Access-Control-Allow-Methods": "'OPTIONS,HEAD,GET,POST,PUT,PATCH,DELETE'",
            "method.response.header.Access-Control-Allow-Origin": "'*'"
        },
        responseTemplates: {
            "application/json": ""
        }
    }, { dependsOn: [optionsMethod] });
    return resource;
};
exports.createLambdaMethod = function (name, option) {
    var method = new aws.apigateway.Method(name, __assign({ authorization: option.authorization, httpMethod: option.httpMethod, resourceId: option.resource.id, restApi: option.restApi }, option.method));
    var integration = new aws.apigateway.Integration(name, __assign({ httpMethod: method.httpMethod, integrationHttpMethod: "POST", resourceId: option.resource.id, restApi: option.restApi, uri: pulumi.interpolate(templateObject_1 || (templateObject_1 = __makeTemplateObject(["arn:aws:apigateway:", ":lambda:path/2015-03-31/functions/", "/invocations"], ["arn:aws:apigateway:",
            ":lambda:path/2015-03-31/functions/",
            "/invocations"])), aws
            .getRegion()
            .then(function (val) { return val.name; }), option.handler.arn) }, option.integration), { dependsOn: [method] });
    new aws.lambda.Permission(name, {
        action: "lambda:InvokeFunction",
        function: option.handler.name,
        principal: "apigateway.amazonaws.com",
        sourceArn: pulumi.interpolate(templateObject_2 || (templateObject_2 = __makeTemplateObject(["arn:aws:execute-api:", ":", ":", "/*/", "", ""], ["arn:aws:execute-api:",
            ":", ":", "/*/",
            "", ""])), aws
            .getRegion()
            .then(function (val) { return val.name; }), current.accountId, option.restApi.id, method.httpMethod, option.resource.path)
    }, { dependsOn: [method] });
    return integration;
};
var templateObject_1, templateObject_2;
