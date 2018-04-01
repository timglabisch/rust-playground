import React from 'react';

import MenuItem from './MenuItem';

interface ButtonMenuItemProps {
  name: string;
}

const ButtonMenuItem: React.SFC<ButtonMenuItemProps> = ({ name, children }) => (
  <MenuItem>
    <button className="button-menu-item">
      <div className="button-menu-item__name">{name}</div>
      <div className="button-menu-item__description">{children}</div>
    </button>
  </MenuItem>
);

export default ButtonMenuItem;
