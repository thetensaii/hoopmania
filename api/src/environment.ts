export const Environment = {
  HOST: process.env.HOST,
  PORT: Number(process.env.PORT),
  WEBAPP_URL: process.env.WEBAPP_URL,
  DB_FILENAME: process.env.DB_FILENAME
} as const