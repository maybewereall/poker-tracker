const { PrismaClient } = require('@prisma/client')
const { players } = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
    try {
        await prisma.players.createMany({
            data: players
        })
        console.log('Added player data')
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

load()



  