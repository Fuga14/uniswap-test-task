// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenExchangeV2 {
    IUniswapV2Router02 private uniswapRouter;
    address public routerUniswap = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    constructor(address _routerAddress) {
        uniswapRouter = IUniswapV2Router02(_routerAddress);
    }

    function swapTokens(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin
    ) external {
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).approve(address(uniswapRouter), amountIn);

        bytes4 selector = uniswapRouter.swapExactTokensForTokens.selector;

        // Prepare the input data for the function call
        bytes memory data = abi.encodeWithSelector(
            selector,
            amountIn,
            amountOutMin,
            getPathForTokens(tokenIn, tokenOut),
            msg.sender,
            block.timestamp
        );

        // Perform the low-level call to the Uniswap Router contract
        bool success;
        assembly {
            success := call(
                gas(), // Gas
                sload(routerUniswap.slot), // To address (Uniswap Router)
                0, // Value (0 ETH)
                add(data, 0x20), // Input data (skip the first 32 bytes)
                mload(data), // Input data length
                0, // Output data pointer (not needed)
                0 // Output data length (not needed)
            )
            if iszero(success) {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
        }
    }

    function getPathForTokens(
        address tokenIn,
        address tokenOut
    ) internal pure returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;
        return path;
    }
}
