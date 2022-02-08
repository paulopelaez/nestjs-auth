import { Controller, Get } from '@nestjs/common';
import { Roles, Public, Unprotected } from 'nest-keycloak-connect';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@IsPublic()
  //@Unprotected()
  @Get('dev')
  @Roles({ roles: ['dev'] })
  getHello(): string {
    return this.appService.getHello('dev');
  }

  @Get('qa')
  @Roles({ roles: ['qa'] })
  getHello2(): string {
    return this.appService.getHello('qa');
  }

  @Get('example')
  @Roles({ roles: ['qa', 'dev', 'manager'] })
  getHello3(): string {
    return this.appService.getHello('qa');
  }

  @Get('me')
  getme(@CurrentUser() user: User) {
    return user;
  }
}
