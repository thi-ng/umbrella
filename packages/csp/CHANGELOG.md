# Change Log

- **Last updated**: 2021-11-21T17:09:28Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@2.0.0) (2021-10-12)

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

- update imports (transducers) ([4705acc](https://github.com/thi-ng/umbrella/commit/4705acc))
- update imports ([9c6f8b8](https://github.com/thi-ng/umbrella/commit/9c6f8b8))

### [1.1.74](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.1.74) (2021-09-03)

#### ♻️ Refactoring

- fix up TS4.4 changes ([993a458](https://github.com/thi-ng/umbrella/commit/993a458))

### [1.1.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.1.43) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([7176302](https://github.com/thi-ng/umbrella/commit/7176302))

### [1.1.41](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.1.41) (2020-11-24)

#### ♻️ Refactoring

- update IReadableChannel.read() return type ([ffc2811](https://github.com/thi-ng/umbrella/commit/ffc2811))
- update destructuring ([5a4ad57](https://github.com/thi-ng/umbrella/commit/5a4ad57))

### [1.1.38](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.1.38) (2020-09-13)

#### ♻️ Refactoring

- update imports ([53a8c9e](https://github.com/thi-ng/umbrella/commit/53a8c9e))
- update imports, use new Fn types in various pkgs ([ced1e5d](https://github.com/thi-ng/umbrella/commit/ced1e5d))

### [1.1.37](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.1.37) (2020-08-28)

#### ♻️ Refactoring

- update delete op (TS4.0) ([5482bf4](https://github.com/thi-ng/umbrella/commit/5482bf4))

### [1.1.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.1.16) (2020-04-05)

#### ♻️ Refactoring

- keep State as const enum, internalize ([9ea3b6e](https://github.com/thi-ng/umbrella/commit/9ea3b6e))
- switch to non-const enums ([8e0c049](https://github.com/thi-ng/umbrella/commit/8e0c049))

### [1.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.1.10) (2020-02-25)

#### ♻️ Refactoring

- update imports, internal restruct ([536cc17](https://github.com/thi-ng/umbrella/commit/536cc17))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.1.0) (2019-07-07)

#### 🚀 Features

- update Mult.tap() to use set semantics ([c9bc953](https://github.com/thi-ng/umbrella/commit/c9bc953))
  - add check if arg channel already is a tap and if so don't add duplicate
- enable TS strict compiler flags (refactor) ([3d7fba2](https://github.com/thi-ng/umbrella/commit/3d7fba2))

#### 🩹 Bug fixes

- TS strictNullChecks, update various return types ([da909ac](https://github.com/thi-ng/umbrella/commit/da909ac))

### [1.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.0.9) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

### [1.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.0.5) (2019-02-15)

#### ♻️ Refactoring

- use [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays), remove obsolete shuffle() ([64204a1](https://github.com/thi-ng/umbrella/commit/64204a1))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### 🩹 Bug fixes

- disable __State reverse enum lookup ([3b8576f](https://github.com/thi-ng/umbrella/commit/3b8576f))

#### ♻️ Refactoring

- use arrow fns ([5d53028](https://github.com/thi-ng/umbrella/commit/5d53028))

### [0.3.64](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@0.3.64) (2018-09-24)

#### ⏱ Performance improvements

- `State` => const enum ([c3e8d68](https://github.com/thi-ng/umbrella/commit/c3e8d68))
  - export `__State` for reverse lookups

### [0.3.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@0.3.34) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [0.3.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@0.3.21) (2018-03-21)

#### ♻️ Refactoring

- update error handling ([5087ffe](https://github.com/thi-ng/umbrella/commit/5087ffe))

### [0.3.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@0.3.11) (2018-02-08)

#### 🩹 Bug fixes

- fix [#5](https://github.com/thi-ng/umbrella/issues/5), more example fixes (rfn calls) ([080c2ee](https://github.com/thi-ng/umbrella/commit/080c2ee))
- fix [#5](https://github.com/thi-ng/umbrella/issues/5), example in readme ([a10a487](https://github.com/thi-ng/umbrella/commit/a10a487))

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@0.3.1) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
