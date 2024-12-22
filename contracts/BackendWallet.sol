// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Membership} from './Membership.sol';

contract BackendWallet is Membership {
	constructor(address admin, address executor, address member) Membership(admin, executor, member) {}
}
