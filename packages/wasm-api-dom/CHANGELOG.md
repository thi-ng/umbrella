# Change Log

- **Last updated**: 2023-08-12T13:14:08Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.11.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.25) (2023-06-29)

#### ♻️ Refactoring

- Zig v0.11-dev syntax updates ([325bf98](https://github.com/thi-ng/umbrella/commit/325bf98))

### [0.11.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.20) (2023-03-27)

#### ♻️ Refactoring

- update generated imports ([8982c0b](https://github.com/thi-ng/umbrella/commit/8982c0b))
- update imports (TS5.0) ([5d006cc](https://github.com/thi-ng/umbrella/commit/5d006cc))

### [0.11.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.12) (2023-02-05)

#### ♻️ Refactoring

- regenerate types ([a28869d](https://github.com/thi-ng/umbrella/commit/a28869d))

### [0.11.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.2) (2022-11-30)

#### ♻️ Refactoring

- rename types/imports ([#368](https://github.com/thi-ng/umbrella/issues/368)) ([650f59c](https://github.com/thi-ng/umbrella/commit/650f59c))
  - rename exports/imports interfaces => WasmDomExports/Imports
  - update/rename zig imports
  - update readme

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.0) (2022-11-24)

#### 🚀 Features

- add check if auto-initializer is present ([40a32f5](https://github.com/thi-ng/umbrella/commit/40a32f5))

#### ⏱ Performance improvements

- faster event target check/lookup ([8636215](https://github.com/thi-ng/umbrella/commit/8636215))
  - only use linear search if target isn't configured element

### [0.10.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.10.1) (2022-11-24)

#### ♻️ Refactoring

- regenerate types ([6c839e2](https://github.com/thi-ng/umbrella/commit/6c839e2))

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.10.0) (2022-11-23)

#### 🚀 Features

- add getStringAttribAlloc() ([61e301c](https://github.com/thi-ng/umbrella/commit/61e301c))
  - add getStringAttribAlloc() API method
  - refactor/simplify existing attrib accessors
- add listener auto-cleanup ([4b443c2](https://github.com/thi-ng/umbrella/commit/4b443c2))
  - add hidden DOM element property to stored listener IDs
  - update removeElement() to auto-cleanup listeners
  - update Zig API
- add support for event listener attribs ([c7e4864](https://github.com/thi-ng/umbrella/commit/c7e4864))
  - add/update typespecs
  - update Attrib type to support event listener specs to be
    given to createElement() & createCanvas()
  - add getElementByID()
  - update initElement()
  - add WASM auto-initializer hook
- update generated types & string handling ([686f867](https://github.com/thi-ng/umbrella/commit/686f867))
  - switch to extern structs for generated types
  - switch to zero-terminated pointers for string values
  - update/rename/simplify API methods, remove obsolete
  - fix string attrib handling/alloc sizes

#### ♻️ Refactoring

- update string, attrib & listener types/fns [zig] ([9928ab7](https://github.com/thi-ng/umbrella/commit/9928ab7))
- update generated types ([298f194](https://github.com/thi-ng/umbrella/commit/298f194))

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.9.0) (2022-11-01)

#### 🚀 Features

- add attrib creation opts ([0e69c47](https://github.com/thi-ng/umbrella/commit/0e69c47))
  - add Attrib, AttribValue, AttribType types
  - update CreateElementOpts
  - update initElement() to batch create given attribs
  - update doc strings
- update ScrollEvent ([17a6205](https://github.com/thi-ng/umbrella/commit/17a6205))
  - update ScrollEvent.fromEvent() to use target element's scroll offset
  - if attached to window, use global offset

### [0.8.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.8.1) (2022-10-31)

#### ♻️ Refactoring

- add module ID ([6efa4d4](https://github.com/thi-ng/umbrella/commit/6efa4d4))

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.8.0) (2022-10-31)

#### 🚀 Features

- add DOM classList manip, restructure ([e28770f](https://github.com/thi-ng/umbrella/commit/e28770f))
  - add addClass()/removeClass() functions
  - enforce uniform project structure for all `[@thi.ng/wasm-api-](https://github.com/thi-ng/umbrella/tree/main/packages/wasm-api-)*` pkgs
  - rename /zig/wasmapi.zig => /zig/lib.zig

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.7.0) (2022-10-30)

#### 🚀 Features

- update DOM constants, split up Zig API ([b042f91](https://github.com/thi-ng/umbrella/commit/b042f91))
  - update/rename reserved DOM element IDs
  - add `document.head` as reserved element
  - split up zig API into separate smaller files
  - rename DOM element constants

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.6.0) (2022-10-29)

#### 🚀 Features

- add support for recursive DOM tree creation ([36d1857](https://github.com/thi-ng/umbrella/commit/36d1857))
  - update CreateElementOpts w/ recursive `.children` field
  - update createElement() API method to also create children
- add boolean attrib support ([1d9c543](https://github.com/thi-ng/umbrella/commit/1d9c543))
- add fullscreen methods for WindowInfo [zig] ([e480b2c](https://github.com/thi-ng/umbrella/commit/e480b2c))
  - add isFullscreen() & hasFullscreen() helpers

#### 🩹 Bug fixes

- fix fullscreen support for Safari ([1ad855a](https://github.com/thi-ng/umbrella/commit/1ad855a))
  - ofc Safari doesn't support the standard API =;-(

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.5.0) (2022-10-28)

#### 🚀 Features

- major update event types & handling ([2878bce](https://github.com/thi-ng/umbrella/commit/2878bce))
  - major simplification of JS side event processing
  - add regex based event name to event type mappings
  - add DragEvent, PointerEvent, ScrollEvent
  - inject `.fromEvent()` converters for generated event types
  - add `requestFullscreen()` API mechanism
  - update WindowInfo to include fullscreen info & scroll offsets
- add XML namespace support for createElement() ([6074d04](https://github.com/thi-ng/umbrella/commit/6074d04))
  - add public registry of wellknown namespace aliases
- update KeyEvent ([8c91c17](https://github.com/thi-ng/umbrella/commit/8c91c17))
  - add u8 length field to avoid scanning for sentinel
  - add KeyEvent.hasModifier() (zig only)
- update fullscreen handling, add exit support ([998c5fc](https://github.com/thi-ng/umbrella/commit/998c5fc))
  - add exitFullscreen() API method
  - add zig docstrings

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.4.0) (2022-10-26)

#### 🚀 Features

- support more event types/fns, minor zig updates ([d05803d](https://github.com/thi-ng/umbrella/commit/d05803d))
  - add support for focus & wheel events
  - add stopPropagation()
  - update zig error fn return types
- update Zig API ([5165f87](https://github.com/thi-ng/umbrella/commit/5165f87))
  - remove ManagedIndex (see [d8bb3ee7d](https://github.com/thi-ng/umbrella/commit/d8bb3ee7d))
  - move all Zig sources from /include => /zig
  - update pkg
- add/update event types & handling ([4596757](https://github.com/thi-ng/umbrella/commit/4596757))
  - add new more specific event structs to be more mem efficient
  - add EventBody union type
  - refactor Event
  - regenerate sources for TS & Zig
  - move typedefs.json to /src folder

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.3.0) (2022-10-17)

#### 🚀 Features

- update EventListener and RAFListener ([9f97f3d](https://github.com/thi-ng/umbrella/commit/9f97f3d))
  - update EventListener to allow storing a anyopaque pointer
  - update RAFListener to allow storing a anyopaque pointer
- update/rename ManagedIndex ([078df79](https://github.com/thi-ng/umbrella/commit/078df79))
  - rename FreeList => ManagedIndex
  - add/update ManagedIndex functions & generics
  - update DOM listener functions to only use u16 for IDs

#### 🩹 Bug fixes

- fix Firefox TouchEvent handling, update deps ([da3a235](https://github.com/thi-ng/umbrella/commit/da3a235))

#### ⏱ Performance improvements

- add FreeList zig impl ([e2a63c2](https://github.com/thi-ng/umbrella/commit/e2a63c2))
  - add generic FreeList impl & tests
  - store Zig listeners in FreeList to avoid linear searches for free slots
  - update addListener() & requestAnimationFrame() args to
    accept pointers only
  - remove obsolete reuseOrAddSlot()

#### ♻️ Refactoring

- remove obsolete ItemType enum ([1ea7c63](https://github.com/thi-ng/umbrella/commit/1ea7c63))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.2.0) (2022-10-04)

#### 🚀 Features

- update/extend types & API ([e563ccc](https://github.com/thi-ng/umbrella/commit/e563ccc))
  - add RAF support
  - add Event.value field & input event support
  - update/simplify Zig listener handling

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.1.0) (2022-10-03)

#### 🚀 Features

- import as new pkg ([58bacc1](https://github.com/thi-ng/umbrella/commit/58bacc1))
- extend API & types, add docs ([27fc6d6](https://github.com/thi-ng/umbrella/commit/27fc6d6))

#### ♻️ Refactoring

- update Event struct ([80b1d7a](https://github.com/thi-ng/umbrella/commit/80b1d7a))
  - switch clientX/Y to u16
