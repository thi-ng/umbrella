# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@5.0.14...@thi.ng/webgl@6.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **webgl:** add DefShaderOpts, rename ShaderOpts ([ef46bf5](https://github.com/thi-ng/umbrella/commit/ef46bf55eaa1deff12b0268b880bc33f4878acba))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






#  [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@4.0.16...@thi.ng/webgl@5.0.0) (2021-06-08) 

###  Code Refactoring 

- **webgl:** update multipass texture uniforms ([86d363a](https://github.com/thi-ng/umbrella/commit/86d363aa80c1861388bccd9fb57000afd96e4257)) 

###  Features 

- **webgl:** add passCopy() HOF pass gen ([fb6b5b7](https://github.com/thi-ng/umbrella/commit/fb6b5b76d16a75d157499f7ccf46c777a063131e)) 

###  BREAKING CHANGES 

- **webgl:** replace input tex `sampler2D[]` array w/ named inputs 
    - new unis: `input0`, `input1`, etc. to sync w/ same approach as   already used for outputs 
    - new approach also simplifies texture lookups in shader-ast code 

#  [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@3.3.15...@thi.ng/webgl@4.0.0) (2021-02-20) 

###  Bug Fixes 

- **webgl:** update compileAttribPool() ([6b5dd8e](https://github.com/thi-ng/umbrella/commit/6b5dd8e0c5167ac44a7d0358ccd106b7899fbccf)) 

###  Code Refactoring 

- **webgl:** update attrib type handling ([542850b](https://github.com/thi-ng/umbrella/commit/542850bc0f9c93abe8634f9d899e391905ff93ec)) 

###  BREAKING CHANGES 

- **webgl:** attrib buffer data type use string consts 
    - part of unified umbrella-wide changes to thi.ng/api Type alias   (see a333d4182) 

#  [3.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@3.2.1...@thi.ng/webgl@3.3.0) (2020-08-20) 

###  Features 

- **webgl:** only warn once re: unknown uni/attrib ([7490aa1](https://github.com/thi-ng/umbrella/commit/7490aa1e0d8e69c0be2f0c63f72373983898f04c)) 

#  [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@3.1.1...@thi.ng/webgl@3.2.0) (2020-08-16) 

###  Features 

- **webgl:** store texture filter/wrap mode ([8a7420e](https://github.com/thi-ng/umbrella/commit/8a7420ee708e92a1670c47330c6c1b262b76cc87)) 

##  [3.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@3.1.0...@thi.ng/webgl@3.1.1) (2020-08-12) 

###  Bug Fixes 

- **webgl:** update/add DrawOpts, add unbindTextures() ([27021fa](https://github.com/thi-ng/umbrella/commit/27021facca516e3d9c598f017819fe0314c72af4)) 

#  [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@3.0.4...@thi.ng/webgl@3.1.0) (2020-08-12) 

###  Features 

- **webgl:** add DrawFlags opts for draw() ([800382b](https://github.com/thi-ng/umbrella/commit/800382ba1a67a5dd9f8a4edc17f6d791bfa2c627)) 
- **webgl:** add opt unbind flag for .configure() ([0e5cc2b](https://github.com/thi-ng/umbrella/commit/0e5cc2bc5b632c7d418715c936d4cc6152b4a57c)) 

##  [3.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@3.0.0...@thi.ng/webgl@3.0.1) (2020-08-08) 

###  Bug Fixes 

- **webgl:** unbind texture after configured ([9612cdd](https://github.com/thi-ng/umbrella/commit/9612cdd86130ccb780eeda2971e780f0c8dc2b52)) 

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@2.0.11...@thi.ng/webgl@3.0.0) (2020-07-28) 

###  Bug Fixes 

- **webgl:** bind FBO in readTexture() ([6cb4448](https://github.com/thi-ng/umbrella/commit/6cb4448f75811e9a266ff81065da03ccdf138b6d)) 

###  Features 

- **webgl:** add varying int support (webgl2) ([c812800](https://github.com/thi-ng/umbrella/commit/c812800cb8d61a19b892a7f802fd03820c7e7310)) 
- **webgl:** add/update opts for defQuadModel() ([13b7d9e](https://github.com/thi-ng/umbrella/commit/13b7d9e5ad26622702cfd4f1c4957da50ab704ed)) 

###  BREAKING CHANGES 

- **webgl:** add/update opts for defQuadModel() 
    - update callsite in defMultiPass() 

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@1.0.17...@thi.ng/webgl@2.0.0) (2020-06-07) 

###  Code Refactoring 

- **webgl:** remove adaptDPI() ([6d49da6](https://github.com/thi-ng/umbrella/commit/6d49da610bec87fef96c77a39f1181002872f2ba)) 

###  BREAKING CHANGES 

- **webgl:** re-use adaptDPI() from new @thi.ng/adapt-dpi pkg 
    - update deps 

##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@1.0.6...@thi.ng/webgl@1.0.7) (2020-04-21) 

###  Bug Fixes 

- **webgl:** unbind fbo after configure ([25414b5](https://github.com/thi-ng/umbrella/commit/25414b598211c05597714bc07d16a5f6a6249e5f)) 

##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@1.0.4...@thi.ng/webgl@1.0.5) (2020-04-11) 

###  Bug Fixes 

- **webgl:** `disableVertexAttribArray` in `Shader.unbind` ([d3eab37](https://github.com/thi-ng/umbrella/commit/d3eab37cb5e356aa80207ce445926844cc072261)) 
- **webgl:** add missing braces ([5e6d5bf](https://github.com/thi-ng/umbrella/commit/5e6d5bfa3b0529ec7c448d2ec1dde04716fb597e)) 

##  [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@1.0.3...@thi.ng/webgl@1.0.4) (2020-04-07) 

###  Bug Fixes 

- **webgl:** fix [#217](https://github.com/thi-ng/umbrella/issues/217), use logger for shader src ([501c82d](https://github.com/thi-ng/umbrella/commit/501c82dbde7cbb385f35ff8149cfc98e4c6e6405)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.3.4...@thi.ng/webgl@1.0.0) (2020-03-28) 

###  Code Refactoring 

- **webgl:** rename factory functions ([633f693](https://github.com/thi-ng/umbrella/commit/633f69387a9ddf35919b9b6dd108068a9e05aec7)) 

###  Features 

- **webgl:** add DrawMode enums ([5adaa23](https://github.com/thi-ng/umbrella/commit/5adaa23c5aa06b2229cb55d216f424b367875217)) 

###  BREAKING CHANGES 

- **webgl:** #210, rename factory functions (`defXXX`) 
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

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.2.4...@thi.ng/webgl@0.3.0) (2020-02-25) 

###  Features 

- **webgl:** update Texture.config() default handling ([4c62d87](https://github.com/thi-ng/umbrella/commit/4c62d87016d6e73899d9c080e9c9f7fb03d841f2)) 

##  [0.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.2.2...@thi.ng/webgl@0.2.3) (2020-01-24) 

###  Bug Fixes 

- **webgl:** webgl1 depth texture ([5c86165](https://github.com/thi-ng/umbrella/commit/5c861659c353076d01153d3258d3d98bc5113a1c)) 

##  [0.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.2.1...@thi.ng/webgl@0.2.2) (2019-11-30) 

###  Bug Fixes 

- **webgl:** fix PHONG shader preset, minor update LAMBERT ([792379f](https://github.com/thi-ng/umbrella/commit/792379fd507cbc9ef684a1b255f3152cb55092b9)) 
- **webgl:** use LOGGER for warnings ([14d5025](https://github.com/thi-ng/umbrella/commit/14d502556717e1e0aded784294401ec0afc6d733)) 

##  [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.2.0...@thi.ng/webgl@0.2.1) (2019-11-09) 

###  Bug Fixes 

- **webgl:** add LOGGER, update initUniforms() ([4719110](https://github.com/thi-ng/umbrella/commit/471911084c8db79930cf273f222f345318671953)) 
- **webgl:** ensure system defaults for all uniforms, update equiv checks ([39dc83f](https://github.com/thi-ng/umbrella/commit/39dc83ff49c97fb7ba70f7bbf0f7244d612c7fc8)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl@0.1.7...@thi.ng/webgl@0.2.0) (2019-09-21) 

###  Bug Fixes
