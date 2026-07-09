/**
 * 应用根模块
 *
 * 注册所有子模块和全局配置。
 * ConfigModule 和 DatabaseModule 设置为全局可用。
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './common/config/app.config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ReviewModule } from './modules/review/review.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    // 全局配置模块，加载 .env 文件
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
    }),

    // 数据库模块（全局）
    DatabaseModule,

    // 业务模块
    AuthModule,
    UserModule,
    ReviewModule,
    ConversationModule,
    AiModule,
  ],
})
export class AppModule {}
