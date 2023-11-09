# Change Log

- **Last updated**: 2023-11-09T10:28:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.2.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@2.2.33) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [2.2.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@2.2.21) (2023-08-22)

#### 🩹 Bug fixes

- update height handling in metaViewport() ([f142348](https://github.com/thi-ng/umbrella/commit/f142348))
  - add ViewportOpts docstrings

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@2.2.0) (2022-11-30)

#### 🚀 Features

- add comment(), related to [#367](https://github.com/thi-ng/umbrella/issues/367) ([fe952d5](https://github.com/thi-ng/umbrella/commit/fe952d5))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@2.0.0) (2021-10-12)

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

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@1.1.0) (2021-08-17)

#### 🚀 Features

- update style/script element defs ([a1f9ac8](https://github.com/thi-ng/umbrella/commit/a1f9ac8))
  - add CDataContent type
  - allow string or cdata as content
  - update `style` default attribs

### [0.3.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@0.3.9) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@0.3.0) (2020-07-09)

#### 🚀 Features

- add 360+ CSS property names ([d06a4ae](https://github.com/thi-ng/umbrella/commit/d06a4ae))
  - update `style` attrib type
- add CSS props for SVG elements ([efe61b8](https://github.com/thi-ng/umbrella/commit/efe61b8))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@0.2.0) (2020-07-02)

#### 🚀 Features

- add meta & link variations ([42fb113](https://github.com/thi-ng/umbrella/commit/42fb113))
- add textArea() ([3fceb02](https://github.com/thi-ng/umbrella/commit/3fceb02))
- add new elems, add/update types ([9023724](https://github.com/thi-ng/umbrella/commit/9023724))
- add more elems (tables) ([f0616e6](https://github.com/thi-ng/umbrella/commit/f0616e6))
- add RDFa attrib support, update types ([0737a16](https://github.com/thi-ng/umbrella/commit/0737a16))

#### ♻️ Refactoring

- update rdom refs/links etc. ([7dfbedb](https://github.com/thi-ng/umbrella/commit/7dfbedb))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@0.1.1) (2020-06-28)

#### 🩹 Bug fixes

- update attrib types ([7af448f](https://github.com/thi-ng/umbrella/commit/7af448f))
  - allow strings for event attribs
  - allow number | string | boolean for data attribs

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-html@0.1.0) (2020-06-24)

#### 🚀 Features

- import as new pkg ([5fffd6f](https://github.com/thi-ng/umbrella/commit/5fffd6f))
- add AttribVal & EventAttribVal ([469e297](https://github.com/thi-ng/umbrella/commit/469e297))
- re-add support for emmet style tags ([bb06dab](https://github.com/thi-ng/umbrella/commit/bb06dab))
- add more elements & helpers ([68a9bb8](https://github.com/thi-ng/umbrella/commit/68a9bb8))
- add more elements, update readme ([5e3f8f1](https://github.com/thi-ng/umbrella/commit/5e3f8f1))

#### ♻️ Refactoring

- update defElement() ([a56a10b](https://github.com/thi-ng/umbrella/commit/a56a10b))
