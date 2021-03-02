import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = () => {
  return (
    <React.Fragment>
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

      <div className="fixed top-0 left-0">
        <ReactTooltip
          className=""
          id="tooltip"
          place="right"
          effect="solid"
          globalEventOff="click"
        >
          <aside className="py-2 uppercase">
            <dt className="mb-1">
              <span className="text-green-500">FIN</span> = This fund has been
              approved by the NFTX Dao
            </dt>
            <dt className="mb-1">
              <span className="text-green-500">VER</span> = definition
            </dt>
            <dt>
              <span className="text-green-500">AMM</span> = This fund can be
              traded on a DEX like SushiSwap
            </dt>
          </aside>
        </ReactTooltip>
      </div>
    </React.Fragment>
  );
};

export default Tooltip;
