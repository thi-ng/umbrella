# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@3.0.4...@thi.ng/dcons@3.0.5) (2021-10-28)


### Bug Fixes

* **dcons:** [#325](https://github.com/thi-ng/umbrella/issues/325) replace nullish coalescing operator ([b8ddad7](https://github.com/thi-ng/umbrella/commit/b8ddad7c8735e2f2e4be6f2ba4c7b03b86959631))





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.3.34...@thi.ng/dcons@3.0.0) (2021-10-12)


### Bug Fixes

* **dcons:** add missing explicit return type (TS4.4) ([98a5c5b](https://github.com/thi-ng/umbrella/commit/98a5c5b10e5a2ff592e5c6a956ce4c85182f46f9))
* **dcons:** add missing explicit return type (TS4.4) ([7eba2ca](https://github.com/thi-ng/umbrella/commit/7eba2ca400653c389e335e257c389dce6ed889d1))


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


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






#  [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.2.32...@thi.ng/dcons@2.3.0) (2020-10-19)

###  Features

- **dcons:** add self-organizing list types, add tests ([d7fd88f](https://github.com/thi-ng/umbrella/commit/d7fd88fe37d3fcc758c632395b2e354e3fbdbcae))

#  [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.1.6...@thi.ng/dcons@2.2.0) (2019-11-30)

###  Features

- **dcons:** add dcons() factory fn (syntax sugar) ([6e09446](https://github.com/thi-ng/umbrella/commit/6e0944661d92effea2b117d09a5b24facd61fc42))
- **dcons:** add ISeqable impl (seq()) & tests ([1cfb02a](https://github.com/thi-ng/umbrella/commit/1cfb02a828db3670a745e7d4e30867614f594881))
- **dcons:** add sort(), update shuffle(), add tests ([f6bbcd5](https://github.com/thi-ng/umbrella/commit/f6bbcd57a04cf71389eb8045773275748ef0c50c))

#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.19...@thi.ng/dcons@2.1.0) (2019-07-07)

###  Bug Fixes

- **dcons:** .toString() impl, use String() conv for values ([d6b1f11](https://github.com/thi-ng/umbrella/commit/d6b1f11))

###  Features

- **dcons:** address TS strictNullChecks flag, minor optimizations ([cb5ad93](https://github.com/thi-ng/umbrella/commit/cb5ad93))
- **dcons:** enable TS strict compiler flags (refactor) ([4e73667](https://github.com/thi-ng/umbrella/commit/4e73667))

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@1.1.23...@thi.ng/dcons@2.0.0) (2019-01-21)

###  Build System

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

###  BREAKING CHANGES

- enabled multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@1.0.7...@thi.ng/dcons@1.1.0) (2018-08-24)

###  Features

- **dcons:** add IReducible impl, update deps & imports ([1280cfd](https://github.com/thi-ng/umbrella/commit/1280cfd))

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@0.3.6...@thi.ng/dcons@1.0.0) (2018-05-12)

###  Code Refactoring

- **dcons:** update pop() ([67f0e54](https://github.com/thi-ng/umbrella/commit/67f0e54))

###  BREAKING CHANGES

- **dcons:** due to @thi.ng/api/IStack update, pop() now returns popped value instead of the list itself
    - minor other refactoring

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@0.2.0...@thi.ng/dcons@0.3.0) (2018-04-22)

###  Features

- **dcons:** add asHead()/asTail() ([19f7e76](https://github.com/thi-ng/umbrella/commit/19f7e76))

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@0.1.19...@thi.ng/dcons@0.2.0) (2018-04-10)

###  Features

- **dcons:** add IEmpty impl, minor refactoring ([10c089a](https://github.com/thi-ng/umbrella/commit/10c089a))
