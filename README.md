# AI Review

> AI 驱动的个人成长复盘助手

## 产品定位

AI Review 不是简单的日记工具，而是通过 **语音 / 对话 / AI Agent** 帮助用户完成：

- 周复盘
- 月复盘
- 年度复盘
- 项目阶段复盘
- 成长轨迹沉淀

核心理念：

```
用户表达
  ↓
AI追问
  ↓
AI分析
  ↓
生成复盘总结
  ↓
形成个人成长档案
  ↓
分享成长动态
```

## 项目结构

```
ai_review
│
├── ai-review-app          # 前端应用
│
├── ai-review-server       # TS后端服务
│   ├── NestJS
│   ├── Prisma
│   ├── PostgreSQL
│   ├── Redis
│   └── WebSocket
│
├── ai-review-ai           # AI能力模块
│   ├── Agent
│   ├── Prompt
│   ├── Memory
│   └── Model Adapter
│
├── docs                   # 产品和技术文档
│
└── docker-compose.yml
```

## 技术栈

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- WebSocket

### AI

- LLM
- Agent
- Prompt Engineering
- Memory
- ASR Speech Recognition

## 核心模块

### Review
复盘核心流程。

### Conversation
AI 对话引擎。

### Voice
语音输入与转写。

### Memory
用户长期成长记忆。

### Moment
类似朋友圈的成长动态。

## Development

后续将逐步实现：

1. 用户体系
2. AI复盘流程
3. 语音复盘
4. 复盘档案
5. 成长动态社区
