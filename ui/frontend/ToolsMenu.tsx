import React from 'react';

import MenuGroup from './MenuGroup';
import ShortcutablePopoverItem from './ShortcutablePopoverItem';

const ToolsMenu = () => (
  <MenuGroup title="Tools">
    <ShortcutablePopoverItem name="Rustfmt" shortcut="Alt/Opt + F">
      Format this code with Rustfmt.
    </ShortcutablePopoverItem>
    <ShortcutablePopoverItem name="Clippy" shortcut="Alt/Opt + C">
      Catch common mistakes and improve the code using the Clippy linter.
    </ShortcutablePopoverItem>
  </MenuGroup>
);

export default ToolsMenu;
