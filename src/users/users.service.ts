import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../prisma/db.js';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto.js';
import bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/create-user.dto/update-user.dto.js';

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

  async patchUsersById(id: string, updateUserDto: UpdateUserDto) {
    const userId = Number(id);

    const users = await db.orm.public.User.where({ id: userId }).all();
    const requestedUser = users[0];

    if (!requestedUser) {
      throw new NotFoundException('There is no user with such id');
    }

    const updateData: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      passwordHash?: string;
    } = {};

    if (updateUserDto.firstName !== undefined) {
      updateData.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName !== undefined) {
      updateData.lastName = updateUserDto.lastName;
    }

    if (updateUserDto.phoneNumber !== undefined) {
      updateData.phoneNumber = updateUserDto.phoneNumber;
    }

    if (updateUserDto.password !== undefined) {
      updateData.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await db.orm.public.User.where({ id: userId }).update(
      updateData,
    );

    if (!user) {
      throw new NotFoundException('There is no user with such id');
    }

    const { passwordHash, ...safeUser } = user;

    return safeUser;
  }

  async deleteUserById(id: string) {
    const userId = Number(id);

    const users = await db.orm.public.User.where({ id: userId }).all();
    const requestedUser = users[0];

    if (!requestedUser) {
      throw new NotFoundException('There is no user with such id');
    }

    const user = await db.orm.public.User.where({ id: userId }).delete();

    return user;
  }
}
