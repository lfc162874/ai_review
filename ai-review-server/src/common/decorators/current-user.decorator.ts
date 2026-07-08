/**
 * 当前用户装饰器
 *
 * 从 JWT Token 中提取当前登录用户信息。
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * JWT Payload 中的用户信息
 */
export interface JwtUser {
  /** 用户 ID */
  sub: string;
  /** 用户邮箱 */
  email: string;
}

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
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
