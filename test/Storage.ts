import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Storage, Membership } from '../typechain';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

describe('Storage', function () {
	let storage: Storage;
	let membership: Membership;
	let admin: SignerWithAddress;
	let executor: SignerWithAddress;
	let member: SignerWithAddress;
	let nonMember: SignerWithAddress;

	beforeEach(async function () {
		[admin, executor, member, nonMember] = await ethers.getSigners();

		// Deploy Membership first
		const Membership = await ethers.getContractFactory('Membership');
		membership = await Membership.deploy(admin.address, executor.address, member.address);

		// Deploy Storage with Membership address
		const Storage = await ethers.getContractFactory('Storage');
		storage = await Storage.deploy(membership);
	});

	describe('Storage Operations', function () {
		it('Admin can set value', async function () {
			await storage.connect(admin).setValue(42);
			expect(await storage.value()).to.equal(42);
		});

		it('Executor can set value', async function () {
			await storage.connect(executor).setValue(100);
			expect(await storage.value()).to.equal(100);
		});

		it('Member can set value', async function () {
			await storage.connect(member).setValue(200);
			expect(await storage.value()).to.equal(200);
		});

		it('Non-member cannot set value', async function () {
			await expect(storage.connect(nonMember).setValue(500)).to.be.revertedWithCustomError(
				membership,
				'NotAtLeastMember'
			);
		});

		it('Maintains correct value after multiple updates', async function () {
			await storage.connect(admin).setValue(1);
			await storage.connect(executor).setValue(2);
			await storage.connect(member).setValue(3);
			expect(await storage.value()).to.equal(3);
		});
	});

	describe('Contract Setup', function () {
		it('Should have correct membership contract address', async function () {
			expect(await storage.member()).to.equal(membership);
		});

		it('Should initialize with value 0', async function () {
			expect(await storage.value()).to.equal(0);
		});
	});
});
