import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmailDto } from './dto/user-email.dto';
import bcrypt from 'bcrypt';
import { DateTime } from 'luxon';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}
  async register(createUserData: CreateUserDto): Promise<UserEmailDto> {
    const userToSave = this.userRepository.create({
      ...createUserData,
      email: createUserData.email.toLowerCase(),
    });

    try {
      const { email } = await this.userRepository.save(userToSave);

      return { email };
    } catch (e) {
      throw e;
    }
  }

  async login(loginUserData: LoginUserDto): Promise<UserEmailDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserData.email.toLowerCase() },
    });

    if (!user) throw new ForbiddenException('Wrong credentials!');

    await this.verifyPassword(user, loginUserData.password);

    if (user.updatedAt < DateTime.local().minus({ days: 180 }).toJSDate()) {
      return { email: user.email, message: 'You must update an email!' };
    }

    return { email: user.email };
  }

  async changePassword(email: string, updateUserData: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserData;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    await this.verifyPassword(user, oldPassword);

    if (oldPassword === newPassword)
      throw new ForbiddenException('Passwords must not be the same!');

    await this.userRepository.update(
      { email },
      { password: await bcrypt.hash(newPassword, 10) },
    );
  }

  private async verifyPassword(user: User, passwordToVerify): Promise<void> {
    const match = await bcrypt.compare(passwordToVerify, user.password);

    if (!match) throw new ForbiddenException('Wrong credentials!');
  }
}
