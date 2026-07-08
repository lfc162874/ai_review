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
exports.ReviewAgent = void 0;
/**
 * 复盘智能体
 *
 * 通过 Prompt 引导 AI 对用户复盘内容进行结构化分析，
 * 生成包含概述、成就、问题、分析、成长、下一步的结构化总结。
 */
var common_1 = require("@nestjs/common");
var ReviewAgent = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReviewAgent = _classThis = /** @class */ (function () {
        function ReviewAgent_1(aiService) {
            this.aiService = aiService;
            this.logger = new common_1.Logger(ReviewAgent.name);
        }
        /**
         * 生成复盘总结
         *
         * @param content - 用户复盘原始内容
         * @returns 结构化总结
         */
        ReviewAgent_1.prototype.generateSummary = function (content) {
            return __awaiter(this, void 0, void 0, function () {
                var systemPrompt, result, jsonMatch;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            systemPrompt = "\u4F60\u662F\u4E00\u4E2A\u4E13\u4E1A\u7684\u590D\u76D8\u6559\u7EC3\u3002\u8BF7\u6839\u636E\u7528\u6237\u7684\u590D\u76D8\u5185\u5BB9\uFF0C\u8FDB\u884C\u7ED3\u6784\u5316\u5206\u6790\u5E76\u751F\u6210\u603B\u7ED3\u3002\n\n\u8BF7\u4E25\u683C\u6309\u4EE5\u4E0B JSON \u683C\u5F0F\u8F93\u51FA\uFF0C\u4E0D\u8981\u8F93\u51FA\u5176\u4ED6\u5185\u5BB9\uFF1A\n{\n  \"overview\": \"\u4E00\u53E5\u8BDD\u6982\u62EC\u672C\u6B21\u590D\u76D8\u7684\u6838\u5FC3\u5185\u5BB9\",\n  \"achievements\": [\"\u6210\u5C311\", \"\u6210\u5C312\"],\n  \"problems\": [\"\u95EE\u98981\", \"\u95EE\u98982\"],\n  \"analysis\": \"\u5BF9\u95EE\u9898\u7684\u6DF1\u5165\u5206\u6790\uFF0C\u627E\u51FA\u6839\u672C\u539F\u56E0\",\n  \"growth\": \"\u4ECE\u672C\u6B21\u7ECF\u5386\u4E2D\u83B7\u5F97\u7684\u6210\u957F\u548C\u6536\u83B7\",\n  \"nextSteps\": [\"\u4E0B\u4E00\u6B65\u884C\u52A81\", \"\u4E0B\u4E00\u6B65\u884C\u52A82\"]\n}";
                            return [4 /*yield*/, this.aiService.chat([
                                    { role: 'system', content: systemPrompt },
                                    { role: 'user', content: content },
                                ], { temperature: 0.7 })];
                        case 1:
                            result = _a.sent();
                            try {
                                jsonMatch = result.content.match(/\{[\s\S]*\}/);
                                if (jsonMatch) {
                                    return [2 /*return*/, JSON.parse(jsonMatch[0])];
                                }
                                throw new Error('无法解析 AI 返回内容');
                            }
                            catch (error) {
                                this.logger.error("\u590D\u76D8\u603B\u7ED3\u89E3\u6790\u5931\u8D25: ".concat(error));
                                // 返回默认结构
                                return [2 /*return*/, {
                                        overview: result.content.slice(0, 100),
                                        achievements: [],
                                        problems: [],
                                        analysis: '总结解析失败，请重试',
                                        growth: '',
                                        nextSteps: [],
                                    }];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ReviewAgent_1;
    }());
    __setFunctionName(_classThis, "ReviewAgent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReviewAgent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReviewAgent = _classThis;
}();
exports.ReviewAgent = ReviewAgent;
