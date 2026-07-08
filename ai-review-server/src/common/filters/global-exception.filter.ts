/**
 * 全局异常过滤器
 *
 * 捕获所有异常，统一返回格式：{ code, message, data: null }
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { BusinessException } from '../exception/business.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let code = 10000;
    let message = '服务器内部错误';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof BusinessException) {
      code = exception.getCode();
      message = exception.getErrorMessage();
      status = HttpStatus.OK;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'object' && res !== null) {
        message = (res as any).message || exception.message;
      } else {
        message = exception.message;
      }
      // 参数校验失败
      if (status === HttpStatus.BAD_REQUEST) {
        code = 10001;
      } else if (status === HttpStatus.UNAUTHORIZED) {
        code = 10002;
      } else if (status === HttpStatus.FORBIDDEN) {
        code = 10003;
      } else if (status === HttpStatus.NOT_FOUND) {
        code = 10004;
      } else {
        code = 10000;
      }
    }

    this.logger.error(
      `异常捕获: ${message} (code: ${code})`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json({
      code,
      message,
      data: null,
    });
  }
}
