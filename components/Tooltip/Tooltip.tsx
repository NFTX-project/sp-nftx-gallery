import React from 'react';
import ReactTooltip from 'react-tooltip';

export interface TooltipProps {
  /**
   * Elements
   */
  content: any;
}

const Tooltip = ({ content }: FundStatusProp) => {
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
          data-tip="custom show"
          data-event="click focus"
          data-for="tooltip"
          className="cursor-pointer mb-0.5 ml-1"
        >
          <img
            src="/images/tooltip.svg"
            alt="wut"
            height={14}
            width={14}
            className={`inline-block`}
          />
        </a>
        <ReactTooltip
          resizeHide
          overridePosition={(pos, event, target, node, place, desiredPlace) => {
            const rect = target.getBoundingClientRect();
            return {
              left: rect.left + 16,
              top: rect.top + 16 - (node.offsetHeight + rect.height) / 2,
            };
          }}
          backgroundColor="#242526"
          border
          borderColor="#3f4044"
          id="tooltip"
          place="right"
          effect="solid"
          globalEventOff="click"
        >
          {content}
        </ReactTooltip>
      </div>

      <div className="sm:block md:hidden lg:hidden">
        <a
          data-tip="custom show"
          data-event="click focus"
          data-for="tooltip-mobile"
          className="cursor-pointer mb-0.5 ml-1"
        >
          <img
            src="/images/tooltip.svg"
            alt="wut"
            height={14}
            width={14}
            className={`inline-block`}
          />
        </a>

        <ReactTooltip
          resizeHide
          overridePosition={(pos, event, target, node, place, desiredPlace) => {
            const rect = target.getBoundingClientRect();
            return {
              left:
                window.innerWidth > node.offsetWidth
                  ? (window.innerWidth - node.offsetWidth) / 2
                  : 0,
              top: rect.top + 16,
            };
          }}
          backgroundColor="#242526"
          border
          borderColor="#3f4044"
          id="tooltip-mobile"
          place="bottom"
          effect="solid"
          globalEventOff="click"
        >
          {content}
        </ReactTooltip>
      </div>
    </div>
  );
};

export default Tooltip;
