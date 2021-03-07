/**
 * getFractionDigits
 *
 * When given a price it returns the fraction digit options for
 * the formattedPrice
 */
const getFractionDigits = (num: number) => {
  // If the fraction digit would be equal or more than 1% of price
  // then show them. e.g. $17.50
  if (num <= 100) {
    return {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    };
  }

  // otherwise don't bother with cents, e.g. $140
  return {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  };
};

export default getFractionDigits;
