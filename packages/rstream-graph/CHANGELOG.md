# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.2.76](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.2.75...@thi.ng/rstream-graph@3.2.76) (2021-08-08)

**Note:** Version bump only for package @thi.ng/rstream-graph





## [3.2.75](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.2.74...@thi.ng/rstream-graph@3.2.75) (2021-08-08)

**Note:** Version bump only for package @thi.ng/rstream-graph





## [3.2.74](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.2.73...@thi.ng/rstream-graph@3.2.74) (2021-08-08)

**Note:** Version bump only for package @thi.ng/rstream-graph





## [3.2.73](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.2.72...@thi.ng/rstream-graph@3.2.73) (2021-08-04)

**Note:** Version bump only for package @thi.ng/rstream-graph





## [3.2.72](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.2.71...@thi.ng/rstream-graph@3.2.72) (2021-08-04)

**Note:** Version bump only for package @thi.ng/rstream-graph





## [3.2.71](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.2.70...@thi.ng/rstream-graph@3.2.71) (2021-07-27)

**Note:** Version bump only for package @thi.ng/rstream-graph





## [3.2.70](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.2.69...@thi.ng/rstream-graph@3.2.70) (2021-07-01)

**Note:** Version bump only for package @thi.ng/rstream-graph





## [3.2.69](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.2.68...@thi.ng/rstream-graph@3.2.69) (2021-06-08)

**Note:** Version bump only for package @thi.ng/rstream-graph





# [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.1.8...@thi.ng/rstream-graph@3.2.0) (2019-11-30)

### Bug Fixes

* **rstream-graph:** update prepareNodeInputs() to reflect rstream changes ([dbe344a](https://github.com/thi-ng/umbrella/commit/dbe344a24f2605a05db65d5cc7242949e4d2452c))
* **rstream-graph:** update prepareNodeOutputs to reflect rstream changes ([680848d](https://github.com/thi-ng/umbrella/commit/680848d259910df41593ee67030d0e1ea3934cd0))

### Features

* **rstream-graph:** add node2(), update sub/div ([5214f9a](https://github.com/thi-ng/umbrella/commit/5214f9a7d32732cb120b30dd8faefa4425ec7bb2))

## [3.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.1.6...@thi.ng/rstream-graph@3.1.7) (2019-09-21)

### Bug Fixes

* **rstream-graph:** const zero input spec handling ([27e9d30](https://github.com/thi-ng/umbrella/commit/27e9d30))

# [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@3.0.26...@thi.ng/rstream-graph@3.1.0) (2019-07-07)

### Features

* **rstream-graph:** add opt reset arg to `node()` ([310f4d3](https://github.com/thi-ng/umbrella/commit/310f4d3))
* **rstream-graph:** enable TS strict compiler flags (refactor) ([ace51f8](https://github.com/thi-ng/umbrella/commit/ace51f8))

# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@2.1.50...@thi.ng/rstream-graph@3.0.0) (2019-01-21)

### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols

<a name="2.1.1"></a>
## [2.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@2.1.0...@thi.ng/rstream-graph@2.1.1) (2018-06-25)

### Bug Fixes

* **rstream-graph:** individual node outputs ([c4fad70](https://github.com/thi-ng/umbrella/commit/c4fad70))

<a name="2.1.0"></a>
# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@2.0.3...@thi.ng/rstream-graph@2.1.0) (2018-06-21)

### Features

* **rstream-graph:** add stop(), fix `const` inputs, update docs/readme ([d0b1e5c](https://github.com/thi-ng/umbrella/commit/d0b1e5c))

<a name="2.0.3"></a>
## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@2.0.2...@thi.ng/rstream-graph@2.0.3) (2018-06-19)

<a name="2.0.1"></a>
## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@2.0.0...@thi.ng/rstream-graph@2.0.1) (2018-06-07)

### Bug Fixes

* **rstream-graph:** rename `resolveMap` => `resolve` due to upstream changes ([0fc2305](https://github.com/thi-ng/umbrella/commit/0fc2305))

<a name="2.0.0"></a>
# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@1.1.2...@thi.ng/rstream-graph@2.0.0) (2018-06-06)

### Features

* **rstream-graph:** add full/optional support for multiple node outputs ([f2e0df2](https://github.com/thi-ng/umbrella/commit/f2e0df2))
* **rstream-graph:** update NodeOutput, support multiple handlers ([be21c4c](https://github.com/thi-ng/umbrella/commit/be21c4c))

### BREAKING CHANGES

* **rstream-graph:** update NodeSpec format & graph initialization

- add new types/interfaces
- non-destructive initGraph() behavior
- update & refactor nodeFromSpec()
- update addNode/removeNode()
- update tests & docs

<a name="1.1.2"></a>
## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@1.1.1...@thi.ng/rstream-graph@1.1.2) (2018-05-30)

<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@1.0.17...@thi.ng/rstream-graph@1.1.0) (2018-05-21)

### Features

* **rstream-graph:** update types, initGraph(), node1(), add tests ([0818498](https://github.com/thi-ng/umbrella/commit/0818498))

<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@0.2.6...@thi.ng/rstream-graph@1.0.0) (2018-04-24)

### Code Refactoring

* **rstream-graph:** update node input specs & node factories ([d564e10](https://github.com/thi-ng/umbrella/commit/d564e10))

### Features

* **rstream-graph:** add IDs for all generated nodes, rename factory type ([0153903](https://github.com/thi-ng/umbrella/commit/0153903))

### BREAKING CHANGES

* **rstream-graph:** node inputs now specified as object, node factory function
signature change

- input spec keys now used as input IDs
- NodeFactory now accepts object of input stream (not array)
- update node() & node1(), add support for required input IDs
- update all existing node impls

<a name="0.2.3"></a>
## [0.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@0.2.2...@thi.ng/rstream-graph@0.2.3) (2018-04-18)

### Bug Fixes

* **rstream-graph:** import path ([b7dff0e](https://github.com/thi-ng/umbrella/commit/b7dff0e))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@0.1.3...@thi.ng/rstream-graph@0.2.0) (2018-04-16)

### Features

* **rstream-graph:** add addNode()/removeNode() ([5ddb19c](https://github.com/thi-ng/umbrella/commit/5ddb19c))

<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-graph@0.1.1...@thi.ng/rstream-graph@0.1.2) (2018-04-16)

### Bug Fixes

* **rstream-graph:** create null sub for ID renaming ([56d919c](https://github.com/thi-ng/umbrella/commit/56d919c))

<a name="0.1.0"></a>
# 0.1.0 (2018-04-15)

### Features

* **rstream-graph:** initial import [@thi](https://github.com/thi).ng/rstream-graph ([619b4b3](https://github.com/thi-ng/umbrella/commit/619b4b3))
