import { Address } from 'viem';

export type DeploymentParams = {
	admin: Address;
	executor: Address;
	member: Address;
};

export const params: DeploymentParams = {
	admin: '0x27830702201927535BE96B22Ab5F789e6BC6c3a1',
	executor: '0x230e0e5965ACE4327De2afa1F685561812130FD6',
	member: '0x48B68948D883e323aC616dE3209C767D508837A1',
};

export type ConstructorArgs = [Address, Address, Address];

export const args: ConstructorArgs = [params.admin, params.executor, params.member];
