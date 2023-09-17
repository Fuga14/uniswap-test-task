const { network, ethers } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');

const TETHER_ABI = require('../abi/tether.json');
const SUSHI_ABI = require('../abi/sushi.json');
const USDC_ABI = require('../abi/usdc.json');
const WETH_ABI = require('../abi/weth.json');

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('TokenExchangeV2 Contract Tests', () => {
      const UNISWAP_V2_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
      const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');

      const TETHER_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
      const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
      const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

      const AMOUNT_OUT_MIN = 1;

      let deployer, TokenExchangeV2;
      let TETHER, USDC, WETH;

      beforeEach(async () => {
        [deployer] = await ethers.getSigners();

        const tokenExchangeFactory = await ethers.getContractFactory('TokenExchangeV2', deployer);
        TokenExchangeV2 = await tokenExchangeFactory.deploy(UNISWAP_V2_ROUTER);
        await TokenExchangeV2.deployed();

        TokenExchangeV2 = TokenExchangeV2.connect(deployer);

        TETHER = new ethers.Contract(TETHER_ADDRESS, TETHER_ABI, provider);
        USDC = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);
        WETH = new ethers.Contract(WETH_ADDRESS, WETH_ABI, provider);
      });
      it('Should swap tokens', async () => {
        let tokenIn = WETH_ADDRESS;
        let tokenOut = USDC_ADDRESS;
        const amountIn = ethers.utils.parseEther('10');

        let balanceOfWeth = await WETH.connect(deployer).balanceOf(deployer.address);
        console.log(`Weth balance before deposit: ${ethers.utils.formatEther(balanceOfWeth)}`);

        await WETH.connect(deployer).deposit({ value: ethers.utils.parseEther('1000') });

        balanceOfWeth = await WETH.connect(deployer).balanceOf(deployer.address);
        console.log(`Weth balance after deposit: ${ethers.utils.formatEther(balanceOfWeth)}`);
        console.log('----------------------------------------------------------------');

        //! Make swap WETH/USDC
        console.log('---------------WETH/USDC SWAP---------------');
        let balanceWeth = await WETH.connect(deployer).balanceOf(deployer.address);
        let balanceUsdc = await USDC.connect(deployer).balanceOf(deployer.address);
        console.log(`WETH balance before swap: ${ethers.utils.formatEther(balanceWeth)}`);
        console.log(`USDC balance before swap: ${balanceUsdc}`);

        await WETH.connect(deployer).approve(TokenExchangeV2.address, amountIn);
        await TokenExchangeV2.connect(deployer).swapTokens(
          tokenIn,
          tokenOut,
          amountIn,
          AMOUNT_OUT_MIN
        );

        balanceWeth = await WETH.connect(deployer).balanceOf(deployer.address);
        balanceUsdc = await USDC.connect(deployer).balanceOf(deployer.address);
        console.log(`WETH balance after swap: ${ethers.utils.formatEther(balanceWeth)}`);
        console.log(`USDC balance after swap: ${balanceUsdc}`);

        console.log('----------------------------------------------------------------');

        // //! Make swap USDC to USDT
        console.log('---------------USDC/USDT SWAP---------------');
        const amountUsdcTether = '100000000';
        await USDC.connect(deployer).approve(TokenExchangeV2.address, amountUsdcTether);

        balanceUsdc = await USDC.connect(deployer).balanceOf(deployer.address);
        let balanceUsdt = await TETHER.connect(deployer).balanceOf(deployer.address);
        console.log(`USDC balance before swap: ${balanceUsdc}`);
        console.log(`USDT balance before swap: ${balanceUsdt}`);

        tokenIn = USDC_ADDRESS;
        tokenOut = TETHER_ADDRESS;
        await TokenExchangeV2.connect(deployer).swapTokens(
          tokenIn,
          tokenOut,
          amountUsdcTether,
          AMOUNT_OUT_MIN
        );

        balanceUsdc = await USDC.connect(deployer).balanceOf(deployer.address);
        balanceUsdt = await TETHER.connect(deployer).balanceOf(deployer.address);
        console.log(`USDC balance after swap: ${balanceUsdc}`);
        console.log(`USDT balance after swap: ${balanceUsdt}`);
      });
    });
