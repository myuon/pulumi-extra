"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var appsync = __importStar(require("./src/appsync"));
exports.appsync = appsync;
var apigateway = __importStar(require("./src/apigateway"));
exports.apigateway = apigateway;
var dynamodb_sns = __importStar(require("./src/dynamodb_sns"));
exports.dynamodb_sns = dynamodb_sns;
var lambda = __importStar(require("./src/lambda"));
exports.lambda = lambda;
var subscription = __importStar(require("./src/subscription"));
exports.subscription = subscription;
