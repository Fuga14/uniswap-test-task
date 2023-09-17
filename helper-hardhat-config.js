const networkConfig = {
  default: {
    name: 'hardhat',
    fee: '100000000000000000',
    keyHash: '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc',
    jobId: '29fa9aa13bf1468788b7cc4a500a45b8',
    fundAmount: '1000000000000000000',
    automationUpdateInterval: '30',
    ethUsdPriceFeed: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    btcUsdPriceFeed: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    wethAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    wbtcAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  },
  31337: {
    name: 'localhost',
    fee: '100000000000000000',
    keyHash: '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc',
    jobId: '29fa9aa13bf1468788b7cc4a500a45b8',
    fundAmount: '1000000000000000000',
    automationUpdateInterval: '30',
    ethUsdPriceFeed: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    btcUsdPriceFeed: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    wethAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    wbtcAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  },
  1: {
    name: 'mainnet',
    linkToken: '0x514910771af9ca656af840dff83e8264ecf986ca',
    fundAmount: '0',
    automationUpdateInterval: '30',
  },
  11155111: {
    name: 'sepolia',
    /////
    ethUsdPriceFeed: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
    btcUsdPriceFeed: '0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22',
    wethAddress: '0xdd13E55209Fd76AfE204dBda4007C227904f0a81',
    wbtcAddress: '0xAe7C08f2FC56719b8F403C29F02E99CF809F8e34',
    /////
    linkToken: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
    keyHash: '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c',
    vrfCoordinator: '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625',
    vrfWrapper: '0xab18414CD93297B0d12ac29E63Ca20f515b3DB46',
    oracle: '0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD',
    jobId: 'ca98366cc7314957b8c012c72f05aeeb',
    subscriptionId: '777',
    fee: '100000000000000000',
    fundAmount: '100000000000000000', // 0.1
    automationUpdateInterval: '30',
  },
  137: {
    name: 'polygon',
    linkToken: '0xb0897686c545045afc77cf20ec7a532e3120e0f1',
    ethUsdPriceFeed: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
    oracle: '0x0a31078cd57d23bf9e8e8f1ba78356ca2090569e',
    jobId: '12b86114fa9e46bab3ca436f88e1a912',
    fee: '100000000000000',
    fundAmount: '100000000000000',
  },
  80001: {
    name: 'mumbai',
    linkToken: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    ethUsdPriceFeed: '0x0715A7794a1dc8e42615F059dD6e406A6594651A',
    keyHash: '0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f',
    vrfCoordinator: '0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed',
    vrfWrapper: '0x99aFAf084eBA697E584501b8Ed2c0B37Dd136693',
    oracle: '0x40193c8518BB267228Fc409a613bDbD8eC5a97b3',
    jobId: 'ca98366cc7314957b8c012c72f05aeeb',
    fee: '100000000000000000',
    fundAmount: '100000000000000000', // 0.1
    automationUpdateInterval: '30',
  },
};

const developmentChains = ['hardhat', 'localhost'];

module.exports = {
  networkConfig,
  developmentChains,
};
