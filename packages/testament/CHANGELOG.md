# Change Log

- **Last updated**: 2023-12-19T11:01:47Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/testament@0.4.0) (2023-11-09)

#### 🚀 Features

- only allow subdirs for locating tests ([3f51da7](https://github.com/thi-ng/umbrella/commit/3f51da7))
- only allow subdirs for locating tests ([d48377c](https://github.com/thi-ng/umbrella/commit/d48377c))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/testament@0.3.0) (2022-09-21)

#### 🚀 Features

- add CLI support for path exclusions ([cdfe577](https://github.com/thi-ng/umbrella/commit/cdfe577))
- add file fixture helpers, update pkg meta ([4e0f0c8](https://github.com/thi-ng/umbrella/commit/4e0f0c8))
- add default file exclusions (/test/fixtures) ([75049b9](https://github.com/thi-ng/umbrella/commit/75049b9))

### [0.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/testament@0.2.7) (2022-05-20)

#### 🩹 Bug fixes

- fix [#349](https://github.com/thi-ng/umbrella/issues/349), apply proposed fix by @reedho ([efcde16](https://github.com/thi-ng/umbrella/commit/efcde16))

### [0.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/testament@0.2.4) (2022-03-11)

#### 🩹 Bug fixes

- update CLI wrapper, propagate exit code ([6b49afe](https://github.com/thi-ng/umbrella/commit/6b49afe))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/testament@0.2.0) (2021-11-17)

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

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/testament@0.1.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/testament@0.1.0) (2021-10-12)

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

#### 🚀 Features

- add new pkg ([d2bbab4](https://github.com/thi-ng/umbrella/commit/d2bbab4))
- update CLI wrapper and group() behavior ([aa2ceef](https://github.com/thi-ng/umbrella/commit/aa2ceef))
  - update group() to only register task
  - add registerTask(), executeTasks() to trigger queued tests
- add result format/output, global opts ([b624396](https://github.com/thi-ng/umbrella/commit/b624396))
- add/update types, config, cli, docs ([c045a57](https://github.com/thi-ng/umbrella/commit/c045a57))
- add file watching, bug fixes ([4987e1d](https://github.com/thi-ng/umbrella/commit/4987e1d))
- more flexible CLI parsing/order ([9f56f79](https://github.com/thi-ng/umbrella/commit/9f56f79))
  - allow opts & paths to be given in any order
  - add exit code handling for incorrect CLI opts
- add/update lifecycle handlers ([39f6040](https://github.com/thi-ng/umbrella/commit/39f6040))
  - add group-global before/after handlers
  - add logger to TestCtx
  - update tests

#### ♻️ Refactoring

- avoid circular deps ([459faa4](https://github.com/thi-ng/umbrella/commit/459faa4))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))
