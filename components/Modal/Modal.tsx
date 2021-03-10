import React from 'react';
import Button from '@/components/Button';
import { Kind, Size } from '@/components/Button/constants';

export interface ModalProps {
  /**
   * Elements inside the modal
   */
  content?: any;
  /**
   * Primary button
   */
  primaryLabel: string;
  primaryHandleSelect: any;
  /**
   * Optional secondary button
   */
  secondaryLabel?: string;
  secondaryHandleSelect: any;
}

/**
 * Reusable modal
 */
const Modal = ({
  content,
  primaryLabel,
  primaryHandleSelect,
  secondaryLabel,
  secondaryHandleSelect,
}: ModalProps) => (
  <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-50 transition">
    <div className="flex justify-center align-center py-6 px-3">
      <div className="p-6 flex-col justify-center items-center bg-gray-700 border border-gray-500 border-opacity-30">
        <div>{content}</div>
        <div className="flex align-center justify-center pt-6">
          <Button
            kind={Kind.PRIMARY}
            size={Size.SMALL}
            onClick={primaryHandleSelect}
          >
            <span>{primaryLabel}</span>
          </Button>
          {secondaryLabel && secondaryHandleSelect && (
            <div className="pl-3" onClick={secondaryHandleSelect}>
              <Button kind={Kind.TERTIARY} size={Size.SMALL}>
                <span>{secondaryLabel}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
