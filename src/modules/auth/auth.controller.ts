import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { Unprotected } from 'nest-keycloak-connect';
import { AuthService } from './auth.service';
import { KeycloakToken } from './models/keycloak-token.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get('/login')
  @Redirect('', 301)
  @Unprotected()
  login() {
    return this._authService.getUrlLogin();
  }

  @Get('callback')
  @Unprotected()
  getAccessToken(@Query('code') code: string) {
    return this._authService.getAccessToken(code);
  }

  @Post('refreshToken')
  @Unprotected()
  refreshAccessToken(@Body('refresh_token') refresh_token: string) {
    return this._authService.refreshAccessToken(refresh_token);
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Body('refresh_token') refresh_token: string) {
    return this._authService.logout(refresh_token);
  }
}
