// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenExchangeV2 {
    IUniswapV2Router02 private uniswapRouter;
    address public s_uniswapRouter02;

    constructor(address _uniswapRouter) {
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
        s_uniswapRouter02 = _uniswapRouter;
    }

    function exchangeTokens(
        address[] calldata path,
        uint256 _amount,
        uint256 _amountOutMin,
        address _to
    ) public returns (bytes4 result, bool success) {
        IERC20(path[0]).transferFrom(msg.sender, address(this), _amount);
        IERC20(path[0]).approve(address(uniswapRouter), _amount);

        (bytes4 _result, bool _success) = runSwap(
            _amount,
            _amountOutMin,
            path,
            _to,
            block.timestamp
        );
        return (_result, _success);
    }

    function runSwap(
        uint _amount,
        uint _amountOutMin,
        address[] calldata path,
        address _to,
        uint _deadline
    ) public returns (bytes4, bool) {
        (bool success, bytes memory result) = s_uniswapRouter02.call(
            getDataForSwap(_amount, _amountOutMin, path, _to, _deadline)
        );
        return (bytes4(result), success);
    }

    function getSelector() public pure returns (bytes4 selector) {
        selector = bytes4(
            keccak256(bytes("swapExactTokensForTokens(uint,uint,address[],address,uint)"))
        );
    }

    function getDataForSwap(
        uint _amount,
        uint _amountOutMin,
        address[] calldata path,
        address _to,
        uint _deadline
    ) public pure returns (bytes memory) {
        return abi.encodeWithSelector(getSelector(), _amount, _amountOutMin, path, _to, _deadline);
    }

    function withdrawTokens(address tokenAddress, address recipient, uint256 amount) public {
        IERC20(tokenAddress).transfer(recipient, amount);
    }
}
