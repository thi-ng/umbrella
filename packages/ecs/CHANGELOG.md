# Change Log

- **Last updated**: 2024-01-29T21:04:46Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.7.78](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.7.78) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.7.54](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.7.54) (2023-08-04)

#### ♻️ Refactoring

- update INotify impls ([a870653](https://github.com/thi-ng/umbrella/commit/a870653))
  - update ECS & AComponent classes
- update INotify impls ([cbdc527](https://github.com/thi-ng/umbrella/commit/cbdc527))

### [0.7.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.7.31) (2022-11-28)

#### ♻️ Refactoring

- update INotify.notify() signature ([34dca38](https://github.com/thi-ng/umbrella/commit/34dca38))

### [0.7.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.7.12) (2022-07-19)

#### ♻️ Refactoring

- update deprecated DCons call sites ([2bbacf7](https://github.com/thi-ng/umbrella/commit/2bbacf7))

### [0.7.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.7.5) (2022-03-11)

#### ♻️ Refactoring

- update ConsCell refs/imports ([a883993](https://github.com/thi-ng/umbrella/commit/a883993))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.7.0) (2021-11-17)

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

### [0.6.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.6.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [0.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.6.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.6.0) (2021-10-12)

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
- update imports ([7786209](https://github.com/thi-ng/umbrella/commit/7786209))
- update imports (transducers) ([e940647](https://github.com/thi-ng/umbrella/commit/e940647))
- pkg restructure ([2121452](https://github.com/thi-ng/umbrella/commit/2121452))
  - dissolve constants.ts:
    - move event IDs to api.ts
    - move logging to logger.ts
  - update deps

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.5.0) (2021-02-20)

#### 🛑 Breaking changes

- update mem-mapped component type handling ([3207200](https://github.com/thi-ng/umbrella/commit/3207200))
- BREAKING CHANGE: component buffer data type use string consts
  - part of unified umbrella-wide changes to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) Type alias
    (see [a333d4182](https://github.com/thi-ng/umbrella/commit/a333d4182))

### [0.4.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.4.3) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.4.0) (2020-10-19)

#### 🛑 Breaking changes

- add custom mempool support ([1a59405](https://github.com/thi-ng/umbrella/commit/1a59405))
- BREAKING CHANGES: update ECS ctor args, defComponent() return type
  - add ECSOpts for ECS ctor
  - add [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/main/packages/malloc) dep
  - update IComponent.resize() & ECS.defComponent() to use
    configured memory pool impl
  - add/update tests

#### ♻️ Refactoring

- rename IMemPoolAs => IMemPoolArray ([2647274](https://github.com/thi-ng/umbrella/commit/2647274))

### [0.3.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.3.33) (2020-09-13)

#### ♻️ Refactoring

- update imports ([35f5289](https://github.com/thi-ng/umbrella/commit/35f5289))

### [0.3.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.3.15) (2020-05-14)

#### ♻️ Refactoring

- remove obsolete opts (TS3.9) ([c031d41](https://github.com/thi-ng/umbrella/commit/c031d41))

### [0.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.3.2) (2020-02-25)

#### ♻️ Refactoring

- fix [#179](https://github.com/thi-ng/umbrella/issues/179), update MemMappedComponent.get() ([8ee2139](https://github.com/thi-ng/umbrella/commit/8ee2139))
- update imports, internal restruct ([b23df65](https://github.com/thi-ng/umbrella/commit/b23df65))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.3.0) (2020-01-24)

#### 🚀 Features

- update ECS, components, caches ([15e9cea](https://github.com/thi-ng/umbrella/commit/15e9cea))
  - add AComponent.resize() / ECS.setCapacity()
  - add AComponent.valueIndexForID/Unsafe()
  - add IClear impls for caches

#### 🩹 Bug fixes

- fix [#178](https://github.com/thi-ng/umbrella/issues/178), refactor listener handling ([5813afc](https://github.com/thi-ng/umbrella/commit/5813afc))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.2.0) (2019-11-30)

#### 🚀 Features

- add version bits for VersionedIDGen, add/update tests ([cc06f0b](https://github.com/thi-ng/umbrella/commit/cc06f0b))

#### 🩹 Bug fixes

- update VersionedIDGen, add tests ([118405d](https://github.com/thi-ng/umbrella/commit/118405d))

#### ♻️ Refactoring

- restructure pkg, extract AComponent ([9a01b4e](https://github.com/thi-ng/umbrella/commit/9a01b4e))
- replace IDGen w/ [@thi.ng/idgen](https://github.com/thi-ng/umbrella/tree/main/packages/idgen) pkg ([207594c](https://github.com/thi-ng/umbrella/commit/207594c))
- update ECS ctor, update deps, minor refactoring ([a6fa7ff](https://github.com/thi-ng/umbrella/commit/a6fa7ff))
- re-use uintType helper from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([f55cf25](https://github.com/thi-ng/umbrella/commit/f55cf25))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ecs@0.1.0) (2019-11-09)

#### 🚀 Features

- initial refactor & import as new package (MBP2010) ([ad0b566](https://github.com/thi-ng/umbrella/commit/ad0b566))
- add defComponent, fix return types ([8a65446](https://github.com/thi-ng/umbrella/commit/8a65446))
- add UnboundedCache, update Component & Group ctors/opts ([5c36892](https://github.com/thi-ng/umbrella/commit/5c36892))
- add ECS main class, update types, Component, Group ([40dc1b6](https://github.com/thi-ng/umbrella/commit/40dc1b6))
  - move defComponent to ECS
  - add event consts
  - make component default vals optional
  - add Component.notifyChange()
  - fix component value caching (on delete)
  - add Group.run()
  - rename Group.deleteID() => removeID()
- update Group, Component, cache behavior, IDGen, iteration ([e8c72d5](https://github.com/thi-ng/umbrella/commit/e8c72d5))
- add generics for Component & Group related types & methods ([82e3e92](https://github.com/thi-ng/umbrella/commit/82e3e92))
- add/update types, new components, update Group, ECS, add tests ([fdae8a7](https://github.com/thi-ng/umbrella/commit/fdae8a7))
  - add new type aliases & interfaces (mainly mapped types)
  - rename: Component => MemMappedComponent
  - add new Component class for JS value types
  - update ECS.defComponent() to choose correct comp type
  - update Group generics
  - update Group cache invalidation
- add componentsForID/groupsForID(), add NullCache ([416a8b7](https://github.com/thi-ng/umbrella/commit/416a8b7))
- add ECS INotify impl, entity ops, update Group ([0423f35](https://github.com/thi-ng/umbrella/commit/0423f35))
  - update GroupOpts
  - move group auto-naming to defGroup()
  - add existing ID checks for defComponent/defGroup()
  - add ECS.hasID/deleteID()
  - add ECS event support for defEntity()/deleteID()
  - rename event names
  - add IDGen to pkg re-export

#### ♻️ Refactoring

- use intersectionR for Group.addExisting(), update deps ([810b7ea](https://github.com/thi-ng/umbrella/commit/810b7ea))
