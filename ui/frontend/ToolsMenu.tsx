import React from 'react';

import MenuGroup from './MenuGroup';
import ShortcutableMenuItem from './ShortcutableMenuItem';

const ToolsMenu = () => (
  <MenuGroup title="Tools">
    <ShortcutableMenuItem name="Rustfmt" shortcut="Alt/Opt + F">
      Format this code with Rustfmt.
    </ShortcutableMenuItem>
    <ShortcutableMenuItem name="Clippy" shortcut="Alt/Opt + C">
      Catch common mistakes and improve the code using the Clippy linter.
    </ShortcutableMenuItem>
  </MenuGroup>
);

export default ToolsMenu;
