import { Controller, Get, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body('username') username: string, @Body('password') password: string) {
    return this.userService.create(username, password);
  }

  @UseGuards(JwtAuthGuard) // Protect this route with the JWT guard
  @Get('profile')
  getProfile(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }
    return req.user; // The user object will be available here
  }
}
