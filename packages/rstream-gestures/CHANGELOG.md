# Change Log

- **Last updated**: 2024-03-07T20:40:47Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [5.0.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@5.0.31) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@5.0.0) (2023-04-08)

#### 🛑 Breaking changes

- support zoom reset via subscription ([03b1621](https://github.com/thi-ng/umbrella/commit/03b1621))
- BREAKING CHANGE: Original DOM event **might** not anymore be present in all cases
  - update GestureStreamOpts.zoom to accept subscription
  - update gestureStream() to support resetting of zoom value via subscription
  - update docs

#### ♻️ Refactoring

- update stream ID handling ([2c9fa02](https://github.com/thi-ng/umbrella/commit/2c9fa02))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@4.1.0) (2021-11-17)

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

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@4.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@4.0.0) (2021-10-12)

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
- update imports (transducers) ([7fc60cd](https://github.com/thi-ng/umbrella/commit/7fc60cd))
- update imports in various pkgs (rstream) ([342cf54](https://github.com/thi-ng/umbrella/commit/342cf54))

### [3.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@3.0.6) (2021-02-20)

#### ♻️ Refactoring

- simplify gestureStream() ([2ea805a](https://github.com/thi-ng/umbrella/commit/2ea805a))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@3.0.0) (2020-12-22)

#### 🛑 Breaking changes

- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace GestureType enum ([80ef1e1](https://github.com/thi-ng/umbrella/commit/80ef1e1))
- BREAKING CHANGE: replace GestureType w/ type alias

### [2.0.45](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@2.0.45) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [2.0.40](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@2.0.40) (2020-09-27)

#### 🩹 Bug fixes

- use correct event var ([6c7c0a9](https://github.com/thi-ng/umbrella/commit/6c7c0a9))
  - for some reason used global `event` instead of actual `e`

### [2.0.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@2.0.36) (2020-08-17)

#### 🩹 Bug fixes

- don't cache DPR value ([bffbedb](https://github.com/thi-ng/umbrella/commit/bffbedb))
  - fixes issue when window is moved between displays
    w/ different densities

### [2.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@2.0.9) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([68702ca](https://github.com/thi-ng/umbrella/commit/68702ca))

### [2.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@2.0.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([1682d8f](https://github.com/thi-ng/umbrella/commit/1682d8f))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@2.0.0) (2020-01-24)

#### 🛑 Breaking changes

- add multitouch support, almost complete pkg rewrite ([031d89b](https://github.com/thi-ng/umbrella/commit/031d89b))
  - rewrite gestureStream()
  - update GestureEvent/GestureInfo structure
  - add new GestureStreamOpts
  - TODO update docs / docstrings
- BREAKING CHANGE: New `GestureEvent` & `GestureInfo` data formats,
  add multitouch support

#### 🚀 Features

- update deps, zoom delta calc, GestureInfo ([6bbbd55](https://github.com/thi-ng/umbrella/commit/6bbbd55))
  - make GestureInfo `click` & `delta` fields optional (already only present
    if GestureType.DRAG)
  - use @acarabott's zoom delta calc

#### 🩹 Bug fixes

- fixed the bug allowing the user to drag without pressing anything and improved types ([e5a9996](https://github.com/thi-ng/umbrella/commit/e5a9996))
- remove duplicate MOVE events ([0c8da9b](https://github.com/thi-ng/umbrella/commit/0c8da9b))
  - add check if target element is `document.body`
  - if so don't add temp mousemove listener

#### ♻️ Refactoring

- split into sep files, add docs/readme ([37b1c7b](https://github.com/thi-ng/umbrella/commit/37b1c7b))

### [1.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@1.2.4) (2019-08-21)

#### 🚀 Features

- add `buttons` to GestureInfo ([2d837e2](https://github.com/thi-ng/umbrella/commit/2d837e2))
  - active touch events (touchstart/move) will set buttons = 1

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@1.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([412dd46](https://github.com/thi-ng/umbrella/commit/412dd46))

#### ♻️ Refactoring

- TS strictNullChecks ([bac2904](https://github.com/thi-ng/umbrella/commit/bac2904))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@1.1.0) (2019-04-11)

#### 🚀 Features

- add zoomDelta output ([68c4b45](https://github.com/thi-ng/umbrella/commit/68c4b45))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

#### 🩹 Bug fixes

- disable __GestureType reverse enum export ([19449e8](https://github.com/thi-ng/umbrella/commit/19449e8))

#### ♻️ Refactoring

- use arrow fns ([8904cb4](https://github.com/thi-ng/umbrella/commit/8904cb4))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@0.6.0) (2018-11-24)

#### 🚀 Features

- add absZoom option (abs vs. relative) ([bab55c3](https://github.com/thi-ng/umbrella/commit/bab55c3))

### [0.5.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@0.5.16) (2018-10-24)

#### 🩹 Bug fixes

- fix incorrect local position when scrolled ([f1f6af4](https://github.com/thi-ng/umbrella/commit/f1f6af4))
  fixes: https://github.com/thi-ng/umbrella/issues/56
  uses getBoundingClientRect() instead of offsetLeft / offsetTop

### [0.5.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@0.5.10) (2018-09-24)

#### ⏱ Performance improvements

- `GestureType` => const enum ([8e4fc90](https://github.com/thi-ng/umbrella/commit/8e4fc90))
  - export `__GestureType` for reverse lookups

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@0.5.0) (2018-08-27)

#### 🚀 Features

- add options for local & scaled positions ([ccc40a9](https://github.com/thi-ng/umbrella/commit/ccc40a9))
  - add `local` and `scale` options & docs

### [0.4.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@0.4.6) (2018-07-13)

#### 🩹 Bug fixes

- touchevent check in safari ([ee48a94](https://github.com/thi-ng/umbrella/commit/ee48a94))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@0.4.0) (2018-07-04)

#### 🚀 Features

- add event & preventDefault opts, update docs ([de17340](https://github.com/thi-ng/umbrella/commit/de17340))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@0.3.0) (2018-05-09)

#### 🚀 Features

- add zoom smooth config option, update readme ([053c8c6](https://github.com/thi-ng/umbrella/commit/053c8c6))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@0.2.0) (2018-04-24)

#### 🚀 Features

- allows partial opts, add ID option ([3408c13](https://github.com/thi-ng/umbrella/commit/3408c13))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@0.1.0) (2018-04-14)

#### 🚀 Features

- initial import [@thi.ng/rstream-gestures](https://github.com/thi-ng/umbrella/tree/main/packages/rstream-gestures) ([de1ac7b](https://github.com/thi-ng/umbrella/commit/de1ac7b))
