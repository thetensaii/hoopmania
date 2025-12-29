import { FastifyPluginCallback } from "fastify";
import { DbLeaderboardRepository } from "./infra/InMemoryLeaderboardRepository";
import { LeaderboardRepository } from "./domain/LeaderboardRepository";
import { GameRepository } from "./domain/GameRepository";
import { DbGameRepository } from "./infra/DbGameRepository";

export const registerLeaderboardIOC: FastifyPluginCallback = ({ container }) => {
  container.bind(DbGameRepository).toSelf().inSingletonScope()
  container.bind(GameRepository).to(DbGameRepository)

  container.bind(DbLeaderboardRepository).toSelf().inSingletonScope()
  container.bind(LeaderboardRepository).to(DbLeaderboardRepository)
}