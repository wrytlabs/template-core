// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Membership} from './Membership.sol';

contract Storage {
	uint256 public value;
	Membership public member;

	constructor(Membership _member) {
		member = _member;
	}

	function setValue(uint256 _value) public {
		member.verifyAtLeastMember(msg.sender);
		value = _value;
	}
}
