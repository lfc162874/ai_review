/**
 * 认证模块 - 请求 DTO
 *
 * 定义注册、登录、手机号登录、刷新 Token 等接口的请求参数。
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, Matches } from 'class-validator';

/**
 * 用户注册请求参数
 */
export class RegisterDto {
  /** 用户邮箱，用于登录和身份标识 */
  @ApiProperty({ description: '用户邮箱', example: 'user@example.com' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  /** 用户昵称 */
  @ApiProperty({ description: '用户昵称', example: '张三' })
  @IsString()
  @IsNotEmpty({ message: '昵称不能为空' })
  @MinLength(2, { message: '昵称至少 2 个字符' })
  @MaxLength(50, { message: '昵称最多 50 个字符' })
  nickname: string;

  /** 登录密码 */
  @ApiProperty({ description: '登录密码，至少 6 位', example: '123456' })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码至少 6 个字符' })
  @MaxLength(50, { message: '密码最多 50 个字符' })
  password: string;

  /** 手机号（可选） */
  @ApiPropertyOptional({ description: '手机号', example: '13800138000' })
  @IsOptional()
  @IsString()
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone?: string;
}

/**
 * 邮箱密码登录请求参数
 */
export class LoginDto {
  /** 用户邮箱 */
  @ApiProperty({ description: '用户邮箱', example: 'user@example.com' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  /** 登录密码 */
  @ApiProperty({ description: '登录密码', example: '123456' })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

/**
 * 手机号验证码登录请求参数
 */
export class PhoneLoginDto {
  /** 手机号 */
  @ApiProperty({ description: '手机号', example: '13800138000' })
  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  /** 验证码 */
  @ApiProperty({ description: '6 位数字验证码', example: '123456' })
  @IsString()
  @IsNotEmpty({ message: '验证码不能为空' })
  @Matches(/^\d{6}$/, { message: '验证码格式不正确' })
  code: string;
}

/**
 * 发送验证码请求参数
 */
export class SendVerifyCodeDto {
  /** 手机号 */
  @ApiProperty({ description: '手机号', example: '13800138000' })
  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;
}

/**
 * 刷新 Token 请求参数
 */
export class RefreshTokenDto {
  /** 刷新 Token */
  @ApiProperty({ description: '刷新 Token' })
  @IsString()
  @IsNotEmpty({ message: '刷新 Token 不能为空' })
  refreshToken: string;
}
