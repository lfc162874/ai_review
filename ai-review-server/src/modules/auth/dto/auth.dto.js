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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenDto = exports.SendVerifyCodeDto = exports.PhoneLoginDto = exports.LoginDto = exports.RegisterDto = void 0;
/**
 * 认证模块 - 请求 DTO
 *
 * 定义注册、登录、手机号登录、刷新 Token 等接口的请求参数。
 */
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
/**
 * 用户注册请求参数
 */
var RegisterDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _nickname_decorators;
    var _nickname_initializers = [];
    var _nickname_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RegisterDto() {
                /** 用户邮箱，用于登录和身份标识 */
                this.email = __runInitializers(this, _email_initializers, void 0);
                /** 用户昵称 */
                this.nickname = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _nickname_initializers, void 0));
                /** 登录密码 */
                this.password = (__runInitializers(this, _nickname_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                /** 手机号（可选） */
                this.phone = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                __runInitializers(this, _phone_extraInitializers);
            }
            return RegisterDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiProperty)({ description: '用户邮箱', example: 'user@example.com' }), (0, class_validator_1.IsEmail)({}, { message: '邮箱格式不正确' })];
            _nickname_decorators = [(0, swagger_1.ApiProperty)({ description: '用户昵称', example: '张三' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '昵称不能为空' }), (0, class_validator_1.MinLength)(2, { message: '昵称至少 2 个字符' }), (0, class_validator_1.MaxLength)(50, { message: '昵称最多 50 个字符' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({ description: '登录密码，至少 6 位', example: '123456' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '密码不能为空' }), (0, class_validator_1.MinLength)(6, { message: '密码至少 6 个字符' }), (0, class_validator_1.MaxLength)(50, { message: '密码最多 50 个字符' })];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '手机号', example: '13800138000' }), IsOptional(), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _nickname_decorators, { kind: "field", name: "nickname", static: false, private: false, access: { has: function (obj) { return "nickname" in obj; }, get: function (obj) { return obj.nickname; }, set: function (obj, value) { obj.nickname = value; } }, metadata: _metadata }, _nickname_initializers, _nickname_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RegisterDto = RegisterDto;
/**
 * 邮箱密码登录请求参数
 */
var LoginDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    return _a = /** @class */ (function () {
            function LoginDto() {
                /** 用户邮箱 */
                this.email = __runInitializers(this, _email_initializers, void 0);
                /** 登录密码 */
                this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                __runInitializers(this, _password_extraInitializers);
            }
            return LoginDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiProperty)({ description: '用户邮箱', example: 'user@example.com' }), (0, class_validator_1.IsEmail)({}, { message: '邮箱格式不正确' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({ description: '登录密码', example: '123456' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '密码不能为空' })];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.LoginDto = LoginDto;
/**
 * 手机号验证码登录请求参数
 */
var PhoneLoginDto = function () {
    var _a;
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PhoneLoginDto() {
                /** 手机号 */
                this.phone = __runInitializers(this, _phone_initializers, void 0);
                /** 验证码 */
                this.code = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _code_initializers, void 0));
                __runInitializers(this, _code_extraInitializers);
            }
            return PhoneLoginDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _phone_decorators = [(0, swagger_1.ApiProperty)({ description: '手机号', example: '13800138000' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '手机号不能为空' }), (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })];
            _code_decorators = [(0, swagger_1.ApiProperty)({ description: '6 位数字验证码', example: '123456' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '验证码不能为空' }), (0, class_validator_1.Matches)(/^\d{6}$/, { message: '验证码格式不正确' })];
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PhoneLoginDto = PhoneLoginDto;
/**
 * 发送验证码请求参数
 */
var SendVerifyCodeDto = function () {
    var _a;
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SendVerifyCodeDto() {
                /** 手机号 */
                this.phone = __runInitializers(this, _phone_initializers, void 0);
                __runInitializers(this, _phone_extraInitializers);
            }
            return SendVerifyCodeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _phone_decorators = [(0, swagger_1.ApiProperty)({ description: '手机号', example: '13800138000' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '手机号不能为空' }), (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })];
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SendVerifyCodeDto = SendVerifyCodeDto;
/**
 * 刷新 Token 请求参数
 */
var RefreshTokenDto = function () {
    var _a;
    var _refreshToken_decorators;
    var _refreshToken_initializers = [];
    var _refreshToken_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RefreshTokenDto() {
                /** 刷新 Token */
                this.refreshToken = __runInitializers(this, _refreshToken_initializers, void 0);
                __runInitializers(this, _refreshToken_extraInitializers);
            }
            return RefreshTokenDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _refreshToken_decorators = [(0, swagger_1.ApiProperty)({ description: '刷新 Token' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '刷新 Token 不能为空' })];
            __esDecorate(null, null, _refreshToken_decorators, { kind: "field", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; }, set: function (obj, value) { obj.refreshToken = value; } }, metadata: _metadata }, _refreshToken_initializers, _refreshToken_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RefreshTokenDto = RefreshTokenDto;
/**
 * 用户注册请求参数
 */
var RegisterDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _nickname_decorators;
    var _nickname_initializers = [];
    var _nickname_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RegisterDto() {
                /** 用户邮箱，用于登录和身份标识 */
                this.email = __runInitializers(this, _email_initializers, void 0);
                /** 用户昵称 */
                this.nickname = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _nickname_initializers, void 0));
                /** 登录密码 */
                this.password = (__runInitializers(this, _nickname_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                __runInitializers(this, _password_extraInitializers);
            }
            return RegisterDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiProperty)({ description: '用户邮箱', example: 'user@example.com' }), (0, class_validator_1.IsEmail)({}, { message: '邮箱格式不正确' })];
            _nickname_decorators = [(0, swagger_1.ApiProperty)({ description: '用户昵称', example: '张三' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '昵称不能为空' }), (0, class_validator_1.MinLength)(2, { message: '昵称至少 2 个字符' }), (0, class_validator_1.MaxLength)(50, { message: '昵称最多 50 个字符' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({ description: '登录密码，至少 6 位', example: '123456' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '密码不能为空' }), (0, class_validator_1.MinLength)(6, { message: '密码至少 6 个字符' }), (0, class_validator_1.MaxLength)(50, { message: '密码最多 50 个字符' })];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _nickname_decorators, { kind: "field", name: "nickname", static: false, private: false, access: { has: function (obj) { return "nickname" in obj; }, get: function (obj) { return obj.nickname; }, set: function (obj, value) { obj.nickname = value; } }, metadata: _metadata }, _nickname_initializers, _nickname_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RegisterDto = RegisterDto;
/**
 * 用户登录请求参数
 */
var LoginDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    return _a = /** @class */ (function () {
            function LoginDto() {
                /** 用户邮箱 */
                this.email = __runInitializers(this, _email_initializers, void 0);
                /** 登录密码 */
                this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                __runInitializers(this, _password_extraInitializers);
            }
            return LoginDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiProperty)({ description: '用户邮箱', example: 'user@example.com' }), (0, class_validator_1.IsEmail)({}, { message: '邮箱格式不正确' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({ description: '登录密码', example: '123456' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '密码不能为空' })];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.LoginDto = LoginDto;
/**
 * 刷新 Token 请求参数
 */
var RefreshTokenDto = function () {
    var _a;
    var _refreshToken_decorators;
    var _refreshToken_initializers = [];
    var _refreshToken_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RefreshTokenDto() {
                /** 刷新 Token */
                this.refreshToken = __runInitializers(this, _refreshToken_initializers, void 0);
                __runInitializers(this, _refreshToken_extraInitializers);
            }
            return RefreshTokenDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _refreshToken_decorators = [(0, swagger_1.ApiProperty)({ description: '刷新 Token' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '刷新 Token 不能为空' })];
            __esDecorate(null, null, _refreshToken_decorators, { kind: "field", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; }, set: function (obj, value) { obj.refreshToken = value; } }, metadata: _metadata }, _refreshToken_initializers, _refreshToken_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RefreshTokenDto = RefreshTokenDto;
