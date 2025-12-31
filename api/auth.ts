import { betterAuth } from "better-auth";
import { dialect } from './src/database'
import { Environment } from "./src/environment";

export const auth = betterAuth({
  basePath: "/auth",
  secret: Environment.BETTER_AUTH_SECRET,
  baseURL: Environment.BETTER_AUTH_URL,
  trustedOrigins: [Environment.WEBAPP_URL],
  database: { type: "sqlite", dialect },
  socialProviders: {
    discord: {
      clientId: Environment.DISCORD_CLIENT_ID,
      clientSecret: Environment.DISCORD_CLIENT_SECRET
    }
  }
});
