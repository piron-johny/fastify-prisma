import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser } from './user.service';
import { CreateUserInput } from './user.schema';

type Req = FastifyRequest<{ Body: CreateUserInput }>;

export async function registerUserHandler(req: Req, reply: FastifyReply) {
	const body = req.body;

	try {
		const user = await createUser(body);
		return reply.code(201).send(user);

	} catch (error) {
		return reply.code(500).send(error);
	}
}
