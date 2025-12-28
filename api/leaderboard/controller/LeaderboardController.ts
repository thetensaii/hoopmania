import { FastifyPluginCallback } from "fastify";
import { LeaderboardRepository } from "../domain/LeaderboardRepository";

export const LeaderboardController: FastifyPluginCallback = (fastify) => {
  const { container } = fastify

  fastify.get('/leaderboard', async () => {
    const repository = container.get(LeaderboardRepository)
    const leaders = await repository.getLeaders()

    return { data: leaders }
  })
}