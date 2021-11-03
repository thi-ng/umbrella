# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.3.17...@thi.ng/defmulti@2.0.0) (2021-10-12)


### Bug Fixes

* **defmulti:** add DEFAULT handling for .addAll() ([40ba6f9](https://github.com/thi-ng/umbrella/commit/40ba6f9bc39c713267ac3736fe65c32315ac6980))


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **defmulti:** add .setDefault(), pkg restructure ([0a8641a](https://github.com/thi-ng/umbrella/commit/0a8641a27f3d340880462541311f5a82360be62b))
* **defmulti:** update defmulti args ([a10d36f](https://github.com/thi-ng/umbrella/commit/a10d36fcee855220eacbdd1f86d443d888603ac6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






##  [1.3.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.3.5...@thi.ng/defmulti@1.3.6) (2021-03-03)

###  Bug Fixes

- **defmulti:** add missing type anno (TS4.2) ([bc74d21](https://github.com/thi-ng/umbrella/commit/bc74d21264f2d3b76fc288eeccab398ad66f76da))

#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.2.26...@thi.ng/defmulti@1.3.0) (2020-11-24)

###  Features

- **defmulti:** add .dependencies(), add tests ([d15a159](https://github.com/thi-ng/umbrella/commit/d15a1594750ac171b1ab93da18d908f1ca6c3897))

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.1.4...@thi.ng/defmulti@1.2.0) (2019-11-09)

###  Features

- **defmulti:** allow .add() to overwrite existing impl, add logger ([e387622](https://github.com/thi-ng/umbrella/commit/e387622d3ad44bc0df029c5ba641244dc12c6353))

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@1.0.9...@thi.ng/defmulti@1.1.0) (2019-07-07)

###  Features

- **defmulti:** enable TS strict compiler flags (refactor) ([d51ecf9](https://github.com/thi-ng/umbrella/commit/d51ecf9))

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.7.0...@thi.ng/defmulti@1.0.0) (2019-01-21)

###  Build System

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

###  Features

- **defmulti:** add callable() & implementations(), update readme ([fde2db2](https://github.com/thi-ng/umbrella/commit/fde2db2))
- **defmulti:** add relations() ([4066c80](https://github.com/thi-ng/umbrella/commit/4066c80))
- **defmulti:** add versions w/ 1 optional typed arg, add .impls() ([125c784](https://github.com/thi-ng/umbrella/commit/125c784))

###  BREAKING CHANGES

- enabled multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.

#  [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.6.0...@thi.ng/defmulti@0.7.0) (2019-01-02)

###  Features

- **defmulti:** add opt fallback arg for defmultiN(), update docs ([1d29153](https://github.com/thi-ng/umbrella/commit/1d29153))

#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.5.1...@thi.ng/defmulti@0.6.0) (2019-01-01)

###  Features

- **defmulti:** add addAll(), add/update doc strings ([488698a](https://github.com/thi-ng/umbrella/commit/488698a))

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.4.1...@thi.ng/defmulti@0.5.0) (2018-10-24)

###  Features

- **defmulti:** add support for dispatch value relationships / hierarchy ([a8c3898](https://github.com/thi-ng/umbrella/commit/a8c3898))

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.3.11...@thi.ng/defmulti@0.4.0) (2018-10-17)

###  Features

- **defmulti:** add varargs support ([6094738](https://github.com/thi-ng/umbrella/commit/6094738))

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.2.0...@thi.ng/defmulti@0.3.0) (2018-05-11)

###  Features

- **defmulti:** add generics, update docs & readme ([eeed25e](https://github.com/thi-ng/umbrella/commit/eeed25e))

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/defmulti@0.1.0...@thi.ng/defmulti@0.2.0) (2018-05-10)

###  Features

- **defmulti:** add defmultiN(), update readme, add tests ([126ecf3](https://github.com/thi-ng/umbrella/commit/126ecf3))

#  0.1.0 (2018-05-10)

###  Features

- **defmulti:** add [@thi](https://github.com/thi).ng/defmulti package ([edc66bf](https://github.com/thi-ng/umbrella/commit/edc66bf))
