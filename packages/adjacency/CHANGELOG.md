# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.64](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/adjacency@3.0.64/packages/adjacency) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/adjacency@3.0.0/packages/adjacency) (2024-07-22)

#### 🛑 Breaking changes

- migrate/remove DisjointSet ([#486](https://codeberg.org/thi.ng/umbrella/issues/486)) ([c4a9798](https://codeberg.org/thi.ng/umbrella/commit/c4a9798))
- BREAKING CHANGE: migrate DisjointSet to [@thi.ng/disjoint-set](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/disjoint-set) pkg
  - remove obsolete files
  - update pkg

### [2.5.48](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/adjacency@2.5.48/packages/adjacency) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([c7376f3](https://codeberg.org/thi.ng/umbrella/commit/c7376f3))

### [2.5.40](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/adjacency@2.5.40/packages/adjacency) (2024-03-18)

#### 🧪 Tests

- minor update tests in various pkgs (regexp, annotations) ([b731a57](https://codeberg.org/thi.ng/umbrella/commit/b731a57))

### [2.5.7](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/adjacency@2.5.7/packages/adjacency) (2023-11-09)

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))

## [2.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/adjacency@2.5.0/packages/adjacency) (2023-10-19)

#### 🚀 Features

- explicit version bump for @firfi's recent additions ([#400](https://codeberg.org/thi.ng/umbrella/issues/400)) ([0d00025](https://codeberg.org/thi.ng/umbrella/commit/0d00025))
  - see: [2fd123d741586fe29a8cc63b7aa30f3ea9d35ab2](https://codeberg.org/thi.ng/umbrella/commit/2fd123d741586fe29a8cc63b7aa30f3ea9d35ab2)
  - update readme with API examples

#### 🩹 Bug fixes

- fix AdjacencyBitMatrix.numVertices() ([bd034ab](https://codeberg.org/thi.ng/umbrella/commit/bd034ab))

## [2.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/adjacency@2.4.0/packages/adjacency) (2023-10-18)

#### 🚀 Features

- add AdjacencyBitMatrix.similarity(), other updates ([259b507](https://codeberg.org/thi.ng/umbrella/commit/259b507))
  - add AdjacencyBitMatrix.similarity() to select related nodes (based on shared connections)
  - simplify AdjacencyBitMatrix.neighbors()
  - fix iteration bug in AdjacencyBitMatrix.edges()

### [2.3.13](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/adjacency@2.3.13/packages/adjacency) (2023-03-27)

#### 🧪 Tests

- update all tests (mainly imports) ([63a85f9](https://codeberg.org/thi.ng/umbrella/commit/63a85f9))
