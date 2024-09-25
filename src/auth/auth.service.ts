import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async login(username: string, password: string): Promise<string> {
    // Assuming you have a method to find user by username
    const user = await this.findUserByUsername(username);

    if (user && await this.comparePasswords(password, user.password)) {
      const payload = { username: user.username, sub: user.id };
      return this.jwtService.sign(payload);
    }
    throw new Error('Invalid credentials');
  }

  async findUserByUsername(username: string) {
    return {
      username: 'sss',
      password: 'password',
      id: 'password',
    }
  }
}
