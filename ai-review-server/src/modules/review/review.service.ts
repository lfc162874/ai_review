/**
 * 复盘服务
 *
 * 处理复盘记录的创建、查询、删除和 AI 总结生成。
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/database.service';
import { BusinessException } from '../../common/exception/business.exception';
import { ErrorCode } from '../../common/exception/error-codes';
import { ReviewAgent } from '../ai/agents/review-agent';
import { CreateReviewDto, QueryReviewDto } from './dto';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly reviewAgent: ReviewAgent,
  ) {}

  /**
   * 创建复盘记录
   */
  async create(userId: string, dto: CreateReviewDto) {
    return this.prisma.reviewRecord.create({
      data: {
        userId,
        type: dto.type,
        content: dto.content,
        status: 'draft',
      },
    });
  }

  /**
   * 查询复盘列表（分页）
   */
  async list(userId: string, query: QueryReviewDto) {
    const where: Record<string, unknown> = { userId };
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;

    const [list, total] = await Promise.all([
      this.prisma.reviewRecord.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: query.offset,
        take: query.pageSize,
      }),
      this.prisma.reviewRecord.count({ where }),
    ]);

    return { list, total, page: query.page, pageSize: query.pageSize };
  }

  /**
   * 查询复盘详情
   */
  async findById(userId: string, id: string) {
    const review = await this.prisma.reviewRecord.findFirst({
      where: { id, userId },
    });

    if (!review) {
      throw new BusinessException(ErrorCode.REVIEW_NOT_FOUND, '复盘记录不存在');
    }

    return review;
  }

  /**
   * 删除复盘记录
   */
  async delete(userId: string, id: string) {
    const review = await this.prisma.reviewRecord.findFirst({
      where: { id, userId },
    });

    if (!review) {
      throw new BusinessException(ErrorCode.REVIEW_NOT_FOUND, '复盘记录不存在');
    }

    await this.prisma.reviewRecord.delete({ where: { id } });
    return null;
  }

  /**
   * AI 生成复盘总结
   */
  async generateSummary(userId: string, id: string) {
    const review = await this.prisma.reviewRecord.findFirst({
      where: { id, userId },
    });

    if (!review) {
      throw new BusinessException(ErrorCode.REVIEW_NOT_FOUND, '复盘记录不存在');
    }

    if (review.status === 'generating') {
      throw new BusinessException(ErrorCode.REVIEW_GENERATING, '复盘总结正在生成中，请稍后再试');
    }

    // 更新状态为生成中
    await this.prisma.reviewRecord.update({
      where: { id },
      data: { status: 'generating' },
    });

    try {
      const summary = await this.reviewAgent.generateSummary(review.content);

      // 更新总结内容和状态
      const updated = await this.prisma.reviewRecord.update({
        where: { id },
        data: {
          summary: summary as any,
          status: 'generated',
        },
      });

      this.logger.log(`复盘总结生成成功: ${id}`);
      return updated;
    } catch (error) {
      // 更新状态为失败
      await this.prisma.reviewRecord.update({
        where: { id },
        data: { status: 'failed' },
      });

      this.logger.error(`复盘总结生成失败: ${id}, ${error}`);
      throw new BusinessException(ErrorCode.AI_GENERATE_FAILED, 'AI 总结生成失败，请重试');
    }
  }
}
