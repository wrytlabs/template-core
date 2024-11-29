import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Membership } from '../typechain';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

describe('Membership', function () {
	let membership: Membership;
	let admin: SignerWithAddress;
	let executor: SignerWithAddress;
	let member: SignerWithAddress;
	let nonMember: SignerWithAddress;

	beforeEach(async function () {
		[admin, executor, member, nonMember] = await ethers.getSigners();

		const Membership = await ethers.getContractFactory('Membership');
		membership = await Membership.deploy(admin.address, executor.address, member.address);
	});

	describe('Role Checks', function () {
		it('Should correctly assign admin role', async function () {
			expect(await membership.checkAdmin(admin.address)).to.be.true;
			expect(await membership.checkAdmin(executor.address)).to.be.false;
		});

		it('Should correctly assign executor role', async function () {
			expect(await membership.checkExecutor(executor.address)).to.be.true;
			expect(await membership.checkExecutor(admin.address)).to.be.true;
			expect(await membership.checkExecutor(member.address)).to.be.false;
		});

		it('Should correctly assign member role', async function () {
			expect(await membership.checkMember(member.address)).to.be.true;
			expect(await membership.checkMember(executor.address)).to.be.true;
			expect(await membership.checkMember(admin.address)).to.be.true;
			expect(await membership.checkMember(nonMember.address)).to.be.false;
		});
	});

	describe('Hierarchical Checks', function () {
		it('Should verify atLeastMember correctly', async function () {
			expect(await membership.checkAtLeastMember(admin.address)).to.be.true;
			expect(await membership.checkAtLeastMember(executor.address)).to.be.true;
			expect(await membership.checkAtLeastMember(member.address)).to.be.true;
			expect(await membership.checkAtLeastMember(nonMember.address)).to.be.false;
		});

		it('Should verify atLeastExecutor correctly', async function () {
			expect(await membership.checkAtLeastExecutor(admin.address)).to.be.true;
			expect(await membership.checkAtLeastExecutor(executor.address)).to.be.true;
			expect(await membership.checkAtLeastExecutor(member.address)).to.be.false;
		});
	});

	describe('Verification Functions', function () {
		it('Should revert for non-members', async function () {
			await expect(membership.verifyMember(nonMember.address)).to.be.revertedWithCustomError(
				membership,
				'NotMember'
			);
		});

		it('Should revert for non-executors', async function () {
			await expect(membership.verifyExecutor(member.address)).to.be.revertedWithCustomError(
				membership,
				'NotExecutor'
			);
		});

		it('Should revert for non-admins', async function () {
			await expect(membership.verifyAdmin(executor.address)).to.be.revertedWithCustomError(
				membership,
				'NotAdmin'
			);
		});

		it('Should revert for addresses below member level', async function () {
			await expect(membership.verifyAtLeastMember(nonMember.address)).to.be.revertedWithCustomError(
				membership,
				'NotAtLeastMember'
			);
		});

		it('Should revert for addresses below executor level', async function () {
			await expect(membership.verifyAtLeastExecutor(member.address)).to.be.revertedWithCustomError(
				membership,
				'NotAtLeastExecutor'
			);
		});
	});
});
