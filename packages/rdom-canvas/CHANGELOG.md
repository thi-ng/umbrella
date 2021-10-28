# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-canvas@0.3.0...@thi.ng/rdom-canvas@0.3.1) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rdom-canvas





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-canvas@0.2.4...@thi.ng/rdom-canvas@0.3.0) (2021-10-25)


### Features

* **rdom-canvas:** add lifecycle events, canvas opts ([a579904](https://github.com/thi-ng/umbrella/commit/a5799040ae6244ffe2695623f400962285cc5df0))





## [0.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-canvas@0.2.3...@thi.ng/rdom-canvas@0.2.4) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rdom-canvas





## [0.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-canvas@0.2.2...@thi.ng/rdom-canvas@0.2.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rdom-canvas





## [0.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-canvas@0.2.1...@thi.ng/rdom-canvas@0.2.2) (2021-10-13)

**Note:** Version bump only for package @thi.ng/rdom-canvas





## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-canvas@0.2.0...@thi.ng/rdom-canvas@0.2.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/rdom-canvas





# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-canvas@0.1.60...@thi.ng/rdom-canvas@0.2.0) (2021-10-12)


### Bug Fixes

* minor updates (TS4.4) ([7e91cc2](https://github.com/thi-ng/umbrella/commit/7e91cc2b20371d6969f29ec40393d64efb3d9375))


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






##  [0.1.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-canvas@0.1.8...@thi.ng/rdom-canvas@0.1.9) (2020-07-28) 

###  Bug Fixes 

- **rdom-canvas:** static canvas size handling ([1a03c70](https://github.com/thi-ng/umbrella/commit/1a03c70e3e9fe6c8b096f78084dc590102d96893)) 

#  0.1.0 (2020-07-02) 

###  Features 

- **rdom-canvas:** import as new pkg ([369d4de](https://github.com/thi-ng/umbrella/commit/369d4de29c0b0c1ff3092126902f1835ac61870e))
