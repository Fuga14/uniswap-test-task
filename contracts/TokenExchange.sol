// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenExchange {
    IUniswapV2Router02 private uniswapRouter;

    constructor(address _uniswapRouter) {
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
    }

    function exchangeTokens(
        address _tokenIn,
        address _tokenOut,
        uint256 _amount,
        uint256 _amountOutMin,
        address _to,
        bool direction
    ) public {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amount);
        IERC20(_tokenIn).approve(address(uniswapRouter), _amount);

        address[] memory path;

        if (direction) {
            // Token1 to Token2 exchange
            path = new address[](2);
            path[0] = address(_tokenIn);
            path[1] = address(_tokenOut);
        } else {
            // Token2 to Token1 exchange
            path = new address[](2);
            path[0] = address(_tokenOut);
            path[1] = address(_tokenIn);
        }

        uniswapRouter.swapExactTokensForTokens(_amount, _amountOutMin, path, _to, block.timestamp);
    }

    function withdrawTokens(address tokenAddress, address recipient, uint256 amount) public {
        IERC20(tokenAddress).transfer(recipient, amount);
    }
}
