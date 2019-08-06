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
var lambda_1 = require("./lambda");
exports.createDataSource = function (name, options) {
    var appsyncRole = new aws.iam.Role(name + "-ds-role", {
        assumeRolePolicy: "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Action\": \"sts:AssumeRole\",\n      \"Principal\": {\n        \"Service\": \"appsync.amazonaws.com\"\n      },\n      \"Effect\": \"Allow\"\n    }\n  ]\n  }\n  "
    });
    new aws.iam.RolePolicy(name + "-ds-role-policy", {
        policy: options.rolePolicyDocument,
        role: appsyncRole.id
    });
    return new aws.appsync.DataSource(name + "-ds", __assign({ apiId: options.api.id, name: options.dataSourceName, serviceRoleArn: appsyncRole.arn }, options.dataSource), {
        dependsOn: [options.api, appsyncRole]
    });
};
exports.createLambdaDataSource = function (name, options) {
    return exports.createDataSource(name, {
        api: options.api,
        dataSourceName: options.dataSourceName,
        dataSource: {
            lambdaConfig: {
                functionArn: options.function.arn
            },
            type: "AWS_LAMBDA"
        },
        rolePolicyDocument: pulumi.interpolate(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Action\": [\n        \"lambda:*\"\n      ],\n      \"Effect\": \"Allow\",\n      \"Resource\": [\n        \"", "\"\n      ]\n    }\n  ]\n}\n"], ["{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Action\": [\n        \"lambda:*\"\n      ],\n      \"Effect\": \"Allow\",\n      \"Resource\": [\n        \"", "\"\n      ]\n    }\n  ]\n}\n"])), options.function.arn)
    });
};
exports.createDynamoDBDataSource = function (name, options) {
    return exports.createDataSource(name, {
        api: options.api,
        dataSourceName: options.dataSourceName,
        dataSource: {
            dynamodbConfig: {
                tableName: options.table.name
            },
            type: "AMAZON_DYNAMODB"
        },
        rolePolicyDocument: pulumi.interpolate(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Action\": [\n        \"dynamodb:*\"\n      ],\n      \"Effect\": \"Allow\",\n      \"Resource\": [\n        \"", "\",\n        \"", "/index/*\"\n      ]\n    }\n  ]\n}\n"], ["{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Action\": [\n        \"dynamodb:*\"\n      ],\n      \"Effect\": \"Allow\",\n      \"Resource\": [\n        \"", "\",\n        \"", "/index/*\"\n      ]\n    }\n  ]\n}\n"])), options.table.arn, options.table.arn)
    });
};
exports.createPipelineResolver = function (name, options) {
    return new aws.appsync.Resolver(name, {
        apiId: options.api.id,
        field: options.field,
        type: options.type,
        requestTemplate: "$util.toJson($context)",
        responseTemplate: "$utils.toJson($context.prev.result)",
        kind: "PIPELINE",
        pipelineConfig: {
            functions: options.pipeline.map(function (f) { return f.functionId; })
        }
    });
};
exports.createLambdaResolverFunction = function (name, options) {
    var lambda = lambda_1.createLambdaFunction(name, options.lambda);
    var datasource = exports.createLambdaDataSource(name, {
        api: options.api,
        function: lambda,
        dataSourceName: name.split("-").join("")
    });
    return new aws.appsync.Function(name, {
        apiId: options.api.id,
        dataSource: datasource.name,
        requestMappingTemplate: "{\n  \"version\": \"2017-02-28\",\n  \"operation\": \"Invoke\",\n  \"payload\": $utils.toJson($context)\n}",
        responseMappingTemplate: "#if($context.error)\n  $util.error($context.error.type, $context.error.message)\n#end\n\n$util.toJson($context.result)",
        name: name.split("-").join("")
    });
};
var templateObject_1, templateObject_2;
