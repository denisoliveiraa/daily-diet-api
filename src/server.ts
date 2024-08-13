import fastify  from "fastify";
import { dietRoutes } from "../routes/user";
const app = fastify()
import cookie from '@fastify/cookie'
import { meal } from "../routes/meal";
import { diet } from "../routes/diet";

app.register(cookie)
app.register(dietRoutes)
app.register(meal)
app.register(diet)

app.listen(
  {
    port: 8523
  }).then(function() 
  {
    console.log("Server is Running")
  })