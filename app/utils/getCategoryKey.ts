/**
 * getCategoryKey
 * @param fund A fund object
 *
 * Takes a fund response object and returns a lowercased asset category key for use
 * with URLs and intl IDs
 */

import { Fund } from '@/types/fund';

export const getCategoryKey = (fund: Fund) => {
  const key = fund?.asset?.name || fund?.fundToken?.name || null;

  if (key) {
    return encodeURI(key.toLocaleLowerCase().replace(/ /g, '-'));
  }
};
