import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  claimId!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}