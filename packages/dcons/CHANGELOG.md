# Change Log

- **Last updated**: 2023-11-24T09:35:46Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.71](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@3.2.71) (2023-11-09)

#### 🩹 Bug fixes

- update ctors due to ES2022 class field init order ([4958b49](https://github.com/thi-ng/umbrella/commit/4958b49))

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [3.2.50](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@3.2.50) (2023-08-12)

#### ♻️ Refactoring

- update .probability() call sites in various pkgs ([c8c8141](https://github.com/thi-ng/umbrella/commit/c8c8141))

### [3.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@3.2.7) (2022-07-19)

#### ♻️ Refactoring

- update DCons call sites ([09ce729](https://github.com/thi-ng/umbrella/commit/09ce729))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@3.2.0) (2022-03-11)

#### 🚀 Features

- add DRing, extract AList, major refactor ([3f4e8de](https://github.com/thi-ng/umbrella/commit/3f4e8de))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@3.1.0) (2021-11-17)

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

### [3.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@3.0.5) (2021-10-28)

#### 🩹 Bug fixes

- [#325](https://github.com/thi-ng/umbrella/issues/325) replace nullish coalescing operator ([b8ddad7](https://github.com/thi-ng/umbrella/commit/b8ddad7))
  - refactor using ternary op
  - AFAICT only occurrence in entire umbrella repo

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@3.0.0) (2021-10-12)

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

#### 🩹 Bug fixes

- add missing explicit return type (TS4.4) ([7eba2ca](https://github.com/thi-ng/umbrella/commit/7eba2ca))
- add missing explicit return type (TS4.4) ([98a5c5b](https://github.com/thi-ng/umbrella/commit/98a5c5b))

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([045f2d9](https://github.com/thi-ng/umbrella/commit/045f2d9))

### [2.3.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.3.17) (2021-03-17)

#### ♻️ Refactoring

- dedupe OOB error handling ([c14a8fb](https://github.com/thi-ng/umbrella/commit/c14a8fb))

### [2.3.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.3.3) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [2.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.3.1) (2020-11-24)

#### ♻️ Refactoring

- simplify toString() impl, add test ([2bf8b92](https://github.com/thi-ng/umbrella/commit/2bf8b92))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.3.0) (2020-10-19)

#### 🚀 Features

- add self-organizing list types, add tests ([d7fd88f](https://github.com/thi-ng/umbrella/commit/d7fd88f))

#### ♻️ Refactoring

- unify MTF/Transpose into SOL type ([4f14e45](https://github.com/thi-ng/umbrella/commit/4f14e45))

### [2.2.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.2.32) (2020-09-22)

#### ♻️ Refactoring

- minor update equiv() ([520fa76](https://github.com/thi-ng/umbrella/commit/520fa76))

### [2.2.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.2.31) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types in various pkgs ([ced1e5d](https://github.com/thi-ng/umbrella/commit/ced1e5d))

### [2.2.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.2.30) (2020-08-28)

#### ♻️ Refactoring

- update delete op (TS4.0) ([5482bf4](https://github.com/thi-ng/umbrella/commit/5482bf4))

### [2.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.2.3) (2020-02-25)

#### ♻️ Refactoring

- update imports ([832585f](https://github.com/thi-ng/umbrella/commit/832585f))

### [2.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.2.1) (2020-01-24)

#### ♻️ Refactoring

- add IClear decl ([b58f92b](https://github.com/thi-ng/umbrella/commit/b58f92b))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.2.0) (2019-11-30)

#### 🚀 Features

- add ISeqable impl (seq()) & tests ([1cfb02a](https://github.com/thi-ng/umbrella/commit/1cfb02a))
- add dcons() factory fn (syntax sugar) ([6e09446](https://github.com/thi-ng/umbrella/commit/6e09446))
- add sort(), update shuffle(), add tests ([f6bbcd5](https://github.com/thi-ng/umbrella/commit/f6bbcd5))
  - add [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/main/packages/random) dep
  - rewrite & optimize shuffle() w/ support for IRandom
  - update readme

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([4e73667](https://github.com/thi-ng/umbrella/commit/4e73667))
- address TS strictNullChecks flag, minor optimizations ([cb5ad93](https://github.com/thi-ng/umbrella/commit/cb5ad93))
  - extract esnureIndex() & nthCellUnsafe()
  - update pop() to return undefined rather than throw error

#### 🩹 Bug fixes

- .toString() impl, use String() conv for values ([d6b1f11](https://github.com/thi-ng/umbrella/commit/d6b1f11))

### [2.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.0.9) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@1.1.0) (2018-08-24)

#### 🚀 Features

- add IReducible impl, update deps & imports ([1280cfd](https://github.com/thi-ng/umbrella/commit/1280cfd))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@1.0.0) (2018-05-12)

#### 🛑 Breaking changes

- update pop() ([67f0e54](https://github.com/thi-ng/umbrella/commit/67f0e54))
- BREAKING CHANGE: due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api)/IStack update, pop() now returns
  popped value instead of the list itself
  - minor other refactoring

### [0.3.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@0.3.5) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@0.3.0) (2018-04-22)

#### 🚀 Features

- add asHead()/asTail() ([19f7e76](https://github.com/thi-ng/umbrella/commit/19f7e76))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@0.2.0) (2018-04-10)

#### 🚀 Features

- add IEmpty impl, minor refactoring ([10c089a](https://github.com/thi-ng/umbrella/commit/10c089a))
  - add empty()
  - add clear()
  - remove obsolete `public` method prefixes

### [0.1.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@0.1.15) (2018-03-21)

#### ♻️ Refactoring

- update error handling ([a046b28](https://github.com/thi-ng/umbrella/commit/a046b28))

### [0.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@0.1.9) (2018-01-31)

#### ♻️ Refactoring

- use Predicate ([79989e5](https://github.com/thi-ng/umbrella/commit/79989e5))

### [0.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/dcons@0.1.4) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
