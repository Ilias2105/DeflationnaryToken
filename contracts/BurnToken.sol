// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './ERC20Mod.sol';

contract BurnToken is ERC20Mod {
    //Création du token
    constructor() ERC20Mod("BurnToken", "BNT"){
        _mint(msg.sender, 1000 * 10**18);
    }
}