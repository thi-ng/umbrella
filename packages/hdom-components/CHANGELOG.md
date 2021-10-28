# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@5.0.6...@thi.ng/hdom-components@5.0.7) (2021-10-28)

**Note:** Version bump only for package @thi.ng/hdom-components





## [5.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@5.0.5...@thi.ng/hdom-components@5.0.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/hdom-components





## [5.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@5.0.4...@thi.ng/hdom-components@5.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/hdom-components





## [5.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@5.0.3...@thi.ng/hdom-components@5.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/hdom-components





## [5.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@5.0.2...@thi.ng/hdom-components@5.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/hdom-components





## [5.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@5.0.1...@thi.ng/hdom-components@5.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/hdom-components





## [5.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@5.0.0...@thi.ng/hdom-components@5.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/hdom-components





# [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@4.0.48...@thi.ng/hdom-components@5.0.0) (2021-10-12)


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






#  [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.2.12...@thi.ng/hdom-components@4.0.0) (2020-06-07) 

###  Code Refactoring 

- **hdom-components:** remove adaptDPI() ([2b89ad4](https://github.com/thi-ng/umbrella/commit/2b89ad4135b9c765436fd4a496eecb080a9f59fa)) 

###  BREAKING CHANGES 

- **hdom-components:** re-use adaptDPI() from new @thi.ng/adapt-dpi pkg 
    - update deps 

#  [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.1.13...@thi.ng/hdom-components@3.2.0) (2020-03-06) 

###  Bug Fixes 

- **hdom-components:** fix total size calc in slideToggleRect() ([8f58b09](https://github.com/thi-ng/umbrella/commit/8f58b0992396357f4e06a7c2d835a751ef848dfd)) 

###  Features 

- **hdom-components:** import slideToggleDot/Rect() components ([a2d0158](https://github.com/thi-ng/umbrella/commit/a2d015863ddea9e7a883dc9e0ce0e2e9a38497ae)) 

#  [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.20...@thi.ng/hdom-components@3.1.0) (2019-07-07) 

###  Bug Fixes 

- **hdom-components:** update CanvasHandler args ([080411f](https://github.com/thi-ng/umbrella/commit/080411f)) 

###  Features 

- **hdom-components:** enable TS strict compiler flags (refactor) ([6233ba2](https://github.com/thi-ng/umbrella/commit/6233ba2)) 

##  [3.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@3.0.16...@thi.ng/hdom-components@3.0.17) (2019-04-16) 

###  Bug Fixes 

- **hdom-components:** `this` handling in CanvasHandlers ([f104b64](https://github.com/thi-ng/umbrella/commit/f104b64)) 

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.4.6...@thi.ng/hdom-components@3.0.0) (2019-01-21) 

###  Build System 

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84)) 

###  BREAKING CHANGES 

- enable multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols 

#  [2.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.3.0...@thi.ng/hdom-components@2.4.0) (2018-12-14) 

###  Features 

- **hdom-components:** merge button & button group attribs ([da441c1](https://github.com/thi-ng/umbrella/commit/da441c1)) 

#  [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.2.15...@thi.ng/hdom-components@2.3.0) (2018-12-13) 

###  Features 

- **hdom-components:** add FPS counter & sparkline components, update deps ([ebd3380](https://github.com/thi-ng/umbrella/commit/ebd3380)) 

##  [2.2.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.2.10...@thi.ng/hdom-components@2.2.11) (2018-10-17) 

###  Bug Fixes 

- **hdom-components:** add Canvas2DContextAttributes (removed in TS3.1) ([775cc8a](https://github.com/thi-ng/umbrella/commit/775cc8a)) 

#  [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.1.13...@thi.ng/hdom-components@2.2.0) (2018-08-27) 

###  Bug Fixes 

- **hdom-components:** call canvas update from init() ([b25edbe](https://github.com/thi-ng/umbrella/commit/b25edbe)) 

###  Features 

- **hdom-components:** add HDPI adaptation helper for canvas comps ([135d6f1](https://github.com/thi-ng/umbrella/commit/135d6f1)) 

#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@2.0.3...@thi.ng/hdom-components@2.1.0) (2018-05-09) 

###  Features 

- **hdom-components:** add button component ([cef3c6a](https://github.com/thi-ng/umbrella/commit/cef3c6a)) 
- **hdom-components:** add buttonGroup ([c0950d6](https://github.com/thi-ng/umbrella/commit/c0950d6)) 
- **hdom-components:** add notification component ([a11803c](https://github.com/thi-ng/umbrella/commit/a11803c)) 
- **hdom-components:** add pager component, add [@thi](https://github.com/thi).ng/iterators dep ([efb288d](https://github.com/thi-ng/umbrella/commit/efb288d)) 
- **hdom-components:** add title component ([f9a2daf](https://github.com/thi-ng/umbrella/commit/f9a2daf)) 

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-components@1.1.2...@thi.ng/hdom-components@2.0.0) (2018-04-08) 

###  Code Refactoring 

- **hdom-components:** remove svg, update canvas (hdom context support) ([86d1f0d](https://github.com/thi-ng/umbrella/commit/86d1f0d)) 
- **hdom-components:** update dropdown components ([0873832](https://github.com/thi-ng/umbrella/commit/0873832)) 

###  Features 

- **hdom-components:** update canvas handlers, add webgl2 version ([7c88a3f](https://github.com/thi-ng/umbrella/commit/7c88a3f)) 

###  BREAKING CHANGES
