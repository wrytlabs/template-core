import { mainnet, polygon } from 'viem/chains';
import { Address, Chain, zeroAddress } from 'viem';

export interface ChainAddress {
	membership: Address;
	storage: Address;
}

export const ADDRESS: Record<number, ChainAddress> = {
	[mainnet.id]: {
		membership: zeroAddress,
		storage: zeroAddress,
	},
	[polygon.id]: {
		membership: '0x72950A0A9689fCA941Ddc9E1a58dcD3fb792E3D2',
		storage: '0x8A7e8091e71cCB7D1EbDd773C26AD82AAd323328',
	},
	// @dev: citrea
	[5115 as Chain['id']]: {
		membership: '0xAeF2BBEC215E7e9B7667C2A1c74127656617AFc1',
		storage: '0x45E763CCe01622B28625cA8b2Fcbb9c61fd562e2',
	},
};
