import fastify from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchema } from "./modules/user/user.schema";

const app = fastify();

for (const schema of userSchema) {
  app.addSchema(schema)
}

app.register(userRoutes, { prefix: 'api/users'})

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
