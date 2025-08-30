// services/product-warnings.service.ts
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CartItemWarning } from '@nextcart/enum';

export class ProductWarningsService {
  async fetchWarnings(consumerId?: number, productId?: string): Promise<CartItemWarning[]> {
    try {
      const res = await api.get<{ compatible: boolean }>(
        `/compatibility/${consumerId}/${productId}`
      );
      return res.data.compatible
        ? [CartItemWarning.NONE]
        : [CartItemWarning.NOT_COMPATIBLE_WITH_DIET]; // puoi mappare warning più dettagliati se l'API li fornisce
    } catch (err) {
      console.error(err);
      return [CartItemWarning.NONE]; // fallback
    }
  }
}
