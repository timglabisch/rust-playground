import React, { Fragment } from 'react';

import PopoverGroup from './PopoverGroup';

const ConfigMenu = () => (
  <Fragment>
    <PopoverGroup title="Editor and UI configuration">
    </PopoverGroup>
    <PopoverGroup title="Assembly minutiae">
    </PopoverGroup>
    {/* TODO: crossing the streams */}
    <div className="popover-group popover-group--validate-options">
      <button className="button-validate">Done configuring!</button>
    </div>
  </Fragment>
);

export default ConfigMenu;
