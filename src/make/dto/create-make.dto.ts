import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMakeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
