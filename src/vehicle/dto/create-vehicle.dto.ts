import { IsString, IsNotEmpty, IsInt, Min, Max, IsEnum } from 'class-validator';

enum Transmission {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}
export class CreateVehicleDto {
  @IsInt()
  @Min(1886)
  @Max(new Date().getFullYear() + 1)
  year!: number;

  @IsNotEmpty()
  @IsString()
  vin!: string;

  @IsNotEmpty()
  @IsString()
  color!: string;

  @IsInt()
  @Min(0)
  @Max(10000000)
  mileage!: number;

  @IsEnum(Transmission)
  transmission!: Transmission;

  @IsNotEmpty()
  @IsInt()
  modelId!: number;
}
