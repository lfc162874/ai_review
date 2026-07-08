/**
 * 用户控制器
 *
 * 提供用户资料查询和更新接口。
 * 所有接口需要 JWT 认证。
 */
import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, JwtUser } from '../../common/decorators';

@ApiTags('用户')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取当前用户信息
   *
   * 返回当前登录用户的公开信息。
   */
  @Get('me')
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({ status: 200, description: '返回当前用户信息' })
  async getProfile(@CurrentUser() user: JwtUser) {
    return this.userService.findById(user.sub);
  }

  /**
   * 更新当前用户信息
   *
   * 支持更新昵称、头像、个性签名。
   */
  @Patch('me')
  @ApiOperation({ summary: '更新当前用户信息' })
  @ApiResponse({ status: 200, description: '更新成功，返回更新后的用户信息' })
  async updateProfile(@CurrentUser() user: JwtUser, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.sub, dto);
  }
}
