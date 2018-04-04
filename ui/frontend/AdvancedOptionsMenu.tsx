import React, { Fragment } from 'react';

import { Either as EitherConfig } from './ConfigElement';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import ValidateOptions from './ValidateOptions';

const AdvancedOptionsMenu = () => (
  <Fragment>
    <MenuGroup title="Advanced options">
      <EitherConfig id="backtraces" name="Backtraces" a="On" b="Off" value="Off" onChange={console.log} />
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
