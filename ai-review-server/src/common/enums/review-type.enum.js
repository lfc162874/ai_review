"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewType = void 0;
/**
 * 复盘类型枚举
 *
 * 定义系统支持的复盘周期类型。
 */
var ReviewType;
(function (ReviewType) {
    /** 每日复盘 */
    ReviewType["DAILY"] = "daily";
    /** 每周复盘 */
    ReviewType["WEEKLY"] = "weekly";
    /** 每月复盘 */
    ReviewType["MONTHLY"] = "monthly";
    /** 年度复盘 */
    ReviewType["YEARLY"] = "yearly";
    /** 项目阶段复盘 */
    ReviewType["PROJECT"] = "project";
})(ReviewType || (exports.ReviewType = ReviewType = {}));
