import React from 'react';

interface PopoverGroupProps {
  title: string;
}

const PopoverGroup: React.SFC<PopoverGroupProps> = ({ title, children }) => (
  <div className="popover-group">
    <h1 className="popover-group__title">{title}</h1>
    {children}
  </div>
);

export default PopoverGroup;
