import { ethers } from 'ethers';

export function getChildFromSeed(seed: string, index: number) {
	return ethers.Wallet.fromPhrase(seed).deriveChild(index);
}

export function getAddressFromChildIndex(seed: string, index: number): string {
	return ethers.Wallet.fromPhrase(seed).deriveChild(index).address;
}

export function getPublicKeyFromChildIndex(seed: string, index: number): string {
	return ethers.Wallet.fromPhrase(seed).deriveChild(index).publicKey;
}

export function getPrivateKeyFromChildIndex(seed: string, index: number): string {
	return ethers.Wallet.fromPhrase(seed).deriveChild(index).privateKey;
}

export function getWalletInto(
	seed = process.env.DEPLOYER_SEED,
	index = process.env.DEPLOYER_SEED_INDEX,
	amount: number = 3
) {
	if (!seed) throw new Error('Failed to import the seed string from .env');
	if (!index) throw new Error('Failed to import the seed string from .env');
	console.log('seed:', seed);

	const start = index && index?.length > 0 ? parseInt(index) : 0;

	for (let i = start; i < start + amount; i++) {
		const w = getChildFromSeed(seed, i);
		console.log('Wallet', i);
		console.log({
			address: w.address,
			pubKey: w.publicKey,
			privKey: w.privateKey,
			path: w.path,
			index: w.index,
		});
	}
}
