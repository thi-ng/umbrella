# Change Log

- **Last updated**: 2026-01-16T11:40:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.64](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@3.0.64) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@3.0.0) (2024-07-22)

#### 🛑 Breaking changes

- migrate/remove DisjointSet ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([c4a9798](https://github.com/thi-ng/umbrella/commit/c4a9798))
- BREAKING CHANGE: migrate DisjointSet to [@thi.ng/disjoint-set](https://github.com/thi-ng/umbrella/tree/main/packages/disjoint-set) pkg
  - remove obsolete files
  - update pkg

### [2.5.48](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@2.5.48) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([c7376f3](https://github.com/thi-ng/umbrella/commit/c7376f3))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@2.5.0) (2023-10-19)

#### 🚀 Features

- explicit version bump for @firfi's recent additions ([#400](https://github.com/thi-ng/umbrella/issues/400)) ([0d00025](https://github.com/thi-ng/umbrella/commit/0d00025))
  - see: [2fd123d741586fe29a8cc63b7aa30f3ea9d35ab2](https://github.com/thi-ng/umbrella/commit/2fd123d741586fe29a8cc63b7aa30f3ea9d35ab2)
  - update readme with API examples

#### 🩹 Bug fixes

- fix AdjacencyBitMatrix.numVertices() ([bd034ab](https://github.com/thi-ng/umbrella/commit/bd034ab))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/adjacency@2.4.0) (2023-10-18)

#### 🚀 Features

- add AdjacencyBitMatrix.similarity(), other updates ([259b507](https://github.com/thi-ng/umbrella/commit/259b507))
  - add AdjacencyBitMatrix.similarity() to select related nodes (based on shared connections)
  - simplify AdjacencyBitMatrix.neighbors()
  - fix iteration bug in AdjacencyBitMatrix.edges()
