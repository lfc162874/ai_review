/**
 * 分页结果
 *
 * 通用分页响应结构，适用于所有列表查询接口。
 */
export interface PaginatedResult<T> {
  /** 数据列表 */
  list: T[];
  /** 总记录数 */
  total: number;
  /** 当前页码 */
  page: number;
  /** 每页条数 */
  pageSize: number;
}

/**
 * 构建分页结果
 *
 * @param list - 当前页数据列表
 * @param total - 总记录数
 * @param page - 当前页码
 * @param pageSize - 每页条数
 * @returns 分页结果对象
 */
export function buildPaginatedResult<T>(
  list: T[],
  total: number,
  page: number,
  pageSize: number,
): PaginatedResult<T> {
  return { list, total, page, pageSize };
}
