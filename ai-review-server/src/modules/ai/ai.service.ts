/**
 * AI 服务
 *
 * 封装模型适配器调用，提供统一的 AI 调用入口。
 */
import { Injectable, Logger } from '@nestjs/common';
import { BusinessException } from '../../common/exception/business.exception';
import { ErrorCode } from '../../common/exception/error-codes';
import { OpenAIAdapter } from './adapters/openai.adapter';
import { ChatMessage, ChatCompletionResult } from './interfaces/model-adapter.interface';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly adapter: OpenAIAdapter) {}

  /**
   * 同步调用 AI 模型
   */
  async chat(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<ChatCompletionResult> {
    try {
      return await this.adapter.chat(messages, options);
    } catch (error) {
      this.logger.error(`AI 调用失败: ${error}`);
      throw new BusinessException(ErrorCode.AI_SERVICE_UNAVAILABLE, 'AI 服务暂时不可用');
    }
  }

  /**
   * 流式调用 AI 模型
   */
  async stream(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<NodeJS.ReadableStream> {
    try {
      return await this.adapter.stream(messages, options);
    } catch (error) {
      this.logger.error(`AI 流式调用失败: ${error}`);
      throw new BusinessException(ErrorCode.AI_SERVICE_UNAVAILABLE, 'AI 服务暂时不可用');
    }
  }
}
