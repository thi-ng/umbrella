# Change Log

- **Last updated**: 2025-10-24T17:47:44Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [7.5.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@7.5.6) (2025-08-04)

#### ♻️ Refactoring

- add required typedarray generics (TS5.9) ([1229bbb](https://github.com/thi-ng/umbrella/commit/1229bbb))

## [7.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@7.5.0) (2025-05-28)

#### 🚀 Features

- update `FloatFormat` ([5e28d2f](https://github.com/thi-ng/umbrella/commit/5e28d2f))
  - add `.fromNormalized()`
  - rename `.getNormalized()` => `.normalized()`
- update `.as()` impls to support float formats ([2cf71f6](https://github.com/thi-ng/umbrella/commit/2cf71f6))
  - update `FloatBuffer.as()`, `IntBuffer.as()` to support both int & float formats
  - deprecate `floatBufferFromInt()`

#### ♻️ Refactoring

- allow `.format` overrides in float/int buffers ([d5ad199](https://github.com/thi-ng/umbrella/commit/d5ad199))

## [7.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@7.4.0) (2025-03-16)

#### 🚀 Features

- add `.setImageData()` ([91c17df](https://github.com/thi-ng/umbrella/commit/91c17df))
  - add `ISetImageData` and impls for int & float buffers

### [7.3.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@7.3.6) (2024-10-05)

#### ♻️ Refactoring

- add explicit type casts (TS5.6.2) ([dcbdd60](https://github.com/thi-ng/umbrella/commit/dcbdd60))

## [7.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@7.3.0) (2024-08-10)

#### 🚀 Features

- add poisson-image example ([87ec9e7](https://github.com/thi-ng/umbrella/commit/87ec9e7))
  - update readmes
  - cc @nkint :)

### [7.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@7.2.1) (2024-08-01)

#### ♻️ Refactoring

- add OffscreenRawPixelBuffer, fix canvasPixels() ([06c6397](https://github.com/thi-ng/umbrella/commit/06c6397))
  - update canvasPixels() return type if given offscreen canvas as arg

## [7.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@7.2.0) (2024-08-01)

#### 🚀 Features

- extend CanvasContext and related functions to support OffscreenCanvas for better performance in web workers ([56d0985](https://github.com/thi-ng/umbrella/commit/56d0985))
  refactor(pixel): update canvas handling in pixel module to accommodate OffscreenCanvas for improved rendering capabilities
- add OffscreenCanvas support ([1617255](https://github.com/thi-ng/umbrella/commit/1617255))
  - update IBlit.blitCanvas() signature to accept
    `OffscreenCanvas` & `OffscreenCanvasRenderingContext2D`
  - update blitCanvas() impls for Float/IntBuffer (extract shared internals)
  - update canvasPixels()
  - minor cleanup after [#488](https://github.com/thi-ng/umbrella/issues/488)

## [7.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@7.1.0) (2024-07-25)

#### 🚀 Features

- add Iterable support for Int/FloatBuffer ([b459dfa](https://github.com/thi-ng/umbrella/commit/b459dfa))

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@7.0.0) (2024-07-22)

#### 🛑 Breaking changes

- migrate/remove dominantColors() ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([8851726](https://github.com/thi-ng/umbrella/commit/8851726))
- BREAKING CHANGE: migrate dominantColors() to [@thi.ng/pixel-dominant-colors](https://github.com/thi-ng/umbrella/tree/main/packages/pixel-dominant-colors) pkg
  - remove obsolete files
  - update pkg
- migrate/remove convolve functions ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([bf61076](https://github.com/thi-ng/umbrella/commit/bf61076))
- BREAKING CHANGE: migrate convolve, normalMap & imagePyramid functionality to [@thi.ng/pixel-convolve](https://github.com/thi-ng/umbrella/tree/main/packages/pixel-convolve) pkg
  - remove obsolete files
  - update deps/pkg
  - update readme

#### ♻️ Refactoring

- internal re-org ([522db36](https://github.com/thi-ng/umbrella/commit/522db36))
- internal update defIndexed(), remove obsolete deps ([76e5638](https://github.com/thi-ng/umbrella/commit/76e5638))
- intern swapLane13 helper, remove dependency ([ee202f8](https://github.com/thi-ng/umbrella/commit/ee202f8))

### [6.1.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@6.1.33) (2024-06-21)

#### ♻️ Refactoring

- minor, dedupe kernel normalization ([4fec4e6](https://github.com/thi-ng/umbrella/commit/4fec4e6))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [6.1.29](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@6.1.29) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([8ccc518](https://github.com/thi-ng/umbrella/commit/8ccc518))

### [6.1.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@6.1.21) (2024-03-18)

#### ♻️ Refactoring

- update .rotateByID() impls ([de6bd05](https://github.com/thi-ng/umbrella/commit/de6bd05))

### [6.1.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@6.1.11) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@6.1.0) (2024-01-26)

#### 🚀 Features

- add canvasFromPixelBuffer(), update canvasPixels() ([7f8583b](https://github.com/thi-ng/umbrella/commit/7f8583b))

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@6.0.0) (2023-12-19)

#### 🛑 Breaking changes

- remove canvas2d() & related types ([20d1879](https://github.com/thi-ng/umbrella/commit/20d1879))
- BREAKING CHANGE: migrate canvas2d() & related types to new pkg [@thi.ng/canvas](https://github.com/thi-ng/umbrella/tree/main/packages/canvas)
  - add canvas opts arg for imageCanvas()

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@5.0.0) (2023-11-12)

#### 🛑 Breaking changes

- update getRegion() return type ([6c22953](https://github.com/thi-ng/umbrella/commit/6c22953))
- BREAKING CHANGE: update getRegion() to return undefined
  if result region < 1 pixel
  - add size checks to impls in IntBuffer/FloatBuffer

### [4.3.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@4.3.3) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [4.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@4.3.0) (2023-10-27)

#### 🚀 Features

- add imageFromFile(), deprecate imagePromise() ([cac6468](https://github.com/thi-ng/umbrella/commit/cac6468))
  - internal restructure, move all imageXXX() fns to /src/image.ts
  - add imageFromFile()
  - deprecate imagePromise(), add as imageFromURL()

### [4.2.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@4.2.9) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@4.2.0) (2023-04-08)

#### 🚀 Features

- add IRotate and impls for int/float buffers ([a25b52a](https://github.com/thi-ng/umbrella/commit/a25b52a))
  - add rotateCW/CCW/180 methods
  - add rotateByID()

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@4.1.0) (2023-01-10)

#### 🚀 Features

- add normalize opt for defKernel()/defLargeKernel() ([9286590](https://github.com/thi-ng/umbrella/commit/9286590))
- add FloatFormat.getNormalized() ([ddf0980](https://github.com/thi-ng/umbrella/commit/ddf0980))
- add FLOAT_GRAY_RANGE format ([eedb24f](https://github.com/thi-ng/umbrella/commit/eedb24f))
- update/improve FloatBuffer.as() single channel conversions ([0146075](https://github.com/thi-ng/umbrella/commit/0146075))
  - check if both source & dest formats are single channel
  - if so, convert directly via getNormalized() and avoid intermediate
    (lossy) conversion via ABGR
  - using only scalar access also faster than per-pixel subarrays
- add FloatFormat.range ([0dbac7d](https://github.com/thi-ng/umbrella/commit/0dbac7d))
  - update all float formats
  - update FloatBuffer.clamp/clampChannel/getChannel()
- add IntBuffer/FloatBuffer.flipX() ([daa7c32](https://github.com/thi-ng/umbrella/commit/daa7c32))

#### ♻️ Refactoring

- update IBlend ([1d3f358](https://github.com/thi-ng/umbrella/commit/1d3f358))
  - include pre/postmultiply() fns
  - add docs
  - add FloatBuffer.isPremultiplied()

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@4.0.0) (2022-09-27)

#### 🛑 Breaking changes

- update .blitCanvas(), .toImageData() ([85e4e38](https://github.com/thi-ng/umbrella/commit/85e4e38))
- BREAKING CHANGE: add BlitCanvasOpts for optional .blitCanvas() args
  - update .blitCanvas() impls
  - update .toImageData() impls to accept pre-existing ImageData instance
  - add ensureImageData() check

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@3.4.0) (2022-04-07)

#### 🚀 Features

- buffer method additions, internal checks ([a70b3c1](https://github.com/thi-ng/umbrella/commit/a70b3c1))
  - add FloatBuffer.premultiply/postmultiply()
  - add Int/FloatBuffer.fill()
