import React, { Fragment } from 'react';

import MenuGroup from './MenuGroup';
import ValidateOptions from './ValidateOptions';

const ConfigMenu = () => (
  <Fragment>
    <MenuGroup title="Editor and UI configuration">
    </MenuGroup>
    <MenuGroup title="Assembly minutiae">
    </MenuGroup>
    <ValidateOptions>Done configuring!</ValidateOptions>
  </Fragment>
);

export default ConfigMenu;
