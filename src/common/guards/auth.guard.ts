import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: FastifyRequest = context.switchToHttp().getRequest();

    const data = request.session.get('userData');

    if (!data) throw new UnauthorizedException('Unauthorized!');

    return true;
  }
}
