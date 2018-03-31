import React from 'react';

import PopoverGroup from './PopoverGroup';
import ShortcutablePopoverItem from './ShortcutablePopoverItem';

const ToolsMenu = () => (
  <PopoverGroup title="Tools">
    <ShortcutablePopoverItem name="Rustfmt" shortcut="Alt/Opt + F">
      Format this code with Rustfmt.
    </ShortcutablePopoverItem>
    <ShortcutablePopoverItem name="Clippy" shortcut="Alt/Opt + C">
      Catch common mistakes and improve the code using the Clippy linter.
    </ShortcutablePopoverItem>
  </PopoverGroup>
);

export default ToolsMenu;
