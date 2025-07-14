export const jwtConstants = {
  secret: process.env["JWT_SECRET"] as string,
  accessTokenExpiration: process.env["JWT_ACCESS_TOKEN_EXPIRATION"] || '15m',
  refreshTokenExpiration: process.env["JWT_REFRESH_TOKEN_EXPIRATION"] || '7d',
};
  