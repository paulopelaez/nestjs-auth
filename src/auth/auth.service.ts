import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { use } from 'passport';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    // o usuário já chega validado que o email são verdadeiros e correspodem
    // recebe o usuário e transforma em JWT
    delete user.password;
    const payload: UserPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

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
