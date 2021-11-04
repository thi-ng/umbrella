# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-js@0.6.9...@thi.ng/shader-ast-js@0.6.10) (2021-11-04)

**Note:** Version bump only for package @thi.ng/shader-ast-js





## [0.6.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-js@0.6.8...@thi.ng/shader-ast-js@0.6.9) (2021-11-03)

**Note:** Version bump only for package @thi.ng/shader-ast-js





# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-js@0.5.49...@thi.ng/shader-ast-js@0.6.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **shader-ast-js:** add float precision option ([a9abcfe](https://github.com/thi-ng/umbrella/commit/a9abcfe7304fd6f8273ed1c2c7d190abedeaca13))


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






##  [0.5.45](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-js@0.5.44...@thi.ng/shader-ast-js@0.5.45) (2021-08-17)

###  Bug Fixes

- **shader-ast-js:** fix matrix indexing ([094ab36](https://github.com/thi-ng/umbrella/commit/094ab360f927dd0f9cecc8afa090de79334295dd))

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-js@0.4.40...@thi.ng/shader-ast-js@0.5.0) (2020-08-10)

###  Features

- **shader-ast-js:** add vec coercions & bvec ops ([3f111c9](https://github.com/thi-ng/umbrella/commit/3f111c98190c8c6972033901df391a237d7d8491))

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-js@0.3.1...@thi.ng/shader-ast-js@0.4.0) (2019-09-21)

###  Bug Fixes

- **shader-ast-js:** fix divisions ([bc81ff8](https://github.com/thi-ng/umbrella/commit/bc81ff8))

###  Features

- **shader-ast-js:** add div-by-zero guards ([233528d](https://github.com/thi-ng/umbrella/commit/233528d))
- **shader-ast-js:** replace JS runtime fns, add doc strings ([0798a35](https://github.com/thi-ng/umbrella/commit/0798a35))

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-js@0.2.3...@thi.ng/shader-ast-js@0.3.0) (2019-08-17)

###  Features

- **shader-ast-js:** add support for 2-arg atan(), move types to api.ts ([a760085](https://github.com/thi-ng/umbrella/commit/a760085))

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/shader-ast-js@0.1.1...@thi.ng/shader-ast-js@0.2.0) (2019-07-12)

###  Features

- **shader-ast-js:** add uvec/bvec support, add bool => float casting ([90bb850](https://github.com/thi-ng/umbrella/commit/90bb850))

#  0.1.0 (2019-07-07)

###  Bug Fixes

- **shader-ast-js:** add missing faceForward, reflect, refract builtins ([c63058e](https://github.com/thi-ng/umbrella/commit/c63058e))
- **shader-ast-js:** add/fix vec4 ops ([7f7f1f6](https://github.com/thi-ng/umbrella/commit/7f7f1f6))
- **shader-ast-js:** avoid extraneous semicolons ([2b56c91](https://github.com/thi-ng/umbrella/commit/2b56c91))
- **shader-ast-js:** op2 int handling, update vectors/matrices imports, update pkg ([dc54ec2](https://github.com/thi-ng/umbrella/commit/dc54ec2))
- **shader-ast-js:** op2 type hint interpretation ([fdaac1f](https://github.com/thi-ng/umbrella/commit/fdaac1f))

###  Features

- **shader-ast-js:** add % operator support ([c1b25c6](https://github.com/thi-ng/umbrella/commit/c1b25c6))
- **shader-ast-js:** add array init, more builtin stubs, minor refactor ([fb5141e](https://github.com/thi-ng/umbrella/commit/fb5141e))
- **shader-ast-js:** add missing texture lookup stubs ([f0370b0](https://github.com/thi-ng/umbrella/commit/f0370b0))
- **shader-ast-js:** add post-inc/dec support, update op1 handler ([8073edd](https://github.com/thi-ng/umbrella/commit/8073edd))
- **shader-ast-js:** add uvec ops, update imports ([5dcd39f](https://github.com/thi-ng/umbrella/commit/5dcd39f))
- **shader-ast-js:** extract JS codegen & runtime as own pkg ([8177469](https://github.com/thi-ng/umbrella/commit/8177469))
- **shader-ast-js:** int/uint/ivec support, while loop, fix bool ([003069e](https://github.com/thi-ng/umbrella/commit/003069e))
