import Fastify from 'fastify'
import { buildServer } from './server'
import { Environment } from './environment'
import { setupDb } from './database/build'

const server = Fastify({
  logger: true
})


const main = async () => {
  await setupDb()
  buildServer(server)

  try {
    await server.listen({ host: Environment.HOST, port: Environment.PORT })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main()