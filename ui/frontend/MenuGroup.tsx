import React from 'react';

interface MenuGroupProps {
  title: string;
}

const MenuGroup: React.SFC<MenuGroupProps> = ({ title, children }) => (
  <div className="menu-group">
    <h1 className="menu-group__title">{title}</h1>
    {children}
  </div>
);

export default MenuGroup;
