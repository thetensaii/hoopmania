import { FastifyInstance } from "fastify"
import { setupIOC } from "./ioc"
import { registerControllers } from "./controllers"
import cors from "@fastify/cors"
import { Environment } from "../environment"

export const buildServer = (server: FastifyInstance) => {
  server.register(cors, {
    origin: Environment.WEBAPP_URL,
    credentials: true,
    maxAge: 86400
  })
  server.register(setupIOC)
  server.register(registerControllers)
}