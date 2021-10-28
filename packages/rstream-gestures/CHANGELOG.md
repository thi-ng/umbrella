# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@4.0.4...@thi.ng/rstream-gestures@4.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [4.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@4.0.3...@thi.ng/rstream-gestures@4.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [4.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@4.0.2...@thi.ng/rstream-gestures@4.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [4.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@4.0.1...@thi.ng/rstream-gestures@4.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rstream-gestures





## [4.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@4.0.0...@thi.ng/rstream-gestures@4.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/rstream-gestures





# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@3.0.34...@thi.ng/rstream-gestures@4.0.0) (2021-10-12)


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






#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@2.0.45...@thi.ng/rstream-gestures@3.0.0) (2020-12-22) 

###  Code Refactoring 

- **rstream-gestures:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace GestureType enum ([80ef1e1](https://github.com/thi-ng/umbrella/commit/80ef1e1558070421cf6ed2d707a55b91fe1c290d)) 

###  BREAKING CHANGES 

- **rstream-gestures:** replace GestureType w/ type alias 

##  [2.0.40](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@2.0.39...@thi.ng/rstream-gestures@2.0.40) (2020-09-27) 

###  Bug Fixes 

- **rstream-gestures:** use correct event var ([6c7c0a9](https://github.com/thi-ng/umbrella/commit/6c7c0a941c06945dea997d5b4ae950379a54c422)) 

##  [2.0.36](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@2.0.35...@thi.ng/rstream-gestures@2.0.36) (2020-08-17) 

###  Bug Fixes 

- **rstream-gestures:** don't cache DPR value ([bffbedb](https://github.com/thi-ng/umbrella/commit/bffbedb0589bd173de0aa49293b110461b33d579)) 

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.3.0...@thi.ng/rstream-gestures@2.0.0) (2020-01-24) 

###  Bug Fixes 

- **rstream-gestures:** remove duplicate MOVE events ([0c8da9b](https://github.com/thi-ng/umbrella/commit/0c8da9b235be37082f514b515917b82a630095d0)) 
    - fixed the bug allowing the user to drag without pressing anything and improved types ([e5a9996](https://github.com/thi-ng/umbrella/commit/e5a9996b73a6284b115d7ef601f3b032a1bdc3fb)) 

###  Features 

- **rstream-gestures:** add multitouch support, almost complete pkg rewrite ([031d89b](https://github.com/thi-ng/umbrella/commit/031d89bd3ada19c5aee158545bfec11e06a70a5f)) 
- **rstream-gestures:** update deps, zoom delta calc, GestureInfo ([6bbbd55](https://github.com/thi-ng/umbrella/commit/6bbbd550e2d29e183a8a23447f003f9e31589112)) 

###  BREAKING CHANGES 

- **rstream-gestures:** New `GestureEvent` & `GestureInfo` data formats, add multitouch support 

#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.2.6...@thi.ng/rstream-gestures@1.3.0) (2019-11-30) 

###  Features 

- **rstream-gestures:** add `buttons` to GestureInfo ([2d837e2](https://github.com/thi-ng/umbrella/commit/2d837e2858754f50e24afc1f939755d1a3096d43)) 

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.1.4...@thi.ng/rstream-gestures@1.2.0) (2019-07-07) 

###  Features 

- **rstream-gestures:** enable TS strict compiler flags (refactor) ([412dd46](https://github.com/thi-ng/umbrella/commit/412dd46)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@1.0.21...@thi.ng/rstream-gestures@1.1.0) (2019-04-11) 

###  Features 

- **rstream-gestures:** add zoomDelta output ([68c4b45](https://github.com/thi-ng/umbrella/commit/68c4b45)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.6.9...@thi.ng/rstream-gestures@1.0.0) (2019-01-21) 

###  Bug Fixes 

- **rstream-gestures:** disable __GestureType reverse enum export ([19449e8](https://github.com/thi-ng/umbrella/commit/19449e8)) 

###  Build System 

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84)) 

###  BREAKING CHANGES 

- enable multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols 

#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.5.18...@thi.ng/rstream-gestures@0.6.0) (2018-11-24) 

###  Features 

- **rstream-gestures:** add absZoom option (abs vs. relative) ([bab55c3](https://github.com/thi-ng/umbrella/commit/bab55c3)) 

##  [0.5.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.5.15...@thi.ng/rstream-gestures@0.5.16) (2018-10-24) 

###  Bug Fixes 

- **rstream-gestures:** fix incorrect local position when scrolled ([f1f6af4](https://github.com/thi-ng/umbrella/commit/f1f6af4)) 

##  [0.5.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.5.9...@thi.ng/rstream-gestures@0.5.10) (2018-09-24) 

###  Performance Improvements 

- **rstream-gestures:** `GestureType` => const enum ([8e4fc90](https://github.com/thi-ng/umbrella/commit/8e4fc90)) 

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.4.18...@thi.ng/rstream-gestures@0.5.0) (2018-08-27) 

###  Features 

- **rstream-gestures:** add options for local & scaled positions ([ccc40a9](https://github.com/thi-ng/umbrella/commit/ccc40a9)) 

##  [0.4.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.4.5...@thi.ng/rstream-gestures@0.4.6) (2018-07-13) 

###  Bug Fixes 

- **rstream-gestures:** touchevent check in safari ([ee48a94](https://github.com/thi-ng/umbrella/commit/ee48a94)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.3.16...@thi.ng/rstream-gestures@0.4.0) (2018-07-04) 

###  Features 

- **rstream-gestures:** add event & preventDefault opts, update docs ([de17340](https://github.com/thi-ng/umbrella/commit/de17340)) 

##  [0.3.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.3.15...@thi.ng/rstream-gestures@0.3.16) (2018-07-03) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.2.5...@thi.ng/rstream-gestures@0.3.0) (2018-05-09) 

###  Features 

- **rstream-gestures:** add zoom smooth config option, update readme ([053c8c6](https://github.com/thi-ng/umbrella/commit/053c8c6)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-gestures@0.1.9...@thi.ng/rstream-gestures@0.2.0) (2018-04-24) 

###  Features 

- **rstream-gestures:** allows partial opts, add ID option ([3408c13](https://github.com/thi-ng/umbrella/commit/3408c13)) 

#  0.1.0 (2018-04-14) 

###  Features 

- **rstream-gestures:** initial import [@thi](https://github.com/thi).ng/rstream-gestures ([de1ac7b](https://github.com/thi-ng/umbrella/commit/de1ac7b))
