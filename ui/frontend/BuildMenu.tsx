import React from 'react';
import { connect } from 'react-redux';

import {
  performCompileToAssembly,
  performCompileToLLVM,
  performCompileToMir,
  performCompileToWasm,
  performExecute,
} from './actions';

import ButtonMenuItem from './ButtonMenuItem';
import MenuGroup from './MenuGroup';

interface BuildMenuProps {
  compileToAssembly: () => any;
  compileToLLVM: () => any;
  compileToMir: () => any;
  compileToWasm: () => any;
  execute: () => any;
  close: () => void;
}

const BuildMenu: React.SFC<BuildMenuProps> = props => (
  <MenuGroup title="What do you want to do?">
    <ButtonMenuItem name="Build" onClick={() => { props.execute(); props.close(); }}>
      No bells and whistles, regular build coming right up&nbsp;:D
    </ButtonMenuItem>
    <ButtonMenuItem name="ASM" onClick={() => { props.compileToAssembly(); props.close(); }}>
      Build and show the resulting assembly code.
    </ButtonMenuItem>
    <ButtonMenuItem name="LLVM IR" onClick={() => { props.compileToLLVM(); props.close(); }}>
      Build and show the resulting LLVM IR, LLVM's intermediate representation.
    </ButtonMenuItem>
    <ButtonMenuItem name="MIR" onClick={() => { props.compileToMir(); props.close(); }}>
      Build and show the resulting MIR, Rust's intermediate representation.
    </ButtonMenuItem>
    <ButtonMenuItem name="WASM" onClick={() => { props.compileToWasm(); props.close(); }}>
      Build a WebAssembly module for web browsers, in the .WAT textual representation.
      <p className="build-menu__aside">
        Note: WASM currently requires using the Nightly channel, selecting this
        option will switch to Nightly.
      </p>
    </ButtonMenuItem>
  </MenuGroup >
);

const mapDispatchToProps = ({
  compileToAssembly: performCompileToAssembly,
  compileToLLVM: performCompileToLLVM,
  compileToMir: performCompileToMir,
  compileToWasm: performCompileToWasm,
  execute: performExecute,
});

export default connect(undefined, mapDispatchToProps)(BuildMenu);
