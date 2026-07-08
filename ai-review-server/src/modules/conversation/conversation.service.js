"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
/**
 * 对话服务
 *
 * 管理对话会话、消息发送和历史查询。
 */
var common_1 = require("@nestjs/common");
var business_exception_1 = require("../../common/exception/business.exception");
var error_codes_1 = require("../../common/exception/error-codes");
var ConversationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConversationService = _classThis = /** @class */ (function () {
        function ConversationService_1(prisma, aiService) {
            this.prisma = prisma;
            this.aiService = aiService;
            this.logger = new common_1.Logger(ConversationService.name);
        }
        /**
         * 创建对话会话
         *
         * 创建新会话并自动发送 AI 引导消息。
         */
        ConversationService_1.prototype.createConversation = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation, aiMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.conversation.create({
                                data: {
                                    userId: userId,
                                    reviewId: dto.reviewId,
                                    title: dto.title || '新对话',
                                    status: 'active',
                                },
                            })];
                        case 1:
                            conversation = _a.sent();
                            return [4 /*yield*/, this.prisma.conversationMessage.create({
                                    data: {
                                        conversationId: conversation.id,
                                        reviewId: dto.reviewId,
                                        role: 'assistant',
                                        content: '你好！我是你的复盘教练。让我们来一起回顾一下，你今天完成了哪些事情呢？',
                                    },
                                })];
                        case 2:
                            aiMessage = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, conversation), { messages: [aiMessage] })];
                    }
                });
            });
        };
        /**
         * 发送消息并获取 AI 回复
         */
        ConversationService_1.prototype.sendMessage = function (userId, conversationId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation, history, messages, aiResult, aiMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.conversation.findFirst({
                                where: { id: conversationId, userId: userId },
                            })];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.CONVERSATION_NOT_FOUND, '对话会话不存在');
                            }
                            if (conversation.status === 'closed') {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.CONVERSATION_CLOSED, '对话会话已关闭');
                            }
                            // 保存用户消息
                            return [4 /*yield*/, this.prisma.conversationMessage.create({
                                    data: {
                                        conversationId: conversationId,
                                        reviewId: conversation.reviewId,
                                        role: 'user',
                                        content: dto.content,
                                    },
                                })];
                        case 2:
                            // 保存用户消息
                            _a.sent();
                            return [4 /*yield*/, this.prisma.conversationMessage.findMany({
                                    where: { conversationId: conversationId },
                                    orderBy: { createdAt: 'asc' },
                                    take: 20,
                                })];
                        case 3:
                            history = _a.sent();
                            messages = history.map(function (msg) { return ({
                                role: msg.role,
                                content: msg.content,
                            }); });
                            return [4 /*yield*/, this.aiService.chat(messages)];
                        case 4:
                            aiResult = _a.sent();
                            return [4 /*yield*/, this.prisma.conversationMessage.create({
                                    data: {
                                        conversationId: conversationId,
                                        reviewId: conversation.reviewId,
                                        role: 'assistant',
                                        content: aiResult.content,
                                    },
                                })];
                        case 5:
                            aiMessage = _a.sent();
                            // 更新会话时间
                            return [4 /*yield*/, this.prisma.conversation.update({
                                    where: { id: conversationId },
                                    data: { updatedAt: new Date() },
                                })];
                        case 6:
                            // 更新会话时间
                            _a.sent();
                            return [2 /*return*/, aiMessage];
                    }
                });
            });
        };
        /**
         * 查询消息历史（分页）
         */
        ConversationService_1.prototype.getMessages = function (userId, conversationId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation, _a, list, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.conversation.findFirst({
                                where: { id: conversationId, userId: userId },
                            })];
                        case 1:
                            conversation = _b.sent();
                            if (!conversation) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.CONVERSATION_NOT_FOUND, '对话会话不存在');
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.conversationMessage.findMany({
                                        where: { conversationId: conversationId },
                                        orderBy: { createdAt: 'asc' },
                                        skip: query.offset,
                                        take: query.pageSize,
                                    }),
                                    this.prisma.conversationMessage.count({ where: { conversationId: conversationId } }),
                                ])];
                        case 2:
                            _a = _b.sent(), list = _a[0], total = _a[1];
                            return [2 /*return*/, { list: list, total: total, page: query.page, pageSize: query.pageSize }];
                    }
                });
            });
        };
        /**
         * 查询会话列表（分页）
         */
        ConversationService_1.prototype.listConversations = function (userId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, list, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            where = { userId: userId };
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.conversation.findMany({
                                        where: where,
                                        orderBy: { updatedAt: 'desc' },
                                        skip: query.offset,
                                        take: query.pageSize,
                                    }),
                                    this.prisma.conversation.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), list = _a[0], total = _a[1];
                            return [2 /*return*/, { list: list, total: total, page: query.page, pageSize: query.pageSize }];
                    }
                });
            });
        };
        /**
         * 关闭对话会话
         */
        ConversationService_1.prototype.closeConversation = function (userId, conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.conversation.findFirst({
                                where: { id: conversationId, userId: userId },
                            })];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.CONVERSATION_NOT_FOUND, '对话会话不存在');
                            }
                            return [4 /*yield*/, this.prisma.conversation.update({
                                    where: { id: conversationId },
                                    data: { status: 'closed' },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, null];
                    }
                });
            });
        };
        return ConversationService_1;
    }());
    __setFunctionName(_classThis, "ConversationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConversationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConversationService = _classThis;
}();
exports.ConversationService = ConversationService;
