export const MembershipFactoryABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: 'admin',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'executor',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'member',
				type: 'address',
			},
		],
		name: 'createMembership',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
] as const;
