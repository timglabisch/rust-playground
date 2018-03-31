import React from 'react';

interface PopoverItemProps {
  name: string;
  className?: string; // TODO: Review if this is needed
}

const PopoverItem: React.SFC<PopoverItemProps> = ({ name, className = "", children }) => (
  <button className={`popover-item ${className}`}>
    <span className="popover-item__name">{name}</span>
    <span className="popover-item__description">{children}</span>
  </button>
);

export default PopoverItem;
