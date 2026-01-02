import { FastifyPluginCallback } from "fastify";
import { registerLeaderboardControllers } from "../game/controller";
import { registerAuthController } from "../auth/controller";

export const registerControllers: FastifyPluginCallback = (fastify) => {
  fastify.register(registerAuthController)
  fastify.register(registerLeaderboardControllers)
} 