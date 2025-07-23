import { IsDateString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBodyCompositionDto {
  @ApiProperty({
    example: '2025-07-23',
    description: 'Date of the body composition measurement (format: YYYY-MM-DD)',
  })
  @IsDateString()
  date!: string;

  @ApiPropertyOptional({
    example: 70.5,
    description: 'Body weight in kilograms',
  })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({
    example: 175,
    description: 'Height in centimeters',
  })
  @IsOptional()
  @IsNumber()
  height?: number;
}
