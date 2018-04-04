import React from 'react';

import MenuItem from './MenuItem';

interface SelectableMenuItemProps extends React.HTMLProps<HTMLButtonElement> {
  name: string;
  selected: boolean;
}

const SelectableMenuItem: React.SFC<SelectableMenuItemProps> = ({ name, selected, children, ...props }) => (
  <MenuItem>
    <button className={`selectable-item ${selected ? 'selectable-item--selected' : ''}`} {...props}>
      <div className="selectable-item__header">
        <span className="selectable-item__checkmark">
          <Icon />
        </span>
        <span className="selectable-item__name">{name}</span>
      </div>
      <div className="selectable-item__description">{children}</div>
    </button>
  </MenuItem>
);

// TODO: Extract
const Icon = () => (
  <svg className="icon icon--checkmark" height="18" viewBox="2 2 22 22" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export default SelectableMenuItem;
