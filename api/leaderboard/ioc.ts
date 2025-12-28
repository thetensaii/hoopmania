import { FastifyPluginCallback } from "fastify";
import { InMemoryLeaderboardRepository } from "./infra/InMemoryLeaderboardRepository";
import { LeaderboardRepository } from "./domain/LeaderboardRepository";

export const registerLeaderboardIOC: FastifyPluginCallback = ({ container }) => {
  container.bind(InMemoryLeaderboardRepository).toSelf().inSingletonScope()
  container.bind(LeaderboardRepository).to(InMemoryLeaderboardRepository)
}