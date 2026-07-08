/**
 * 认证服务
 *
 * 处理用户注册、邮箱密码登录、手机号验证码登录、Token 刷新。
 */
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../database/database.service';
import { BusinessException } from '../../common/exception/business.exception';
import { ErrorCode } from '../../common/exception/error-codes';
import { RegisterDto, LoginDto, PhoneLoginDto, SendVerifyCodeDto } from './dto';

/** Token 对返回类型 */
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

/** 登录返回类型 */
export interface LoginResponse extends TokenResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
    avatar: string | null;
  };
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  /** 验证码存储（内存，生产环境应使用 Redis） */
  private verifyCodeStore = new Map<string, { code: string; expiresAt: number }>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 用户注册
   *
   * 创建新用户并返回 Token 对。
   */
  async register(dto: RegisterDto): Promise<TokenResponse> {
    // 检查邮箱是否已注册
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BusinessException(ErrorCode.EMAIL_ALREADY_REGISTERED, '该邮箱已被注册');
    }

    // 检查手机号是否已注册
    if (dto.phone) {
      const existingPhone = await this.prisma.user.findUnique({
        where: { phone: dto.phone },
      });
      if (existingPhone) {
        throw new BusinessException(ErrorCode.USER_ALREADY_EXISTS, '该手机号已被注册');
      }
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 创建用户
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        nickname: dto.nickname,
        password: hashedPassword,
        phone: dto.phone,
      },
    });

    // 生成 Token
    return this.generateTokens(user.id, user.email);
  }

  /**
   * 邮箱密码登录
   *
   * 验证邮箱和密码，成功后返回 Token 对和用户信息。
   */
  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BusinessException(ErrorCode.USER_NOT_FOUND, '用户不存在');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BusinessException(ErrorCode.PASSWORD_INCORRECT, '密码错误');
    }

    const tokens = this.generateTokens(user.id, user.email);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
      },
    };
  }

  /**
   * 发送手机验证码
   *
   * 生成 6 位随机验证码并存储（当前使用内存，生产环境应使用 Redis + 短信服务）。
   */
  async sendVerifyCode(dto: SendVerifyCodeDto): Promise<{ message: string }> {
    const { phone } = dto;

    // 检查发送频率（60 秒内不能重复发送）
    const existing = this.verifyCodeStore.get(phone);
    if (existing && existing.expiresAt > Date.now() - 60000) {
      throw new BusinessException(ErrorCode.VERIFY_CODE_TOO_FREQUENT, '验证码发送过于频繁，请 60 秒后重试');
    }

    // 生成 6 位随机验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 存储验证码（5 分钟有效）
    this.verifyCodeStore.set(phone, {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    // TODO: 接入短信服务发送验证码
    this.logger.log(`[验证码] 手机号: ${phone}, 验证码: ${code}`);

    return { message: '验证码已发送' };
  }

  /**
   * 手机号验证码登录
   *
   * 验证手机号和验证码，如果手机号未注册则自动创建用户。
   */
  async phoneLogin(dto: PhoneLoginDto): Promise<LoginResponse> {
    const { phone, code } = dto;

    // 验证验证码
    const stored = this.verifyCodeStore.get(phone);
    if (!stored) {
      throw new BusinessException(ErrorCode.VERIFY_CODE_INVALID, '请先获取验证码');
    }
    if (stored.expiresAt < Date.now()) {
      this.verifyCodeStore.delete(phone);
      throw new BusinessException(ErrorCode.VERIFY_CODE_EXPIRED, '验证码已过期，请重新获取');
    }
    if (stored.code !== code) {
      throw new BusinessException(ErrorCode.VERIFY_CODE_INVALID, '验证码错误');
    }

    // 验证通过，删除验证码
    this.verifyCodeStore.delete(phone);

    // 查找用户，不存在则自动注册
    let user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      // 自动注册：使用随机密码，手机号作为邮箱占位
      const randomPassword = await bcrypt.hash(Math.random().toString(36).slice(-10), 10);
      const nickname = `用户${phone.slice(-4)}`;
      const email = `${phone}@phone.local`;

      user = await this.prisma.user.create({
        data: {
          email,
          phone,
          nickname,
          password: randomPassword,
        },
      });
    }

    const tokens = this.generateTokens(user.id, user.email);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
      },
    };
  }

  /**
   * 刷新 Token
   *
   * 使用刷新 Token 获取新的 Token 对。
   */
  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });

      // 验证用户是否仍然存在
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new BusinessException(ErrorCode.USER_NOT_FOUND, '用户不存在');
      }

      return this.generateTokens(user.id, user.email);
    } catch {
      throw new BusinessException(ErrorCode.REFRESH_TOKEN_EXPIRED, '刷新 Token 无效或已过期');
    }
  }

  /**
   * 生成 Access Token 和 Refresh Token
   */
  private generateTokens(userId: string, email: string): TokenResponse {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn: this.configService.get<string>('jwt.expiresIn') as any,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>('jwt.refreshExpiresIn') as any,
    });

    return { accessToken, refreshToken };
  }
}
