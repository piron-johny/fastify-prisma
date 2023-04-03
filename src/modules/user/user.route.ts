import { FastifyInstance } from 'fastify';
import { registerUserHandler, loginUserHandler } from './user.controller';
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

	app.post(
		'/login',
		{
			schema: {
				body: $ref('loginSchema'),
				response: { 201: $ref('loginResponseSchema') },
			},
		},
		loginUserHandler
	);
}

export default userRoutes;
