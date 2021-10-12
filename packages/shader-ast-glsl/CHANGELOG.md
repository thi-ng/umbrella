# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-glsl@0.2.48...@thi.ng/shader-ast-glsl@0.3.0) (2021-10-12)


### Bug Fixes

* **shader-ast-glsl:** fix [#319](https://github.com/thi-ng/umbrella/issues/319), update uint handling ([d8d1b96](https://github.com/thi-ng/umbrella/commit/d8d1b965d18a52dfde8171b4de7b1eade91d17cc))


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **shader-ast-glsl:** add float precision option ([208f083](https://github.com/thi-ng/umbrella/commit/208f0832d11925060e8ee5ffbf07e7f423a74d7f))


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-glsl@0.1.39...@thi.ng/shader-ast-glsl@0.2.0) (2020-07-28) 

###  Features 

- **shader-ast-glsl:** add interpolation qualifier support ([bb1c566](https://github.com/thi-ng/umbrella/commit/bb1c56621701bd66cc56062cd258a63c64c029d2)) 

#  0.1.0 (2019-07-07) 

###  Bug Fixes 

- **shader-ast-glsl:** avoid extraneous semicolons ([f2ba0d6](https://github.com/thi-ng/umbrella/commit/f2ba0d6)) 

###  Features 

- **shader-ast-glsl:** add array init code gen ([afaee5f](https://github.com/thi-ng/umbrella/commit/afaee5f)) 
- **shader-ast-glsl:** add global input/output var support, update GLSLOpts, add tests ([27003c9](https://github.com/thi-ng/umbrella/commit/27003c9)) 
- **shader-ast-glsl:** add post-inc/dec support ([a554192](https://github.com/thi-ng/umbrella/commit/a554192)) 
- **shader-ast-glsl:** add while loop, ivec support, fix bool ([882c560](https://github.com/thi-ng/umbrella/commit/882c560)) 
- **shader-ast-glsl:** add/update opts, update `scope` code gen, refactor `lit` ([d1ddaf2](https://github.com/thi-ng/umbrella/commit/d1ddaf2)) 
- **shader-ast-glsl:** extract GLSL codegen as separate pkg ([a1db3fc](https://github.com/thi-ng/umbrella/commit/a1db3fc))
