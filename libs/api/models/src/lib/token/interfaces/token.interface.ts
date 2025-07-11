import { ConsumerDTO } from '@nextcart/dto'

export interface Token {
  token: string;
  expiry: number;
  user: ConsumerDTO;
}