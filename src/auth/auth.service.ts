import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { db } from '../prisma/db.js';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
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

    return {
      message: 'Login successful',
      userId: user.id,
    };
  }
}
