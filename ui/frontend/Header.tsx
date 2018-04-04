import React from 'react';
import { connect } from 'react-redux';

import AdvancedOptionsMenu from './AdvancedOptionsMenu';
import BuildMenu from './BuildMenu';
import ConfigMenu from './ConfigMenu';
import HeaderButton, { RightIcon as RightIconButton } from './HeaderButton';
import { BuildIcon, ConfigIcon, HelpIcon, MoreOptionsIcon } from './Icon';
import ModeChannelMenu from './ModeChannelMenu';
import PopButton, { PopButtonEnhancements } from './PopButton';
import { SegmentedButton, SegmentedButtonSet, SegmentedLink } from './SegmentedButton';
import ToolsMenu from './ToolsMenu';

import {
  navigateToHelp,
  performExecute,
  performGistSave,
} from './actions';
import {
  getExecutionLabel,
} from './selectors';
import State from './state';

interface HeaderProps {
  executionLabel: string;
  modeChannelLabel: string;
  navigateToHelp: () => any;
  execute: () => any;
  gistSave: () => any;
  hasFlags?: boolean;
}

const Header: React.SFC<HeaderProps> = props => (
  <div className="header">
    <HeaderSet id="build">
      <SegmentedButtonSet>
        <SegmentedButton isBuild onClick={props.execute}>
          <RightIconButton icon={<BuildIcon />}>
            {props.executionLabel}
          </RightIconButton>
        </SegmentedButton>
        <PopButton button={BuildMenuButton}>{({ popButtonClose }) => (
          <BuildMenu close={popButtonClose} />
        )}</PopButton>
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="channel-mode">
      <SegmentedButtonSet>
        <PopButton button={({ ...p }) => <ModeChannelMenuButton label={props.modeChannelLabel} {...p} />}>{({ popButtonClose }) => (
          <ModeChannelMenu close={popButtonClose} />
        )}</PopButton>
        <PopButton button={({ ...p }) => <AdvancedOptionsMenuButton hasFlags={props.hasFlags} {...p} />}>
          <AdvancedOptionsMenu />
        </PopButton>
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="share">
      <SegmentedButtonSet>
        <SegmentedButton title="Create shareable links to this code" onClick={props.gistSave}>
          <HeaderButton >Share</HeaderButton>
        </SegmentedButton>
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="tools">
      <SegmentedButtonSet>
        <PopButton button={ToolsMenuButton}>{({ popButtonClose }) => (
          <ToolsMenu close={popButtonClose} />
        )}</PopButton>
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="config">
      <SegmentedButtonSet>
        <PopButton button={ConfigMenuButton}>{({ popButtonClose }) => (
          <ConfigMenu close={popButtonClose} />
        )}</PopButton>
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="help">
      <SegmentedButtonSet>
        <SegmentedLink action={props.navigateToHelp}>
          <HeaderButton icon={<HelpIcon />} />
        </SegmentedLink>
      </SegmentedButtonSet>
    </HeaderSet>
  </div >
);

interface HeaderSetProps {
  id: string;
}

const HeaderSet: React.SFC<HeaderSetProps> = ({ id, children }) => (
  <div className={`header__set header__set--${id}`}>{children}</div>
);

const BuildMenuButton: React.SFC<PopButtonEnhancements> = ({ popButtonProps }) => (
  <SegmentedButton title="Select what to build" {...popButtonProps}>
    <HeaderButton icon={<MoreOptionsIcon />} />
  </SegmentedButton>
);

interface ModeChannelMenuButtonProps extends PopButtonEnhancements {
  label: string;
}

const ModeChannelMenuButton: React.SFC<ModeChannelMenuButtonProps> = ({ label, popButtonProps }) => (
  <SegmentedButton title="Rust version and optimization options" {...popButtonProps}>
    <HeaderButton isExpandable>{label}</HeaderButton>
  </SegmentedButton>
);

interface AdvancedOptionsMenuButtonProps extends PopButtonEnhancements {
  hasFlags: boolean;
}

const AdvancedOptionsMenuButton: React.SFC<AdvancedOptionsMenuButtonProps> = ({ hasFlags, popButtonProps }) => (
  <SegmentedButton
    title={`Advanced compilation flags ${hasFlags ? '(set)' : ''}`}
    {...popButtonProps}>
    <HeaderButton icon={<MoreOptionsIcon />} />
  </SegmentedButton>
);

const ToolsMenuButton: React.SFC<PopButtonEnhancements> = ({ popButtonProps }) => (
  <SegmentedButton title="Run extra tools on the source code" {...popButtonProps}>
    <HeaderButton isExpandable>Tools</HeaderButton>
  </SegmentedButton>
);

const ConfigMenuButton: React.SFC<PopButtonEnhancements> = ({ popButtonProps }) => (
  <SegmentedButton title="Show the configuration options" {...popButtonProps}>
    <HeaderButton icon={<ConfigIcon />} isExpandable>Config</HeaderButton>
  </SegmentedButton>
);

// TODO: make this a selector ?
const getModeChannelLabel = (state: State) => {
  const { configuration: { channel, mode } } = state;
  return `Options : ${mode} / ${channel}`;
}

const mapStateToProps = (state: State) => ({
  executionLabel: getExecutionLabel(state),
  modeChannelLabel: getModeChannelLabel(state),
  navigateToHelp,
});

const mapDispatchToProps = ({
  execute: performExecute,
  gistSave: performGistSave,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
