import React from 'react';

import MenuItem from './MenuItem';

interface ButtonMenuItemProps {
  name: string;
}

const ButtonMenuItem: React.SFC<ButtonMenuItemProps> = ({ name, children }) => (
  <MenuItem>
    <button className="button-menu-item">
      <p className="button-menu-item__name">{name}</p>
      <p className="button-menu-item__description">{children}</p>
    </button>
  </MenuItem>
);

export default ButtonMenuItem;
