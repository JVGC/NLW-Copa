import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){

    const user = await prisma.user.create({
        data: {
            name: "Joao Garcia",
            email: "joaovictorgarciacoelho@gmail.com",
            avatarUrl: 'https://github.com/JVGC.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: "First Pool",
            code: 'BOL1',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }

        }
    })

    const game = await prisma.game.create({
        data:{
            date: '2022-11-02T12:00:00.201Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'RS'
        }
    })

    const game2 = await prisma.game.create({
        data:{
            date: '2022-11-03T14:00:00.201Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'CH',
            guesses: {
                create:{
                    firstTeamPoints: 2,
                    secondTeamPoints: 0,
                    participant: {
                        connect: {
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })

}

main()