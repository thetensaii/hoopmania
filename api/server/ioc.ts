import { Container } from "inversify";
import fastifyPlugin from 'fastify-plugin'
import { registerLeaderboardIOC } from "../leaderboard/ioc";
export const setupIOC = fastifyPlugin((fastify) => {
  const container = new Container()
  fastify.decorate("container", container)

  fastify.register(registerLeaderboardIOC)
})

declare module 'fastify' {
  interface FastifyInstance {
    container: Container
  }
}