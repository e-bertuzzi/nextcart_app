export interface JwtPayload {
  email: string;
  sub: string;  // o number se l'id è numerico
  // aggiungi altri campi se li usi nel token
}
