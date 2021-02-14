/**
 * getFundKey
 * @param fund A fund object
 *
 * Takes a fund response object and returns a lowercased fund key for use
 * with URLs and intl IDs
 */

type Fund = {
  fundToken: {
    name: string;
  };
};

export const getFundKey = (fund: Fund) =>
  encodeURI(fund.fundToken.name.toLocaleLowerCase().replace(/ /g, '-'));
