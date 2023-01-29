import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Matches, MaxLength } from 'class-validator';
import { userPasswordRegex } from '../../../common/validation/constants/user.constants';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Matches(userPasswordRegex)
  oldPassword: string;

  @MaxLength(64)
  @Matches(userPasswordRegex)
  newPassword: string;
}
