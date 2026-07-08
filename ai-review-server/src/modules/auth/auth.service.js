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
exports.AuthService = void 0;
/**
 * 认证服务
 *
 * 处理用户注册、邮箱密码登录、手机号验证码登录、Token 刷新。
 */
var common_1 = require("@nestjs/common");
var bcrypt = require("bcryptjs");
var business_exception_1 = require("../../common/exception/business.exception");
var error_codes_1 = require("../../common/exception/error-codes");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(prisma, jwtService, configService) {
            this.prisma = prisma;
            this.jwtService = jwtService;
            this.configService = configService;
            this.logger = new common_1.Logger(AuthService.name);
            /** 验证码存储（内存，生产环境应使用 Redis） */
            this.verifyCodeStore = new Map();
        }
        /**
         * 用户注册
         *
         * 创建新用户并返回 Token 对。
         */
        AuthService_1.prototype.register = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, existingPhone, hashedPassword, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { email: dto.email },
                            })];
                        case 1:
                            existing = _a.sent();
                            if (existing) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.EMAIL_ALREADY_REGISTERED, '该邮箱已被注册');
                            }
                            if (!dto.phone) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { phone: dto.phone },
                                })];
                        case 2:
                            existingPhone = _a.sent();
                            if (existingPhone) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.USER_ALREADY_EXISTS, '该手机号已被注册');
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, bcrypt.hash(dto.password, 10)];
                        case 4:
                            hashedPassword = _a.sent();
                            return [4 /*yield*/, this.prisma.user.create({
                                    data: {
                                        email: dto.email,
                                        nickname: dto.nickname,
                                        password: hashedPassword,
                                        phone: dto.phone,
                                    },
                                })];
                        case 5:
                            user = _a.sent();
                            // 生成 Token
                            return [2 /*return*/, this.generateTokens(user.id, user.email)];
                    }
                });
            });
        };
        /**
         * 邮箱密码登录
         *
         * 验证邮箱和密码，成功后返回 Token 对和用户信息。
         */
        AuthService_1.prototype.login = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isPasswordValid, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { email: dto.email },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.USER_NOT_FOUND, '用户不存在');
                            }
                            return [4 /*yield*/, bcrypt.compare(dto.password, user.password)];
                        case 2:
                            isPasswordValid = _a.sent();
                            if (!isPasswordValid) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.PASSWORD_INCORRECT, '密码错误');
                            }
                            tokens = this.generateTokens(user.id, user.email);
                            return [2 /*return*/, __assign(__assign({}, tokens), { user: {
                                        id: user.id,
                                        email: user.email,
                                        nickname: user.nickname,
                                        avatar: user.avatar,
                                    } })];
                    }
                });
            });
        };
        /**
         * 发送手机验证码
         *
         * 生成 6 位随机验证码并存储（当前使用内存，生产环境应使用 Redis + 短信服务）。
         */
        AuthService_1.prototype.sendVerifyCode = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, existing, code;
                return __generator(this, function (_a) {
                    phone = dto.phone;
                    existing = this.verifyCodeStore.get(phone);
                    if (existing && existing.expiresAt > Date.now() - 60000) {
                        throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.VERIFY_CODE_TOO_FREQUENT, '验证码发送过于频繁，请 60 秒后重试');
                    }
                    code = Math.floor(100000 + Math.random() * 900000).toString();
                    // 存储验证码（5 分钟有效）
                    this.verifyCodeStore.set(phone, {
                        code: code,
                        expiresAt: Date.now() + 5 * 60 * 1000,
                    });
                    // TODO: 接入短信服务发送验证码
                    this.logger.log("[\u9A8C\u8BC1\u7801] \u624B\u673A\u53F7: ".concat(phone, ", \u9A8C\u8BC1\u7801: ").concat(code));
                    return [2 /*return*/, { message: '验证码已发送' }];
                });
            });
        };
        /**
         * 手机号验证码登录
         *
         * 验证手机号和验证码，如果手机号未注册则自动创建用户。
         */
        AuthService_1.prototype.phoneLogin = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, code, stored, user, randomPassword, nickname, email, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            phone = dto.phone, code = dto.code;
                            stored = this.verifyCodeStore.get(phone);
                            if (!stored) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.VERIFY_CODE_INVALID, '请先获取验证码');
                            }
                            if (stored.expiresAt < Date.now()) {
                                this.verifyCodeStore.delete(phone);
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.VERIFY_CODE_EXPIRED, '验证码已过期，请重新获取');
                            }
                            if (stored.code !== code) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.VERIFY_CODE_INVALID, '验证码错误');
                            }
                            // 验证通过，删除验证码
                            this.verifyCodeStore.delete(phone);
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { phone: phone },
                                })];
                        case 1:
                            user = _a.sent();
                            if (!!user) return [3 /*break*/, 4];
                            return [4 /*yield*/, bcrypt.hash(Math.random().toString(36).slice(-10), 10)];
                        case 2:
                            randomPassword = _a.sent();
                            nickname = "\u7528\u6237".concat(phone.slice(-4));
                            email = "".concat(phone, "@phone.local");
                            return [4 /*yield*/, this.prisma.user.create({
                                    data: {
                                        email: email,
                                        phone: phone,
                                        nickname: nickname,
                                        password: randomPassword,
                                    },
                                })];
                        case 3:
                            user = _a.sent();
                            _a.label = 4;
                        case 4:
                            tokens = this.generateTokens(user.id, user.email);
                            return [2 /*return*/, __assign(__assign({}, tokens), { user: {
                                        id: user.id,
                                        email: user.email,
                                        nickname: user.nickname,
                                        avatar: user.avatar,
                                    } })];
                    }
                });
            });
        };
        /**
         * 刷新 Token
         *
         * 使用刷新 Token 获取新的 Token 对。
         */
        AuthService_1.prototype.refreshToken = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, user, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            payload = this.jwtService.verify(refreshToken, {
                                secret: this.configService.get('jwt.refreshSecret'),
                            });
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: payload.sub },
                                })];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.USER_NOT_FOUND, '用户不存在');
                            }
                            return [2 /*return*/, this.generateTokens(user.id, user.email)];
                        case 2:
                            _a = _b.sent();
                            throw new business_exception_1.BusinessException(error_codes_1.ErrorCode.REFRESH_TOKEN_EXPIRED, '刷新 Token 无效或已过期');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 生成 Access Token 和 Refresh Token
         */
        AuthService_1.prototype.generateTokens = function (userId, email) {
            var payload = { sub: userId, email: email };
            var accessToken = this.jwtService.sign(payload, {
                secret: this.configService.get('jwt.secret'),
                expiresIn: this.configService.get('jwt.expiresIn'),
            });
            var refreshToken = this.jwtService.sign(payload, {
                secret: this.configService.get('jwt.refreshSecret'),
                expiresIn: this.configService.get('jwt.refreshExpiresIn'),
            });
            return { accessToken: accessToken, refreshToken: refreshToken };
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
