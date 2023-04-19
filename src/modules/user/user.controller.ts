import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser, findAllUsers, findUserByEmail } from './user.service';
import { CreateUserInput, LoginUserInput } from './user.schema';
import { verifyPass } from '../../utils/hash';
import { app } from '../../app';

type RegisterRequest = FastifyRequest<{ Body: CreateUserInput }>;
type LoginRequest = FastifyRequest<{ Body: LoginUserInput }>;

export async function registerUserHandler(
	req: RegisterRequest,
	reply: FastifyReply
) {
	const body = req.body;

	try {
		const user = await createUser(body);
		return reply.code(201).send(user);
	} catch (error) {
		return reply.code(500).send(error);
	}
}

export async function loginUserHandler(req: LoginRequest, reply: FastifyReply) {
	const body = req.body;

	try {
		const user = await findUserByEmail(body.email);

		if (!user)
			return reply.code(401).send({ message: 'Invalid email or password ' });

		const currentPass = verifyPass(body.password, user.password);

		if (!currentPass)
			return reply.code(401).send({ message: 'Invalid email or password ' });

		const { password, ...payload } = user;

		return reply.code(200).send({ accessToken: app.jwt.sign(payload) });
	} catch (error) {
		return reply.code(500).send(error);
	}
}

export async function getAllUsersHandler(req: FastifyRequest, reply: FastifyReply) {
	try {
		const users = await findAllUsers();

		if (!users)
			return reply.code(401).send({ message: 'Invalid email or password ' });

		return reply.code(200).send(users);
	} catch (error) {
		return reply.code(500).send(error);
	}
}
