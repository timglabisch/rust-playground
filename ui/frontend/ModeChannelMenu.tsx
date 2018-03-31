import React, { Fragment } from 'react';

import PopoverGroup from './PopoverGroup';
import SelectablePopoverItem from './SelectablePopoverItem';

const ModeChannelMenu = () => (
  <Fragment>
    <PopoverGroup title="Mode &mdash; Choose optimization level">
      <SelectablePopoverItem name="Debug" selected={true}>
        Build with debug information, without optimizations.
      </SelectablePopoverItem>
      <SelectablePopoverItem name="Release" selected={false}>
        Build with optimizations turned on.
      </SelectablePopoverItem>
    </PopoverGroup>
    <PopoverGroup title="Channel &mdash; Choose the rust version">
      <SelectablePopoverItem name="Stable channel" selected={true}>
        Build using the Stable version: 1.24.1 (2018-02-05).
      </SelectablePopoverItem>
      <SelectablePopoverItem name="Beta channel" selected={false}>
        Build using the Beta version: 1.25.0-beta.9 (2018-03-09).
      </SelectablePopoverItem>
      <SelectablePopoverItem name="Nightly channel" selected={false}>
        Build using the Nightly version: 1.26.0-nightly (2018-03-06).
      </SelectablePopoverItem>
    </PopoverGroup>
    {/* TODO: Crossing the streams */}
    <div className="popover-group popover-group--validate-options">
      <button className="button-validate">Set these options</button>
    </div>
  </Fragment>
);

export default ModeChannelMenu;
