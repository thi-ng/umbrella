# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@4.0.1...@thi.ng/hiccup-svg@4.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/hiccup-svg





## [4.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@4.0.0...@thi.ng/hiccup-svg@4.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/hiccup-svg





# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.8.1...@thi.ng/hiccup-svg@4.0.0) (2021-10-12)


### Bug Fixes

* **hiccup-svg:** check values passed to numericAttribs are actually numeric ([dbd51c3](https://github.com/thi-ng/umbrella/commit/dbd51c301dbd32430ae00d34521b6e1c2f32c7cc))


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






#  [3.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.7.33...@thi.ng/hiccup-svg@3.8.0) (2021-08-22) 

###  Features 

- **hiccup-svg:** add numericAttribs(), fix svg() ([d6cb992](https://github.com/thi-ng/umbrella/commit/d6cb9929d274c83e89670e9140bba1cb172a0deb)) 

#  [3.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.6.6...@thi.ng/hiccup-svg@3.7.0) (2021-01-02) 

###  Features 

- **hiccup-svg:** update svg(), add convert attrib ([cd67a09](https://github.com/thi-ng/umbrella/commit/cd67a09c61c93bc7a84ac63eab48f85ab6c52d2a)) 

#  [3.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.5.11...@thi.ng/hiccup-svg@3.6.0) (2020-09-13) 

###  Features 

- **hiccup-svg:** allow child elements in shapes ([7447ee1](https://github.com/thi-ng/umbrella/commit/7447ee1e93641921956a8c3194465613576a9697)) 
- **hiccup-svg:** fix [#194](https://github.com/thi-ng/umbrella/issues/194), add `baseline` support ([f8d4a38](https://github.com/thi-ng/umbrella/commit/f8d4a3868a59f6ce426b8c6fa258b0dda69f1d97)) 
- **hiccup-svg:** fix/update convertTree() ([997dbf6](https://github.com/thi-ng/umbrella/commit/997dbf6eb6da314e8c7f93908a973139fc650eec)) 
- **hiccup-svg:** update ff() formatter (int check) ([609d278](https://github.com/thi-ng/umbrella/commit/609d27812b76ebfad96bdc74821840b96ca26307)) 

#  [3.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.4.26...@thi.ng/hiccup-svg@3.5.0) (2020-07-02) 

###  Bug Fixes 

- **hiccup-svg:** update XML ns imports ([32bd8d7](https://github.com/thi-ng/umbrella/commit/32bd8d71a818f06b0fd2f1fe098e477cbce62f1c)) 

###  Features 

- **hiccup-svg:** update deps, update xmlns import ([aab66bb](https://github.com/thi-ng/umbrella/commit/aab66bb07ac3db85a741e0b1eb42433517470bc1)) 

#  [3.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.3.3...@thi.ng/hiccup-svg@3.4.0) (2020-01-24) 

###  Features 

- **hiccup-svg:** add packedPoints(), update convertTree() ([67be25e](https://github.com/thi-ng/umbrella/commit/67be25e425d224279a91bf070bfe4ee53cf6847b)) 

##  [3.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.3.1...@thi.ng/hiccup-svg@3.3.2) (2019-11-09) 

###  Bug Fixes 

- **hiccup-svg:** fix [#142](https://github.com/thi-ng/umbrella/issues/142), add missing exports (ellipse, image) ([1bd7f64](https://github.com/thi-ng/umbrella/commit/1bd7f6408e7b13f45363a8f90a9c043d27baffcb)) 

#  [3.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.2.6...@thi.ng/hiccup-svg@3.3.0) (2019-08-21) 

###  Bug Fixes 

- **hiccup-svg:** convertAttrib() arg order ([8b48a27](https://github.com/thi-ng/umbrella/commit/8b48a27)) 

###  Features 

- **hiccup-svg:** update polyline(), add fill: none default ([cff9e30](https://github.com/thi-ng/umbrella/commit/cff9e30)) 

##  [3.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.2.1...@thi.ng/hiccup-svg@3.2.2) (2019-07-12) 

###  Bug Fixes 

- **hiccup-svg:** update points(), use centered rects ([c7d6aaa](https://github.com/thi-ng/umbrella/commit/c7d6aaa)) 

#  [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.22...@thi.ng/hiccup-svg@3.2.0) (2019-07-07) 

###  Features 

- **hiccup-svg:** enable TS strict compiler flags (refactor) ([3143141](https://github.com/thi-ng/umbrella/commit/3143141)) 

##  [3.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.1.6...@thi.ng/hiccup-svg@3.1.7) (2019-02-27) 

###  Bug Fixes 

- **hiccup-svg:** update convert() image (new arg order in hdom-canvas) ([b206cff](https://github.com/thi-ng/umbrella/commit/b206cff)) 

#  [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@3.0.1...@thi.ng/hiccup-svg@3.1.0) (2019-01-22) 

###  Features 

- **hiccup-svg:** add color dep, add attrib conversion for all elements ([7f6011e](https://github.com/thi-ng/umbrella/commit/7f6011e)) 

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.10...@thi.ng/hiccup-svg@3.0.0) (2019-01-21) 

###  Bug Fixes 

- **hiccup-svg:** convert path arc segment axis theta to degrees ([370f928](https://github.com/thi-ng/umbrella/commit/370f928)) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  Features 

- **hiccup-svg:** add ellipse shape type, update convert() ([a39811c](https://github.com/thi-ng/umbrella/commit/a39811c)) 
- **hiccup-svg:** add toHiccup() support in convertTree() ([e197f90](https://github.com/thi-ng/umbrella/commit/e197f90)) 

###  Reverts 

- **hiccup-svg:** undo merge mistake in convert.ts ([82f8ef2](https://github.com/thi-ng/umbrella/commit/82f8ef2)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

##  [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@2.0.3...@thi.ng/hiccup-svg@2.0.4) (2018-10-21) 

###  Bug Fixes 

- **hiccup-svg:** fix arc segment handling ([85426d9](https://github.com/thi-ng/umbrella/commit/85426d9)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.13...@thi.ng/hiccup-svg@1.0.0) (2018-05-13) 

###  Code Refactoring 

- **hiccup-svg:** rename svgdoc => svg ([396faec](https://github.com/thi-ng/umbrella/commit/396faec)) 

###  Documentation 

- **hiccup-svg:** resolve [#19](https://github.com/thi-ng/umbrella/issues/19), update readme, add invocation notes ([dc77540](https://github.com/thi-ng/umbrella/commit/dc77540)) 

###  BREAKING CHANGES 

- **hiccup-svg:** technically identical to previous version, however due to breaking changes and new context support in @thi.ng/hiccup, SVG functions MUST be invoked directly now and do not support lazy evaluation anymore. see notice in readme. 
- **hiccup-svg:** rename svgdoc => svg 

##  [0.2.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.12...@thi.ng/hiccup-svg@0.2.13) (2018-05-12) 

##  [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-svg@0.2.0...@thi.ng/hiccup-svg@0.2.1) (2018-04-09) 

###  Bug Fixes 

- **hiccup-svg:** path(), update add null check for points() ([b9d9a49](https://github.com/thi-ng/umbrella/commit/b9d9a49)) 

#  0.2.0 (2018-04-08) 

###  Features 

- **hiccup-svg:** re-add svg fns as new [@thi](https://github.com/thi).ng/hiccup-svg package ([afccabd](https://github.com/thi-ng/umbrella/commit/afccabd))
