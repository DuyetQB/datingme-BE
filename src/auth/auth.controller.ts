import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(createUserDto.password);
    const newUser = new this.userModel({ username: createUserDto.username, password: hashedPassword });
    newUser.save();

    return { message: 'User created' };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto.username, loginDto.password);
    return { access_token: token };
  }

  @Get('user/:username')
  async getUser(@Param('username') username: string) {
    const user = await this.authService.findOneByUsername(username);
    return user;
  }

}
