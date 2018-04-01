import React from 'react';

export const SegmentedButtonSet: React.SFC<{}> = ({ children }) => (
  <div className="segmented-button">{children}</div>
);

interface SegmentedButtonProps extends React.HTMLProps<HTMLButtonElement> {
  isBuild?: boolean;
  innerRef: React.Ref<HTMLElement>;
}

const SegmentedButtonInner: React.SFC<SegmentedButtonProps> = ({ innerRef, isBuild, children, ...props }) => (
  <button
    ref={innerRef}
    {...props}
    className={`segmented-button__button ${isBuild ? 'segmented-button__button--build' : ''}`}>
    {children}
  </button>
);

export const SegmentedButton = React.forwardRef((props, ref) => (
  <SegmentedButtonInner innerRef={ref} {...props} />
));
