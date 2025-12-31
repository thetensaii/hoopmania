export const Environment = {
  HOST: process.env.HOST,
  PORT: Number(process.env.PORT),
  WEBAPP_URL: process.env.WEBAPP_URL as string,
  DB_FILENAME: process.env.DB_FILENAME,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
} as const