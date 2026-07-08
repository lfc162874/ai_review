/**
 * 对话控制器
 *
 * 提供对话会话管理、消息发送、历史查询等接口。
 * 所有接口需要 JWT 认证。
 */
import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConversationService } from './conversation.service';
import { CreateConversationDto, SendMessageDto, QueryMessagesDto } from './dto';
import { PaginationDto } from '../../common/dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, JwtUser } from '../../common/decorators';

@ApiTags('对话')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  /**
   * 创建对话会话
   */
  @Post()
  @ApiOperation({ summary: '创建对话会话' })
  @ApiResponse({ status: 200, description: '创建成功，返回会话信息和 AI 首条消息' })
  async create(@CurrentUser() user: JwtUser, @Body() dto: CreateConversationDto) {
    return this.conversationService.createConversation(user.sub, dto);
  }

  /**
   * 查询会话列表
   */
  @Get()
  @ApiOperation({ summary: '查询会话列表' })
  @ApiResponse({ status: 200, description: '返回分页会话列表' })
  async list(@CurrentUser() user: JwtUser, @Query() query: PaginationDto) {
    return this.conversationService.listConversations(user.sub, query);
  }

  /**
   * 发送消息
   */
  @Post(':id/messages')
  @ApiOperation({ summary: '发送消息', description: '发送用户消息并获取 AI 回复' })
  @ApiResponse({ status: 200, description: '返回 AI 的回复消息' })
  async sendMessage(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.conversationService.sendMessage(user.sub, id, dto);
  }

  /**
   * 查询消息历史
   */
  @Get(':id/messages')
  @ApiOperation({ summary: '查询消息历史' })
  @ApiResponse({ status: 200, description: '返回分页消息列表' })
  async getMessages(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Query() query: QueryMessagesDto,
  ) {
    return this.conversationService.getMessages(user.sub, id, query);
  }

  /**
   * 关闭对话会话
   */
  @Post(':id/close')
  @ApiOperation({ summary: '关闭对话会话' })
  @ApiResponse({ status: 200, description: '关闭成功' })
  async close(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.conversationService.closeConversation(user.sub, id);
  }
}
