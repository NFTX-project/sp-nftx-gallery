import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import tailwindsConfig from '../../tailwind.config.js';
import Modal from '@/components/Modal';
import Icon, { Icons, Size as IconSize } from '@/components/Icon';
import useMessage from '@/hooks/useMessage';

export interface TooltipProps {
  /**
   * Elements
   */
  content: any;
}

const Tooltip = ({ content }: TooltipProps) => {
  const [showModal, setShowModal] = useState(false);
  const color = tailwindsConfig.theme.extend.colors;

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .__react_component_tooltip.show {
              opacity: 1 !important;
            }
          `,
        }}
      />

      <div className="hidden md:block lg:block">
        <a
          data-tip
          data-for="tooltip"
          className="cursor-pointer ml-1 relative text-gray-500"
        >
          <Icon
            className="absolute top-0 left-0"
            name={Icons.INFO_CIRCLE}
            size={IconSize.SMALL}
          />
        </a>
        <ReactTooltip
          resizeHide
          overridePosition={(pos, event, target, node) => {
            const rect = target.getBoundingClientRect();
            return {
              left: rect.left + 24,
              top: rect.top + 16 - (node.offsetHeight + rect.height) / 2,
            };
          }}
          backgroundColor={color.gray['700']}
          border
          borderColor={color.gray['600']}
          id="tooltip"
          place="right"
          effect="solid"
          globalEventOff="click"
        >
          <div className="py-3">{content}</div>
        </ReactTooltip>
      </div>

      <div className="sm:block md:hidden lg:hidden">
        <a
          className="cursor-pointer ml-1 relative text-gray-500"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <Icon
            className="absolute top-0 left-0"
            name={Icons.INFO_CIRCLE}
            size={IconSize.SMALL}
          />
        </a>
      </div>

      {showModal && (
        <Modal
          content={content}
          primaryLabel={useMessage('modal.cta.okay.text')}
          primaryHandleSelect={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Tooltip;
