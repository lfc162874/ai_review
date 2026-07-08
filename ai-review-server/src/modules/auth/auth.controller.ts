/**
 * 认证控制器
 *
 * 提供用户注册、邮箱登录、手机号登录、发送验证码、刷新 Token 等接口。
 */
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, PhoneLoginDto, SendVerifyCodeDto, RefreshTokenDto } from './dto';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 用户注册
   *
   * 使用邮箱和密码注册新用户，注册成功后返回 Token 对。
   */
  @Post('register')
  @ApiOperation({ summary: '用户注册', description: '使用邮箱和密码注册新用户' })
  @ApiResponse({ status: 200, description: '注册成功，返回 Token 对' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * 邮箱密码登录
   *
   * 使用邮箱和密码登录，成功后返回 Token 对和用户信息。
   */
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: '邮箱密码登录', description: '使用邮箱和密码登录' })
  @ApiResponse({ status: 200, description: '登录成功，返回 Token 对和用户信息' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * 发送手机验证码
   *
   * 向指定手机号发送 6 位数字验证码。
   */
  @Post('send-code')
  @ApiOperation({ summary: '发送手机验证码', description: '向指定手机号发送 6 位验证码' })
  @ApiResponse({ status: 200, description: '发送成功' })
  async sendCode(@Body() dto: SendVerifyCodeDto) {
    return this.authService.sendVerifyCode(dto);
  }

  /**
   * 手机号验证码登录
   *
   * 使用手机号和验证码登录，未注册的手机号自动创建用户。
   */
  @Post('phone-login')
  @HttpCode(200)
  @ApiOperation({ summary: '手机号验证码登录', description: '使用手机号和验证码登录，未注册自动创建用户' })
  @ApiResponse({ status: 200, description: '登录成功，返回 Token 对和用户信息' })
  async phoneLogin(@Body() dto: PhoneLoginDto) {
    return this.authService.phoneLogin(dto);
  }

  /**
   * 刷新 Token
   *
   * 使用刷新 Token 获取新的 Token 对。
   */
  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: '刷新 Token', description: '使用刷新 Token 获取新的 Token 对' })
  @ApiResponse({ status: 200, description: '刷新成功，返回新的 Token 对' })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }
}
