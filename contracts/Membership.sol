// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from '@openzeppelin/contracts/access/AccessControl.sol';

contract Membership is AccessControl {
	bytes32 public constant ADMIN_ROLE = keccak256('ADMIN_ROLE');
	bytes32 public constant EXECUTOR_ROLE = keccak256('EXECUTOR_ROLE');
	bytes32 public constant MEMBER_ROLE = keccak256('MEMBER_ROLE');

	error NotAdmin();
	error NotExecutor();
	error NotMember();
	error NotAtLeastExecutor();
	error NotAtLeastMember();

	// ---------------------------------------------------------------------------------------
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

	function checkMember(address member) public view returns (bool) {
		return hasRole(MEMBER_ROLE, member);
	}

	function checkExecutor(address executor) public view returns (bool) {
		return hasRole(EXECUTOR_ROLE, executor);
	}

	function checkAdmin(address admin) public view returns (bool) {
		return hasRole(ADMIN_ROLE, admin);
	}

	function checkAtLeastMember(address addr) public view returns (bool) {
		if (checkMember(addr) || checkExecutor(addr) || checkAdmin(addr)) return true;
		return false;
	}

	function checkAtLeastExecutor(address addr) public view returns (bool) {
		if (checkExecutor(addr) || checkAdmin(addr)) return true;
		return false;
	}

	function verifyMember(address addr) public view {
		if (checkMember(addr) == false) revert NotMember();
	}

	function verifyExecutor(address addr) public view {
		if (checkExecutor(addr) == false) revert NotExecutor();
	}

	function verifyAdmin(address addr) public view {
		if (checkAdmin(addr) == false) revert NotAdmin();
	}

	function verifyAtLeastMember(address addr) public view {
		if (checkAtLeastMember(addr) == false) revert NotAtLeastMember();
	}

	function verifyAtLeastExecutor(address addr) public view {
		if (checkAtLeastExecutor(addr) == false) revert NotAtLeastExecutor();
	}
}
