import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiPropertyOptional({
    example: 5.5,
    description: 'Metabolic Equivalent of Task (e.g., 5.5 for light jogging)',
    type: Number,
  })
  MET?: number;

  @ApiPropertyOptional({
    example: 'cardio',
    description: 'General type of activity (e.g., "cardio", "strength")',
  })
  activityType?: string;

  @ApiPropertyOptional({
    example: 'treadmill running',
    description: 'Specific activity performed (e.g., "treadmill", "cycling")',
  })
  specificActivity?: string;
}
