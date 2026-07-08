import { get, post, del } from '@/services/request'

export type ReviewType = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'project'
export type ReviewStatus = 'draft' | 'completed' | 'generating' | 'generated' | 'failed'

export interface ReviewSummary {
  overview: string
  achievements: string[]
  problems: string[]
  analysis: string
  growth: string
  nextSteps: string[]
}

export interface Review {
  id: string
  userId: string
  type: ReviewType
  content: string
  summary: ReviewSummary | null
  status: ReviewStatus
  createdAt: string
  updatedAt: string
}

export interface CreateReviewDto {
  type: ReviewType
  content: string
}

export interface ReviewListParams {
  page?: number
  pageSize?: number
  type?: ReviewType
  status?: ReviewStatus
}

export interface PaginatedList<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export const reviewApi = {
  /** 创建复盘 */
  create(data: CreateReviewDto) {
    return post<Review>('/reviews', data)
  },

  /** 查询复盘列表 */
  list(params?: ReviewListParams) {
    return get<PaginatedList<Review>>('/reviews', params)
  },

  /** 查询复盘详情 */
  detail(id: string) {
    return get<Review>(`/reviews/${id}`)
  },

  /** 删除复盘 */
  remove(id: string) {
    return del<void>(`/reviews/${id}`)
  },

  /** AI 生成复盘总结 */
  generate(id: string) {
    return post<Review>(`/reviews/${id}/generate`)
  },
}
