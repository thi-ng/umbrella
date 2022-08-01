# Change Log

- **Last updated**: 2022-08-01T14:54:00Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@2.2.0) (2022-04-07)

#### 🚀 Features

- update to latest DB & overrides, fix [#340](https://github.com/thi-ng/umbrella/issues/340) ([5a51f7d](https://github.com/thi-ng/umbrella/commit/5a51f7d))

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@2.0.0) (2021-10-12)

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

- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@0.5.1) (2021-04-10)

#### 🩹 Bug fixes

- fix preferredExtension() ([2ebe6ed](https://github.com/thi-ng/umbrella/commit/2ebe6ed))
  - fix low-priority file ext handling
  - add `.markdown` as low-pri (prefer more common `.md` ext)

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@0.5.0) (2021-04-04)

#### 🚀 Features

- add MSFT & SideFX types ([58c247d](https://github.com/thi-ng/umbrella/commit/58c247d))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@0.4.0) (2021-04-03)

#### 🚀 Features

- update tool, incl. more mime types ([df59d93](https://github.com/thi-ng/umbrella/commit/df59d93))
  - add support for vnd.* inclusion overrides
  - add definitions for HDR/RGBE images (not listed in mime-db)

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@0.3.0) (2021-03-27)

#### 🚀 Features

- add preferredExtension(), update convert tool ([c3f5ec1](https://github.com/thi-ng/umbrella/commit/c3f5ec1))
  - add reverse lookup fn
  - add type decl for generated `DB` object
  - add missing tsconfig for convert tool

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@0.2.0) (2021-03-26)

#### 🚀 Features

- update to latest mime-db release ([1010191](https://github.com/thi-ng/umbrella/commit/1010191))
  - again excluding all `*/vnd.*` MIME types to keep filesize practical
  - still, new DB adds hundreds of new types and includes updates
    to several existing ones

#### ♻️ Refactoring

- migrate DB to separate file ([d0cf532](https://github.com/thi-ng/umbrella/commit/d0cf532))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/mime@0.1.0) (2020-02-25)

#### 🚀 Features

- add preferredType() ([942aa84](https://github.com/thi-ng/umbrella/commit/942aa84))
- import as new pkg (MBP2010) ([1a60345](https://github.com/thi-ng/umbrella/commit/1a60345))
