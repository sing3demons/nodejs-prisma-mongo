const { PrismaClient } = require('@prisma/client')
const express = require('express')

const app = express()
const port = 8080

const prisma = new PrismaClient()

app.use(express.json())

async function main() {
  try {
    // Connect to the Prisma Client
    console.log(process.env.DATABASE_URL)
    await prisma.$connect()

    app.post('/', async (req, res) => {
      const user = await prisma.user.create({
        data: {
          name: req.body.name || 'Alice',
          email: req.body.email || 'alice@dev.com',
        },
      })
      res.json(user)
    })

    app.get('/', async (req, res) => {
      const users = await prisma.user.findMany()
      res.json(users)
    })

    app.listen(port, () => {
      console.log(`Server app listening at http://localhost:${port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main()
  .catch(async (e) => {
    logger.error(JSON.stringify(e.message))
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
