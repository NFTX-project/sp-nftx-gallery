/**
 * Given an ERC address it returns the first and last 4 characters with an ellipses in the middle
 * @param address string Ethereum ERC address
 */
const trimAddress = (address: string) =>
  [
    address.substring(0, 4),
    address.substring(address.length - 4, address.length),
  ].join('...');

export default trimAddress;
