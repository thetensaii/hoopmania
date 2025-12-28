import Fastify from 'fastify'
import { buildServer } from './server'
import { Environment } from './environment'

const server = Fastify({
  logger: true
})

buildServer(server)

const main = async () => {
  try {
    await server.listen({ host: Environment.HOST, port: Environment.PORT })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main()