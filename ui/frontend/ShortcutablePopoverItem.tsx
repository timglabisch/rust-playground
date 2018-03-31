import React, { Fragment } from 'react';

interface ShortcutablePopoverItemProps {
  name: string;
  shortcut: string;
}

const ShortcutablePopoverItem: React.SFC<ShortcutablePopoverItemProps> = ({ name, shortcut, children }) => (
  <button className="popover-item shortcut-item">
    <div className="popover-item__header shortcut-item__header">
      <span className="popover-item__name shortcut-item__name">{name}</span>
      <kbd>{shortcut}</kbd>
    </div>
    <span className="popover-item__description shortcut-item__description">{children}</span>
  </button>
);

export default ShortcutablePopoverItem;
