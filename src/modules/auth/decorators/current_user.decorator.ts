import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthRequest } from '../models/AuthRequest';

export const TokenUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    console.log('request', request);

    return request.user;
  },
);
