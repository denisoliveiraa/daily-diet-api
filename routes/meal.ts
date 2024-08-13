import z from 'zod'
import { knex } from '../src/database'
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../src/middleware/check-sessionId-exists'


export async function meal(app: FastifyInstance) {
app.post('/meal', {preHandler: checkSessionIdExists}, async (request, reply) => {
  const createUser = z.object({
    name: z.string(),
    description: z.string()
  })

  const {name, description} = createUser.parse(request.body)


   await knex('meal').insert({
    id: crypto.randomUUID(),
    name,
    description
  })
  return reply.status(201).send()
})


app.get('/meal',{preHandler: checkSessionIdExists}, async (request, reply) => {
  
  const listMeal = await knex('meal').select()

  return {listMeal}

})

app.put('/meal/:id', async (request, reply) => {
  const getUserIDSchema = z.object({
    id: z.string().uuid()
  })

  const getUserSchema = z.object({
    updateName: z.string().optional(),
    updateDescription: z.string().optional()
  })

  const { updateName, updateDescription } = getUserSchema.parse(request.body)
  const { id: mealId } = getUserIDSchema.parse(request.params)

  const findRegister = knex('meal').select('id').where('id',mealId ).first()

  if(!findRegister){
    throw new Error ('Register not found')
  }

  await knex('meal').where('id', mealId).update({
    name: updateName,
    description: updateDescription
  })

  return reply.status(201).send()

})


app.delete('/meal/:id', async (request, response) => {
  const getUserIDSchema = z.object({
    id: z.string().uuid()
  })

  const { id } = getUserIDSchema.parse(request.params)

  const getMealResult =  knex('meal').select('id').where('id',id ).first()

  if(!getMealResult){
    throw new Error ('Meal does not exists')
  }

  await knex('meal').where('id', id).del()

  return response.status(200).send('Delete works very well')



})


app.get('/meal/:id', async (request, response) => {
  const userSchema = z.object({
    id: z.string().uuid()
  })


  const { id } = userSchema.parse(request.params)

  const checkUser = knex('user').select('*').where('user_id', id).first()

  if(!checkUser){
    throw new Error ('User not exists or do not have list of meals')
  }



})


app.post('/meal/register-diet', async (request, reply) => {
  const idSchema = z.object({
    mealId: z.string().uuid(),
    userId: z.string().uuid(),
    dietId: z.string().uuid()
  })
 

  const { mealId, userId, dietId } = idSchema.parse({
    mealId: request.body,
    userId: request.body,
    dietId: request.body,
  })


  const checkUser = knex('user').select('*').where('id', userId).first()

  if(!checkUser){
    throw new Error ('User not exists')
  }

  const checkDiet = knex('diet').select('*').where('id', dietId).first()

  if(!checkDiet){
    throw new Error ('Diet not exists')
  }

  const checkMeal = knex('meal').select('*').where('id', mealId).first()

  if(!checkMeal){
    throw new Error ('Meal not exists')
  }


   await knex('meal_diet').insert({
    id: crypto.randomUUID(),
    dietId,
    mealId,
    userId
  })
  return reply.status(201).send()

  

})



}