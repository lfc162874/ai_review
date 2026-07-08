/**
 * 用户模块 - 请求 DTO
 *
 * 定义用户信息更新接口的请求参数。
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

/**
 * 更新用户信息请求参数
 */
export class UpdateUserDto {
  /** 用户昵称 */
  @ApiPropertyOptional({ description: '用户昵称', example: '李四' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nickname?: string;

  /** 用户头像 URL */
  @ApiPropertyOptional({ description: '用户头像 URL' })
  @IsOptional()
  @IsString()
  avatar?: string;

  /** 个性签名 */
  @ApiPropertyOptional({ description: '个性签名', example: '持续成长中...' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  bio?: string;
}
