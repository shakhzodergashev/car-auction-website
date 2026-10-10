import { Injectable } from '@nestjs/common';
import { CreateMakeDto } from './dto/create-make.dto.js';
import { db } from '../prisma/db.js';

@Injectable()
export class MakeService {
  async createMake(createMakeDto: CreateMakeDto) {
    const newMake = await db.orm.public.Make.create({
      name: createMakeDto.name,
    });
    return newMake;
  }
}
