import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import userRoutes from './modules/user/user.route';
import { userSchema } from './modules/user/user.schema';
import fastifyJwt from '@fastify/jwt';
import 'dotenv/config';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

export const app = fastify();

for (const schema of userSchema) {
	app.addSchema(schema);
}
declare module 'fastify' {
	export interface FastifyInstance {
		authenticate: any;
	}
}

app.register(fastifyJwt, { secret: process.env.JWT_SECRET || '' });
app.decorate(
	'authenticate',
	async (req: FastifyRequest, reply: FastifyReply) => {
		try {
			await req.jwtVerify();
		} catch (error) {
			return reply.send(error);
		}
	}
);

app.register(
	async (app) => {
		app.register(userRoutes, { prefix: '/users' });
		app.get('/health', async () => ({ status: 'ok' }));
	},
	{ prefix: 'api' }
);

app.listen({ port: PORT, path: 'api' }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`\nServer listening at ${address}\n`);
});
