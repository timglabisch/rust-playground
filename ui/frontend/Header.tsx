import React from 'react';
import { connect } from 'react-redux';
import PopButton, { PopButtonEnhancements} from './PopButton';
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
const Header2 = () => (
  <div className="header2">
    <button>BUILD</button>
    <PopButton text="...">
      {props => <BuildMenu {...props} />}
    </PopButton>
  </div>
);

const BuildMenu: React.SFC<PopButtonEnhancements> = ({ popButtonClose }) => (
  <div className="build-options">
    <h1 className="build-options__title">What do you want to do?</h1>
    <BuildOption
        onClick={popButtonClose}
      name="Build"
      description="No bells and whistles, regular build coming right up :D"
    />
    <BuildOption
        onClick={popButtonClose}      name="ASM"
      description="Build and show the resulting assembly code."
    />
    <BuildOption
            onClick={popButtonClose}
      name="LLVM IR"
      description="Build and show the resulting LLVM IR, LLVM's intermediate representation."
    />
    <BuildOption
            onClick={popButtonClose}
      name="MIR"
      description="Build and show the resulting MIR, Rust's intermediate representation."
    />
    <BuildOption
            onClick={popButtonClose}
      name="WASM"
      description="Build a WebAssembly module for web browsers, in the .WAT textual representation.
        Note: WASM currently requires using the Nightly channel, selecting this option will switch to Nightly."
    />
    </div>
);

const BuildOption = ({name, description, onClick}) => (
  <button onClick={onClick} className="build-option">
    <span className="build-option__name">{name}</span>
    <span className="build-option__description">{description}</span>
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
