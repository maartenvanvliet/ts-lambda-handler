"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HttpError_1 = require("./HttpError");
/**
 * Represents an error raised by a validation issue with the client input.
 *
 * Will cause a 400 Bad Request to be sent to the client.
 */
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(details) {
        var _this = _super.call(this, 'ValidationError', 400) || this;
        _this.details = details;
        return _this;
    }
    ValidationError.prototype.body = function () {
        return this.details;
    };
    return ValidationError;
}(HttpError_1.HttpError));
exports.ValidationError = ValidationError;
//# sourceMappingURL=/var/www/LambdaHandler/src/Errors/ValidationError.js.map