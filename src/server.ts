import fastify  from "fastify";
import { knex } from "./database";
import { z } from 'zod'
const app = fastify()

app.post('/user', async (request, reply) => {
  const createUser = z.object({
    name: z.string(),
    last_name: z.string()
  })

  const {name, last_name} = createUser.parse(request.body)

   await knex('user').insert({
    id: crypto.randomUUID(),
    name,
    last_name,
  })



  return reply.status(201).send({'id': userID})

})

app.get('/user', async (request, reply) => {
  
  const listUser = await knex('user').select()

  return {listUser}

})

app.get('/user/:id', async (request, reply) => {
  const userIdSchema = z.object({
    userID: z.string()
  })

  const {userID} = userIdSchema.parse(request.params)

  const foundUser = knex('user').where('user.id', userID)

  return {foundUser}

})

app.listen({port: 8523}).then(function() {console.log("Server is Running")})