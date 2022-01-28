import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UnauthorizedError } from './errors/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(email: string, password: string) {
    // if user exist
    const user = await this.userService.findByEmail(email);
    if (user) {
      // check if password is match
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        //removed password
        delete user.password;

        return {
          ...user,
          //password: undefined,
        };
      }
    }
    // se chegar aqui não encontrou um user ou senha não correspont
    throw new UnauthorizedError(
      'Email address or password provided is incorrect',
    );
    //throw new Error('Method not implemented.');
  }
}
