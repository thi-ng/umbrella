# Change Log

- **Last updated**: 2022-12-22T21:47:07Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@3.3.0) (2021-12-13)

#### 🚀 Features

- add Canvas2DOpts, update canvas2d() ([7ff99a2](https://github.com/thi-ng/umbrella/commit/7ff99a2))
- add MAXIMA convolution kernels ([d15caed](https://github.com/thi-ng/umbrella/commit/d15caed))
  - add `MAXIMA4_CROSS`, `MAXIMA4_DIAG`
  - add `MAXIMA8`
- add 8/16/32bit support for defIndexed() ([b20a924](https://github.com/thi-ng/umbrella/commit/b20a924))
  - add defIndexed8/16/32()
  - update defIndexed() to decide about required bitdepth
  - add/update docs strings

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@3.2.0) (2021-11-17)

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

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@3.1.0) (2021-11-10)

#### 🚀 Features

- add IGrid2D impls, update ctors ([3ac0327](https://github.com/thi-ng/umbrella/commit/3ac0327))

#### ♻️ Refactoring

- minor update mixin sites ([6980c3a](https://github.com/thi-ng/umbrella/commit/6980c3a))
- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@3.0.0) (2021-11-04)

#### 🛑 Breaking changes

- rename int buffer/format types ([6be02f1](https://github.com/thi-ng/umbrella/commit/6be02f1))
- BREAKING CHANGE: rename int buffer/format types
  - rename:
    - PackedBuffer => IntBuffer
    - PackedFormat/Spec => IntFormat/Spec
    - PackedChannel/Spec => IntChannel/Spec
  - replace static FloatBuffer.fromInt() with
    standalone fn floatBufferFromInt()
  - add floatBufferFromImage()
  - add floatBufferFromCanvas()
  - update readme

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@2.2.0) (2021-11-03)

#### 🚀 Features

- add flood fill functions ([65796b9](https://github.com/thi-ng/umbrella/commit/65796b9))
- add unsafe getters/setters ([714d6f7](https://github.com/thi-ng/umbrella/commit/714d6f7))
  - update IPixelBuffer and all impls
- add shape drawing fns ([d1e284b](https://github.com/thi-ng/umbrella/commit/d1e284b))
  - add drawLine(), drawLineWith()
  - add drawCircle()
  - add drawRect()

#### ♻️ Refactoring

- update types (IGrid2D) ([2fe8d4f](https://github.com/thi-ng/umbrella/commit/2fe8d4f))
  - update `IPixelBuffer` to extend new `IGrid2D`
  - deprecate `.pixels` property (use `.data`)
  - add `.rowStride` getter for PackedBuffer

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@2.1.0) (2021-10-13)

#### 🚀 Features

- add CORS config for imagePromise() ([a5a2058](https://github.com/thi-ng/umbrella/commit/a5a2058))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@2.0.0) (2021-10-12)

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
- restructure package ([698130a](https://github.com/thi-ng/umbrella/commit/698130a))
- BREAKING CHANGE: migrate dither ops to new pkg [@thi.ng/pixel-dither](https://github.com/thi-ng/umbrella/tree/main/packages/pixel-dither)
  - remove dither related types & functions
  - remove PackedBuffer.dither()
  - move internal helpers
- replace static PackedBuffer methods ([8e5d2db](https://github.com/thi-ng/umbrella/commit/8e5d2db))
- BREAKING CHANGE: replace static PackedBuffer methods w/ standalone functions
  - add packedBufferFromImage()
  - add packedBufferFromCanvas()
  - remove deprecated buffer() ctor fn

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- dedupe defIndexed() internals ([a4a3e61](https://github.com/thi-ng/umbrella/commit/a4a3e61))
  - replace closestColor() w/ argmin() from [@thi.ng/distance](https://github.com/thi-ng/umbrella/tree/main/packages/distance)
  - update deps
- internal restructure ([8a7ec9c](https://github.com/thi-ng/umbrella/commit/8a7ec9c))
- rename internals ([055e799](https://github.com/thi-ng/umbrella/commit/055e799))

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.11.0) (2021-08-04)

#### 🚀 Features

- add DominantColorOpts ([a57882b](https://github.com/thi-ng/umbrella/commit/a57882b))
  - add `filter` option to pre-filter eligible pixels

### [0.10.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.10.3) (2021-06-08)

#### ♻️ Refactoring

- dedupe defKernel() internals ([084c84a](https://github.com/thi-ng/umbrella/commit/084c84a))
  - extract declOffset() helper to dedupe offset var declarations

### [0.10.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.10.2) (2021-04-24)

#### ♻️ Refactoring

- modulo handling in samplers ([6fcea12](https://github.com/thi-ng/umbrella/commit/6fcea12))
  - reflecting change in [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/main/packages/math)

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.10.0) (2021-04-19)

#### 🚀 Features

- add dominantColors(), update deps ([ad0617e](https://github.com/thi-ng/umbrella/commit/ad0617e))
  - add [@thi.ng/k-means](https://github.com/thi-ng/umbrella/tree/main/packages/k-means) dependency

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.9.0) (2021-04-03)

#### 🚀 Features

- add IToImageData & impls ([3172e1e](https://github.com/thi-ng/umbrella/commit/3172e1e))
- update/fix convolution, add LANCZOS ([eadefda](https://github.com/thi-ng/umbrella/commit/eadefda))
  - remove `pad` option (now always enabled)
  - add `offset` option
  - update defKernel() codegen to consider/repeat edge pixels
  - update/fix defLargeKernel() for even sized kernels and consider edges
  - add LANCZOS kernel gen
- add imagePyramid() iterator ([7f77e07](https://github.com/thi-ng/umbrella/commit/7f77e07))
- add .upsize() impls, fix convolve() ([08f0d7c](https://github.com/thi-ng/umbrella/commit/08f0d7c))
  - add Packed/FloatBuffer.upsize()
  - fix channel offset handling in convolve()

### [0.8.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.8.1) (2021-03-20)

#### 🩹 Bug fixes

- update convolve() for even kernel sizes ([b086224](https://github.com/thi-ng/umbrella/commit/b086224))
  - since even kernel sizes are more left/top centric, update
    max iteration limits to ensure right colum & bottom row
    will be processed

#### ♻️ Refactoring

- dedupe sampling functions ([2643bdd](https://github.com/thi-ng/umbrella/commit/2643bdd))

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.8.0) (2021-03-17)

#### 🚀 Features

- add defIndexed() HOF pixel format ([c13a568](https://github.com/thi-ng/umbrella/commit/c13a568))
- add defSampler(), resize() ([aa71eb7](https://github.com/thi-ng/umbrella/commit/aa71eb7))
  - replace `Filter` & `Wrap` enums w/ type aliases ([#256](https://github.com/thi-ng/umbrella/issues/256))
  - add HOF `defSampler()` w/ impls for PackedBuffer only (so far)
  - add `resize()` (also PackedBuffer only)
- add bicubic samplers, fix resize() ([951fa9e](https://github.com/thi-ng/umbrella/commit/951fa9e))
- add float format samplers, update various types ([6f9dae6](https://github.com/thi-ng/umbrella/commit/6f9dae6))
  - add IResizable and implement for Packed/FloatBuffer
  - add FloatBuffer.invert()
  - fix .forEach() impls (esp. FloatBuffer), use return values
  - update IBlit, IBlend, IInvert generics

#### ♻️ Refactoring

- convert resize() into class method ([1c4dcaa](https://github.com/thi-ng/umbrella/commit/1c4dcaa))
  - move `IntSampler`, `FloatSampler` types to api.ts
  - migrate `resize()` to `PackedBuffer.resize()`
  - replace `PackedBuffer.downsample()` w/ new `PackedBuffer.scale()`
  - update resize filter arg to also accept custom sampler
- simplify bilinearABGR() ([1ec724c](https://github.com/thi-ng/umbrella/commit/1ec724c))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.7.0) (2021-03-03)

#### 🚀 Features

- add gradientImage() & FLOAT_NORMAL format ([78683b7](https://github.com/thi-ng/umbrella/commit/78683b7))
- add convolve() & preset kernels ([6a31dc3](https://github.com/thi-ng/umbrella/commit/6a31dc3))
- add normalMap(), add more kernels ([f32686d](https://github.com/thi-ng/umbrella/commit/f32686d))
  - replace gradientImage() w/ normalMap()
  - add GRADIENT_X/Y, HIGHPASS3 preset kernels
- add defKernel() kernel fn codegen ([25b97a3](https://github.com/thi-ng/umbrella/commit/25b97a3))
- add step size support for normalMap() ([ab72a79](https://github.com/thi-ng/umbrella/commit/ab72a79))
- add 5x5 kernel presets ([56f96f4](https://github.com/thi-ng/umbrella/commit/56f96f4))
- update/extend/refactor convolveChannel/Image() ([6692865](https://github.com/thi-ng/umbrella/commit/6692865))
  - add new convolution related types
  - add pooling & stride support (convolve(), defKernel())
  - add POOL_* filter presets
  - update normalMap()
- add IEmpty impls for Float/PackedBuffer ([46ac1a1](https://github.com/thi-ng/umbrella/commit/46ac1a1))
- add/update buffer factory fns ([ba38e13](https://github.com/thi-ng/umbrella/commit/ba38e13))
  - add fn overrides to simplify userland API
- add POOL_THRESHOLD preset ([5f1c1de](https://github.com/thi-ng/umbrella/commit/5f1c1de))
- update PackedBuffer.fromCanvas() ([3bdb086](https://github.com/thi-ng/umbrella/commit/3bdb086))
  - add support for format conversion
  - simplify .fromImage()
- add defLargeKernel(), conv presets ([9c71165](https://github.com/thi-ng/umbrella/commit/9c71165))
  - add HOF GAUSSIAN kernel factory
  - fix internal K var naming in defKernelx

#### 🩹 Bug fixes

- add clamping for float->ABGR conversion ([41540e0](https://github.com/thi-ng/umbrella/commit/41540e0))
- fix POOL_NEAREST index ([b98d05d](https://github.com/thi-ng/umbrella/commit/b98d05d))

#### ♻️ Refactoring

- migrate interfaces to api.ts ([0e3a742](https://github.com/thi-ng/umbrella/commit/0e3a742))

### [0.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.6.1) (2021-02-20)

#### ♻️ Refactoring

- update IPixelBuffer, extract format defs ([3416ff7](https://github.com/thi-ng/umbrella/commit/3416ff7))
  - make IPixelBuffer fields readonly, expose stride
  - move all format related defs to /format subdir
- update format defs, typed array handling ([2b06774](https://github.com/thi-ng/umbrella/commit/2b06774))
- update ARGB8888, update deps ([9b86922](https://github.com/thi-ng/umbrella/commit/9b86922))
  - re-use swapLane13() from [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/main/packages/binary)
  - update readme
- split defFloatFormat(), extract helpers ([c9ade11](https://github.com/thi-ng/umbrella/commit/c9ade11))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.6.0) (2021-01-13)

#### 🚀 Features

- add downsample() for both buffer types ([0b9b0fa](https://github.com/thi-ng/umbrella/commit/0b9b0fa))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.5.0) (2021-01-02)

#### 🚀 Features

- add FLOAT_HSVA format, update FloatFormatSpec ([118c4ed](https://github.com/thi-ng/umbrella/commit/118c4ed))
  - update FloatFormatSpec & defFloatFormat() to support manual conversions
- add FloatBuffer.fromPacked() ([abd1ca8](https://github.com/thi-ng/umbrella/commit/abd1ca8))
  - implement IPixelBuffer

#### ♻️ Refactoring

- implement IPixelBuffer for PackedBuffer ([2dcbde5](https://github.com/thi-ng/umbrella/commit/2dcbde5))

### [0.4.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.4.9) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))

### [0.4.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.4.7) (2020-11-24)

#### ♻️ Refactoring

- update destructuring ([01aebd8](https://github.com/thi-ng/umbrella/commit/01aebd8))

### [0.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.4.5) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types ([213ec33](https://github.com/thi-ng/umbrella/commit/213ec33))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.4.0) (2020-07-22)

#### 🚀 Features

- add flipY() ([a5593c0](https://github.com/thi-ng/umbrella/commit/a5593c0))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.3.0) (2020-05-29)

#### 🚀 Features

- add FloatBuffer and float format support ([d6c490f](https://github.com/thi-ng/umbrella/commit/d6c490f))
- add dither support for int buffers/formats ([4475fc1](https://github.com/thi-ng/umbrella/commit/4475fc1))
- add/update float formats, tests ([6eb1f67](https://github.com/thi-ng/umbrella/commit/6eb1f67))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.2.0) (2020-05-19)

#### 🚀 Features

- update canvas2d(), imageCanvas() ([65929a2](https://github.com/thi-ng/umbrella/commit/65929a2))
  - add opt parent arg to append canvas as child node
- add .copy(), update .blitCanvas() ([f4b2c3e](https://github.com/thi-ng/umbrella/commit/f4b2c3e))

### [0.1.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.1.14) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([99fb1e6](https://github.com/thi-ng/umbrella/commit/99fb1e6))

### [0.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.1.9) (2020-02-25)

#### ♻️ Refactoring

- update imports ([7857750](https://github.com/thi-ng/umbrella/commit/7857750))

### [0.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.1.4) (2019-09-21)

#### 🩹 Bug fixes

- clamp values in PackedChannel.setFloat() ([ce78467](https://github.com/thi-ng/umbrella/commit/ce78467))

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.1.3) (2019-08-21)

#### ♻️ Refactoring

- update setChannel(), pre/postmultiply(), extract & re-use ([17e5f3d](https://github.com/thi-ng/umbrella/commit/17e5f3d))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel@0.1.0) (2019-07-31)

#### 🚀 Features

- initial import pixel buffer pkg ([1836ea7](https://github.com/thi-ng/umbrella/commit/1836ea7))
- add invert, add/split interfaces, refactor blit fns ([22a456a](https://github.com/thi-ng/umbrella/commit/22a456a))
- ([#106](https://github.com/thi-ng/umbrella/issues/106)) add IBlend interface/impls, refactor IBlit ([e068f46](https://github.com/thi-ng/umbrella/commit/e068f46))
  - add BlitOpts, update .blit() args
  - add IBlend impls for ABGRBuffer, ARGBBuffer, RGBAFloatBuffer
  - update blit1(), blitStrided()
  - add blendInt(), blendFloat()
- ([#106](https://github.com/thi-ng/umbrella/issues/106)) add Uint16Buffer, update IColorChannel, add Channel.GRAY ([3088646](https://github.com/thi-ng/umbrella/commit/3088646))
- update canvasPixels() ([5ea200d](https://github.com/thi-ng/umbrella/commit/5ea200d))
- complete rewrite/simplify/extend using format descriptors ([cde7bf9](https://github.com/thi-ng/umbrella/commit/cde7bf9))
  - remove all existing buffer impls
  - add PackedBuffer as currently only buffer type
  - add preset buffer formats:
    - GRAY8
    - GRAY_ALPHA88
    - ARGB4444
    - ARGB1555
    - RGB565
    - RGB888
    - ARGB8888
    - BGR888
    - ABGR8888
  - add defPackedFormat() to define & compile new formats
  - add various codegen utils
  - add new types / interfaces
- add channel float accessors, update PackedChannel ([b4168f8](https://github.com/thi-ng/umbrella/commit/b4168f8))
  - add precomputed masks and get/setFloat to PackedChannel
  - refactor code gens
  - add PackedBuffer.get/setChannelAt()
  - add ensureChannel() helper
- add pre/postmultiply & isPremultiplied checks ([969d6b8](https://github.com/thi-ng/umbrella/commit/969d6b8))
  - add porter-duff dep
  - update readme
- updat setChannel, add ALPHA8, update readme ([899f1a3](https://github.com/thi-ng/umbrella/commit/899f1a3))
  - setChannel now supports format conversion
- add PackedBuffer.fromCanvas(), update readme ([ac283ee](https://github.com/thi-ng/umbrella/commit/ac283ee))
- add buffer() syntax sugar, PackedBuffer.forEach ([bc17ac9](https://github.com/thi-ng/umbrella/commit/bc17ac9))
- add 16bit formats, add docs, update readme ([5d72c37](https://github.com/thi-ng/umbrella/commit/5d72c37))

#### 🩹 Bug fixes

- byte order fixes, extract luminance fns ([b3c79e3](https://github.com/thi-ng/umbrella/commit/b3c79e3))
- update clampRegion(), adjust src pos if dest is outside ([bb6ba47](https://github.com/thi-ng/umbrella/commit/bb6ba47))
- update prepRegions() ([ad8d2d7](https://github.com/thi-ng/umbrella/commit/ad8d2d7))
- fast-route check in setChannel() ([b59069a](https://github.com/thi-ng/umbrella/commit/b59069a))
- update 16bit formats & handling in getChannel ([aa15179](https://github.com/thi-ng/umbrella/commit/aa15179))
