/**
 * getFundKey
 * @param fund A fund object
 *
 * Takes a fund response object and returns a lowercased key for use
 * with URLs and intl IDs
 */

type Fund = {
  asset: {
    name: string;
  };
};

export const getFundKey = (fund: Fund) =>
  encodeURI(fund.asset.name.toLocaleLowerCase().replace(/ /g, '-'));
