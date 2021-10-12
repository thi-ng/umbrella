# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl-shadertoy@0.2.91...@thi.ng/webgl-shadertoy@0.3.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **webgl-shadertoy:** add support for DefShaderOpts ([d35cabc](https://github.com/thi-ng/umbrella/commit/d35cabc3805b6c0c710778c21a45e6f13a477b7f))


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl-shadertoy@0.1.4...@thi.ng/webgl-shadertoy@0.2.0) (2020-02-25) 

###  Features 

- **webgl-shadertoy:** fix [#199](https://github.com/thi-ng/umbrella/issues/199), add generics ([e392774](https://github.com/thi-ng/umbrella/commit/e392774945e4d29f145dba2fd17f99919b2c5fd5)) 

#  0.1.0 (2019-09-21) 

###  Bug Fixes 

- **webgl-shadertoy:** update imports ([7d6ed77](https://github.com/thi-ng/umbrella/commit/7d6ed77)) 
- **webgl-shadertoy:** update texture/sampler & FBO handling ([25845e5](https://github.com/thi-ng/umbrella/commit/25845e5)) 

###  Features 

- **webgl-shadertoy:** add optional per-pass ModelSpec & vert shader support ([a45725a](https://github.com/thi-ng/umbrella/commit/a45725a)) 
- **webgl-shadertoy:** fix & update drawPass viewport, add update() method ([5d2c17e](https://github.com/thi-ng/umbrella/commit/5d2c17e)) 
- **webgl-shadertoy:** import new pkg ([35d9b68](https://github.com/thi-ng/umbrella/commit/35d9b68)) 
- **webgl-shadertoy:** initial multipass skeleton ([c287dab](https://github.com/thi-ng/umbrella/commit/c287dab)) 
- **webgl-shadertoy:** simplify mainImage user fn handling, update types & readme ([bd1b88e](https://github.com/thi-ng/umbrella/commit/bd1b88e)) 
- **webgl-shadertoy:** update multipass uniform handling ([2071133](https://github.com/thi-ng/umbrella/commit/2071133))
