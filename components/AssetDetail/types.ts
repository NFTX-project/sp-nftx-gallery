import { ReactNode } from 'react';
import { AssetDetailStatus } from './constants';

export interface AssetDetailProps {
  /**
   * The status of the card
   */
  status?: AssetDetailStatus;
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
  name?: string;
  description?: string;
}
