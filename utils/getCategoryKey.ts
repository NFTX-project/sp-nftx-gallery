/**
 * getCategoryKey
 * @param fund A fund object
 *
 * Takes a fund response object and returns a lowercased asset category key for use
 * with URLs and intl IDs
 */

import { Fund } from '@/types/fund';

export const getCategoryKey = (fund: Fund) =>
  encodeURI(fund.asset.name.toLocaleLowerCase().replace(/ /g, '-'));
