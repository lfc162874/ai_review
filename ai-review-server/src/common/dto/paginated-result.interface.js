"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaginatedResult = buildPaginatedResult;
/**
 * 构建分页结果
 *
 * @param list - 当前页数据列表
 * @param total - 总记录数
 * @param page - 当前页码
 * @param pageSize - 每页条数
 * @returns 分页结果对象
 */
function buildPaginatedResult(list, total, page, pageSize) {
    return { list: list, total: total, page: page, pageSize: pageSize };
}
