/**
 * 对话服务
 *
 * 管理对话会话、消息发送和历史查询。
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/database.service';
import { BusinessException } from '../../common/exception/business.exception';
import { ErrorCode } from '../../common/exception/error-codes';
import { AiService } from '../ai/ai.service';
import { PaginationDto } from '../../common/dto';
import { CreateConversationDto, SendMessageDto, QueryMessagesDto } from './dto';

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  /**
   * 创建对话会话
   *
   * 创建新会话并自动发送 AI 引导消息。
   */
  async createConversation(userId: string, dto: CreateConversationDto) {
    const conversation = await this.prisma.conversation.create({
      data: {
        userId,
        reviewId: dto.reviewId,
        title: dto.title || '新对话',
        status: 'active',
      },
    });

    // AI 发送引导消息
    const aiMessage = await this.prisma.conversationMessage.create({
      data: {
        conversationId: conversation.id,
        reviewId: dto.reviewId,
        role: 'assistant',
        content: '你好！我是你的复盘教练。让我们来一起回顾一下，你今天完成了哪些事情呢？',
      },
    });

    return {
      ...conversation,
      messages: [aiMessage],
    };
  }

  /**
   * 发送消息并获取 AI 回复
   */
  async sendMessage(userId: string, conversationId: string, dto: SendMessageDto) {
    // 验证会话归属
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, userId },
    });

    if (!conversation) {
      throw new BusinessException(ErrorCode.CONVERSATION_NOT_FOUND, '对话会话不存在');
    }

    if (conversation.status === 'closed') {
      throw new BusinessException(ErrorCode.CONVERSATION_CLOSED, '对话会话已关闭');
    }

    // 保存用户消息
    await this.prisma.conversationMessage.create({
      data: {
        conversationId,
        reviewId: conversation.reviewId,
        role: 'user',
        content: dto.content,
      },
    });

    // 加载历史上下文（最近 20 条）
    const history = await this.prisma.conversationMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      take: 20,
    });

    const messages = history.map((msg) => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    }));

    // 调用 AI 生成回复
    const aiResult = await this.aiService.chat(messages);

    // 保存 AI 回复
    const aiMessage = await this.prisma.conversationMessage.create({
      data: {
        conversationId,
        reviewId: conversation.reviewId,
        role: 'assistant',
        content: aiResult.content,
      },
    });

    // 更新会话时间
    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return aiMessage;
  }

  /**
   * 查询消息历史（分页）
   */
  async getMessages(userId: string, conversationId: string, query: QueryMessagesDto) {
    // 验证会话归属
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, userId },
    });

    if (!conversation) {
      throw new BusinessException(ErrorCode.CONVERSATION_NOT_FOUND, '对话会话不存在');
    }

    const [list, total] = await Promise.all([
      this.prisma.conversationMessage.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
        skip: query.offset,
        take: query.pageSize,
      }),
      this.prisma.conversationMessage.count({ where: { conversationId } }),
    ]);

    return { list, total, page: query.page, pageSize: query.pageSize };
  }

  /**
   * 查询会话列表（分页）
   */
  async listConversations(userId: string, query: PaginationDto) {
    const where = { userId };

    const [list, total] = await Promise.all([
      this.prisma.conversation.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: query.offset,
        take: query.pageSize,
      }),
      this.prisma.conversation.count({ where }),
    ]);

    return { list, total, page: query.page, pageSize: query.pageSize };
  }

  /**
   * 关闭对话会话
   */
  async closeConversation(userId: string, conversationId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, userId },
    });

    if (!conversation) {
      throw new BusinessException(ErrorCode.CONVERSATION_NOT_FOUND, '对话会话不存在');
    }

    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { status: 'closed' },
    });

    return null;
  }
}
