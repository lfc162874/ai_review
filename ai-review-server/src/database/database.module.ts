/**
 * 数据库模块
 *
 * 全局注册 PrismaService，提供数据库访问能力。
 */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
