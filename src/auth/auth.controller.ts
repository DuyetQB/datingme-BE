import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(createUserDto.password);
    // Create and save user with hashedPassword
    return { message: 'User created' };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto.username, loginDto.password);
    return { access_token: token };
  }
}
