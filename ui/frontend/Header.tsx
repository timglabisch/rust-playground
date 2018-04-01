import React from 'react';
import { connect } from 'react-redux';
import PopButton, { PopButtonEnhancements } from './PopButton';

import Link from './uss-router/Link';

import {
  changeChannel,
  changeMode,
  navigateToHelp,
  performClippy,
  performCompileToAssembly,
  performCompileToLLVM,
  performCompileToMir,
  performCompileToWasm,
  performExecute,
  performFormat,
  performGistSave,
  toggleConfiguration,
} from './actions';
import {
  betaVersionText,
  getCrateType,
  isWasmAvailable,
  nightlyVersionText,
  runAsTest,
  stableVersionText,
} from './selectors';
import State from './state';
import { Channel, Mode } from './types';

function oneRadio<T>(
  name: string,
  currentValue: T,
  possibleValue: T,
  change: (T) => any,
  labelText: string,
  extra?: any,
) {
  const id = `${name}-${possibleValue}`;
  return [
    (
      <input
        className="header-set__radio"
        type="radio"
        name={name}
        id={id}
        key={`${id}-input`}
        checked={currentValue === possibleValue}
        onChange={() => change(possibleValue)} />
    ),
    (
      <label
        {...extra}
        className="header-set__radio-label"
        htmlFor={id}
        key={`${id}-label`}
      >
        {labelText}
      </label>
    ),
  ];
}

const executionLabel = (crateType, tests) => {
  if (tests) { return 'Test'; }
  if (crateType === 'bin') { return 'Run'; }
  return 'Build';
};

class Header extends React.PureComponent<HeaderProps> {
  public render() {
    const {
      execute, compileToAssembly, compileToLLVM, compileToMir, compileToWasm,
      format, clippy, gistSave,
      channel, changeChannel, mode, changeMode,
      crateType, tests,
      toggleConfiguration, navigateToHelp,
      stableVersion, betaVersion, nightlyVersion,
      wasmAvailable,
    } = this.props;

    const oneChannel = (value: Channel, labelText, extras) =>
      oneRadio('channel', channel, value, changeChannel, labelText, extras);
    const oneMode = (value: Mode, labelText) =>
      oneRadio('mode', mode, value, changeMode, labelText);

    const primaryLabel = executionLabel(crateType, tests);

    return (
      <div className="header">
        <div className="header-compilation header-set">
          <button className="header-set__btn header-set__btn--primary"
            onClick={execute}>{primaryLabel}</button>
          <div className="header-set__buttons header-set__buttons--primary">
            <button className="header-set__btn"
              onClick={compileToAssembly}>ASM</button>
            <button className="header-set__btn"
              onClick={compileToLLVM}>LLVM IR</button>
            <button className="header-set__btn"
              onClick={compileToMir}>MIR</button>
            <button className="header-set__btn"
              disabled={!wasmAvailable}
              title={wasmAvailable ? undefined : 'Compilation to WASM requires the nightly channel'}
              onClick={compileToWasm}>WASM</button>
          </div>
        </div>

        <div className="header-tools header-set">
          <legend className="header-set__title">Tools</legend>
          <div className="header-set__buttons">
            <button className="header-set__btn"
              onClick={format}>Format</button>
            <button className="header-set__btn"
              onClick={clippy}>Clippy</button>
          </div>
        </div>

        <div className="header-sharing header-set">
          <div className="header-set__buttons">
            <button className="header-set__btn"
              onClick={gistSave}>Share</button>
          </div>
        </div>

        <div className="header-mode header-set">
          <legend className="header-set__title">Mode</legend>
          <div className="header-set__buttons header-set__buttons--radio">
            {oneMode(Mode.Debug, 'Debug')}
            {oneMode(Mode.Release, 'Release')}
          </div>
        </div>

        <div className="header-channel header-set">
          <legend className="header-set__title">Channel</legend>
          <div className="header-set__buttons header-set__buttons--radio">
            {oneChannel(Channel.Stable, 'Stable', { title: stableVersion })}
            {oneChannel(Channel.Beta, 'Beta', { title: betaVersion })}
            {oneChannel(Channel.Nightly, 'Nightly', { title: nightlyVersion })}
          </div>
        </div>

        <div className="header-set">
          <div className="header-set__buttons">
            <button className="header-set__btn"
              onClick={toggleConfiguration}>Config</button>
          </div>
        </div>

        <div className="header-set">
          <div className="header-set__buttons">
            <Link className="header-set__btn" action={navigateToHelp}>?</Link>
          </div>
        </div>
      </div>
    );
  }
}

interface HeaderProps {
  changeChannel: (Channel) => any;
  changeMode: (Mode) => any;
  channel: Channel;
  clippy: () => any;
  compileToAssembly: () => any;
  compileToLLVM: () => any;
  compileToMir: () => any;
  compileToWasm: () => any;
  execute: () => any;
  format: () => any;
  gistSave: () => any;
  mode: Mode;
  crateType: string;
  tests: boolean;
  toggleConfiguration: () => any;
  navigateToHelp: () => any;
  stableVersion: string;
  betaVersion: string;
  nightlyVersion: string;
  wasmAvailable: boolean;
}

// TODO: Rename and remove existing header when rebasing

// Header buttons are of three types: regular header button that is a UI action, PopButton (expandable) whose action triggers
// showing a Popover, segmented buttons which are conceptually two buttons stuck together (a "main" one triggering
// an action or showing a Popover, and an "options" one usually showing a Popover).

// Popovers contain one or more PopoverGroups. A PopoverGroup contains PopoverItems.
// A PopoverItem is a name and description, a user can interact with, generating an action of some kind.
// There are conceptually two types of PopoverGroups: stateless, and stateful. The stateful PopoverGroups behave like
// radio buttons, remembering which of their "selectable" PopoverItems is currently selected.
// There are three types of PopoverItems: simple actions, the "selectable" actions (ones with a 'selected' UI state,
// used inside "radio button" PopoverGroups), and actions that can also be triggered via a keyboard shortcut (so they
// have additional information and behavior in the UI)


import AdvancedOptionsMenu from './AdvancedOptionsMenu';
import BuildMenu from './BuildMenu';
import ModeChannelMenu from './ModeChannelMenu';
import ToolsMenu from './ToolsMenu';
import ConfigMenu from './ConfigMenu';
import HeaderButton from './HeaderButton';
import { BuildIcon, HelpIcon, MoreOptionsIcon, ConfigIcon } from './Icon';
import { SegmentedButtonSet, SegmentedButton } from './SegmentedButton';

const Header2 = () => {
  const hasFlags = false;

  return (
    <div className="header2">
      <HeaderSet id="build">
        <SegmentedButtonSet>
          <SegmentedButton isBuild>
            <HeaderButton>Build <BuildIcon /></HeaderButton>
          </SegmentedButton>
          <PopButton button={BuildMenuButton}>
            <BuildMenu />
          </PopButton>
        </SegmentedButtonSet>
      </HeaderSet>
      <HeaderSet id="channel-mode">
        <SegmentedButtonSet>
          <PopButton button={ModeChannelMenuButton}>
            <ModeChannelMenu />
          </PopButton>
          <PopButton button={({ ...p }) => <AdvancedOptionsMenuButton hasFlags={hasFlags} {...p} />}>
            <AdvancedOptionsMenu />
          </PopButton>
        </SegmentedButtonSet>
      </HeaderSet>
      <HeaderSet id="share">
        <SegmentedButtonSet>
          <SegmentedButton title="Create shareable links to this code">
            <HeaderButton>Share</HeaderButton>
          </SegmentedButton>
        </SegmentedButtonSet>
      </HeaderSet>
      <HeaderSet id="tools">
        <SegmentedButtonSet>
          <PopButton button={ToolsMenuButton}>
            <ToolsMenu />
          </PopButton>
        </SegmentedButtonSet>
      </HeaderSet>
      <HeaderSet id="config">
        <SegmentedButtonSet>
          <PopButton button={ConfigMenuButton}>
            <ConfigMenu />
          </PopButton>
        </SegmentedButtonSet>
      </HeaderSet>
      <HeaderSet id="help">
        <SegmentedButtonSet>
          <SegmentedButton title="Show help">
            <HeaderButton><HelpIcon /></HeaderButton>
          </SegmentedButton>
        </SegmentedButtonSet>
      </HeaderSet>
    </div >
  )
};

interface HeaderSetProps {
  id: string;
}

const HeaderSet: React.SFC<HeaderSetProps> = ({ id, children }) => (
  <div className={`header2__set header2__set--${id}`}>{children}</div>
);

const BuildMenuButton: React.SFC<PopButtonEnhancements> = ({ popButtonProps }) => (
  <SegmentedButton title="Select what to build" {...popButtonProps}>
    <HeaderButton><MoreOptionsIcon /></HeaderButton>
  </SegmentedButton>
);

const ModeChannelMenuButton: React.SFC<PopButtonEnhancements> = ({ popButtonProps }) => (
  <SegmentedButton title="Rust version and optimization options" {...popButtonProps}>
    <HeaderButton isExpandable>Options : Debug / Stable</HeaderButton>
  </SegmentedButton>
);

interface AdvancedOptionsMenuButtonProps extends PopButtonEnhancements {
  hasFlags: boolean;
}

const AdvancedOptionsMenuButton: React.SFC<AdvancedOptionsMenuButtonProps> = ({ hasFlags, popButtonProps }) => (
  <SegmentedButton
    title={`Advanced compilation flags ${hasFlags ? '(set)' : ''}`}
    {...popButtonProps}>
    <HeaderButton><MoreOptionsIcon /></HeaderButton>
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

const mapStateToProps = (state: State) => {
  const { configuration: { channel, mode } } = state;

  return {
    channel,
    mode,
    crateType: getCrateType(state),
    tests: runAsTest(state),
    navigateToHelp,
    stableVersion: stableVersionText(state),
    betaVersion: betaVersionText(state),
    nightlyVersion: nightlyVersionText(state),
    wasmAvailable: isWasmAvailable(state),
  };
};

const mapDispatchToProps = ({
  changeChannel,
  changeMode,
  clippy: performClippy,
  compileToAssembly: performCompileToAssembly,
  compileToLLVM: performCompileToLLVM,
  compileToMir: performCompileToMir,
  compileToWasm: performCompileToWasm,
  execute: performExecute,
  format: performFormat,
  gistSave: performGistSave,
  toggleConfiguration,
});

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header2);

export default ConnectedHeader;
