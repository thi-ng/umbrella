# Change Log

- **Last updated**: 2024-01-30T15:21:31Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [7.1.41](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@7.1.41) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [7.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@7.1.0) (2022-07-12)

#### 🚀 Features

- add `onlyFnRefs` option ([a23fc98](https://github.com/thi-ng/umbrella/commit/a23fc98))

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@7.0.0) (2022-07-07)

#### 🛑 Breaking changes

- add ResolveOpts, conditional unwrapping ([a23308b](https://github.com/thi-ng/umbrella/commit/a23308b))
- BREAKING CHANGE: update resolve() signature, use new `ResolveOpts`
  - this change has only downstream impact on use cases requiring custom
  prefixes to indicate lookup paths
  - add new option to control value unwrapping in final result
  - update docs/readme
  - add new tests

## [6.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@6.2.0) (2022-07-07)

#### 🚀 Features

- unwrap all resolved() values in result ([888fa33](https://github.com/thi-ng/umbrella/commit/888fa33))
  - add unwrapResolved() to unwrap any values wrapped via `resolved()`
  - update resolveMap/Array()
  - update doc strings
  - update tests

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@6.1.0) (2022-05-23)

#### 🚀 Features

- add support for protected values ([6280510](https://github.com/thi-ng/umbrella/commit/6280510))
  - add `Resolved` wrapper & factory fn for protecting values from
    future/duplicate resolution attempts
  - add tests
  - update docs/readme

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@6.0.0) (2022-05-02)

#### 🛑 Breaking changes

- add `Unresolved` type & type checking ([a997fd2](https://github.com/thi-ng/umbrella/commit/a997fd2))
- BREAKING CHANGE: add type checking to `resolve()`.
  This MIGHT require additional type generics (of the result object type)
  to be added to any call sites. See tests for examples.

### [5.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@5.1.5) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@5.1.0) (2021-11-17)

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

### [5.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@5.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@5.0.0) (2021-10-12)

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
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

### [4.2.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@4.2.9) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@4.2.0) (2020-07-18)

#### 🚀 Features

- add support for custom lookup prefix ([bf89503](https://github.com/thi-ng/umbrella/commit/bf89503))
  - add tests

### [4.1.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@4.1.16) (2020-03-28)

#### ♻️ Refactoring

- update to new [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/main/packages/paths) API ([182b36b](https://github.com/thi-ng/umbrella/commit/182b36b))

### [4.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@4.1.2) (2019-07-08)

#### 🩹 Bug fixes

- fix [#97](https://github.com/thi-ng/umbrella/issues/97), update to consider trailing comma & whitespace ([de9532b](https://github.com/thi-ng/umbrella/commit/de9532b))
  - add more tests

### [4.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@4.1.1) (2019-07-08)

#### 🩹 Bug fixes

- fix [#97](https://github.com/thi-ng/umbrella/issues/97), update fn arg destructuring ([e68dc19](https://github.com/thi-ng/umbrella/commit/e68dc19))
  - update resolveFunction() to allow trailing comma in destructure form, e.g. `{ a, b, }`
  - add test case

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@4.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([7e7ff2a](https://github.com/thi-ng/umbrella/commit/7e7ff2a))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([fa7b252](https://github.com/thi-ng/umbrella/commit/fa7b252))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@4.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

### [3.0.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@3.0.10) (2018-09-01)

#### 🩹 Bug fixes

- deep resolve of yet unknown path values ([a710453](https://github.com/thi-ng/umbrella/commit/a710453))

### [3.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@3.0.8) (2018-08-24)

#### ♻️ Refactoring

- replace SEMAPHORE const w/ [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) def ([bea7a1f](https://github.com/thi-ng/umbrella/commit/bea7a1f))

### [3.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@3.0.5) (2018-07-15)

#### 🩹 Bug fixes

- add support for alt ES6 destructure form `{a: b}` ([2482945](https://github.com/thi-ng/umbrella/commit/2482945))
  - also fixes issue w/ minimized builds

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@3.0.0) (2018-06-07)

#### 🛑 Breaking changes

- add cycle detection, fix edge cases ([e61c3b5](https://github.com/thi-ng/umbrella/commit/e61c3b5))
  - add `resolve()` as main user function
  - make `resolveMap()` private
  - update _resolve() to keep track of active lookups
  - implement cycle detection
  - add markResolved() helper
  - update resolveFunction() to mark all of its nested
    values as resolved
  - refactor resolvePath()
  - update docs/readme
  - add/update tests
- BREAKING CHANGE: `resolveMap()` renamed to `resolve()`, update docs

#### 🚀 Features

- add ES6 destructuring shorthands for function vals ([57f1ed5](https://github.com/thi-ng/umbrella/commit/57f1ed5))
  - add _resolveFunction()
  - add tests
  - update docs & readme

### [2.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@2.0.6) (2018-06-06)

#### 🩹 Bug fixes

- add private _resolveDeep ([558f4f8](https://github.com/thi-ng/umbrella/commit/558f4f8))
  - fixes resolution issue if a function dynamically created deep values
- also use _resolvePath for plain lookups, optimize ([48c796f](https://github.com/thi-ng/umbrella/commit/48c796f))
  - rename _resolveDeep => _resolvePath
  - update docs

#### ♻️ Refactoring

- export absPath(), add LookupPath type alias ([dc6e0ac](https://github.com/thi-ng/umbrella/commit/dc6e0ac))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@2.0.1) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@2.0.0) (2018-05-09)

#### 🛑 Breaking changes

- fix [#21](https://github.com/thi-ng/umbrella/issues/21) ([5d2a3fe](https://github.com/thi-ng/umbrella/commit/5d2a3fe))
- BREAKING CHANGE: update lookup path prefix & separators
  - lookup paths now are prefixed with `@` instead of `->`
  - all path segments must be separated by `/`
  - update readme & tests

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@1.0.0) (2018-04-16)

#### 🛑 Breaking changes

- support relative parent refs, update tests/readme ([a379d12](https://github.com/thi-ng/umbrella/commit/a379d12))
- BREAKING CHANGE: lookup paths passed to the provided `resolve()` fn
  inside function values are now relative by default (previously only
  absolute paths were allowed)
  - remove `resolveArray()` from module exports
    (use `resolveMap()` instead)
  - add absPath() to compute absolute path
  - add support for "../" ancestor access

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@0.2.0) (2018-04-16)

#### 🚀 Features

- resolve each ref only once, re-use resolved results ([6992e82](https://github.com/thi-ng/umbrella/commit/6992e82))
  - this also fixes function value resolution,
    e.g. {a: () => ()=> 1, b: "->a" } only unwraps `a` once now
