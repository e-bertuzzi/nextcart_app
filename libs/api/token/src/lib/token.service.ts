import { Injectable } from '@nestjs/common';
import { Token, Tokens } from '@nextcart/models'
import { ConsumerDTO } from '@nextcart/dto';
 
@Injectable()
export class TokenService {

    private cachedTokens: Tokens = {};
    private readonly expireTime = 300 * 1000;
  
    put(key: string, user: ConsumerDTO): Token {
      const now = Date.now();
      const existing = this.cachedTokens[key];
      if (existing?.expiry > now) {
        return existing;
      }
      const newToken: Token = {
        token: key,
        expiry: now + this.expireTime,
        user,
      };
      this.cachedTokens[key] = newToken;
      return newToken;
    }
  
    get(key: string): Token | null {
      const now = Date.now();
      const existing = this.cachedTokens[key];
      if (existing?.expiry > now) {
        return existing;
      }
      return null;
    }
  
    delete(key: string): void {
      const existing = this.cachedTokens[key];
      if (existing) delete this.cachedTokens[key];
    }

}
