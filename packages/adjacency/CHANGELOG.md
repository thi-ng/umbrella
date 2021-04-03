# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.3.12...@thi.ng/adjacency@0.3.13) (2021-04-03)

**Note:** Version bump only for package @thi.ng/adjacency





## [0.3.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.3.11...@thi.ng/adjacency@0.3.12) (2021-03-30)

**Note:** Version bump only for package @thi.ng/adjacency





## [0.3.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.3.10...@thi.ng/adjacency@0.3.11) (2021-03-28)

**Note:** Version bump only for package @thi.ng/adjacency





## [0.3.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.3.9...@thi.ng/adjacency@0.3.10) (2021-03-27)

**Note:** Version bump only for package @thi.ng/adjacency





## [0.3.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.3.8...@thi.ng/adjacency@0.3.9) (2021-03-24)

**Note:** Version bump only for package @thi.ng/adjacency





## [0.3.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.3.7...@thi.ng/adjacency@0.3.8) (2021-03-24)

**Note:** Version bump only for package @thi.ng/adjacency





## [0.3.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.3.6...@thi.ng/adjacency@0.3.7) (2021-03-17)

**Note:** Version bump only for package @thi.ng/adjacency





## [0.3.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.3.5...@thi.ng/adjacency@0.3.6) (2021-03-12)

**Note:** Version bump only for package @thi.ng/adjacency





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.2.6...@thi.ng/adjacency@0.3.0) (2021-02-20)


### Features

* **adjacency:** add AdjacencyList impl & initial tests ([8f44c97](https://github.com/thi-ng/umbrella/commit/8f44c9762c0856a9b96e4548d2386eca6dcbf397))
* **adjacency:** add IGraph.degree() & impls ([9fb02ac](https://github.com/thi-ng/umbrella/commit/9fb02ac7467785a0802c544cbc3100d6ac52fb87))
* **adjacency:** major update Adjacency(Bit)Matrix classes & API ([cd71a5f](https://github.com/thi-ng/umbrella/commit/cd71a5fca3b2d8525c5b1c6e9032e55e39fea2dd))


### Performance Improvements

* **adjacency:** pre-cache MST edge costs ([290f3a6](https://github.com/thi-ng/umbrella/commit/290f3a6e1f9d71ddf3bb33f4bc6e9552896903a9))


### BREAKING CHANGES

* **adjacency:** replace .valence() w/ more flexible .degree() methods

- add IGraph.degree() with same default behavior as .valence(),
  but supporting diff degree types (in/out/inout)
- add .degree() impls for all
- remove old .valence() methods
- update tests
* **adjacency:** fixed order add/removeEdge(), valence(), neighbors(),
remove static methods

- update IGraph, add/update methods, return types, generics
- remove/replace static methods in Adjacency(Bit)Matrix
- add defAdjBitMatrix/defAdjMatrix
- refactor/extract/re-use .toDot() graphviz conversion
- update tests





# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.1.67...@thi.ng/adjacency@0.2.0) (2020-12-22)


### Code Refactoring

* **adjacency:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([88edbe1](https://github.com/thi-ng/umbrella/commit/88edbe10ffe9ceb9f5e8494c9a60b8067a7d57d1))


### BREAKING CHANGES

* **adjacency:** replace DegreeType w/ type alias





## [0.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/adjacency@0.1.6...@thi.ng/adjacency@0.1.7) (2019-03-18)

### Performance Improvements

* **adjacency:** update subsets() to use canonical() ([0918c5b](https://github.com/thi-ng/umbrella/commit/0918c5b))

# 0.1.0 (2019-02-17)

### Features

* **adjacency:** add bitmatrix edge counting, add/fix toDot() impls, add tests ([dae97ff](https://github.com/thi-ng/umbrella/commit/dae97ff))
* **adjacency:** merge w/ unionfind pkg, add BFS, DFS, MST, DisjointSet ([2339b43](https://github.com/thi-ng/umbrella/commit/2339b43))
* **adjacency:** re-import refactored adj matrices as new package ([501ea5e](https://github.com/thi-ng/umbrella/commit/501ea5e))
