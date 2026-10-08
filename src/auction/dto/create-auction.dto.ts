import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAuctionDto {
  @IsDateString()
  @IsNotEmpty()
  startTime!: string;

  @IsDateString()
  @IsNotEmpty()
  endTime!: string;

  @IsInt()
  @IsNotEmpty()
  vehicleId!: number;

  @IsInt()
  @IsNotEmpty()
  startingPrice!: number;
}