import fastify from "fastify"
import { PrismaClient } from "@prisma/client"
import fastifyCors from "@fastify/cors"

import { z } from 'zod'

import ShortUniqueId from 'short-unique-id'


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

    fastifyServer.get('/api/users/count', async () => {
        const count = await prisma.user.count()
        return { count }
    })

    fastifyServer.get('/api/guesses/count', async () => {
        const count = await prisma.guess.count()
        return { count }
    })

    fastifyServer.post('/api/pools', async (request, response) => {

        const createPoolBody = z.object({
            title: z.string()
        })

        const { title } = createPoolBody.parse(request.body)

        const generate = new ShortUniqueId({ length: 6 })
        const code = String(generate()).toUpperCase()

        await prisma.pool.create({
            data:{
                title,
                code
            }
        })

        return response.status(201).send({ title, code })
    })

    await fastifyServer.listen({ port: 3000, host: '0.0.0.0' })
}



bootstrap()