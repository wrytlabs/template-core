import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { storeConstructorArgs } from '../../helper/store.args';
import { args, params } from '../params/Membership';

export const NAME: string = 'Membership';
export const MOD: string = NAME + 'Module';
console.log(NAME);

// params
console.log('Imported Params:');
console.log(params);

// export args
storeConstructorArgs(MOD, args);
console.log('Constructor Args');
console.log(args);

export default buildModule(MOD, (m) => {
	return {
		[NAME]: m.contract(NAME, args),
	};
});
