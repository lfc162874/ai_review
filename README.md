# AI Review

AI 复盘助手。

## 产品定位

通过语音/对话方式完成周期复盘：

- 周复盘
- 月复盘
- 年度复盘
- 项目阶段复盘

核心流程：

用户输入 → AI追问 → AI总结 → 复盘档案 → 成长动态

## 项目结构

```
ai_review
├── ai-review-app       # 前端应用
├── ai-review-server    # NestJS + TypeScript 后端
├── ai-review-ai        # AI能力模块
└── docs                # 产品和技术文档
```

## 技术栈

Backend:
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Redis
- WebSocket

AI:
- Agent
- LLM
- ASR
- Memory
