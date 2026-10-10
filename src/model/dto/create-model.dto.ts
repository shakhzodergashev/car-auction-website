import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsInt()
  makeId!: number;
}
