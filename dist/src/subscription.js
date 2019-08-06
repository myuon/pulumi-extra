"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws = __importStar(require("@pulumi/aws"));
exports.createLambdaSubscription = function (name, options) {
    var subscription = new aws.sns.TopicSubscription(name, {
        protocol: "lambda",
        endpoint: options.function.arn,
        topic: options.snsTopicArn
    });
    var permission = new aws.lambda.Permission(name, {
        function: options.function.name,
        action: "lambda:InvokeFunction",
        principal: "sns.amazonaws.com"
    });
    return subscription;
};
