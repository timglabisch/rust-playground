import React from 'react';

import MenuGroup from './MenuGroup';
import ButtonMenuItem from './ButtonMenuItem';

const BuildMenu = () => (
  <MenuGroup title="What do you want to do?">
    <ButtonMenuItem name="Build">
      No bells and whistles, regular build coming right up&nbsp;:D
    </ButtonMenuItem>
    <ButtonMenuItem name="ASM">
      Build and show the resulting assembly code.
    </ButtonMenuItem>
    <ButtonMenuItem name="LLVM IR">
      Build and show the resulting LLVM IR, LLVM's intermediate representation.
    </ButtonMenuItem>
    <ButtonMenuItem name="MIR">
      Build and show the resulting MIR, Rust's intermediate representation.
    </ButtonMenuItem>
    <ButtonMenuItem name="WASM">
      Build a WebAssembly module for web browsers, in the .WAT textual representation.
      <p className="build-menu__aside">
        Note: WASM currently requires using the Nightly channel, selecting this
        option will switch to Nightly.
      </p>
    </ButtonMenuItem>
  </MenuGroup>
);

export default BuildMenu;
