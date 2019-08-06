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
var lambda = __importStar(require("./lambda"));
exports.hookDynamoDB = function (name, options) {
    var topic = new aws.sns.Topic(name, options.topic);
    var hookFunction = lambda.createLambdaFunction(name, options.lambda(topic.arn), {
        dependsOn: [topic]
    });
    var subscription = new aws.dynamodb.TableEventSubscription(name, options.table, hookFunction, {
        startingPosition: "TRIM_HORIZON"
    }, {
        dependsOn: [topic, hookFunction, options.table]
    });
    return {
        topic: topic,
        hookFunction: hookFunction,
        subscription: subscription
    };
};
