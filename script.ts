import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
  const user = await prisma.user.create( {
    data: {
      name: "Luke"
    }
  })
  console.log(user);
  
}

main()
  .catch(e => {
    console.error(e.message)
  })
