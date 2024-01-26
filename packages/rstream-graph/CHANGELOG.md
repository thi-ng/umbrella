# Change Log

- **Last updated**: 2024-01-26T18:03:04Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.1.85](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@4.1.85) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [4.1.53](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@4.1.53) (2023-03-27)

#### ♻️ Refactoring

- update remaining type imports (TS5.0) in various pkgs ([e0edf26](https://github.com/thi-ng/umbrella/commit/e0edf26))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@4.1.0) (2021-11-17)

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

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@4.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@4.0.0) (2021-10-12)

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
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports (transducers) ([7fc60cd](https://github.com/thi-ng/umbrella/commit/7fc60cd))
- update imports in various pkgs (rstream) ([342cf54](https://github.com/thi-ng/umbrella/commit/342cf54))
- extract getNodeInput() ([6c197fe](https://github.com/thi-ng/umbrella/commit/6c197fe))

### [3.2.60](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.2.60) (2021-03-12)

#### ♻️ Refactoring

- update types to use ISubscription ([224f614](https://github.com/thi-ng/umbrella/commit/224f614))
- update .subscribe() call sites ([009b83b](https://github.com/thi-ng/umbrella/commit/009b83b))
- update types/generics ([2597482](https://github.com/thi-ng/umbrella/commit/2597482))
  - update types due to changes in rstream interfaces

### [3.2.41](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.2.41) (2020-09-22)

#### ♻️ Refactoring

- update prepareNodeInputs/Outputs() ([088bf37](https://github.com/thi-ng/umbrella/commit/088bf37))

### [3.2.40](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.2.40) (2020-09-13)

#### ♻️ Refactoring

- update imports ([7a39ebf](https://github.com/thi-ng/umbrella/commit/7a39ebf))

### [3.2.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.2.8) (2020-03-28)

#### ♻️ Refactoring

- update atom outputs ([d070889](https://github.com/thi-ng/umbrella/commit/d070889))
- update to new [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/main/packages/paths) API ([3f5dd20](https://github.com/thi-ng/umbrella/commit/3f5dd20))
- update fromView() call sites ([1bba1fc](https://github.com/thi-ng/umbrella/commit/1bba1fc))

### [3.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.2.3) (2020-02-25)

#### ♻️ Refactoring

- update imports ([89f4f1b](https://github.com/thi-ng/umbrella/commit/89f4f1b))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.2.0) (2019-11-30)

#### 🩹 Bug fixes

- update prepareNodeInputs() to reflect rstream changes ([dbe344a](https://github.com/thi-ng/umbrella/commit/dbe344a))
- update prepareNodeOutputs to reflect rstream changes ([680848d](https://github.com/thi-ng/umbrella/commit/680848d))

#### ♻️ Refactoring

- re-use `Path` from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([e621ec7](https://github.com/thi-ng/umbrella/commit/e621ec7))

### [3.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.1.7) (2019-09-21)

#### 🚀 Features

- add node2(), update sub/div ([5214f9a](https://github.com/thi-ng/umbrella/commit/5214f9a))

#### 🩹 Bug fixes

- const zero input spec handling ([27e9d30](https://github.com/thi-ng/umbrella/commit/27e9d30))

### [3.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.1.6) (2019-08-21)

#### ♻️ Refactoring

- update to new rstream api ([f3cb164](https://github.com/thi-ng/umbrella/commit/f3cb164))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.1.0) (2019-07-07)

#### 🚀 Features

- add opt reset arg to `node()` ([310f4d3](https://github.com/thi-ng/umbrella/commit/310f4d3))
- enable TS strict compiler flags (refactor) ([ace51f8](https://github.com/thi-ng/umbrella/commit/ace51f8))

#### ♻️ Refactoring

- TS strictNullChecks ([fa94f62](https://github.com/thi-ng/umbrella/commit/fa94f62))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@3.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

### [2.1.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@2.1.18) (2018-08-03)

#### ♻️ Refactoring

- remove obsolete `reset` in node() factory ([f946631](https://github.com/thi-ng/umbrella/commit/f946631))

### [2.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@2.1.1) (2018-06-25)

#### 🩹 Bug fixes

- individual node outputs ([c4fad70](https://github.com/thi-ng/umbrella/commit/c4fad70))
  - add map() xform to ensure output sub only contains selected output val

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@2.1.0) (2018-06-21)

#### 🚀 Features

- add stop(), fix `const` inputs, update docs/readme ([d0b1e5c](https://github.com/thi-ng/umbrella/commit/d0b1e5c))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@2.0.1) (2018-06-07)

#### 🩹 Bug fixes

- rename `resolveMap` => `resolve` due to upstream changes ([0fc2305](https://github.com/thi-ng/umbrella/commit/0fc2305))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@2.0.0) (2018-06-06)

#### 🛑 Breaking changes

- add full/optional support for multiple node outputs ([f2e0df2](https://github.com/thi-ng/umbrella/commit/f2e0df2))
- BREAKING CHANGE: update NodeSpec format & graph initialization
  - add new types/interfaces
  - non-destructive initGraph() behavior
  - update & refactor nodeFromSpec()
  - update addNode/removeNode()
  - update tests & docs

#### 🚀 Features

- update NodeOutput, support multiple handlers ([be21c4c](https://github.com/thi-ng/umbrella/commit/be21c4c))
  - extract prepareNodeOutputs()

### [1.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@1.1.1) (2018-05-21)

#### ♻️ Refactoring

- allow fn vals in GraphSpec too, update test ([ad56421](https://github.com/thi-ng/umbrella/commit/ad56421))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@1.1.0) (2018-05-21)

#### 🚀 Features

- update types, initGraph(), node1(), add tests ([0818498](https://github.com/thi-ng/umbrella/commit/0818498))
  - allow pre-existing subscribables in GraphSpec
  - update initGraph() to only process NodeSpec values
  - update NodeSpec to use `Path` instead of `string` for state paths
  - update NodeSpec `const` inputs to support value factory fns
  - make xform arg to node1() optional
  - update doc strings

### [1.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@1.0.8) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@1.0.0) (2018-04-24)

#### 🛑 Breaking changes

- update node input specs & node factories ([d564e10](https://github.com/thi-ng/umbrella/commit/d564e10))
- BREAKING CHANGE: node inputs now specified as object, node factory function
  signature change
  - input spec keys now used as input IDs
  - NodeFactory now accepts object of input stream (not array)
  - update node() & node1(), add support for required input IDs
  - update all existing node impls

#### 🚀 Features

- add IDs for all generated nodes, rename factory type ([0153903](https://github.com/thi-ng/umbrella/commit/0153903))
  - MultiInputNodeFn => NodeFactory

#### ♻️ Refactoring

- extract ensureInputs(), update docs ([2b9a888](https://github.com/thi-ng/umbrella/commit/2b9a888))

### [0.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@0.2.3) (2018-04-18)

#### 🩹 Bug fixes

- import path ([b7dff0e](https://github.com/thi-ng/umbrella/commit/b7dff0e))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@0.2.0) (2018-04-16)

#### 🚀 Features

- add addNode()/removeNode() ([5ddb19c](https://github.com/thi-ng/umbrella/commit/5ddb19c))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@0.1.2) (2018-04-16)

#### 🩹 Bug fixes

- create null sub for ID renaming ([56d919c](https://github.com/thi-ng/umbrella/commit/56d919c))
  - this ensures auto-teardown when unsubscribing nodes

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-graph@0.1.0) (2018-04-15)

#### 🚀 Features

- initial import [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/main/packages/rstream-graph) ([619b4b3](https://github.com/thi-ng/umbrella/commit/619b4b3))
