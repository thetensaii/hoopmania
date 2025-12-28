import { FastifyPluginCallback } from "fastify";
import { InMemoryLeaderboardRepository } from "./infra/InMemoryLeaderboardRepository";
import { LeaderboardRepository } from "./domain/LeaderboardRepository";
import { InMemoryGameRepository } from "./infra/InMemoryGameRepository";
import { GameRepository } from "./domain/GameRepository";

export const registerLeaderboardIOC: FastifyPluginCallback = ({ container }) => {
  container.bind(InMemoryGameRepository).toSelf().inSingletonScope()
  container.bind(GameRepository).to(InMemoryGameRepository)

  container.bind(InMemoryLeaderboardRepository).toSelf().inSingletonScope()
  container.bind(LeaderboardRepository).to(InMemoryLeaderboardRepository)
}