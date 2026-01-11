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

  fastify.get('/game/last', async (req, res) => {
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value) headers.append(key, value.toString());
    });
    const data = await auth.api.getSession({ headers })
    const isConnected = !!data?.user

    if (!isConnected) {
      res.status(401)
    } else {

      const repository = container.get(GameRepository)
      const lastGames = await repository.getUserLastGames(data.user.id)

      return { data: lastGames }
    }
  })

  fastify.get('/game/best', async (req, res) => {
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value) headers.append(key, value.toString());
    });
    const data = await auth.api.getSession({ headers })
    const isConnected = !!data?.user

    if (!isConnected) {
      res.status(401)
    } else {

      const repository = container.get(GameRepository)
      const bestGame = await repository.getUserBestGame(data.user.id)

      return { data: bestGame }
    }
  })
}