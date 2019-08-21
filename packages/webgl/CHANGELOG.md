# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.1.6...@thi.ng/webgl@0.1.7) (2019-08-21)

**Note:** Version bump only for package @thi.ng/webgl





## [0.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.1.5...@thi.ng/webgl@0.1.6) (2019-08-17)

**Note:** Version bump only for package @thi.ng/webgl





## [0.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.1.4...@thi.ng/webgl@0.1.5) (2019-08-16)

**Note:** Version bump only for package @thi.ng/webgl





## [0.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.1.3...@thi.ng/webgl@0.1.4) (2019-07-31)

**Note:** Version bump only for package @thi.ng/webgl





## [0.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.1.2...@thi.ng/webgl@0.1.3) (2019-07-31)


### Bug Fixes

* **webgl:** update check for WEBGL_draw_buffers ([7df09d1](https://github.com/thi-ng/umbrella/commit/7df09d1))





## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.1.1...@thi.ng/webgl@0.1.2) (2019-07-12)

**Note:** Version bump only for package @thi.ng/webgl





## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.1.0...@thi.ng/webgl@0.1.1) (2019-07-08)

**Note:** Version bump only for package @thi.ng/webgl





# 0.1.0 (2019-07-07)


### Bug Fixes

* **webgl:** also disable prefixes in prepareShaderSource() ([18ca4b5](https://github.com/thi-ng/umbrella/commit/18ca4b5))
* **webgl:** apply ModelSpec mode in compileModel, fix/simplify draw fns ([67334a6](https://github.com/thi-ng/umbrella/commit/67334a6))
* **webgl:** EXPORT_FRAGCOL webgl2 default out ([684e7fc](https://github.com/thi-ng/umbrella/commit/684e7fc))
* **webgl:** gl2 texStorage2D() levels ([3d36527](https://github.com/thi-ng/umbrella/commit/3d36527))
* **webgl:** uniform array & output var handling ([7e559a1](https://github.com/thi-ng/umbrella/commit/7e559a1))
* **webgl:** update GPGPU texture & shader handling ([ce286ad](https://github.com/thi-ng/umbrella/commit/ce286ad))
* **webgl:** update lambert shader preset ([2fea507](https://github.com/thi-ng/umbrella/commit/2fea507))
* **webgl:** update texture mipmap config & handling ([2a5b87f](https://github.com/thi-ng/umbrella/commit/2a5b87f))


### Features

* **webgl:** add (incomplete) texture format specs ([cf7c408](https://github.com/thi-ng/umbrella/commit/cf7c408))
* **webgl:** add ALIAS_TEXTURE GLSL macro ([4640ce4](https://github.com/thi-ng/umbrella/commit/4640ce4))
* **webgl:** add AttribPool support, update shader ext handling, add screen2d() ([f8081f2](https://github.com/thi-ng/umbrella/commit/f8081f2))
* **webgl:** add cube modelspec factory ([29791fd](https://github.com/thi-ng/umbrella/commit/29791fd))
* **webgl:** add cubemap support & cubeMap() factory fn ([ad43a1c](https://github.com/thi-ng/umbrella/commit/ad43a1c))
* **webgl:** add glCanvas() extension support ([07edcd0](https://github.com/thi-ng/umbrella/commit/07edcd0))
* **webgl:** add glCanvas() factory fn & WebGLCanvasOpts ([a60eb2e](https://github.com/thi-ng/umbrella/commit/a60eb2e))
* **webgl:** add gpgpu skeleton ([582b57a](https://github.com/thi-ng/umbrella/commit/582b57a))
* **webgl:** add GPGPU texture config support ([393e04e](https://github.com/thi-ng/umbrella/commit/393e04e))
* **webgl:** add IDeref support for uniform values ([d7679d6](https://github.com/thi-ng/umbrella/commit/d7679d6))
* **webgl:** add initial AttribPool & VAO support, update ModelSpec & draw fns ([41cf85f](https://github.com/thi-ng/umbrella/commit/41cf85f))
* **webgl:** add more GLSL/WebGL2 types ([648ed52](https://github.com/thi-ng/umbrella/commit/648ed52))
* **webgl:** add option to throw error if missing GL extension ([b5da3b2](https://github.com/thi-ng/umbrella/commit/b5da3b2))
* **webgl:** add screen2d() arity to extract screen size from gl ctx ([7f38f10](https://github.com/thi-ng/umbrella/commit/7f38f10))
* **webgl:** add texture format consts / decls, GLSL types ([b243ebb](https://github.com/thi-ng/umbrella/commit/b243ebb))
* **webgl:** add texture gens, add opt uv support for lambert shader ([4a1a5b9](https://github.com/thi-ng/umbrella/commit/4a1a5b9))
* **webgl:** add texture lookup shader snippets ([8af4943](https://github.com/thi-ng/umbrella/commit/8af4943))
* **webgl:** add webgl resource factory fns, update buffer() arg order ([131e551](https://github.com/thi-ng/umbrella/commit/131e551))
* **webgl:** add WebGL2 support for FBO/Texture, add floatTexture() ctor fn ([8941d82](https://github.com/thi-ng/umbrella/commit/8941d82))
* **webgl:** allow depth textures as fbo depth buffer, various refactorings ([d72ca70](https://github.com/thi-ng/umbrella/commit/d72ca70))
* **webgl:** convert fullscreen quad into fn, uv's optional ([610f37b](https://github.com/thi-ng/umbrella/commit/610f37b))
* **webgl:** import webgl pkg, ported & updated from CLJ thi.ng/geom ([f4c0634](https://github.com/thi-ng/umbrella/commit/f4c0634))
* **webgl:** initial integration of shader-ast ([73faffd](https://github.com/thi-ng/umbrella/commit/73faffd))
* **webgl:** TS strictNullChecks, assertions, minor type updates ([ad672c7](https://github.com/thi-ng/umbrella/commit/ad672c7))
* **webgl:** update GLSL syntax impls, migrate Shader.fromSpec() ([02f94d7](https://github.com/thi-ng/umbrella/commit/02f94d7))
* **webgl:** update GLSL_HEADER & LAMBERT shader preset ([05f5059](https://github.com/thi-ng/umbrella/commit/05f5059))
* **webgl:** update shaderSourceFromAST(), update shader presets, remove prefixes ([6aa5715](https://github.com/thi-ng/umbrella/commit/6aa5715))
* **webgl:** update uniform setters, update deps ([2be6a23](https://github.com/thi-ng/umbrella/commit/2be6a23))
* **webgl:** update/add array type UniformDecl's ([1f19196](https://github.com/thi-ng/umbrella/commit/1f19196))
