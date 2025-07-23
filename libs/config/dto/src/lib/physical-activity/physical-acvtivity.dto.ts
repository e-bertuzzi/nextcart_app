import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString, IsNotEmpty, Min } from 'class-validator';

export class CreatePhysicalActivityDto {
  @ApiProperty({ example: 1, description: 'ID of the activity' })
  @IsInt()
  @IsNotEmpty()
  activityId!: number;

  @ApiProperty({ example: 123, description: 'ID of the consumer/user' })
  @IsInt()
  @IsNotEmpty()
  consumerId!: number;

  @ApiProperty({ example: 'Running', description: 'Description of the specific activity' })
  @IsString()
  @IsNotEmpty()
  specificActivity!: string;

  @ApiProperty({ example: 45, description: 'Duration of the activity in minutes' })
  @IsInt()
  @IsNotEmpty()
  @Min(1) // Duration should be at least 1 minute
  durationMinutes!: number;

  @ApiProperty({ example: '2025-07-23T10:30:00Z', description: 'Date and time of the activity' })
  @IsDateString()
  @IsNotEmpty()
  date!: string;
}
