"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRole = void 0;
/**
 * 对话角色枚举
 *
 * 标识对话消息的发送者角色。
 */
var MessageRole;
(function (MessageRole) {
    /** 用户消息 */
    MessageRole["USER"] = "user";
    /** AI 助手消息 */
    MessageRole["ASSISTANT"] = "assistant";
    /** 系统消息 */
    MessageRole["SYSTEM"] = "system";
})(MessageRole || (exports.MessageRole = MessageRole = {}));
