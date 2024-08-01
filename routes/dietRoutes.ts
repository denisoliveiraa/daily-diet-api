import z from 'zod'
import { knex } from '../src/database'
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'


export async function dietRoutes(app: FastifyInstance) {
app.post('/user', async (request, reply) => {
  const createUser = z.object({
    name: z.string(),
    last_name: z.string()
  })

  const {name, last_name} = createUser.parse(request.body)

  let sessionID = request.cookies.sessionId

  if(!sessionID){
    sessionID = randomUUID()

    reply.cookie('sessionId', sessionID, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
  }

   await knex('user').insert({
    id: crypto.randomUUID(),
    name,
    last_name,
    session_id: sessionID,
  })
  return reply.status(201).send()
})

app.get('/user', async (request, reply) => {
  
  const listUser = await knex('user').select()

  return {listUser}

})

app.get('/user/:id', async (request) => {
  
  const userIdSchema = z.object({
    userID: z.string().uuid()
  })

  const {userID} = userIdSchema.parse(request.params)

  const foundUser = knex('user').where('user.id', userID)

  return {foundUser}

})

}