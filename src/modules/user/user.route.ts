import { FastifyInstance } from 'fastify';
import { registerUserHandler } from './user.controller';

async function userRoutes(app: FastifyInstance) {
  app.post('/create', registerUserHandler)
}

export default userRoutes;
