import { Matches, MaxLength } from 'class-validator';
import {
  userEmailRegex,
  userPasswordRegex,
} from '../../../common/validation/constants/user.constants';

export class CreateUserDto {
  @MaxLength(256)
  @Matches(userEmailRegex)
  email: string;

  @MaxLength(64)
  @Matches(userPasswordRegex)
  password: string;
}
