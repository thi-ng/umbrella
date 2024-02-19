# Change Log

- **Last updated**: 2024-02-19T16:07:07Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.48](https://github.com/thi-ng/umbrella/tree/@thi.ng/fuzzy@2.1.48) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fuzzy@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/fuzzy@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fuzzy@2.0.0) (2021-10-12)

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
- update imports ([3d46498](https://github.com/thi-ng/umbrella/commit/3d46498))

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/fuzzy@0.1.3) (2021-02-20)

#### ♻️ Refactoring

- use clamp0() ([2825130](https://github.com/thi-ng/umbrella/commit/2825130))
- update to use new Range type ([1cc23c6](https://github.com/thi-ng/umbrella/commit/1cc23c6))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fuzzy@0.1.0) (2020-12-22)

#### 🚀 Features

- import as new pkg, refactor ([a578194](https://github.com/thi-ng/umbrella/commit/a578194))
  - re-use T-norms migrated to [@thi.ng/maths](https://github.com/thi-ng/umbrella/tree/main/packages/maths)
  - add variable() factory
  - add classify()
  - fix off-by-one error in trapezoid()
  - add docstrings
- add evaluate() ([0ffc9d0](https://github.com/thi-ng/umbrella/commit/0ffc9d0))
- add shapes, strongAnd(), update combineTerms() ([5bf8f0c](https://github.com/thi-ng/umbrella/commit/5bf8f0c))
- add strict arg for classify(), update docs ([b39248f](https://github.com/thi-ng/umbrella/commit/b39248f))
- add maxima(), compose(), restructure ([f15d8d7](https://github.com/thi-ng/umbrella/commit/f15d8d7))
- migrate t-norms from [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/main/packages/math) pkg ([f8993e0](https://github.com/thi-ng/umbrella/commit/f8993e0))
- add min true threshold for classify() ([6f49a30](https://github.com/thi-ng/umbrella/commit/6f49a30))
  - update docs
- add alphaCut() & implication() fns ([8ec15fa](https://github.com/thi-ng/umbrella/commit/8ec15fa))
- update defuzz() output prep ([81abe8c](https://github.com/thi-ng/umbrella/commit/81abe8c))
  - add support for custom implications of rule outputs
  - update/optimize rule weight handling
- update defuzz() & strategies ([cf337f3](https://github.com/thi-ng/umbrella/commit/cf337f3))
  - simplify DefuzzStrategy to take single FuzzyFn
  - add `combine` s-norm arg to defuzz() and compose output sets before
    handing them to the strategy impl
  - split maximaStrategy() into individual fns
  - simplify/rename strategy opts
  - update strategy interval iteration to minimize floating point errors
  - update tests
- make lvar, rules, defuzz() typesafe ([0b210c3](https://github.com/thi-ng/umbrella/commit/0b210c3))
  - add/update types (Rule, LVar, LVar helpers)
  - update variable() & rule factories (add generics)
  - make defuzz() generic, infer return type
  - update tests
- update types, update compose ([566469d](https://github.com/thi-ng/umbrella/commit/566469d))
  - add new LVar types
  - remove combineTerms(), merge into compose()
  - remove implication(), merge into compose()
  - update compose() to return optimized fns
  - add intersect()/union() syntax sugar
  - update defuzz()
- add/update/migrate defuzz strategies ([c1ee15f](https://github.com/thi-ng/umbrella/commit/c1ee15f))
  - move to /strategies subdir
  - make centroidStrategy() default
  - rename & optimize bisectorStrategy()
  - add docstrings w/ diagrams for all strats
  - update tests

#### ⏱ Performance improvements

- update defuzz() ([60030dd](https://github.com/thi-ng/umbrella/commit/60030dd))
  - skip preparation of rule outputs which aren't requested
