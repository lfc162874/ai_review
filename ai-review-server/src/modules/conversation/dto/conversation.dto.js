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
exports.QueryMessagesDto = exports.SendMessageDto = exports.CreateConversationDto = void 0;
/**
 * 对话模块 - 请求 DTO
 *
 * 定义创建对话会话、发送消息等接口的请求参数。
 */
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var dto_1 = require("../../../common/dto");
/**
 * 创建对话会话请求参数
 */
var CreateConversationDto = function () {
    var _a;
    var _reviewId_decorators;
    var _reviewId_initializers = [];
    var _reviewId_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateConversationDto() {
                /** 关联的复盘记录 ID（可选） */
                this.reviewId = __runInitializers(this, _reviewId_initializers, void 0);
                /** 会话标题 */
                this.title = (__runInitializers(this, _reviewId_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                __runInitializers(this, _title_extraInitializers);
            }
            return CreateConversationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _reviewId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '关联的复盘记录 ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _title_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: '会话标题', example: '今日复盘对话' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            __esDecorate(null, null, _reviewId_decorators, { kind: "field", name: "reviewId", static: false, private: false, access: { has: function (obj) { return "reviewId" in obj; }, get: function (obj) { return obj.reviewId; }, set: function (obj, value) { obj.reviewId = value; } }, metadata: _metadata }, _reviewId_initializers, _reviewId_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateConversationDto = CreateConversationDto;
/**
 * 发送消息请求参数
 */
var SendMessageDto = function () {
    var _a;
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SendMessageDto() {
                /** 消息内容 */
                this.content = __runInitializers(this, _content_initializers, void 0);
                __runInitializers(this, _content_extraInitializers);
            }
            return SendMessageDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: '消息内容',
                    example: '今天完成了首页的开发',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: '消息内容不能为空' }), (0, class_validator_1.MaxLength)(5000, { message: '消息内容最多 5000 字符' })];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SendMessageDto = SendMessageDto;
/**
 * 查询消息历史请求参数
 */
var QueryMessagesDto = /** @class */ (function (_super) {
    __extends(QueryMessagesDto, _super);
    function QueryMessagesDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueryMessagesDto;
}(dto_1.PaginationDto));
exports.QueryMessagesDto = QueryMessagesDto;
