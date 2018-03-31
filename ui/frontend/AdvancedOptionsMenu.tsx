import React, { Fragment } from 'react';

import MenuGroup from './MenuGroup';
import PopoverItem from './PopoverItem';
import ValidateOptions from './ValidateOptions';

const AdvancedOptionsMenu = () => (
  <Fragment>
    <MenuGroup title="Advanced options">
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
    </MenuGroup>
    <MenuGroup title="Advanced options &mdash; All of them!">
      <PopoverItem className="advanced-options-item">
        <input type="text" placeholder="-C or -Z ..." />
        For the most exotic of uses, it's also possible to manually set -C and -Z options.
        Brought to you courtesy of RUSTFLAGS.
      </PopoverItem>
    </MenuGroup>
    <ValidateOptions>Set these advanced options</ValidateOptions>
  </Fragment>
);

export default AdvancedOptionsMenu;
