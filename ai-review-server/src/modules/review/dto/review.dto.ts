/**
 * 复盘模块 - 请求 DTO
 *
 * 定义创建、查询、更新复盘等接口的请求参数。
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { PaginationDto } from '../../../common/dto';
import { ReviewType } from '../../../common/enums';

/**
 * 创建复盘请求参数
 */
export class CreateReviewDto {
  /** 复盘类型 */
  @ApiProperty({
    description: '复盘类型',
    enum: ReviewType,
    example: ReviewType.DAILY,
  })
  @IsEnum(ReviewType, { message: '无效的复盘类型' })
  type: ReviewType;

  /** 复盘内容 */
  @ApiProperty({
    description: '复盘内容，支持纯文本，最大 10000 字符',
    maxLength: 10000,
    example: '今天完成了首页的开发，过程中遇到了一些布局问题...',
  })
  @IsString()
  @IsNotEmpty({ message: '复盘内容不能为空' })
  @MaxLength(10000, { message: '复盘内容最多 10000 字符' })
  content: string;
}

/**
 * 查询复盘列表请求参数
 */
export class QueryReviewDto extends PaginationDto {
  /** 按复盘类型筛选 */
  @ApiPropertyOptional({ description: '复盘类型筛选', enum: ReviewType })
  @IsOptional()
  @IsEnum(ReviewType)
  type?: ReviewType;

  /** 按状态筛选 */
  @ApiPropertyOptional({ description: '复盘状态筛选' })
  @IsOptional()
  @IsString()
  status?: string;
}
