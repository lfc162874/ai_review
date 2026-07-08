/**
 * 对话模块 - 请求 DTO
 *
 * 定义创建对话会话、发送消息等接口的请求参数。
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { PaginationDto } from '../../../common/dto';

/**
 * 创建对话会话请求参数
 */
export class CreateConversationDto {
  /** 关联的复盘记录 ID（可选） */
  @ApiPropertyOptional({ description: '关联的复盘记录 ID' })
  @IsOptional()
  @IsString()
  reviewId?: string;

  /** 会话标题 */
  @ApiPropertyOptional({ description: '会话标题', example: '今日复盘对话' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;
}

/**
 * 发送消息请求参数
 */
export class SendMessageDto {
  /** 消息内容 */
  @ApiProperty({
    description: '消息内容',
    example: '今天完成了首页的开发',
  })
  @IsString()
  @IsNotEmpty({ message: '消息内容不能为空' })
  @MaxLength(5000, { message: '消息内容最多 5000 字符' })
  content: string;
}

/**
 * 查询消息历史请求参数
 */
export class QueryMessagesDto extends PaginationDto {}
