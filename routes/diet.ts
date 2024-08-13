import z from 'zod'
import { knex } from '../src/database'
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'


export async function diet(app: FastifyInstance) {
app.post('/diet', async (request, reply) => {
  const dietSchema = z.object({
    name: z.string()
  })
 

  const { name } = dietSchema.parse(request.body)


  const checkDietName = knex('diet').select('name').where('name', name).first()

  if(await checkDietName === name){
    throw new Error ('Diet name already used')
  }


   await knex('diet').insert({
    id: crypto.randomUUID(),
    name,
  })
  return reply.status(201).send({message: "Diet created"})
})


app.get('/diet', async (request, reply) => {
  
  const listDiet = await knex('diet').select()

  return {listDiet}

})

}
