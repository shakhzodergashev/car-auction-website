import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../prisma/db.js';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto.js';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async getUsers() {
    const users = await db.orm.public.User.all();

    return users.map(({ passwordHash, ...safeUser }) => safeUser);
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await db.orm.public.User.create({
      email: createUserDto.email,
      username: createUserDto.username,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phoneNumber: createUserDto.phoneNumber,
      passwordHash: hashedPassword,
    });

    const { passwordHash, ...safeUser } = user;

    return safeUser;
  }

  async getUsersById(id) {
    const userId = Number(id);

    const users = await db.orm.public.User.where({ id: userId }).all();
    const requestedUser = users[0];

    if (!requestedUser) {
      throw new NotFoundException('There is no user with such id');
    }
    const { passwordHash, ...safeUser } = requestedUser;
    return safeUser;
  }
}
