import fastify  from "fastify";
import { dietRoutes } from "../routes/dietRoutes";
const app = fastify()
import cookie from '@fastify/cookie'

app.register(cookie)
app.register(dietRoutes)

app.listen(
  {
    port: 8523
  }).then(function() 
  {
    console.log("Server is Running")
  })