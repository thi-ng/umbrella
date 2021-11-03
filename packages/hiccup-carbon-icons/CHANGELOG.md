# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@3.0.6...@thi.ng/hiccup-carbon-icons@3.0.7) (2021-11-03)

**Note:** Version bump only for package @thi.ng/hiccup-carbon-icons





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@2.0.25...@thi.ng/hiccup-carbon-icons@3.0.0) (2021-10-12)


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






##  [2.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@2.0.10...@thi.ng/hiccup-carbon-icons@2.0.11) (2021-02-20)

###  Performance Improvements

- **hiccup-carbon-icons:** extract SVG root into shared fn ([760ea9f](https://github.com/thi-ng/umbrella/commit/760ea9f964b3098d75cad1a5ca006ae7404df603))

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@1.0.51...@thi.ng/hiccup-carbon-icons@2.0.0) (2020-08-19)

###  Features

- **hiccup-carbon-icons:** add/update all icons ([22cfefc](https://github.com/thi-ng/umbrella/commit/22cfefcccaab5448e1117cb55d448cd313c48e95))

###  BREAKING CHANGES

- **hiccup-carbon-icons:** update all icons to latest carbon version
    - some icons have been removed/replaced or renamed
    - full set now counting ~1100 icons
    - add new conversion script
    - update readme

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-carbon-icons@0.1.2...@thi.ng/hiccup-carbon-icons@1.0.0) (2019-01-21)

###  Build System

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

###  BREAKING CHANGES

- enabled multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.

#  0.1.0 (2018-12-14)

###  Features

- **hiccup-carbon-icons:** add new package ([6b04e16](https://github.com/thi-ng/umbrella/commit/6b04e16))
