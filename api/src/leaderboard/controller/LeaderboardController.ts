import { FastifyPluginCallback } from "fastify";
import { LeaderboardRepository } from "../domain/LeaderboardRepository";
import { Game } from "../domain/Game";
import { GameRepository } from "../domain/GameRepository";

export const LeaderboardController: FastifyPluginCallback = (fastify) => {
  const { container } = fastify

  fastify.get('/leaderboard', async () => {
    const repository = container.get(LeaderboardRepository)
    const leaders = await repository.getLeaders()

    return { data: leaders }
  })

  fastify.post('/score', async (req) => {
    const game = Game.parse(req.body)

    const repository = container.get(GameRepository)
    await repository.save(game)
  })
}