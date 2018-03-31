import React, { Fragment } from 'react';

import MenuGroup from './MenuGroup';
import SelectableMenuItem from './SelectableMenuItem';
import ValidateOptions from './ValidateOptions';

const ModeChannelMenu = () => (
  <Fragment>
    <MenuGroup title="Mode &mdash; Choose optimization level">
      <SelectableMenuItem name="Debug" selected={true}>
        Build with debug information, without optimizations.
      </SelectableMenuItem>
      <SelectableMenuItem name="Release" selected={false}>
        Build with optimizations turned on.
      </SelectableMenuItem>
    </MenuGroup>
    <MenuGroup title="Channel &mdash; Choose the rust version">
      <SelectableMenuItem name="Stable channel" selected={true}>
        <Desc>Build using the Stable version:</Desc>
        <Desc>1.24.1 (2018-02-05)</Desc>
      </SelectableMenuItem>
      <SelectableMenuItem name="Beta channel" selected={false}>
        <Desc>Build using the Beta version:</Desc>
        <Desc>1.25.0-beta.9 (2018-03-09)</Desc>
      </SelectableMenuItem>
      <SelectableMenuItem name="Nightly channel" selected={false}>
        <Desc>Build using the Nightly version:</Desc>
        <Desc>1.26.0-nightly (2018-03-06)</Desc>
      </SelectableMenuItem>
    </MenuGroup>
    <ValidateOptions>Set these options</ValidateOptions>
  </Fragment>
);

const Desc: React.SFC<{}> = ({ children }) => (
  <p className="mode-channel-menu__description">{children}</p>
);

export default ModeChannelMenu;
