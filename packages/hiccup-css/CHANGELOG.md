# Change Log

- **Last updated**: 2023-11-09T10:28:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.2.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.2.14) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.2.0) (2023-09-02)

#### 🚀 Features

- add customizable unit formatter precision ([2db3071](https://github.com/thi-ng/umbrella/commit/2db3071))
  - set default prec to 4 fractional digits
  - add setPrecision() to customize unit formatters
  - add vmin/vmax() unit formatters
  - update all other unit formatters

#### ♻️ Refactoring

- update at_keyframes() arg types ([5de6a92](https://github.com/thi-ng/umbrella/commit/5de6a92))
  - add Keyframe type alias
- update animation() args/opts ([ba47f93](https://github.com/thi-ng/umbrella/commit/ba47f93))
  - update AnimationOpts
  - use Keyframe type for args

### [2.1.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.1.39) (2023-02-17)

#### 🩹 Bug fixes

- update px() & ms() units [#383](https://github.com/thi-ng/umbrella/issues/383) ([e590d3f](https://github.com/thi-ng/umbrella/commit/e590d3f))
  - remove pixel rounding
  - use signed flooring for ms()

### [2.1.37](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.1.37) (2023-02-10)

#### 🩹 Bug fixes

- allow negative values for px ([340d542](https://github.com/thi-ng/umbrella/commit/340d542))
  Swap use of unsigned shift for OR `0`
  Fixes issue [#383](https://github.com/thi-ng/umbrella/issues/383)

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@2.0.0) (2021-10-12)

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
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports (transducers) ([f3e1272](https://github.com/thi-ng/umbrella/commit/f3e1272))
- minor pkg restructure ([3d34f5f](https://github.com/thi-ng/umbrella/commit/3d34f5f))

### [1.1.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@1.1.39) (2020-09-22)

#### ♻️ Refactoring

- update css() ([24f9a67](https://github.com/thi-ng/umbrella/commit/24f9a67))

### [1.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@1.1.10) (2020-02-25)

#### ♻️ Refactoring

- update imports ([03712f0](https://github.com/thi-ng/umbrella/commit/03712f0))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([1e81385](https://github.com/thi-ng/umbrella/commit/1e81385))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([526257f](https://github.com/thi-ng/umbrella/commit/526257f))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- use arrow fns ([3b74de9](https://github.com/thi-ng/umbrella/commit/3b74de9))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@0.3.0) (2018-12-15)

#### 🚀 Features

- add animation(), add test & update readme ([aac8b6f](https://github.com/thi-ng/umbrella/commit/aac8b6f))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@0.2.0) (2018-06-08)

#### 🚀 Features

- add class scoping support ([244bf21](https://github.com/thi-ng/umbrella/commit/244bf21))
  - add CSSOpts.scope field
  - update formatRule() to inject class suffixing transducer if needed
- add injectStyleSheet() ([8d6e6c8](https://github.com/thi-ng/umbrella/commit/8d6e6c8))

### [0.1.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@0.1.16) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [0.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@0.1.5) (2018-03-21)

#### ♻️ Refactoring

- update error handling ([0cfc227](https://github.com/thi-ng/umbrella/commit/0cfc227))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@0.1.2) (2018-03-05)

#### ♻️ Refactoring

- internal restructure ([721583a](https://github.com/thi-ng/umbrella/commit/721583a))
  - migrate internal implementation fns to src/impl.ts
  - remove utils.ts

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-css@0.1.1) (2018-03-05)

#### 🚀 Features

- add package [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/main/packages/hiccup-css) ([3a4cf1e](https://github.com/thi-ng/umbrella/commit/3a4cf1e))
- add/fix class handling, update Format ([5247b8f](https://github.com/thi-ng/umbrella/commit/5247b8f))
- add CSSOpts, mediaQuery(), fn expansion ([d837199](https://github.com/thi-ng/umbrella/commit/d837199))
  - add CSSOpts w/ autoprefix & vendor config
  - split FORMATS => COMPACT, PRETTY consts
  - update css() to accept options arg
  - update css() to accept function as rules
  - update formatDecls() to accept fns as attrib values
  - add nested indentation support for pretty printing
- add keyframes(), split module into separate src files ([a53d2a5](https://github.com/thi-ng/umbrella/commit/a53d2a5))
- add default vendor prefixes ([e687230](https://github.com/thi-ng/umbrella/commit/e687230))
- add attrib fn, at-rules, quoted fns, decl value arrays ([ebbc491](https://github.com/thi-ng/umbrella/commit/ebbc491))
  - quoted functions map keywords in root-level rules to fns
    (useful for pure JSON definitions, where fns are not possible)
  - add @import, @keyframes, @media, @namespace, @supports fns
  - refactor @media & @supports to use generic `conditional()`
  - add attrib selector fns
  - add support for declaration value arrays (converted to string,
    first level joined w/ `,` and inner arrays joined w/ ` `
  - add/update re-exports
- update fn handling, add iterator support, units, comment ([428de3c](https://github.com/thi-ng/umbrella/commit/428de3c))
  - update fn exec rules (now only head pos vs. other pos in array)
  - add comment() fn
  - add Format.comments flag
  - update COMPACT preset to omit comments
  - add unit format wrappers
  - rename attribIncl() => attribContains()
  - rename attribContains() => attribMatches()
- update conditional handling, add formatCond() ([57533c7](https://github.com/thi-ng/umbrella/commit/57533c7))
- add support for iterators as arg type to css() ([02bff87](https://github.com/thi-ng/umbrella/commit/02bff87))
- add more unit types, update px/ms ([787d0ab](https://github.com/thi-ng/umbrella/commit/787d0ab))
  - add rad(), turn()
  - force int values for px()/ms()
- add comment() indentation support ([0f416ef](https://github.com/thi-ng/umbrella/commit/0f416ef))

#### 🩹 Bug fixes

- @import query separator ([e347c29](https://github.com/thi-ng/umbrella/commit/e347c29))
- fn & auto-prefix handling ([f3190ff](https://github.com/thi-ng/umbrella/commit/f3190ff))

#### ⏱ Performance improvements

- minor optimizations ([6de6b27](https://github.com/thi-ng/umbrella/commit/6de6b27))
- no empty Set() creation, change type check order in css() ([105bbf4](https://github.com/thi-ng/umbrella/commit/105bbf4))

#### ♻️ Refactoring

- format @keyframe stops, rename perc() => percent() ([a623117](https://github.com/thi-ng/umbrella/commit/a623117))
