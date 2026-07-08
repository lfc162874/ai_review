/**
 * 业务异常类
 *
 * 统一的业务异常抛出方式，包含自定义错误码和错误消息。
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  /**
   * @param code - 业务错误码，参考错误码规范
   * @param errorMessage - 错误描述信息
   */
  constructor(
    private readonly code: number,
    private readonly errorMessage: string,
  ) {
    super({ code, message: errorMessage }, HttpStatus.OK);
  }

  getCode(): number {
    return this.code;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
