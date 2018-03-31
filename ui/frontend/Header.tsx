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

const BuildIcon = () => (
  <svg className="icon icon--play" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5v14l11-7z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const ExpandableIcon = () => (
  <svg className="icon icon--expandable" height="10" viewBox="6 8 12 8" width="10" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const MoreOptionsIcon = () => (
  <svg className="icon icon--more" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const ConfigIcon = () => (
  <svg className="icon icon--settings" height="15" viewBox="0 0 24 24" width="15" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
  </svg>
);

const HelpIcon = () => (
  <svg className="icon icon--help" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
  </svg>
);

import AdvancedOptionsMenu from './AdvancedOptionsMenu';
import BuildMenu from './BuildMenu';
import ModeChannelMenu from './ModeChannelMenu';
import ToolsMenu from './ToolsMenu';
import ConfigMenu from './ConfigMenu';

const Header2 = () => {
  const hasFlags = false;

  return (
    <div className="header2">
      <div className="header2__set header2__set--build">
        <div className="segmented-button">
          <button className="segmented-button__button segmented-button__button--build">
            Build
                      <BuildIcon />
          </button>
          <PopButton button={BuildMenuButton}>
            <BuildMenu />
          </PopButton>
        </div>
      </div>
      <div className="header2__set header2__set--channel-mode">
        <div className="segmented-button">
          <PopButton button={ModeChannelMenuButton}>
            <ModeChannelMenu />
          </PopButton>
          <PopButton button={({ ...p }) => <AdvancedOptionsMenuButton hasFlags={hasFlags} {...p} />}>
            <AdvancedOptionsMenu />
          </PopButton>
        </div>
      </div>
      <div className="header2__set header2__set--share">
        <div className="segmented-button">
          <button className="segmented-button__button" title="Create shareable links to this code">Share</button>
        </div>
      </div>
      <div className="header2__set header2__set--tools">
        <div className="segmented-button">
          <PopButton button={ToolsMenuButton}>
            <ToolsMenu />
          </PopButton>
        </div>
      </div>
      <div className="header2__set header2__set--config">
        <div className="segmented-button">
          <PopButton button={ConfigMenuButton}>
            <ConfigMenu />
          </PopButton>
        </div>
      </div>
      <div className="header2__set header2__set--help">
        <div className="segmented-button">
          <button className="segmented-button__button" title="Show help">
            <HelpIcon />
          </button>
        </div>
      </div>
    </div>
  )
};

const BuildMenuButton: React.SFC<PopButtonEnhancements> = ({ popButtonProps }) => (
  <button
    className="segmented-button__button"
    title="Select what to build"
    {...popButtonProps}>
    <MoreOptionsIcon />
  </button>
);

const ModeChannelMenuButton: React.SFC<PopButtonEnhancements> = ({ popButtonProps }) => (
  <button
    className="segmented-button__button"
    title="Rust version and optimization options"
    {...popButtonProps}>
    Options : Debug / Stable
      <ExpandableIcon />
  </button>
);

interface AdvancedOptionsMenuButtonProps extends PopButtonEnhancements {
  hasFlags: boolean;
}

const AdvancedOptionsMenuButton: React.SFC<AdvancedOptionsMenuButtonProps> = ({ hasFlags, popButtonProps }) => {
  const title = hasFlags ? "Show the configured compilation flags" : "Advanced compilation flags";
  const classname = "segmented-button__button ${hasFlags ? 'segmented-button__button--modified' : ''}";

  return (
    <button
      className={classname}
      title={title}
      {...popButtonProps}>
      <MoreOptionsIcon />
    </button>
  );
}

const ToolsMenuButton: React.SFC<PopButtonEnhancements> = ({ popButtonProps }) => (
  <button
    className="segmented-button__button"
    {...popButtonProps}>
    Tools
      <ExpandableIcon />
  </button>
);

const ConfigMenuButton: React.SFC<PopButtonEnhancements> = ({ popButtonProps }) => (
  <button
    className="segmented-button__button"
    title="Show the configuration options"
    {...popButtonProps}>
    Config
      <ConfigIcon />
  </button>
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
