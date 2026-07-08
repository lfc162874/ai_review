"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
/**
 * 当前用户装饰器
 *
 * 从 JWT Token 中提取当前登录用户信息。
 */
var common_1 = require("@nestjs/common");
/**
 * 获取当前登录用户装饰器
 *
 * @example
 * ```typescript
 * @Get('me')
 * async getProfile(@CurrentUser() user: JwtUser) {
 *   return this.userService.findById(user.sub);
 * }
 * ```
 */
exports.CurrentUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.user;
});
