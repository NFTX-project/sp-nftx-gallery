import { ReactNode } from 'react';
import { AssetDetailStatus } from './constants';

export interface AssetDetailProps {
  /**
   * The status of the card
   */
  status?: AssetDetailStatus;
  /**
   * The name of the asset type
   */
  assetType: string;
  /**
   * The name of the holding fund
   */
  fundName: string;
  /**
   * The ticker of the holding fund
   */
  fundSymbol: string;
  /**
   * The address of the holding fund
   */
  fundAddress: string;
  /**
   * The id of the vault currently viewed on
   */
  vaultId: number;
  /**
   * The image src to be rendered
   */
  image?: string;
  /**
   * Placeholder to render in the image slot
   */
  placeholder?: ReactNode;
  /**
   * The text that appears above the title
   */
  eyebrow?: ReactNode;
  /**
   * The title of the card
   */
  title?: ReactNode;
  /**
   * The text that appears beneath the title
   */
  text?: ReactNode;
  /**
   * Background color in hex format
   */
  background?: string;
  /**
   * Should it appear as a stack?
   */
  stack?: boolean;
  /**
   * Any root level class names to be applied
   */
  className?: string;
  /**
   * The price, in gwei, of last sale
   */
  lastSalePrice: number;
  /**
   * The percentage performance of the asset
   */
  performance: number;
  /**
   * The URL for the item on opensea
   */
  openseaUrl: string;
}
