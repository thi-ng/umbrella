# Change Log

- **Last updated**: 2023-10-23T07:37:37Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.12.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.12.13) (2023-10-18)

#### 🩹 Bug fixes

- update $text() to set el.textContent, simplify ([7cd6cc0](https://github.com/thi-ng/umbrella/commit/7cd6cc0))

## [0.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.12.0) (2023-08-22)

#### 🚀 Features

- update $text() handling of undefined values ([55faa71](https://github.com/thi-ng/umbrella/commit/55faa71))

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.11.0) (2023-04-08)

#### 🚀 Features

- add null check for $remove() ([db9d2a1](https://github.com/thi-ng/umbrella/commit/db9d2a1))
- add stream IDs for $list/$klist/$Sub/$SubA ([bfd4058](https://github.com/thi-ng/umbrella/commit/bfd4058))
- add $subWithID(), add IDs for various constructs ([404eacb](https://github.com/thi-ng/umbrella/commit/404eacb))

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.10.0) (2022-11-30)

#### 🚀 Features

- add DOM comment support ([#367](https://github.com/thi-ng/umbrella/issues/367)), other refactorings ([3fd5f8e](https://github.com/thi-ng/umbrella/commit/3fd5f8e))
  - add $comment(), isComment()
  - add Component.$comment() syntax sugar
  - add comment check/branch in $tree()
  - update args for $addChild(), $remove(), $moveTo()
  - update $text(), $html() to support SVG elements
  - add doc strings

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.9.0) (2022-07-12)

#### 🚀 Features

- update $input() generics ([6be320a](https://github.com/thi-ng/umbrella/commit/6be320a))
  - allow any string-derived stream types

### [0.8.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.8.7) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

### [0.8.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.8.1) (2021-11-19)

#### 🩹 Bug fixes

- $text() handling for SVG ([631b5fb](https://github.com/thi-ng/umbrella/commit/631b5fb))

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.8.0) (2021-11-17)

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

### [0.7.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.7.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [0.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.7.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.7.0) (2021-10-12)

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

- add $replace() control/wrapper ([6096357](https://github.com/thi-ng/umbrella/commit/6096357))

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports in various pkgs (rstream) ([342cf54](https://github.com/thi-ng/umbrella/commit/342cf54))

### [0.6.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.6.9) (2021-09-03)

#### ♻️ Refactoring

- fix up TS4.4 changes ([40caddc](https://github.com/thi-ng/umbrella/commit/40caddc))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.6.0) (2021-08-04)

#### 🚀 Features

- add $inputFile/Files() handlers ([7f8888b](https://github.com/thi-ng/umbrella/commit/7f8888b))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.5.0) (2021-07-27)

#### 🚀 Features

- relax return types for $switch() ([71c334b](https://github.com/thi-ng/umbrella/commit/71c334b))
  - update return types for $switch/$refresh component factories (any)
  - add/update docs

#### 🩹 Bug fixes

- fix [#304](https://github.com/thi-ng/umbrella/issues/304), update Switch.update() ([a2899c0](https://github.com/thi-ng/umbrella/commit/a2899c0))
  - remove extraneous & wrong same-value check which was causing
    component to unmount if same value is received in succession

### [0.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.4.5) (2021-03-12)

#### ♻️ Refactoring

- simplify $sub() ([1f11cdf](https://github.com/thi-ng/umbrella/commit/1f11cdf))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.4.0) (2021-02-24)

#### 🚀 Features

- add $inputCheckbox, $inputTrigger ([99c569e](https://github.com/thi-ng/umbrella/commit/99c569e))

### [0.3.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.3.9) (2021-02-22)

#### 🩹 Bug fixes

- add stream IDs for $Sub/$SubA ([e8b8fd4](https://github.com/thi-ng/umbrella/commit/e8b8fd4))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.3.0) (2020-12-07)

#### 🚀 Features

- add $subObject() wrapper, add docs ([cd5cf08](https://github.com/thi-ng/umbrella/commit/cd5cf08))

### [0.2.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.2.12) (2020-09-22)

#### ♻️ Refactoring

- simplify $el() attrib handling ([b777cf1](https://github.com/thi-ng/umbrella/commit/b777cf1))
- split $tree() ([de159e0](https://github.com/thi-ng/umbrella/commit/de159e0))
- split $compile() ([45156b2](https://github.com/thi-ng/umbrella/commit/45156b2))
  - extract complexComponent(), basicComponent()

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.2.0) (2020-07-08)

#### 🚀 Features

- add $input, $inputNum event listeners ([c29fb49](https://github.com/thi-ng/umbrella/commit/c29fb49))
- add $promise() wrapper ([53f9688](https://github.com/thi-ng/umbrella/commit/53f9688))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.1.0) (2020-07-02)

#### 🚀 Features

- rename hdom2020 => rdom, update pkg ([1224706](https://github.com/thi-ng/umbrella/commit/1224706))
- update $tree() span handling, update $moveTo() ([6d90187](https://github.com/thi-ng/umbrella/commit/6d90187))
- add support for namespaced el/attribs ([9d16ef0](https://github.com/thi-ng/umbrella/commit/9d16ef0))
  - add deps ([@thi.ng/prefixes](https://github.com/thi-ng/umbrella/tree/main/packages/prefixes))
  - add `registerPrefix()` helper
  - update `$el()` and `setAttrib()` to check for prefixed names
- add RDFa `prefix` attrib support, update prefix handling ([b589da5](https://github.com/thi-ng/umbrella/commit/b589da5))
  - add XML_XMLNS to default prefixes
  - update `registerPrefixes()` to error if attempting to overwrite prefix

#### ♻️ Refactoring

- update IMountWith, $SubA ([c93efad](https://github.com/thi-ng/umbrella/commit/c93efad))
