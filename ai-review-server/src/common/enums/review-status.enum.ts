/**
 * 复盘状态枚举
 *
 * 表示复盘记录在生命周期中的当前状态。
 */
export enum ReviewStatus {
  /** 草稿，用户正在编辑 */
  DRAFT = 'draft',
  /** 已完成，用户已提交 */
  COMPLETED = 'completed',
  /** AI 正在生成总结 */
  GENERATING = 'generating',
  /** AI 总结已生成 */
  GENERATED = 'generated',
  /** AI 总结生成失败 */
  FAILED = 'failed',
}
