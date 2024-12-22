// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from '@openzeppelin/contracts/access/AccessControl.sol';
import {IMembership} from './interfaces/IMembership.sol';

contract MembershipFactory {
	function createMembership(address admin, address executor, address member) external returns (address) {
		return address(new Membership(admin, executor, member));
	}
}

// ---------------------------------------------------------------------------------------

contract Membership is IMembership, AccessControl {
	bytes32 public constant ADMIN_ROLE = keccak256('ADMIN_ROLE');
	bytes32 public constant EXECUTOR_ROLE = keccak256('EXECUTOR_ROLE');
	bytes32 public constant MEMBER_ROLE = keccak256('MEMBER_ROLE');

	constructor(address admin, address executor, address member) {
		_setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
		_setRoleAdmin(EXECUTOR_ROLE, ADMIN_ROLE);
		_setRoleAdmin(MEMBER_ROLE, EXECUTOR_ROLE);

		_grantRole(ADMIN_ROLE, admin);

		_grantRole(EXECUTOR_ROLE, admin);
		_grantRole(EXECUTOR_ROLE, executor);

		_grantRole(MEMBER_ROLE, admin);
		_grantRole(MEMBER_ROLE, executor);
		_grantRole(MEMBER_ROLE, member);
	}
}
