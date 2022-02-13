import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './modules/auth/decorators/current-user.decorator';
import { TokenUser } from './modules/auth/decorators/current_user.decorator';
import { UserPayload } from './modules/auth/entities/userPayload.entity';
import { User } from './modules/user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  infoUser(@TokenUser() user: UserPayload) {
    return user;
  }

  @Get('me')
  getme(@TokenUser() user: User) {
    return user;
  }
}
