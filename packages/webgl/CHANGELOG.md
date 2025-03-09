# Change Log

- **Last updated**: 2025-03-09T19:21:53Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [6.9.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.9.30) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [6.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.9.0) (2024-06-21)

#### 🚀 Features

- add UncompiledModelSpec, update compileModel() ([95be119](https://github.com/thi-ng/umbrella/commit/95be119))
- update WebGLCanvasOpts, switch to WebGL v2 by default ([6bb029e](https://github.com/thi-ng/umbrella/commit/6bb029e))
  - add docs
- add `ModelSpec.instancePool` ([c4d695f](https://github.com/thi-ng/umbrella/commit/c4d695f))
  - add new `instancePool` option to specify instance attribs via AttribPool
  - update `compileModel()` to support new option

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [6.8.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.8.12) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([f584c7c](https://github.com/thi-ng/umbrella/commit/f584c7c))

## [6.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.8.0) (2024-03-09)

#### 🚀 Features

- add passCopyMain() multipass spec utility ([ba22536](https://github.com/thi-ng/umbrella/commit/ba22536))

#### 🩹 Bug fixes

- update readPixels() args ([458e7ff](https://github.com/thi-ng/umbrella/commit/458e7ff))

## [6.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.7.0) (2024-03-06)

#### 🚀 Features

- update shader prelude, add sampler3D default precision ([73d7818](https://github.com/thi-ng/umbrella/commit/73d7818))
  - add `precision lowp sampler3D` to prelude (WebGL2 only)
- update defMultipass(), add sampler3D support ([3f924cf](https://github.com/thi-ng/umbrella/commit/3f924cf))
  - update texture & shader init
  - update MultipassOpts

### [6.6.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.6.32) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [6.6.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.6.28) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([744ebed](https://github.com/thi-ng/umbrella/commit/744ebed))

### [6.6.26](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.6.26) (2024-02-06)

#### ♻️ Refactoring

- use shader type consts ([e9f8c4c](https://github.com/thi-ng/umbrella/commit/e9f8c4c))

### [6.6.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.6.6) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [6.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.6.0) (2023-10-25)

#### 🚀 Features

- update DefShaderOpts & defShader() ([800318f](https://github.com/thi-ng/umbrella/commit/800318f))
  - add `logger` option to use temp. logger for compiled GLSL output

## [6.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.5.0) (2023-09-19)

#### 🚀 Features

- update clearCanvas(), add defaultViewport() ([a7b47a2](https://github.com/thi-ng/umbrella/commit/a7b47a2))

### [6.4.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.4.20) (2023-08-31)

#### ♻️ Refactoring

- update PassUniforms ([e79ae16](https://github.com/thi-ng/umbrella/commit/e79ae16))
  - allow `resolution` uniform to also be ivec2/uvec2

### [6.4.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.4.6) (2023-06-09)

#### 🩹 Bug fixes

- fix arg types for defBuffer()/compileAttribPool() ([71a9e16](https://github.com/thi-ng/umbrella/commit/71a9e16))

## [6.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.4.0) (2023-04-19)

#### 🚀 Features

- add retain option to ModelAttributeSpec/IndexBufferSpec ([3db4463](https://github.com/thi-ng/umbrella/commit/3db4463))
  - update defBuffer()/initBuffer()
- add clearCanvas() ([ad362f9](https://github.com/thi-ng/umbrella/commit/ad362f9))
- update glCanvas() return type ([4af5e04](https://github.com/thi-ng/umbrella/commit/4af5e04))
  - add `resize` handler to result which can later be called to
    resize the canvas (with DPR) and update the GL viewport

## [6.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.3.0) (2023-02-05)

#### 🚀 Features

- add Shader.withState() ([8a7a427](https://github.com/thi-ng/umbrella/commit/8a7a427))
- update WebGLArrayBuffer/IWebGLBuffer ([c1890ce](https://github.com/thi-ng/umbrella/commit/c1890ce))
  - add optional `retain` ctor arg to retain handle to
  - add .update() method
  - update IWebGLBuffer interface

## [6.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.2.0) (2022-08-08)

#### 🚀 Features

- add more extensions to WebGLExtensionMap ([dd2e295](https://github.com/thi-ng/umbrella/commit/dd2e295))
- update Multipass ([5f51d26](https://github.com/thi-ng/umbrella/commit/5f51d26))
  - auto-enable EXT_float_blend extension for float outputs
    (this silences warnings on Firefox, Chrome seemed fine)
  - add Multipass.singlePass() to selectively execute single shader passes

### [6.1.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.1.22) (2022-08-08)

#### 🩹 Bug fixes

- add missing type exports ([6b1501e](https://github.com/thi-ng/umbrella/commit/6b1501e))
