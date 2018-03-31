import React from 'react';

interface SelectablePopoverItemProps {
  name: string;
  selected: boolean;
}

const SelectablePopoverItem: React.SFC<SelectablePopoverItemProps> = ({ name, selected, children }) => (
  <button className={`popover-item selectable-item ${selected ? " selectable-item--selected" : ""}`}>
    <div className="popover-item__header selectable-item__header">
      <span className="popover-item__name selectable-item__name">{name}</span>
      {/* TODO: crossing the streams */}
      {/* TODO: extract */}
      <svg className="icon icon--checkmark" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    </div>
    <span className="popover-item__description selectable-item__description">{children}</span>
  </button>
);

export default SelectablePopoverItem;
