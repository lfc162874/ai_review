/**
 * JWT 策略
 *
 * 从请求头中提取并验证 JWT Token。
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtUser } from '../../../common/decorators';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret') || 'default-secret',
    });
  }

  /**
   * 验证通过后，将 payload 注入到 request.user
   */
  async validate(payload: JwtUser): Promise<JwtUser> {
    return { sub: payload.sub, email: payload.email };
  }
}
