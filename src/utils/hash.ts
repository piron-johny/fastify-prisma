import crypto from 'crypto';

interface CandidatePass {
  pass: string;
  hash: string;
}

const salt = crypto.randomBytes(16).toString('hex');

export const hashPass = (pass: string) => {
	const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');

	return hash;
};

export const verifyPass = (candidate: CandidatePass) => {
  const candidateHash = crypto.pbkdf2Sync(candidate.pass, salt, 1000, 64, 'sha512').toString('hex');

  return candidateHash === candidate.hash
};
