import { Controller, Post, Body, Session, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Session as SecureSession } from '@fastify/secure-session';
import { UserEmailDto } from './dto/user-email.dto';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserData: CreateUserDto): Promise<UserEmailDto> {
    return this.userService.register(createUserData);
  }

  @Post('/login')
  async login(
    @Body() loginUserData: LoginUserDto,
    @Session() session: SecureSession,
  ): Promise<UserEmailDto> {
    const data = await this.userService.login(loginUserData);

    session.set('userData', { email: data.email });

    return data;
  }

  @UseGuards(AuthGuard)
  @Post('/user/change-password')
  async changePassword(
    @Body() updateUserDto: UpdateUserDto,
    @Session() session: SecureSession,
  ): Promise<void> {
    const { email } = session.get('userData');

    await this.userService.changePassword(email, updateUserDto);

    session.delete();
  }
}
