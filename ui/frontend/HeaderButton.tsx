import React from 'react';

import { ExpandableIcon } from './Icon';

interface HeaderButtonProps {
  icon?: React.ReactNode;
  isExpandable?: boolean;
}

const HeaderButton: React.SFC<HeaderButtonProps> = ({ icon, isExpandable, children }) => (
  <div className="header-button">
    {icon && <div className="header-button__icon">{icon}</div>}
    {children}
    {isExpandable && <div className="header-button__drop"><ExpandableIcon /></div>}
  </div>
);

export default HeaderButton;
