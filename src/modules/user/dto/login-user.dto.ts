import { CreateUserDto } from './create-user.dto';
import { Matches } from 'class-validator';
import {
  userEmailRegex,
  userPasswordRegex,
} from '../../../common/validation/constants/user.constants';

export class LoginUserDto implements CreateUserDto {
  @Matches(userEmailRegex)
  email: string;
  @Matches(userPasswordRegex)
  password: string;
}
