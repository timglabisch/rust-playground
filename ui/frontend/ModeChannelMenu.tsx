import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import MenuGroup from './MenuGroup';
import SelectableMenuItem from './SelectableMenuItem';
import ValidateOptions from './ValidateOptions';

import { changeChannel, changeMode } from './actions';
import {
  betaVersionText,
  nightlyVersionText,
  stableVersionText,
} from './selectors';
import State from './state';
import { Channel, Mode } from './types';

interface ModeChannelMenuProps {
  mode: Mode;
  channel: Channel;
  changeChannel: (_: Channel) => any;
  changeMode: (_: Mode) => any;
  stableVersion: string;
  betaVersion: string;
  nightlyVersion: string;
  close: () => void;
}

const ModeChannelMenu: React.SFC<ModeChannelMenuProps> = props => (
  <Fragment>
    <MenuGroup title="Mode &mdash; Choose optimization level">
      <SelectOne name="Debug" currentValue={props.mode} thisValue={Mode.Debug} changeValue={props.changeMode}>
        Build with debug information, without optimizations.
      </SelectOne>
      <SelectOne name="Release" currentValue={props.mode} thisValue={Mode.Release} changeValue={props.changeMode}>
        Build with optimizations turned on.
      </SelectOne>
    </MenuGroup>
    <MenuGroup title="Channel &mdash; Choose the rust version">
      <SelectOne
        name="Stable channel"
        currentValue={props.channel}
        thisValue={Channel.Stable}
        changeValue={props.changeChannel}
      >
        <Desc>Build using the Stable version:</Desc>
        <Desc>{props.stableVersion}</Desc>
      </SelectOne>
      <SelectOne
        name="Beta channel"
        currentValue={props.channel}
        thisValue={Channel.Beta}
        changeValue={props.changeChannel}
      >
        <Desc>Build using the Beta version:</Desc>
        <Desc>{props.betaVersion}</Desc>
      </SelectOne>
      <SelectOne
        name="Nightly channel"
        currentValue={props.channel}
        thisValue={Channel.Nightly}
        changeValue={props.changeChannel}
      >
        <Desc>Build using the Nightly version:</Desc>
        <Desc>{props.nightlyVersion}</Desc>
      </SelectOne>
    </MenuGroup>
    {/* <ValidateOptions onClick={props.close}>Set these options</ValidateOptions> */}
  </Fragment>
);

interface SelectOneProps<T> {
  name: string;
  currentValue: T;
  thisValue: T;
  changeValue: (_: T) => any;
}

class SelectOne<T> extends React.PureComponent<SelectOneProps<T>> {
  public render() {
    const { name, currentValue, thisValue, children, changeValue } = this.props;

    return (
      <SelectableMenuItem
        name={name}
        selected={currentValue === thisValue}
        onClick={() => changeValue(thisValue)}>
        {children}
      </SelectableMenuItem>
    );
  }
}

const Desc: React.SFC<{}> = ({ children }) => (
  <p className="mode-channel-menu__description">{children}</p>
);

const mapStateToProps = (state: State) => {
  const { configuration: { channel, mode } } = state;

  return {
    channel,
    mode,
    stableVersion: stableVersionText(state),
    betaVersion: betaVersionText(state),
    nightlyVersion: nightlyVersionText(state),
  };
};

const mapDispatchToProps = {
  changeChannel,
  changeMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeChannelMenu);
