# Change Log

- **Last updated**: 2022-12-16T12:52:25Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.2.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@2.2.12) (2022-10-26)

#### ♻️ Refactoring

- update AdjacencyBitMatrix & tests ([a86b6ee](https://github.com/thi-ng/umbrella/commit/a86b6ee))
  - update .neighbors() impl to adjust to new u8 backing array
    (see [aaa0ecb1d](https://github.com/thi-ng/umbrella/commit/aaa0ecb1d))
  - add/update test cases

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@2.2.0) (2022-07-19)

#### 🚀 Features

- update AdjacencyList ([5d85d87](https://github.com/thi-ng/umbrella/commit/5d85d87))
  - add vertices() iterator
  - rename old `.vertices` field => `.adjacency`
  - add adjListFromAdjacency() factory fn

#### ♻️ Refactoring

- update DCons call sites ([2dfec21](https://github.com/thi-ng/umbrella/commit/2dfec21))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@2.1.0) (2021-11-17)

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

### [2.0.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@2.0.10) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@2.0.0) (2021-10-12)

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
- update imports ([ee847e0](https://github.com/thi-ng/umbrella/commit/ee847e0))
- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))

### [0.3.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.3.7) (2021-03-17)

#### ♻️ Refactoring

- dedupe OOB error handling ([84bbaaa](https://github.com/thi-ng/umbrella/commit/84bbaaa))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.3.0) (2021-02-20)

#### 🛑 Breaking changes

- major update Adjacency(Bit)Matrix classes & API ([cd71a5f](https://github.com/thi-ng/umbrella/commit/cd71a5f))
- BREAKING CHANGE: fixed order add/removeEdge(), valence(), neighbors(),
  remove static methods
  - update IGraph, add/update methods, return types, generics
  - remove/replace static methods in Adjacency(Bit)Matrix
  - add defAdjBitMatrix/defAdjMatrix
  - refactor/extract/re-use .toDot() graphviz conversion
  - update tests
- add IGraph.degree() & impls ([9fb02ac](https://github.com/thi-ng/umbrella/commit/9fb02ac))
- BREAKING CHANGE: replace .valence() w/ more flexible .degree() methods
  - add IGraph.degree() with same default behavior as .valence(),
    but supporting diff degree types (in/out/inout)
  - add .degree() impls for all
  - remove old .valence() methods
  - update tests

#### 🚀 Features

- add AdjacencyList impl & initial tests ([8f44c97](https://github.com/thi-ng/umbrella/commit/8f44c97))

#### ⏱ Performance improvements

- pre-cache MST edge costs ([290f3a6](https://github.com/thi-ng/umbrella/commit/290f3a6))

#### ♻️ Refactoring

- update BFS/DFS impls ([7bb045b](https://github.com/thi-ng/umbrella/commit/7bb045b))
  - add one-off search bfs()/dfs() functions/syntax sugar
  - update BFS to be single-source only (for more predictable results)
- update DisjointSet, add defDisjointSet() ([cfe3ed5](https://github.com/thi-ng/umbrella/commit/cfe3ed5))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.2.0) (2020-12-22)

#### 🛑 Breaking changes

- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([88edbe1](https://github.com/thi-ng/umbrella/commit/88edbe1))
- BREAKING CHANGE: replace DegreeType w/ type alias

### [0.1.67](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.1.67) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([b8243b9](https://github.com/thi-ng/umbrella/commit/b8243b9))

### [0.1.65](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.1.65) (2020-11-24)

#### ♻️ Refactoring

- update destructuring ([3524982](https://github.com/thi-ng/umbrella/commit/3524982))

### [0.1.61](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.1.61) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types in various pkgs ([ced1e5d](https://github.com/thi-ng/umbrella/commit/ced1e5d))

### [0.1.35](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.1.35) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([fd5c401](https://github.com/thi-ng/umbrella/commit/fd5c401))

### [0.1.29](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.1.29) (2020-02-25)

#### ♻️ Refactoring

- update type imports ([3d9ebcf](https://github.com/thi-ng/umbrella/commit/3d9ebcf))

### [0.1.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.1.16) (2019-07-07)

#### ♻️ Refactoring

- TS strictNullChecks ([b628e61](https://github.com/thi-ng/umbrella/commit/b628e61))

### [0.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.1.7) (2019-03-18)

#### ⏱ Performance improvements

- update subsets() to use canonical() ([0918c5b](https://github.com/thi-ng/umbrella/commit/0918c5b))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@0.1.0) (2019-02-17)

#### 🚀 Features

- re-import refactored adj matrices as new package ([501ea5e](https://github.com/thi-ng/umbrella/commit/501ea5e))
- add bitmatrix edge counting, add/fix toDot() impls, add tests ([dae97ff](https://github.com/thi-ng/umbrella/commit/dae97ff))
- merge w/ unionfind pkg, add BFS, DFS, MST, DisjointSet ([2339b43](https://github.com/thi-ng/umbrella/commit/2339b43))
