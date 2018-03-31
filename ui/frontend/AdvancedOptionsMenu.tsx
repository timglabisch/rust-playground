import React, { Fragment } from 'react';

import PopoverGroup from './PopoverGroup';
import PopoverItem from './PopoverItem';

const AdvancedOptionsMenu = () => (
  <Fragment>
    <PopoverGroup title="Advanced options">
      {/*  TODO: crossing css streams here */}
      <div className="popover-item advanced-options-item advanced-options-toggle">
        <div className="popover-item__header">
          <span className="popover-item__name">Backtraces</span>
          <div className="popover-toggle">
            <input id="backtraces-on" name="backtraces" value="on" type="radio" />
            <label htmlFor="backtraces-on">On</label>
            <input id="backtraces-off" name="backtraces" value="off" type="radio" checked />
            <label htmlFor="backtraces-off">Off</label>
          </div>
        </div>
      </div>
    </PopoverGroup>
    <PopoverGroup title="Advanced options &mdash; All of them!">
      <PopoverItem name="" className="advanced-options-item">
        <input type="text" placeholder="-C or -Z ..." />
        For the most exotic of uses, it's also possible to manually set -C and -Z options.
        Brought to you courtesy of RUSTFLAGS.
      </PopoverItem>
    </PopoverGroup>
    <div className="popover-group popover-group--validate-options">
      <button className="button-validate">Set these advanced options</button>
    </div>
  </Fragment>
);

export default AdvancedOptionsMenu;
