import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    try {

      const user: User | null = await this.findOneByUsername(username);
      console.log('User:', user);
      if (user && await this.validatePassword(password, user.password)) {
        const payload: JwtPayload = { sub: user.id, username: user.username };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      console.log(error);

    }

  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);

  }
}
