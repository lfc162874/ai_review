/**
 * 复盘控制器
 *
 * 提供复盘记录的创建、查询、删除、AI 总结生成等接口。
 * 所有接口需要 JWT 认证。
 */
import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto, QueryReviewDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, JwtUser } from '../../common/decorators';

@ApiTags('复盘')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /**
   * 创建复盘
   */
  @Post()
  @ApiOperation({ summary: '创建复盘' })
  @ApiResponse({ status: 200, description: '创建成功' })
  async create(@CurrentUser() user: JwtUser, @Body() dto: CreateReviewDto) {
    return this.reviewService.create(user.sub, dto);
  }

  /**
   * 查询复盘列表
   */
  @Get()
  @ApiOperation({ summary: '查询复盘列表' })
  @ApiResponse({ status: 200, description: '返回分页复盘列表' })
  async list(@CurrentUser() user: JwtUser, @Query() query: QueryReviewDto) {
    return this.reviewService.list(user.sub, query);
  }

  /**
   * 查询复盘详情
   */
  @Get(':id')
  @ApiOperation({ summary: '查询复盘详情' })
  @ApiResponse({ status: 200, description: '返回复盘详情' })
  async findById(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.reviewService.findById(user.sub, id);
  }

  /**
   * 删除复盘
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除复盘' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async delete(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.reviewService.delete(user.sub, id);
  }

  /**
   * AI 生成复盘总结
   */
  @Post(':id/generate')
  @ApiOperation({ summary: 'AI 生成复盘总结', description: '调用 AI 分析复盘内容，生成结构化总结' })
  @ApiResponse({ status: 200, description: '生成成功，返回更新后的复盘记录' })
  async generate(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.reviewService.generateSummary(user.sub, id);
  }
}
