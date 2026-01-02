import { FastifyPluginCallback } from "fastify";
import { Game } from "../domain/Game";
import { AuthenticatedNewGame, GameRepository } from "../domain/GameRepository";
import { auth } from "../../../auth";


export const GameController: FastifyPluginCallback = (fastify) => {
  const { container } = fastify


  fastify.post('/game', async (req) => {
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value) headers.append(key, value.toString());
    });
    const data = await auth.api.getSession({ headers })
    const isConnected = !!data?.user

    if (isConnected) {
      const newGame = AuthenticatedNewGame.parse(req.body)
      const repository = container.get(GameRepository)

      await repository.saveAuthenticated(data.user, newGame)

    } else {
      const newGame = Game.parse(req.body)
      const repository = container.get(GameRepository)

      await repository.saveUnauthenticated(newGame)
    }
  })
}