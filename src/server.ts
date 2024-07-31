import fastify  from "fastify";
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  const test = knex('sqlite_schema').select('*')

  return test
})

app.listen({port: 8523}).then(function() {console.log("Server is Running")})