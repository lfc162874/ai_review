"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewStatus = void 0;
/**
 * 复盘状态枚举
 *
 * 表示复盘记录在生命周期中的当前状态。
 */
var ReviewStatus;
(function (ReviewStatus) {
    /** 草稿，用户正在编辑 */
    ReviewStatus["DRAFT"] = "draft";
    /** 已完成，用户已提交 */
    ReviewStatus["COMPLETED"] = "completed";
    /** AI 正在生成总结 */
    ReviewStatus["GENERATING"] = "generating";
    /** AI 总结已生成 */
    ReviewStatus["GENERATED"] = "generated";
    /** AI 总结生成失败 */
    ReviewStatus["FAILED"] = "failed";
})(ReviewStatus || (exports.ReviewStatus = ReviewStatus = {}));
