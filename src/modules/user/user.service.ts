import { hashPass } from '../../utils/hash';
import prisma from '../../utils/prisma';
import { CreateUserInput } from './user.schema';

export async function createUser(input: CreateUserInput) {
	const { password, ...other } = input;
  const hash = hashPass(password);

	const user = await prisma.user.create({
		data: {...other, password: hash},
	});

  return user;
}
