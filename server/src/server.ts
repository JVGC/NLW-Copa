import fastify from "fastify"
import { PrismaClient } from "@prisma/client"
import fastifyCors from "@fastify/cors"


const prisma =  new PrismaClient({
    log: ['query']
})

async function bootstrap(){
    const fastifyServer = fastify({
        logger: true
    })
    await fastifyServer.register(fastifyCors, {
        origin: true
    })

    fastifyServer.get('/api/pools/count', async () => {
        const count = await prisma.pool.count()
        return { count }
    })

    await fastifyServer.listen({ port: 3000, host: '0.0.0.0' })
}

bootstrap()