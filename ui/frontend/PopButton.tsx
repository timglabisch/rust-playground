import React from 'react';
import { Portal } from 'react-portal';
import { Arrow, Manager, Popper, Target } from 'react-popper';

type SetRefFunc = (instance: HTMLElement) => void;

interface PopButtonStatelessProps {
  text: string;
  className: string;
  isOpen: boolean;
  icon: React.ReactNode;
  title?: string;
  onClick: () => any;
  setPopperRef: SetRefFunc;
}


// TODO: just take in button props and splat them, or a whole button prop?
const PopButtonStateless: React.SFC<PopButtonStatelessProps> =
  ({ text, title, className, icon, children, isOpen, onClick, setPopperRef }) => (
    <Manager tag={false}>
      <Target>{({ targetProps }) => (
        <button onClick={onClick} className={className} title={title} {...targetProps}>
          {text}
          {icon}
        </button>
      )}</Target>
      {isOpen && <PopButtonPopper setPopperRef={setPopperRef}>{children}</PopButtonPopper>}
    </Manager>
  );

interface PopButtonPopperProps {
  setPopperRef: SetRefFunc;
}

const PopButtonPopper: React.SFC<PopButtonPopperProps> = ({ setPopperRef, children }) => (
  <Portal>
    <div ref={setPopperRef}>
      <Popper className="popper" placement="bottom">
        <Arrow className="popper__arrow" />
        <div className="popper__content">{children}</div>
      </Popper>
    </div>
  </Portal>
);

interface PopButtonProps {
  text?: string;
  className: string;
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode | ((_: PopButtonEnhancements) => React.ReactNode);
}

interface PopButtonState {
  isOpen: boolean;
}

export interface PopButtonEnhancements {
  popButtonClose: () => void;
}

class PopButton extends React.Component<PopButtonProps, PopButtonState> {
  private wrapperRef;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  private handleToggleVisibility = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  private close = () => {
    this.setState({ isOpen: false });
  }

  private setPopperRef = (r) => {
    this.wrapperRef = r;
  }

  private handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.close()
    }
  }

  public componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  public render() {
    const { isOpen } = this.state;
    const { text, className, icon, title, children } = this.props;

    const enhancedProps = { popButtonClose: this.close };
    const enhancedChildren =
      typeof children === 'function' ?
        children(enhancedProps) :
        children;

    return (
      <PopButtonStateless
        text={text}
        className={className}
        icon={icon}
        title={title}
        isOpen={isOpen}
        onClick={this.handleToggleVisibility}
        setPopperRef={this.setPopperRef}>
        {enhancedChildren}
      </PopButtonStateless>
    );
  }
}

export default PopButton;
