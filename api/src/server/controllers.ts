import { FastifyPluginCallback } from "fastify";
import { registerLeaderboardControllers } from "../leaderboard/controller";

export const registerControllers: FastifyPluginCallback = (fastify) => {
  fastify.register(registerLeaderboardControllers)
} 