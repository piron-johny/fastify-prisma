import { hashPass } from '../../utils/hash';
import prisma from '../../utils/prisma';
import { CreateUserInput } from './user.schema';

export async function createUser(input: CreateUserInput) {
	const { password, ...other } = input;
	const hash = hashPass(password);

	return await prisma.user.create({
		data: { ...other, password: hash },
	});
}

export async function findUserByEmail(email: string) {
	return await prisma.user.findUnique({
		where: { email },
	});
}

export async function findAllUsers() {
	return await prisma.user.findMany({
		select: { email: true, name: true, id: true },
	});
}
