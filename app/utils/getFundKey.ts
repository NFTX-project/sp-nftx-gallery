/**
 * getFundKey
 * @param fund A fund object
 *
 * Takes a fund response object and returns a lowercased fund key for use
 * with URLs and intl IDs
 */

import { Fund } from '@/types/fund';

export const getFundKey = (fund: Fund) => {
  if (fund) {
    return encodeURI(
      fund.fundToken.name.toLocaleLowerCase().replace(/ /g, '-')
    );
  }
};
