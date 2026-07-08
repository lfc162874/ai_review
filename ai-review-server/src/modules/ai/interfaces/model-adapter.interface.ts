/**
 * 模型适配器接口
 *
 * 定义 AI 模型调用的统一接口，支持不同厂商的模型适配。
 */

/** 单条聊天消息 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** AI 模型调用结果 */
export interface ChatCompletionResult {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/** 模型适配器接口 */
export interface ModelAdapter {
  /**
   * 同步调用模型
   */
  chat(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<ChatCompletionResult>;

  /**
   * 流式调用模型
   */
  stream(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<NodeJS.ReadableStream>;
}
