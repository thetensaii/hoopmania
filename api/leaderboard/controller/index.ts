import { FastifyPluginCallback } from "fastify";
import { LeaderboardController } from "./LeaderboardController";

export const registerLeaderboardControllers: FastifyPluginCallback = (fastify) => {
  fastify.register(LeaderboardController)
}