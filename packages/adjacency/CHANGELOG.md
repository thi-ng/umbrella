# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@2.0.9...@thi.ng/adjacency@2.0.10) (2021-11-10)

**Note:** Version bump only for package @thi.ng/adjacency





## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@2.0.8...@thi.ng/adjacency@2.0.9) (2021-11-04)

**Note:** Version bump only for package @thi.ng/adjacency





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@2.0.7...@thi.ng/adjacency@2.0.8) (2021-11-03)

**Note:** Version bump only for package @thi.ng/adjacency





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@1.0.5...@thi.ng/adjacency@2.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@1.0.4...@thi.ng/adjacency@1.0.5) (2021-09-03)

**Note:** Version bump only for package @thi.ng/adjacency

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.2.6...@thi.ng/adjacency@0.3.0) (2021-02-20)

###  Features

- **adjacency:** add AdjacencyList impl & initial tests ([8f44c97](https://github.com/thi-ng/umbrella/commit/8f44c9762c0856a9b96e4548d2386eca6dcbf397))
- **adjacency:** add IGraph.degree() & impls ([9fb02ac](https://github.com/thi-ng/umbrella/commit/9fb02ac7467785a0802c544cbc3100d6ac52fb87))
- **adjacency:** major update Adjacency(Bit)Matrix classes & API ([cd71a5f](https://github.com/thi-ng/umbrella/commit/cd71a5fca3b2d8525c5b1c6e9032e55e39fea2dd))

###  Performance Improvements

- **adjacency:** pre-cache MST edge costs ([290f3a6](https://github.com/thi-ng/umbrella/commit/290f3a6e1f9d71ddf3bb33f4bc6e9552896903a9))

###  BREAKING CHANGES

- **adjacency:** replace .valence() w/ more flexible .degree() methods
    - add IGraph.degree() with same default behavior as .valence(),   but supporting diff degree types (in/out/inout)
    - add .degree() impls for all
    - remove old .valence() methods
    - update tests
- **adjacency:** fixed order add/removeEdge(), valence(), neighbors(), remove static methods
    - update IGraph, add/update methods, return types, generics
    - remove/replace static methods in Adjacency(Bit)Matrix
    - add defAdjBitMatrix/defAdjMatrix
    - refactor/extract/re-use .toDot() graphviz conversion
    - update tests

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.1.67...@thi.ng/adjacency@0.2.0) (2020-12-22)

###  Code Refactoring

- **adjacency:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([88edbe1](https://github.com/thi-ng/umbrella/commit/88edbe10ffe9ceb9f5e8494c9a60b8067a7d57d1))

###  BREAKING CHANGES

- **adjacency:** replace DegreeType w/ type alias

##  [0.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.1.6...@thi.ng/adjacency@0.1.7) (2019-03-18)

###  Performance Improvements

- **adjacency:** update subsets() to use canonical() ([0918c5b](https://github.com/thi-ng/umbrella/commit/0918c5b))

#  0.1.0 (2019-02-17)

###  Features

- **adjacency:** add bitmatrix edge counting, add/fix toDot() impls, add tests ([dae97ff](https://github.com/thi-ng/umbrella/commit/dae97ff))
- **adjacency:** merge w/ unionfind pkg, add BFS, DFS, MST, DisjointSet ([2339b43](https://github.com/thi-ng/umbrella/commit/2339b43))
- **adjacency:** re-import refactored adj matrices as new package ([501ea5e](https://github.com/thi-ng/umbrella/commit/501ea5e))
