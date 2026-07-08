/**
 * 复盘类型枚举
 *
 * 定义系统支持的复盘周期类型。
 */
export enum ReviewType {
  /** 每日复盘 */
  DAILY = 'daily',
  /** 每周复盘 */
  WEEKLY = 'weekly',
  /** 每月复盘 */
  MONTHLY = 'monthly',
  /** 年度复盘 */
  YEARLY = 'yearly',
  /** 项目阶段复盘 */
  PROJECT = 'project',
}
