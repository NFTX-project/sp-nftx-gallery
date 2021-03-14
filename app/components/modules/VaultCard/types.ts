import { Asset } from '@/types/asset';
import { ReactNode } from 'react';
import { VaultCardStatus, VaultCardType } from './constants';

export interface VaultCardProps {
  /**
   * The type of item being viewed, i.e., Fund or Asset
   */
  type?: VaultCardType;
  /**
   * The asset object (if it's an asset card)
   */
  asset?: Asset;
  /**
   * The status of the card
   */
  status?: VaultCardStatus;
  /**
   * The image src to be rendered
   */
  image?: string;
  /**
   * The image srcSet to be used
   */
  imageSrcSet?: string;
  /**
   * The image alt tag
   */
  imageAlt?: string;
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
}
