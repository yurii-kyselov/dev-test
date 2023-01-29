import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { IObject } from '../types/common.types';
import { FastifyReply } from 'fastify';

@Catch()
export class ExceptionTransformFilter implements ExceptionFilter {
  catch(error: IObject, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: FastifyReply = context.getResponse();

    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = Array.isArray(error?.response?.message)
      ? error?.response?.message[0]
      : error?.response?.message || error?.message;

    response.status(status);
    const headers = response.getHeaders();
    if (!headers['content-type'])
      response.send({ requestObject: null, message: errorMessage });
  }
}
