"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 应用配置
 *
 * 读取环境变量中的配置项，提供默认值。
 */
exports.default = (function () { return ({
    port: parseInt(process.env.PORT, 10) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
        url: process.env.DATABASE_URL,
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    },
    ai: {
        provider: process.env.AI_PROVIDER || 'openai',
        apiKey: process.env.AI_API_KEY || '',
        model: process.env.AI_MODEL || 'gpt-4o',
        baseUrl: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
        timeout: parseInt(process.env.AI_TIMEOUT, 10) || 30000,
    },
}); });
