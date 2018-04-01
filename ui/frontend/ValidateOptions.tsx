import React from 'react';

const ValidateOptions: React.SFC<React.HTMLProps<HTMLButtonElement>> = ({ children, ...props }) => (
  // TODO: needed nesting?
  <div className="validate-options">
    <button className="validate-options__button" {...props}>{children}</button>
  </div>
);

export default ValidateOptions;
