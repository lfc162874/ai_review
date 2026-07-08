/**
 * 复盘智能体
 *
 * 通过 Prompt 引导 AI 对用户复盘内容进行结构化分析，
 * 生成包含概述、成就、问题、分析、成长、下一步的结构化总结。
 */
import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai.service';

/** AI 总结结构 */
export interface ReviewSummary {
  overview: string;
  achievements: string[];
  problems: string[];
  analysis: string;
  growth: string;
  nextSteps: string[];
}

@Injectable()
export class ReviewAgent {
  private readonly logger = new Logger(ReviewAgent.name);

  constructor(private readonly aiService: AiService) {}

  /**
   * 生成复盘总结
   *
   * @param content - 用户复盘原始内容
   * @returns 结构化总结
   */
  async generateSummary(content: string): Promise<ReviewSummary> {
    const systemPrompt = `你是一个专业的复盘教练。请根据用户的复盘内容，进行结构化分析并生成总结。

请严格按以下 JSON 格式输出，不要输出其他内容：
{
  "overview": "一句话概括本次复盘的核心内容",
  "achievements": ["成就1", "成就2"],
  "problems": ["问题1", "问题2"],
  "analysis": "对问题的深入分析，找出根本原因",
  "growth": "从本次经历中获得的成长和收获",
  "nextSteps": ["下一步行动1", "下一步行动2"]
}`;

    const result = await this.aiService.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content },
    ], { temperature: 0.7 });

    try {
      // 尝试从返回内容中提取 JSON
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('无法解析 AI 返回内容');
    } catch (error) {
      this.logger.error(`复盘总结解析失败: ${error}`);
      // 返回默认结构
      return {
        overview: result.content.slice(0, 100),
        achievements: [],
        problems: [],
        analysis: '总结解析失败，请重试',
        growth: '',
        nextSteps: [],
      };
    }
  }
}
