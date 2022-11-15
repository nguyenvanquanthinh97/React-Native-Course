import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dto';
import { SignupUserDto } from './dtos/signup-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(@Body() body: SigninUserDto) {
    const { email, password } = body;
    return this.authService.signin(email, password);
  }

  @Post('/signup')
  @Serialize(UserDto)
  signup(@Body() body: SignupUserDto) {
    const { email, password } = body;
    return this.authService.signup(email, password);
  }
}
