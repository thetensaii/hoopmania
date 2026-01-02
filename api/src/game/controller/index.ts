import { FastifyPluginCallback } from "fastify";
import { GameController } from "./GameController";
import { LeaderboardController } from "./LeaderboardController";

export const registerLeaderboardControllers: FastifyPluginCallback = (fastify) => {
  fastify.register(GameController)
  fastify.register(LeaderboardController)
}