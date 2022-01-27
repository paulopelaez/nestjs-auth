import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindByEmailUserDto extends User {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
