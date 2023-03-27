# Change Log

- **Last updated**: 2023-03-27T19:05:49Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.1.9) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.1.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports ([82767ed](https://github.com/thi-ng/umbrella/commit/82767ed))
- update imports (transducers) ([1ffb357](https://github.com/thi-ng/umbrella/commit/1ffb357))
- dedupe ringRaw() internals ([6af7e1e](https://github.com/thi-ng/umbrella/commit/6af7e1e))
- update imports ([1381ade](https://github.com/thi-ng/umbrella/commit/1381ade))
- update imports ([d885c67](https://github.com/thi-ng/umbrella/commit/d885c67))
- update imports ([e6c97d2](https://github.com/thi-ng/umbrella/commit/e6c97d2))

### [1.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@1.0.3) (2021-08-18)

#### 🩹 Bug fixes

- include missing src folder in pkg ([67e2f71](https://github.com/thi-ng/umbrella/commit/67e2f71))
  - thanks to @djmike for reporting
  - see fix in [fa8fdda12](https://github.com/thi-ng/umbrella/commit/fa8fdda12)

### [0.2.70](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.2.70) (2021-04-24)

#### ♻️ Refactoring

- modulo handling in radialMenu() ([7a207ab](https://github.com/thi-ng/umbrella/commit/7a207ab))
  - reflecting change in [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/main/packages/math)

### [0.2.53](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.2.53) (2021-02-20)

#### ♻️ Refactoring

- use clamp0() ([6c4a2c0](https://github.com/thi-ng/umbrella/commit/6c4a2c0))

### [0.2.44](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.2.44) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([f01e3f4](https://github.com/thi-ng/umbrella/commit/f01e3f4))

### [0.2.42](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.2.42) (2020-11-24)

#### 🩹 Bug fixes

- update XY-pad value rounding/snapping ([d45c073](https://github.com/thi-ng/umbrella/commit/d45c073))

#### ♻️ Refactoring

- update destructuring ([273e2bd](https://github.com/thi-ng/umbrella/commit/273e2bd))

### [0.2.40](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.2.40) (2020-09-22)

#### ♻️ Refactoring

- dedupe dial/ring value labels ([ff2b318](https://github.com/thi-ng/umbrella/commit/ff2b318))
  - extract dialValueLabel() helper
- update textField() key/cursor handling ([27889d3](https://github.com/thi-ng/umbrella/commit/27889d3))
- dedupe button label handling/creation ([467159c](https://github.com/thi-ng/umbrella/commit/467159c))
- dedupe dropdown caret ([69332d9](https://github.com/thi-ng/umbrella/commit/69332d9))
- minor updates IMGUI class ([aec84c6](https://github.com/thi-ng/umbrella/commit/aec84c6))
  - extract gc() method
  - update endTheme()/endDisabled()
- extract layoutBox() helper, re-use ([7e94bb4](https://github.com/thi-ng/umbrella/commit/7e94bb4))
- update hoverButton() behavior, re-use ([a2a4c3b](https://github.com/thi-ng/umbrella/commit/a2a4c3b))
- extract handleTextfieldKeys() ([3c676aa](https://github.com/thi-ng/umbrella/commit/3c676aa))

### [0.2.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.2.39) (2020-09-13)

#### ♻️ Refactoring

- update deps, imports, use new Fn types ([7921929](https://github.com/thi-ng/umbrella/commit/7921929))

### [0.2.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.2.36) (2020-08-19)

#### 🩹 Bug fixes

- don't update curr value to click position ([12d6705](https://github.com/thi-ng/umbrella/commit/12d6705))
  - when click occurs only update result value, not current value
  - fixes jitter issue when component state values are
    being interpolated (externally)

### [0.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.2.7) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([f0552e2](https://github.com/thi-ng/umbrella/commit/f0552e2))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.2.0) (2020-02-25)

#### 🚀 Features

- remove layout, update imports, readme ([c89a6d8](https://github.com/thi-ng/umbrella/commit/c89a6d8))
  - all layout features migrated to new [@thi.ng/layout](https://github.com/thi-ng/umbrella/tree/main/packages/layout) pkg

#### ♻️ Refactoring

- update imports ([feba46c](https://github.com/thi-ng/umbrella/commit/feba46c))

### [0.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.1.6) (2020-01-24)

#### ♻️ Refactoring

- add IClear decl ([f498e31](https://github.com/thi-ng/umbrella/commit/f498e31))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@0.1.0) (2019-08-16)

#### 🚀 Features

- import as new package [@thi.ng/imgui](https://github.com/thi-ng/umbrella/tree/main/packages/imgui) ([f94b430](https://github.com/thi-ng/umbrella/commit/f94b430))
- add key consts, update key handling (shift/alt mods) ([7809734](https://github.com/thi-ng/umbrella/commit/7809734))
- add textField widget, update theme & key handling ([53b068f](https://github.com/thi-ng/umbrella/commit/53b068f))
- add slider value format, minor other updates ([399fa21](https://github.com/thi-ng/umbrella/commit/399fa21))
- add textfield scrolling, cursor movement, word jump ([c94d4d9](https://github.com/thi-ng/umbrella/commit/c94d4d9))
- update textField, set cursor via mouse, update alt move/del ([4f9760d](https://github.com/thi-ng/umbrella/commit/4f9760d))
- update tab handling, allow all items unfocused ([1a63694](https://github.com/thi-ng/umbrella/commit/1a63694))
- add touch support, minor widget refactoring ([dcd19bc](https://github.com/thi-ng/umbrella/commit/dcd19bc))
- add XY-pad widget ([6446e6e](https://github.com/thi-ng/umbrella/commit/6446e6e))
- add dropdown widget, update hover behaviors ([b9d725a](https://github.com/thi-ng/umbrella/commit/b9d725a))
- add color type, keys, update default theme ([e4facae](https://github.com/thi-ng/umbrella/commit/e4facae))
- add home/end key support in textField ([ae75c08](https://github.com/thi-ng/umbrella/commit/ae75c08))
- update dropdown, add tooltip support & tri icon ([d662811](https://github.com/thi-ng/umbrella/commit/d662811))
- add vertical slider, rename slider/sliderGroup ([40c050e](https://github.com/thi-ng/umbrella/commit/40c050e))
  - slider / sliderGroup = sliderH/sliderHGroup
  - add new sliderV / sliderVGroup
- add toggle & radio buttons ([6a491aa](https://github.com/thi-ng/umbrella/commit/6a491aa))
- update theme init/config, add setTheme() ([76ad91c](https://github.com/thi-ng/umbrella/commit/76ad91c))
- add xyPad label offset args, minor refactoring ([d224fe0](https://github.com/thi-ng/umbrella/commit/d224fe0))
- add GridLayout, update all components ([4f94981](https://github.com/thi-ng/umbrella/commit/4f94981))
- add/update layout types, handling, add more ctrl key consts ([4086590](https://github.com/thi-ng/umbrella/commit/4086590))
- update IGridLayout & GridLayout.next() ([0c1d483](https://github.com/thi-ng/umbrella/commit/0c1d483))
  - expose readonly layout props
  - clamp colspan to max cols
  - minor optimizations
- update button, dropdown, radio, sliderHGroup ([588a321](https://github.com/thi-ng/umbrella/commit/588a321))
  - update buttonRaw to allow any IShape
  - update button to provide rect
  - update dropdown, radio, sliderHGroup to use nested layout
  - update radio to support horizontal/vertical layouts
  - remove dropdownRaw, radioRaw, sliderHGroupRaw
- add layouted sliderV/Group, add/update various comp ([7e0bfeb](https://github.com/thi-ng/umbrella/commit/7e0bfeb))
  - add `square` option for toggle() & radio()
  - add sliderV/sliderVGroup()
  - add textLabel() (layouted version)
  - add layouted xyPad w/ opt height constraints
  - minor optimizations GridLayout.next()
  - add IMGUI.textWidth()
- add dial widget, extract key handlers, update layout ([d3d2b27](https://github.com/thi-ng/umbrella/commit/d3d2b27))
  - add dial/diaRaw() widgets
  - extract button & slider value updaters / key handlers
  - add GridLayout.nextSquare()
  - update button, toggle, sliders & xyPad widgets
- add buttonV, radialMenu, update dropdown ([03d5932](https://github.com/thi-ng/umbrella/commit/03d5932))
- rename dial => ring, add new dial, extract dialVal() ([cd9a339](https://github.com/thi-ng/umbrella/commit/cd9a339))
- add component resource caching & GC, update all comps & theme ([7c3d399](https://github.com/thi-ng/umbrella/commit/7c3d399))
  - add .registerID() to mark used components & invalidate cache
  - add .resource() to retrieved component assets
  - update all comps to use cached shapes (at least partially)
- update IMGUIOpts, input handling, optional event handling ([d06a235](https://github.com/thi-ng/umbrella/commit/d06a235))
  - remove width/height from IMGUIOpts
  - add IMGUI.setMouse/setKey to update mouse/key state
  - remove obsolete Set of active keys
  - make existing event handling optional, move to .useDefaultEventHandlers()
- update toggleRaw() to update value earlier ([21ba39d](https://github.com/thi-ng/umbrella/commit/21ba39d))
- add GridLayout.spansForSize/colsForWidth/rowsForHeight ([713dce1](https://github.com/thi-ng/umbrella/commit/713dce1))
- add textTransformH/V, update buttons to allow any body ([05cc31f](https://github.com/thi-ng/umbrella/commit/05cc31f))
  - cache button labels in buttonH/V
- add iconButton() ([07599a4](https://github.com/thi-ng/umbrella/commit/07599a4))
- add cursor blink config, update textFieldRaw() ([1d80e14](https://github.com/thi-ng/umbrella/commit/1d80e14))
- update dropdown key handlers (Esc) ([c2ef036](https://github.com/thi-ng/umbrella/commit/c2ef036))
- non-destructive value updates, local state ([b499c8c](https://github.com/thi-ng/umbrella/commit/b499c8c))
  - update all components to return new values (if edited) or else undefined
  - store local state (dropdown, textfield) in IMGUI state cache
- add cursor & LayoutBox support, add docs ([b8d0892](https://github.com/thi-ng/umbrella/commit/b8d0892))
- add theme stack, extract default event handlers ([b4aee22](https://github.com/thi-ng/umbrella/commit/b4aee22))
- add disabled component stack, update theme & behaviors ([dce481a](https://github.com/thi-ng/umbrella/commit/dce481a))
- add dialGroup, ringGroup, fix/update label hashing ([0333fa6](https://github.com/thi-ng/umbrella/commit/0333fa6))
- add key handling for radialMenu() ([99c2987](https://github.com/thi-ng/umbrella/commit/99c2987))
- add IMGUI.draw flag, update components, add/update hash fns ([c9bc287](https://github.com/thi-ng/umbrella/commit/c9bc287))
- add IMGUI.clear(), update deps ([d10732d](https://github.com/thi-ng/umbrella/commit/d10732d))

#### 🩹 Bug fixes

- touch event handling (FF/Safari) ([af697d9](https://github.com/thi-ng/umbrella/commit/af697d9))

#### ⏱ Performance improvements

- update comp hashing to use murmur hash vs toString, use ES6 Maps ([7db92b9](https://github.com/thi-ng/umbrella/commit/7db92b9))
  - hash() ~2x faster than String()
  - use ES6 Maps for IMGUI resource caches to avoid hash string conv (8-10x faster)

#### ♻️ Refactoring

- update button & dropdown ([c030b4d](https://github.com/thi-ng/umbrella/commit/c030b4d))
- update mouse hover handling ([8e907e0](https://github.com/thi-ng/umbrella/commit/8e907e0))
- update label handling in sliderV/radialMenu, update ring ([ad0d9c9](https://github.com/thi-ng/umbrella/commit/ad0d9c9))
- extract hover behavior fns, fix button behavior ([15ae744](https://github.com/thi-ng/umbrella/commit/15ae744))
  - extract IMGUI.isHover as isHoverSlider()
  - add isHoverButton(), revert behavior to not trigger if mouse released outside
  - update all required comps
