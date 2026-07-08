/**
 * 用户服务
 *
 * 提供用户资料查询和更新能力。
 * 不包含认证逻辑（认证由 AuthModule 负责）。
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/database.service';
import { BusinessException } from '../../common/exception/business.exception';
import { ErrorCode } from '../../common/exception/error-codes';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * 根据 ID 查询用户信息
   *
   * 返回用户公开信息，不包含密码等敏感字段。
   *
   * @param userId - 用户 ID
   * @returns 用户公开信息
   * @throws BusinessException 20001 - 用户不存在
   */
  async findById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nickname: true,
        avatar: true,
        bio: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new BusinessException(ErrorCode.USER_NOT_FOUND, '用户不存在');
    }

    return user;
  }

  /**
   * 更新用户信息
   *
   * 支持更新昵称、头像、个性签名。
   *
   * @param userId - 用户 ID
   * @param dto - 更新参数
   * @returns 更新后的用户信息
   * @throws BusinessException 20001 - 用户不存在
   */
  async update(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BusinessException(ErrorCode.USER_NOT_FOUND, '用户不存在');
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        email: true,
        nickname: true,
        avatar: true,
        bio: true,
        createdAt: true,
      },
    });

    this.logger.log(`用户信息更新成功: ${userId}`);
    return updated;
  }
}
