
import { createAuthClient } from "better-auth/react"
import { Environment } from "./environment"

export const authClient = createAuthClient({
  basePath: '/auth',
  baseURL: Environment.VITE_API_URL
})