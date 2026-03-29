# Change Log

- **Last updated**: 2026-03-19T12:29:04Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.2.42](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast-js@1.2.42) (2026-02-07)

#### ♻️ Refactoring

- replace deprecated `unsupported()` call sites in all pkgs ([3abbddf](https://codeberg.org/thi.ng/umbrella/commit/3abbddf))

## [1.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast-js@1.2.0) (2025-05-18)

#### 🚀 Features

- add trigonometry builtins ([1653e4f](https://codeberg.org/thi.ng/umbrella/commit/1653e4f))

### [1.1.84](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast-js@1.1.84) (2025-04-16)

#### ♻️ Refactoring

- internal updates (imports & renames) ([e8f49ca](https://codeberg.org/thi.ng/umbrella/commit/e8f49ca))
- minor internal optimizations (vector ops) ([696578e](https://codeberg.org/thi.ng/umbrella/commit/696578e))

### [1.1.36](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast-js@1.1.36) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

## [1.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast-js@1.1.0) (2023-12-31)

#### 🚀 Features

- fix [#435](https://github.com/thi-ng/umbrella/issues/435), add new lshift/rshift ops/variations ([a78d313](https://codeberg.org/thi.ng/umbrella/commit/a78d313))

### [1.0.21](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast-js@1.0.21) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

# [1.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast-js@1.0.0) (2023-08-14)

#### 🛑 Breaking changes

- update renderPixels(), renderBuffer() ([5b2fe9d](https://codeberg.org/thi.ng/umbrella/commit/5b2fe9d))
- BREAKING CHANGES: replace render functions args with options object
  - add RenderPixelOpts
  - update renderPixels()/renderBuffer() to support arbitrary integer pixel formats
  - add/expose color conversion fns:
    - rgbaBgra8888() for 32bit targets
    - rgbaRgb565() for 16bit targets

#### 🚀 Features

- add vector pools for all vector ops ([31271e7](https://codeberg.org/thi.ng/umbrella/commit/31271e7))
  - add Pool class and impls for [iu]vec2/3/4
  - update all vector ops to re-use memory from pools
  - add CompileResult interface w/ `__reset()` and `__stats()` methods
  - update targetJS() codegens

#### ♻️ Refactoring

- update/extend vector pool handling ([1c22d0c](https://codeberg.org/thi.ng/umbrella/commit/1c22d0c))

### [0.7.64](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast-js@0.7.64) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://codeberg.org/thi.ng/umbrella/commit/b6db053))

### [0.7.53](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast-js@0.7.53) (2023-03-27)

#### ♻️ Refactoring

- update remaining type imports (TS5.0) in various pkgs ([e0edf26](https://codeberg.org/thi.ng/umbrella/commit/e0edf26))
