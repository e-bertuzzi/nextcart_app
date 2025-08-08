import { IsOptional, IsString, Length } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @Length(1, 100)
  productCategoryId!: string;

  @IsOptional()
  @IsString()
  group?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  standardPortion?: string;
}
