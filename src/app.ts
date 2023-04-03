import fastify from "fastify";
import userRoutes from "./modules/user/user.route";

const app = fastify();

app.register(userRoutes, { prefix: 'app/users'})

app.get('/health',async (req, res) => {
  return {status: 'ok'}
})

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`\nServer listening at ${address}\n`);
})
