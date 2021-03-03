import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = () => {
  const content = (
    <aside className="py-2 uppercase">
      <dt className="mb-1">
        <span className="text-green-500">FIN</span> = This fund has been
        approved by the NFTX Dao
      </dt>
      <dt className="mb-1">
        <span className="text-green-500">VER</span> = definition
      </dt>
      <dt>
        <span className="text-green-500">AMM</span> = This fund can be traded on
        a DEX like SushiSwap
      </dt>
    </aside>
  );

  return (
    <div>
      <a
        data-tip="custom show"
        data-event="click focus"
        data-for="tooltip"
        className="hidden sm:hidden md:block lg:block cursor-pointer mb-0.5 ml-1"
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
        background="#242526"
        border
        borderColor="#3f4044"
        id="tooltip"
        place="right"
        effect="solid"
        globalEventOff="click"
      >
        {content}
      </ReactTooltip>

      <a
        data-tip="custom show"
        data-event="click focus"
        data-for="tooltip-mobile"
        className="block sm:block md:hidden lg:hidden cursor-pointer mb-0.5 ml-1"
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
          // console.log(event, target, node, node.offsetWidth)
          const rect = target.getBoundingClientRect();
          return {
            left: (window.innerWidth - node.offsetWidth) / 2,
            top: rect.top + 16,
          };
        }}
        background="#242526"
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
  );
};

export default Tooltip;
