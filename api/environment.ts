export const Environment = {
  HOST: process.env.HOST,
  PORT: Number(process.env.PORT),
  WEBAPP_URL: process.env.WEBAPP_URL
} as const