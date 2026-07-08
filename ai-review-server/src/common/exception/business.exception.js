"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
/**
 * 业务异常类
 *
 * 统一的业务异常抛出方式，包含自定义错误码和错误消息。
 */
var common_1 = require("@nestjs/common");
var BusinessException = /** @class */ (function (_super) {
    __extends(BusinessException, _super);
    /**
     * @param code - 业务错误码，参考错误码规范
     * @param errorMessage - 错误描述信息
     */
    function BusinessException(code, errorMessage) {
        var _this = _super.call(this, { code: code, message: errorMessage }, common_1.HttpStatus.OK) || this;
        _this.code = code;
        _this.errorMessage = errorMessage;
        return _this;
    }
    BusinessException.prototype.getCode = function () {
        return this.code;
    };
    BusinessException.prototype.getErrorMessage = function () {
        return this.errorMessage;
    };
    return BusinessException;
}(common_1.HttpException));
exports.BusinessException = BusinessException;
var BusinessException = /** @class */ (function (_super) {
    __extends(BusinessException, _super);
    /**
     * @param code - 业务错误码，参考错误码规范
     * @param message - 错误描述信息
     */
    function BusinessException(code, errorMessage) {
        var _this = _super.call(this, { code: code, message: errorMessage }, common_1.HttpStatus.OK) || this;
        _this.code = code;
        _this.errorMessage = errorMessage;
        return _this;
    }
    /**
     * 获取业务错误码
     */
    BusinessException.prototype.getCode = function () {
        return this.code;
    };
    /**
     * 获取错误描述信息
     */
    BusinessException.prototype.getErrorMessage = function () {
        return this.errorMessage;
    };
    return BusinessException;
}(common_1.HttpException));
exports.BusinessException = BusinessException;
