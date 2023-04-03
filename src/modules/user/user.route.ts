import { FastifyInstance } from 'fastify';
import { registerUserHandler } from './user.controller';
import { $ref } from './user.schema';

async function userRoutes(app: FastifyInstance) {
	app.post(
		'/create',
		{
			schema: {
				body: $ref('createUserSchema'),
				response: { 201: $ref('createUserResponseSchema') },
			},
		},
		registerUserHandler
	);
}

export default userRoutes;
