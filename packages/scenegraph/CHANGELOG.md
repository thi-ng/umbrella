# Change Log

- **Last updated**: 2025-10-25T22:30:00Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/scenegraph@2.0.0) (2025-02-25)

#### 🛑 Breaking changes

- switch to using option objects for node ctors ([9b85ae7](https://github.com/thi-ng/umbrella/commit/9b85ae7))
- BREAKING CHANGE: replace positional ctor args w/ options objects (aka named params)
  - add `CommonNodeOpts`, `Node2DOpts`, `Node3DOpts`
  - update all ctors: `ANode`, `Node2D`, `Node3D`
  - migrate `enabled`/`display` flags to `ISceneNode` interface
  - update tests

#### 🚀 Features

- add `scaleWithReferencePoint()` ([60b388c](https://github.com/thi-ng/umbrella/commit/60b388c))
  - add `ISceneNode.scaleWithReferencePoint()` and impls in `Node2D`/`Node3D`
  - add/update `ISceneNode` doc strings
  - minor update/cleanup `ANode`
  - add tests
- add `scaleWithReferencePoint()` ([3cef74c](https://github.com/thi-ng/umbrella/commit/3cef74c))
  - add `ISceneNode.scaleWithReferencePoint()` and impls in `Node2D`/`Node3D`
  - add/update `ISceneNode` doc strings
  - minor update/cleanup `ANode`

### [1.0.41](https://github.com/thi-ng/umbrella/tree/@thi.ng/scenegraph@1.0.41) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([6bf3ee1](https://github.com/thi-ng/umbrella/commit/6bf3ee1))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/scenegraph@1.0.0) (2023-11-12)

#### 🛑 Breaking changes

- update ISceneNode, ANode ([a2a2694](https://github.com/thi-ng/umbrella/commit/a2a2694))
- BREAKING CHANGE: add child ops to ISceneNode interface
  - update ANode.deleteChild()
  - simplify Node2/3 impls

### [0.6.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/scenegraph@0.6.32) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/scenegraph@0.6.0) (2023-04-19)

#### 🚀 Features

- add ANode.mapLocalPointToGlobal(), update 2D/3D impls ([b1d30ef](https://github.com/thi-ng/umbrella/commit/b1d30ef))
