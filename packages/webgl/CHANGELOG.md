# Change Log

- **Last updated**: 2022-11-30T22:27:38Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.1.0) (2021-11-17)

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

### [6.0.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.0.11) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [6.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.0.9) (2021-11-03)

#### ♻️ Refactoring

- minor update texture gens ([51e3d71](https://github.com/thi-ng/umbrella/commit/51e3d71))
  - rename internals due to changes in [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/main/packages/pixel) (2fe8d4f09)

### [6.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@6.0.0) (2021-10-12)

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

#### 🚀 Features

- add DefShaderOpts, rename ShaderOpts ([ef46bf5](https://github.com/thi-ng/umbrella/commit/ef46bf5))
  - add DefShaderOpts
  - update defShader(), shaderSourceFromAST()
  - rename ShaderOpts => ShaderPresetOpts
  - update shader presets

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports ([b4c3883](https://github.com/thi-ng/umbrella/commit/b4c3883))
- update imports ([c29d6b4](https://github.com/thi-ng/umbrella/commit/c29d6b4))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- redefine WebGL error, migrate logger ([6a5158d](https://github.com/thi-ng/umbrella/commit/6a5158d))
- update imports/exports ([ce4d3e8](https://github.com/thi-ng/umbrella/commit/ce4d3e8))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@5.0.0) (2021-06-08)

#### 🛑 Breaking changes

- update multipass texture uniforms ([86d363a](https://github.com/thi-ng/umbrella/commit/86d363a))
- BREAKING CHANGE: replace input tex `sampler2D[]` array w/ named inputs
  - new unis: `input0`, `input1`, etc. to sync w/ same approach as
    already used for outputs
  - new approach also simplifies texture lookups in shader-ast code

#### 🚀 Features

- add passCopy() HOF pass gen ([fb6b5b7](https://github.com/thi-ng/umbrella/commit/fb6b5b7))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@4.0.0) (2021-02-20)

#### 🛑 Breaking changes

- update attrib type handling ([542850b](https://github.com/thi-ng/umbrella/commit/542850b))
- BREAKING CHANGE: attrib buffer data type use string consts
  - part of unified umbrella-wide changes to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) Type alias
    (see [a333d4182](https://github.com/thi-ng/umbrella/commit/a333d4182))

#### 🩹 Bug fixes

- update compileAttribPool() ([6b5dd8e](https://github.com/thi-ng/umbrella/commit/6b5dd8e))
  - always ensure GLType is used in resulting ModelAttributeSpec's

#### ♻️ Refactoring

- extract/re-use internal helpers ([e8786f6](https://github.com/thi-ng/umbrella/commit/e8786f6))
  - update shaderSourceFromAST() & prepareShaderSource()
  - extract compilePrelude()
  - extract compileVarying()
- further simplify shaderSourceFromAST() ([9343ba3](https://github.com/thi-ng/umbrella/commit/9343ba3))
- simplify defMultipass(), extract inner fns ([fda3011](https://github.com/thi-ng/umbrella/commit/fda3011))
- split Texture.configureImage() ([1e8670e](https://github.com/thi-ng/umbrella/commit/1e8670e))

### [3.3.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.3.8) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([b9685a4](https://github.com/thi-ng/umbrella/commit/b9685a4))

### [3.3.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.3.6) (2020-11-24)

#### ♻️ Refactoring

- update destructuring ([4e6ebcf](https://github.com/thi-ng/umbrella/commit/4e6ebcf))

### [3.3.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.3.3) (2020-09-22)

#### ♻️ Refactoring

- split Texture.configure() ([91b4329](https://github.com/thi-ng/umbrella/commit/91b4329))

### [3.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.3.2) (2020-09-13)

#### ♻️ Refactoring

- update imports ([18e86e9](https://github.com/thi-ng/umbrella/commit/18e86e9))

### [3.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.3.1) (2020-08-28)

#### ♻️ Refactoring

- update delete op (TS4.0) ([7b5f1e1](https://github.com/thi-ng/umbrella/commit/7b5f1e1))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.3.0) (2020-08-20)

#### 🚀 Features

- only warn once re: unknown uni/attrib ([7490aa1](https://github.com/thi-ng/umbrella/commit/7490aa1))
  - add [@thi.ng/memoize](https://github.com/thi-ng/umbrella/tree/main/packages/memoize) dep
  - update Shader to only warn once
  - update readme

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.2.0) (2020-08-16)

#### 🚀 Features

- store texture filter/wrap mode ([8a7420e](https://github.com/thi-ng/umbrella/commit/8a7420e))
  - add Texture .filter, .wrap properties
  - update initial default tex config to: nearest & clamp
  - fix LOD param handling (use `texParameterf()`)

### [3.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.1.1) (2020-08-12)

#### 🩹 Bug fixes

- update/add DrawOpts, add unbindTextures() ([27021fa](https://github.com/thi-ng/umbrella/commit/27021fa))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.1.0) (2020-08-12)

#### 🚀 Features

- add opt unbind flag for .configure() ([0e5cc2b](https://github.com/thi-ng/umbrella/commit/0e5cc2b))
  - default remains true to keep existing behavior, but provide
    escape hatch where needed/useful (i.e. multipass stuff)
  - update impls for FBO, RBO, Texture
- add DrawFlags opts for draw() ([800382b](https://github.com/thi-ng/umbrella/commit/800382b))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.0.1) (2020-08-08)

#### 🩹 Bug fixes

- unbind texture after configured ([9612cdd](https://github.com/thi-ng/umbrella/commit/9612cdd))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@3.0.0) (2020-07-28)

#### 🛑 Breaking changes

- add/update opts for defQuadModel() ([13b7d9e](https://github.com/thi-ng/umbrella/commit/13b7d9e))
- BREAKING CHANGE: add/update opts for defQuadModel()
  - update callsite in defMultiPass()

#### 🚀 Features

- add varying int support (webgl2) ([c812800](https://github.com/thi-ng/umbrella/commit/c812800))
  - update varying handling in shaderSourceFromAST()
  - extract varyingOpts()

#### 🩹 Bug fixes

- bind FBO in readTexture() ([6cb4448](https://github.com/thi-ng/umbrella/commit/6cb4448))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@2.0.0) (2020-06-07)

#### 🛑 Breaking changes

- remove adaptDPI() ([6d49da6](https://github.com/thi-ng/umbrella/commit/6d49da6))
- BREAKING CHANGE: re-use adaptDPI() from new [@thi.ng/adapt-dpi](https://github.com/thi-ng/umbrella/tree/main/packages/adapt-dpi) pkg
  - update deps

### [1.0.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@1.0.16) (2020-06-01)

#### ♻️ Refactoring

- update deref() uniform handling ([2c81849](https://github.com/thi-ng/umbrella/commit/2c81849))

### [1.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@1.0.6) (2020-04-20)

#### 🩹 Bug fixes

- unbind fbo after configure ([25414b5](https://github.com/thi-ng/umbrella/commit/25414b5))

### [1.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@1.0.5) (2020-04-11)

#### 🩹 Bug fixes

- `disableVertexAttribArray` in `Shader.unbind` ([d3eab37](https://github.com/thi-ng/umbrella/commit/d3eab37))
- add missing braces ([5e6d5bf](https://github.com/thi-ng/umbrella/commit/5e6d5bf))

### [1.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@1.0.4) (2020-04-07)

#### 🩹 Bug fixes

- fix [#217](https://github.com/thi-ng/umbrella/issues/217), use logger for shader src ([501c82d](https://github.com/thi-ng/umbrella/commit/501c82d))

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@1.0.2) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([c491b00](https://github.com/thi-ng/umbrella/commit/c491b00))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@1.0.0) (2020-03-28)

#### 🛑 Breaking changes

- rename factory functions ([633f693](https://github.com/thi-ng/umbrella/commit/633f693))
- BREAKING CHANGE: [#210](https://github.com/thi-ng/umbrella/issues/210), rename factory functions (`defXXX`)
  - rename buffer() => defBuffer()
  - rename fbo() => defFBO()
  - rename rbo() => defRBO()
  - rename multipass() => defMultiPass()
  - rename shader() => defShader()
  - rename texture() => defTexture()
  - rename cubeMap() => defTextureCubeMap()
  - rename floatTexture() => defTextureFloat()
  - rename cube() => defCubeModel()
  - rename quad() => defQuadModel()

#### 🚀 Features

- add DrawMode enums ([5adaa23](https://github.com/thi-ng/umbrella/commit/5adaa23))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@0.3.0) (2020-02-25)

#### 🚀 Features

- update Texture.config() default handling ([4c62d87](https://github.com/thi-ng/umbrella/commit/4c62d87))
  - add defaults for `filter` & `wrap` opts
  - add TextureOpts docstrings

#### ♻️ Refactoring

- fix [#200](https://github.com/thi-ng/umbrella/issues/200), extract private initBuffer() ([9ab496e](https://github.com/thi-ng/umbrella/commit/9ab496e))
- update imports ([9999cbf](https://github.com/thi-ng/umbrella/commit/9999cbf))

### [0.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@0.2.2) (2019-11-30)

#### 🩹 Bug fixes

- fix PHONG shader preset, minor update LAMBERT ([792379f](https://github.com/thi-ng/umbrella/commit/792379f))
- use LOGGER for warnings ([14d5025](https://github.com/thi-ng/umbrella/commit/14d5025))
- webgl1 depth texture ([5c86165](https://github.com/thi-ng/umbrella/commit/5c86165))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@0.2.1) (2019-11-09)

#### 🩹 Bug fixes

- ensure system defaults for all uniforms, update equiv checks ([39dc83f](https://github.com/thi-ng/umbrella/commit/39dc83f))
- add LOGGER, update initUniforms() ([4719110](https://github.com/thi-ng/umbrella/commit/4719110))
  - don't throw error when initializing unused uniforms

#### ♻️ Refactoring

- add type hints (TS 3.6.4) ([bd01c79](https://github.com/thi-ng/umbrella/commit/bd01c79))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@0.2.0) (2019-09-21)

#### 🚀 Features

- migrate multipass() & types from webgl-shadertoy pkg, reorg ([2aa31ce](https://github.com/thi-ng/umbrella/commit/2aa31ce))
- add renderExt to TextureFormatDecl, add FBO tex fmt checks ([180e89c](https://github.com/thi-ng/umbrella/commit/180e89c))
- update multipass / PassOpts ([95aba16](https://github.com/thi-ng/umbrella/commit/95aba16))
- add readPixels/readTexture(), add ReadableTextureFormat ([355f785](https://github.com/thi-ng/umbrella/commit/355f785))

#### 🩹 Bug fixes

- update extension handling in shader(), add ExtensionInfo ([12abaa0](https://github.com/thi-ng/umbrella/commit/12abaa0))
- update samplerXX[] uniform decl types ([48b8906](https://github.com/thi-ng/umbrella/commit/48b8906))

#### ♻️ Refactoring

- update TEX_FORMATS ([9a084a2](https://github.com/thi-ng/umbrella/commit/9a084a2))

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@0.1.3) (2019-07-31)

#### 🚀 Features

- update texture config, split api.ts into mult files ([052552f](https://github.com/thi-ng/umbrella/commit/052552f))
  - TextureOpts.format now refers to internal format, with
    base format & type inferred from TEX_FORMATS decls
  - add preliminary 3D texture support
- update Texture.configure, store target, format, type, size ([9131310](https://github.com/thi-ng/umbrella/commit/9131310))
- add blending & stencil enums/types ([c8898a0](https://github.com/thi-ng/umbrella/commit/c8898a0))
- add initial coll of blend mode presets ([58e0b04](https://github.com/thi-ng/umbrella/commit/58e0b04))

#### 🩹 Bug fixes

- update check for WEBGL_draw_buffers ([7df09d1](https://github.com/thi-ng/umbrella/commit/7df09d1))
  - get extension only when more than one render targets

#### ♻️ Refactoring

- add/rename types, add/move checks, update deps ([d56b720](https://github.com/thi-ng/umbrella/commit/d56b720))
- add pixel dep, update tex gens ([58822c8](https://github.com/thi-ng/umbrella/commit/58822c8))
- update canvas texture gens ([da0fcb2](https://github.com/thi-ng/umbrella/commit/da0fcb2))
- update blend mode presets as sep consts ([cc0ffcd](https://github.com/thi-ng/umbrella/commit/cc0ffcd))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl@0.1.0) (2019-07-07)

#### 🚀 Features

- add AttribPool support, update shader ext handling, add screen2d() ([f8081f2](https://github.com/thi-ng/umbrella/commit/f8081f2))
  - add ModelSpec.attribPool and update compileModel to delegate to
    compileAttribPool()
  - update compileAttribs, compileIndices to return updated specs
  - add GL_EXT_INFO and update compileExtensionPragma()
  - add initShaderExtensions()
  - add sceen2d() proj matrix helper
- add screen2d() arity to extract screen size from gl ctx ([7f38f10](https://github.com/thi-ng/umbrella/commit/7f38f10))
- TS strictNullChecks, assertions, minor type updates ([ad672c7](https://github.com/thi-ng/umbrella/commit/ad672c7))
- initial integration of shader-ast ([73faffd](https://github.com/thi-ng/umbrella/commit/73faffd))
  - replace GLSL enums with shader-ast types
  - add shaderSourceFromAST()
  - update shader presets
  - update old code gens (to be replaced soon)
- update shaderSourceFromAST(), update shader presets, remove prefixes ([6aa5715](https://github.com/thi-ng/umbrella/commit/6aa5715))
  - lambert & phong shader presets now AST based
  - positionAttrib & colorAttrib helpers return AST nodes

#### 🩹 Bug fixes

- apply ModelSpec mode in compileModel, fix/simplify draw fns ([67334a6](https://github.com/thi-ng/umbrella/commit/67334a6))
- also disable prefixes in prepareShaderSource() ([18ca4b5](https://github.com/thi-ng/umbrella/commit/18ca4b5))
- uniform array & output var handling ([7e559a1](https://github.com/thi-ng/umbrella/commit/7e559a1))
- update GPGPU texture & shader handling ([ce286ad](https://github.com/thi-ng/umbrella/commit/ce286ad))
- update lambert shader preset ([2fea507](https://github.com/thi-ng/umbrella/commit/2fea507))

#### ♻️ Refactoring

- update FX_SHADER_SPEC to use AST ([341cf04](https://github.com/thi-ng/umbrella/commit/341cf04))
- remove obsolete defglsl & old shader snippets, update deps ([98e0780](https://github.com/thi-ng/umbrella/commit/98e0780))
