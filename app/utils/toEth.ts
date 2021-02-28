import Big from 'big.js';

/**
 * Take gwei and return eth to 2 decimals
 * @param gwei
 */
const toEth = (gwei: number) => Big(gwei).div(1e18).toFixed(2);

export default toEth;
