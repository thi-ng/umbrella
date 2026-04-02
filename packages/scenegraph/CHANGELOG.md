# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.0.36](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/scenegraph@2.0.36/packages/scenegraph) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

# [2.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/scenegraph@2.0.0/packages/scenegraph) (2025-02-25)

#### 🛑 Breaking changes

- switch to using option objects for node ctors ([9b85ae7](https://codeberg.org/thi.ng/umbrella/commit/9b85ae7))
- BREAKING CHANGE: replace positional ctor args w/ options objects (aka named params)
  - add `CommonNodeOpts`, `Node2DOpts`, `Node3DOpts`
  - update all ctors: `ANode`, `Node2D`, `Node3D`
  - migrate `enabled`/`display` flags to `ISceneNode` interface
  - update tests

#### 🚀 Features

- add `scaleWithReferencePoint()` ([60b388c](https://codeberg.org/thi.ng/umbrella/commit/60b388c))
  - add `ISceneNode.scaleWithReferencePoint()` and impls in `Node2D`/`Node3D`
  - add/update `ISceneNode` doc strings
  - minor update/cleanup `ANode`
  - add tests
- add `scaleWithReferencePoint()` ([3cef74c](https://codeberg.org/thi.ng/umbrella/commit/3cef74c))
  - add `ISceneNode.scaleWithReferencePoint()` and impls in `Node2D`/`Node3D`
  - add/update `ISceneNode` doc strings
  - minor update/cleanup `ANode`

### [1.0.41](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/scenegraph@1.0.41/packages/scenegraph) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([6bf3ee1](https://codeberg.org/thi.ng/umbrella/commit/6bf3ee1))

# [1.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/scenegraph@1.0.0/packages/scenegraph) (2023-11-12)

#### 🛑 Breaking changes

- update ISceneNode, ANode ([a2a2694](https://codeberg.org/thi.ng/umbrella/commit/a2a2694))
- BREAKING CHANGE: add child ops to ISceneNode interface
  - update ANode.deleteChild()
  - simplify Node2/3 impls

### [0.6.32](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/scenegraph@0.6.32/packages/scenegraph) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [0.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/scenegraph@0.6.0/packages/scenegraph) (2023-04-19)

#### 🚀 Features

- add ANode.mapLocalPointToGlobal(), update 2D/3D impls ([b1d30ef](https://codeberg.org/thi.ng/umbrella/commit/b1d30ef))
