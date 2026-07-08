/**
 * AI 模块
 *
 * 提供 AI 模型调用和智能体能力。
 */
import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { OpenAIAdapter } from './adapters/openai.adapter';
import { ReviewAgent } from './agents/review-agent';

@Module({
  providers: [AiService, OpenAIAdapter, ReviewAgent],
  exports: [AiService, ReviewAgent],
})
export class AiModule {}
