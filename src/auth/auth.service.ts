import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { db } from '../prisma/db.js';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(loginData: LoginDto) {
    const users = await db.orm.public.User.where({
      email: loginData.email,
    }).all();

    const user = users[0];

    if (!user) {
      throw new NotFoundException('There is no user with such email');
    }

    const passwordMatches = await bcrypt.compare(
      loginData.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      accessToken,
    };
  }
}
