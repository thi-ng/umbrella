# Change Log

- **Last updated**: 2022-10-17T12:08:09Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.3.0) (2022-10-17)

#### 🚀 Features

- update/rename ManagedIndex ([078df79](https://github.com/thi-ng/umbrella/commit/078df79))
  - rename FreeList => ManagedIndex
  - add/update ManagedIndex functions & generics
  - update DOM listener functions to only use u16 for IDs
- update EventListener and RAFListener ([9f97f3d](https://github.com/thi-ng/umbrella/commit/9f97f3d))
  - update EventListener to allow storing a anyopaque pointer
  - update RAFListener to allow storing a anyopaque pointer

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

- extend API & types, add docs ([27fc6d6](https://github.com/thi-ng/umbrella/commit/27fc6d6))
- import as new pkg ([58bacc1](https://github.com/thi-ng/umbrella/commit/58bacc1))

#### ♻️ Refactoring

- update Event struct ([80b1d7a](https://github.com/thi-ng/umbrella/commit/80b1d7a))
  - switch clientX/Y to u16
