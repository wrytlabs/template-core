import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { getChildFromSeed } from '../../helper/wallet';
import { storeConstructorArgs } from '../../helper/store.args';

const seed = process.env.DEPLOYER_ACCOUNT_SEED;
if (!seed) throw new Error('Failed to import the seed string from .env');

const w1 = getChildFromSeed(seed, 1); // admin also deployer
const w2 = getChildFromSeed(seed, 2); // executor
const w3 = getChildFromSeed(seed, 3); // member

export const config = {
	message: 'Config Info: Deploying Module with accounts',
	admin: w1.address,
	executor: w2.address,
	member: w3.address,
};

console.log(config);

// constructor args
export const args = [config.admin, config.executor, config.member];
storeConstructorArgs('MembershipModule', args, true);

console.log('Constructor Args');
console.log(args);

const MembershipModule = buildModule('MembershipModule', (m) => {
	// Deploy Membership contract
	const membership = m.contract('Membership', args);

	// Deploy Storage contract using the Membership address
	const storage = m.contract('Storage', [membership]);

	// You can add more contracts here
	// const anotherContract = m.contract('AnotherContract', [...args]);

	// You can add more logic here
	// m.call(storage, 'setValue', [100]);

	return {
		membership,
		storage,
		// anotherContract
	};
});

export default MembershipModule;
