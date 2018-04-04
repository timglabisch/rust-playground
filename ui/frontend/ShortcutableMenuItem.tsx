import React, { Fragment } from 'react';

import MenuItem from './MenuItem';

interface ShortcutableMenuItemProps extends React.HTMLProps<HTMLButtonElement> {
  name: string;
  shortcut: string;
}

// Temporarily stop displaying items' shortcuts, until they are hooked up to the shortcut mechanism
const TMP_HIDE_SHORTCUTS = true;

const ShortcutableMenuItem: React.SFC<ShortcutableMenuItemProps> = ({ name, shortcut, children, ...props }) => (
  <MenuItem>
    <button className="shortcut-item" {...props}>
      <div className="shortcut-item__header">
        <span className="shortcut-item__name">{name}</span>
        {!TMP_HIDE_SHORTCUTS && <kbd className="shortcut-item__shortcut">{shortcut}</kbd>}
      </div>
      <span className="shortcut-item__description">{children}</span>
    </button>
  </MenuItem>
);

export default ShortcutableMenuItem;
