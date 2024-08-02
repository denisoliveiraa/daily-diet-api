import fastify  from "fastify";
import { dietRoutes } from "../routes/user";
const app = fastify()
import cookie from '@fastify/cookie'
import { meal } from "../routes/meal";

app.register(cookie)
app.register(dietRoutes)
app.register(meal)

app.listen(
  {
    port: 8523
  }).then(function() 
  {
    console.log("Server is Running")
  })