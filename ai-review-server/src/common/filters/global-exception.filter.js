"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
/**
 * 全局异常过滤器
 *
 * 捕获所有异常，统一返回格式：{ code, message, data: null }
 */
var common_1 = require("@nestjs/common");
var business_exception_1 = require("../exception/business.exception");
var GlobalExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var GlobalExceptionFilter = _classThis = /** @class */ (function () {
        function GlobalExceptionFilter_1() {
            this.logger = new common_1.Logger(GlobalExceptionFilter.name);
        }
        GlobalExceptionFilter_1.prototype.catch = function (exception, host) {
            var ctx = host.switchToHttp();
            var response = ctx.getResponse();
            var code = 10000;
            var message = '服务器内部错误';
            var status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            if (exception instanceof business_exception_1.BusinessException) {
                code = exception.getCode();
                message = exception.getErrorMessage();
                status = common_1.HttpStatus.OK;
            }
            else if (exception instanceof common_1.HttpException) {
                status = exception.getStatus();
                var res = exception.getResponse();
                if (typeof res === 'object' && res !== null) {
                    message = res.message || exception.message;
                }
                else {
                    message = exception.message;
                }
                // 参数校验失败
                if (status === common_1.HttpStatus.BAD_REQUEST) {
                    code = 10001;
                }
                else if (status === common_1.HttpStatus.UNAUTHORIZED) {
                    code = 10002;
                }
                else if (status === common_1.HttpStatus.FORBIDDEN) {
                    code = 10003;
                }
                else if (status === common_1.HttpStatus.NOT_FOUND) {
                    code = 10004;
                }
                else {
                    code = 10000;
                }
            }
            this.logger.error("\u5F02\u5E38\u6355\u83B7: ".concat(message, " (code: ").concat(code, ")"), exception instanceof Error ? exception.stack : '');
            response.status(status).json({
                code: code,
                message: message,
                data: null,
            });
        };
        return GlobalExceptionFilter_1;
    }());
    __setFunctionName(_classThis, "GlobalExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GlobalExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GlobalExceptionFilter = _classThis;
}();
exports.GlobalExceptionFilter = GlobalExceptionFilter;
var error_codes_1 = require("../exception/error-codes");
var GlobalExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var GlobalExceptionFilter = _classThis = /** @class */ (function () {
        function GlobalExceptionFilter_2() {
            this.logger = new common_1.Logger(GlobalExceptionFilter.name);
        }
        /**
         * 捕获并处理所有异常
         */
        GlobalExceptionFilter_2.prototype.catch = function (exception, host) {
            var ctx = host.switchToHttp();
            var response = ctx.getResponse();
            var request = ctx.getRequest();
            var code;
            var message;
            if (exception instanceof business_exception_1.BusinessException) {
                code = exception.getCode();
                message = exception.getErrorMessage();
            }
            else if (exception instanceof common_1.HttpException) {
                var status_1 = exception.getStatus();
                var exceptionResponse = exception.getResponse();
                if (status_1 === common_1.HttpStatus.BAD_REQUEST) {
                    code = error_codes_1.ErrorCode.VALIDATION_ERROR;
                    message = this.formatValidationMessage(exceptionResponse);
                }
                else if (status_1 === common_1.HttpStatus.UNAUTHORIZED) {
                    code = error_codes_1.ErrorCode.UNAUTHORIZED;
                    message = '未登录或登录已过期';
                }
                else if (status_1 === common_1.HttpStatus.FORBIDDEN) {
                    code = error_codes_1.ErrorCode.FORBIDDEN;
                    message = '权限不足';
                }
                else if (status_1 === common_1.HttpStatus.NOT_FOUND) {
                    code = error_codes_1.ErrorCode.NOT_FOUND;
                    message = '资源不存在';
                }
                else {
                    code = error_codes_1.ErrorCode.UNKNOWN;
                    message = exception.message || '服务器内部错误';
                }
            }
            else {
                code = error_codes_1.ErrorCode.UNKNOWN;
                message = '服务器内部错误';
                this.logger.error("\u672A\u6355\u83B7\u5F02\u5E38: ".concat(request.method, " ").concat(request.url), exception instanceof Error ? exception.stack : String(exception));
            }
            response.status(common_1.HttpStatus.OK).json({
                code: code,
                message: message,
                data: null,
            });
        };
        /**
         * 格式化参数校验错误消息
         *
         * 将 class-validator 的嵌套错误对象转换为可读的字符串。
         */
        GlobalExceptionFilter_2.prototype.formatValidationMessage = function (response) {
            if (typeof response === 'object' && response !== null && 'message' in response) {
                var msg = response.message;
                if (Array.isArray(msg)) {
                    return msg.join('; ');
                }
                return String(msg);
            }
            return '参数校验失败';
        };
        return GlobalExceptionFilter_2;
    }());
    __setFunctionName(_classThis, "GlobalExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GlobalExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GlobalExceptionFilter = _classThis;
}();
exports.GlobalExceptionFilter = GlobalExceptionFilter;
