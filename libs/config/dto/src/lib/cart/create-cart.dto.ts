import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
  @ApiProperty({ example: 'Spesa settimanale' })
  name!: string;

  @ApiProperty({ example: 1 })
  consumerId!: number;
}