import React, { Fragment } from 'react';

import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import ValidateOptions from './ValidateOptions';

const BooleanConfig = ({ id, name }) => (
  <MenuItem>
    <div className="boolean-config">
      <span className="boolean-config__name">{name}</span>
      <div className="boolean-config__toggle">
        <input id={`${id}-on`} name="backtraces" value="on" type="radio" />
        <label htmlFor={`${id}-on`}>On</label>
        <input id={`${id}-off`} name="backtraces" value="off" type="radio" checked />
        <label htmlFor={`${id}-off`}>Off</label>
      </div>
    </div>
  </MenuItem >
);

const AdvancedOptionsMenu = () => (
  <Fragment>
    <MenuGroup title="Advanced options">
      <BooleanConfig id="backtraces" name="Backtraces" />
    </MenuGroup>
    <MenuGroup title="Advanced options &mdash; All of them!">
      <MenuItem>
        <input className="advanced-options-menu__rustflags" type="text" placeholder="-C or -Z ..." />
        For the most exotic of uses, it's also possible to manually set -C and -Z options.
        Brought to you courtesy of RUSTFLAGS.
      </MenuItem>
    </MenuGroup>
    <ValidateOptions>Set these advanced options</ValidateOptions>
  </Fragment>
);

export default AdvancedOptionsMenu;
