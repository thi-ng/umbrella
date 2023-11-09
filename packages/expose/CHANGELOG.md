# Change Log

- **Last updated**: 2023-11-09T10:28:18Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@1.2.3) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@1.2.0) (2023-10-24)

#### 🚀 Features

- update import.meta.env check ([#425](https://github.com/thi-ng/umbrella/issues/425)) ([c8aa353](https://github.com/thi-ng/umbrella/commit/c8aa353))
  - also check for `import.meta.env.UMBRELLA_GLOBALS` for non-ViteJS tooling
  - btw. this is **not** a fix for the esbuild issue in [#425](https://github.com/thi-ng/umbrella/issues/425)
  (but part of its solution posted in comments)

### [1.1.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@1.1.15) (2022-10-29)

#### 🩹 Bug fixes

- fix env var check ([#361](https://github.com/thi-ng/umbrella/issues/361)) ([ac45723](https://github.com/thi-ng/umbrella/commit/ac45723))
  - apply same fix as in [1d3a805f8](https://github.com/thi-ng/umbrella/commit/1d3a805f8)

### [1.1.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@1.1.13) (2022-10-04)

#### 🩹 Bug fixes

- update expose switch logic ([9a98c3e](https://github.com/thi-ng/umbrella/commit/9a98c3e))
  - remove support for obsolete (& broken) snowpack setup
  - add support for Vite's env var handling

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@1.1.0) (2021-11-17)

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

### [1.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@1.0.4) (2021-10-25)

#### 🩹 Bug fixes

- [#324](https://github.com/thi-ng/umbrella/issues/324) update snowpack issue workaround ([6dfbf71](https://github.com/thi-ng/umbrella/commit/6dfbf71))
  - switch to another temp workaround until snowpack team
    fixes snowpackjs/snowpack[#3621](https://github.com/thi-ng/umbrella/issues/3621)

### [1.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@1.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@0.1.0) (2021-10-12)

#### 🚀 Features

- extract as new pkg ([323995f](https://github.com/thi-ng/umbrella/commit/323995f))
  - migrate exposeGlobal() from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) to new pkg
- add snowpack env var support ([bdd68e1](https://github.com/thi-ng/umbrella/commit/bdd68e1))
