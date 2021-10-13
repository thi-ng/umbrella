# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl-msdf@2.0.0...@thi.ng/webgl-msdf@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/webgl-msdf





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl-msdf@1.0.8...@thi.ng/webgl-msdf@2.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


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






##  [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl-msdf@1.0.6...@thi.ng/webgl-msdf@1.0.7) (2021-08-22) 

**Note:** Version bump only for package @thi.ng/webgl-msdf 

##  [0.1.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/webgl-msdf@0.1.9...@thi.ng/webgl-msdf@0.1.10) (2019-11-30) 

###  Bug Fixes 

- **webgl-msdf:** update mempool size in text() ([9f96b2e](https://github.com/thi-ng/umbrella/commit/9f96b2ec525cd8d8a5d5e31d39352f0c6e350991)) 

#  0.1.0 (2019-07-07) 

###  Bug Fixes 

- **webgl-msdf:** update madd call sites ([#95](https://github.com/thi-ng/umbrella/issues/95)) ([5c6fa50](https://github.com/thi-ng/umbrella/commit/5c6fa50)) 
- **webgl-msdf:** update shader (remove prefixes) ([33731e9](https://github.com/thi-ng/umbrella/commit/33731e9)) 
- **webgl-msdf:** update textWidth & align fns ([dd6f752](https://github.com/thi-ng/umbrella/commit/dd6f752)) 

###  Features 

- **webgl:** initial integration of shader-ast ([73faffd](https://github.com/thi-ng/umbrella/commit/73faffd)) 
- **webgl-msdf:** add more TextOpts, update TextAlign fns ([4602883](https://github.com/thi-ng/umbrella/commit/4602883)) 
- **webgl-msdf:** initial import MSDF font rendering pkg ([22bcc24](https://github.com/thi-ng/umbrella/commit/22bcc24))
