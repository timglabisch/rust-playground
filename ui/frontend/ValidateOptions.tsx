import React from 'react';

const ValidateOptions: React.SFC<{}> = ({ children }) => (
  // TODO: needed nesting?
  <div className="validate-options">
    <button className="validate-options__button">{children}</button>
  </div>
);

export default ValidateOptions;
