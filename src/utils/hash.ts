import crypto from 'crypto';

// const salt = crypto.randomBytes(16).toString('hex');
const salt = process.env.SALT || 'salt';

export const hashPass = (pass: string) => {
	const hash = crypto
		.pbkdf2Sync(pass, salt, 1000, 64, 'sha512')
		.toString('hex');

	return hash;
};

export const verifyPass = (pass: string, hash: string) => {
	const candidateHash = crypto
		.pbkdf2Sync(pass, salt, 1000, 64, 'sha512')
		.toString('hex');
	return candidateHash === hash;
};
