import React from 'react';

import MenuGroup from './MenuGroup';
import PopoverItem from './PopoverItem';

const BuildMenu = () => (
  <MenuGroup title="What do you want to do?">
    <PopoverItem name="Build">
      No bells and whistles, regular build coming right up&nbsp;:D
    </PopoverItem>
    <PopoverItem name="ASM">
      Build and show the resulting assembly code.
    </PopoverItem>
    <PopoverItem name="LLVM IR">
      Build and show the resulting LLVM IR, LLVM's intermediate representation.
    </PopoverItem>
    <PopoverItem name="MIR">
      Build and show the resulting MIR, Rust's intermediate representation.
    </PopoverItem>
    <PopoverItem name="WASM">
      Build a WebAssembly module for web browsers, in the .WAT textual representation.
      <em>Note: WASM currently requires using the Nightly channel, selecting this option will switch to Nightly.</em>
    </PopoverItem>
  </MenuGroup>
);

export default BuildMenu;
