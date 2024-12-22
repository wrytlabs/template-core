// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IMembership {
	// Constants
	function ADMIN_ROLE() external view returns (bytes32);

	function EXECUTOR_ROLE() external view returns (bytes32);

	function MEMBER_ROLE() external view returns (bytes32);
}
