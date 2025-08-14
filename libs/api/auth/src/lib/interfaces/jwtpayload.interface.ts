import { Role } from "@nextcart/enum";

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}