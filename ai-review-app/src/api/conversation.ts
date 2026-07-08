import { get, post } from '@/services/request'

export interface ConversationMessage {
  id?: string
  conversationId?: string
  reviewId?: string | null
  role: 'user' | 'assistant'
  content: string
  createdAt?: string
}

export interface Conversation {
  id: string
  userId: string
  reviewId: string | null
  title: string
  status: 'active' | 'closed'
  createdAt: string
  updatedAt: string
  messages?: ConversationMessage[]
}

export interface CreateConversationDto {
  reviewId?: string
  title?: string
}

export interface SendMessageDto {
  content: string
}

export interface PaginatedList<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export const conversationApi = {
  /** 创建对话会话 */
  create(data: CreateConversationDto) {
    return post<Conversation>('/conversations', data)
  },

  /** 查询会话列表 */
  list(params?: { page?: number; pageSize?: number }) {
    return get<PaginatedList<Conversation>>('/conversations', params)
  },

  /** 发送消息 */
  sendMessage(id: string, data: SendMessageDto) {
    return post<ConversationMessage>(`/conversations/${id}/messages`, data)
  },

  /** 查询消息历史 */
  messages(id: string, params?: { page?: number; pageSize?: number }) {
    return get<PaginatedList<ConversationMessage>>(`/conversations/${id}/messages`, params)
  },

  /** 关闭对话会话 */
  close(id: string) {
    return post<void>(`/conversations/${id}/close`)
  },
}
