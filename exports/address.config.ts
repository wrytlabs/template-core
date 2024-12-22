import { mainnet, polygon } from 'viem/chains';
import { Address, zeroAddress } from 'viem';

export interface ChainAddress {
	backendWallet: Address;
	membershipFactory: Address;
}

export const ADDRESS: Record<number, ChainAddress> = {
	[mainnet.id]: {
		backendWallet: zeroAddress,
		membershipFactory: zeroAddress,
	},
	[polygon.id]: {
		backendWallet: '0xAbc09B2e5729a0B16143811646e390eeC7036554',
		membershipFactory: '0xE63cE0f42DCA7ee1B1A1c1fd481F40d03E69D232',
	},
};
