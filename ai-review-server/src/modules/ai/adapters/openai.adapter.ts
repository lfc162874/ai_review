/**
 * OpenAI Compatible 适配器
 *
 * 兼容 OpenAI API 格式的模型调用，支持 GPT、Qwen、DeepSeek、Ollama 等。
 */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelAdapter, ChatMessage, ChatCompletionResult } from '../interfaces/model-adapter.interface';

@Injectable()
export class OpenAIAdapter implements ModelAdapter {
  private readonly logger = new Logger(OpenAIAdapter.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly model: string;
  private readonly timeout: number;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ai.apiKey') || '';
    this.baseUrl = this.configService.get<string>('ai.baseUrl') || 'https://api.openai.com/v1';
    this.model = this.configService.get<string>('ai.model') || 'gpt-4o';
    this.timeout = this.configService.get<number>('ai.timeout') || 30000;
  }

  /**
   * 同步调用模型
   */
  async chat(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<ChatCompletionResult> {
    const url = `${this.baseUrl}/chat/completions`;

    const body: Record<string, unknown> = {
      model: this.model,
      messages,
      temperature: options?.temperature ?? 0.7,
    };

    if (options?.maxTokens) {
      body.max_tokens = options.maxTokens;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        const error = await response.text();
        this.logger.error(`AI 调用失败: ${response.status} ${error}`);
        throw new Error(`AI 调用失败: ${response.status}`);
      }

      const data = await response.json() as any;
      const choice = data.choices?.[0];

      return {
        content: choice?.message?.content || '',
        usage: data.usage
          ? {
              promptTokens: data.usage.prompt_tokens,
              completionTokens: data.usage.completion_tokens,
              totalTokens: data.usage.total_tokens,
            }
          : undefined,
      };
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * 流式调用模型
   */
  async stream(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<NodeJS.ReadableStream> {
    const url = `${this.baseUrl}/chat/completions`;

    const body: Record<string, unknown> = {
      model: this.model,
      messages,
      stream: true,
      temperature: options?.temperature ?? 0.7,
    };

    if (options?.maxTokens) {
      body.max_tokens = options.maxTokens;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`AI 流式调用失败: ${response.status} ${error}`);
      throw new Error(`AI 流式调用失败: ${response.status}`);
    }

    return response.body as unknown as NodeJS.ReadableStream;
  }
}
