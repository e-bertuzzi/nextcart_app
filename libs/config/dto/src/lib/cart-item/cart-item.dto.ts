// dto/add-cart-item.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { CartItemWarning } from '@nextcart/enum';

export class AddCartItemDto {
  @ApiProperty({ example: '123-ABC', description: 'ID del prodotto' })
  productId!: string;

  @ApiProperty({ example: 2, description: 'Quantità da aggiungere', default: 1 })
  quantity!: number;

  @ApiProperty({
    example: ['NONE'],
    description: 'Warning associati all\'item',
    isArray: true,
    required: false,
    enum: CartItemWarning,
  })
  warnings?: CartItemWarning[];
}
