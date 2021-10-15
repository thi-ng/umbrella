# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@4.0.2...@thi.ng/hiccup@4.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/hiccup





## [4.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@4.0.1...@thi.ng/hiccup@4.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/hiccup





## [4.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@4.0.0...@thi.ng/hiccup@4.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/hiccup





# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@3.6.22...@thi.ng/hiccup@4.0.0) (2021-10-12)


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






#  [3.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@3.5.8...@thi.ng/hiccup@3.6.0) (2020-09-13) 

###  Features 

- **hiccup:** add CDATA support, update void tag handling ([5989427](https://github.com/thi-ng/umbrella/commit/59894274cffff6c9776e0edc366005ff1da14139)) 

#  [3.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@3.4.0...@thi.ng/hiccup@3.5.0) (2020-07-02) 

###  Features 

- **hiccup:** add RDFa `prefix` attrib handling, add tests ([24a7748](https://github.com/thi-ng/umbrella/commit/24a7748ddb35632567175d3055f90b41d353e219)) 
- **hiccup:** remove obsolete SVG/XLINK urls ([aa34be7](https://github.com/thi-ng/umbrella/commit/aa34be7bedfeae5a4d203aaec0d8d94ed43c07f2)) 

#  [3.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@3.3.0...@thi.ng/hiccup@3.4.0) (2020-06-28) 

###  Features 

- **hiccup:** update deps & attrib handling ([09ba171](https://github.com/thi-ng/umbrella/commit/09ba17165e89202fdc48b095ee1e62f65adbcad4)) 

#  [3.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@3.2.26...@thi.ng/hiccup@3.3.0) (2020-06-24) 

###  Features 

- **hiccup:** support array attrib values, add tests ([1c4ef8a](https://github.com/thi-ng/umbrella/commit/1c4ef8aa6464dee9e9fed39e8213e52ed67e2ac1)) 
- **hiccup:** update `accept` attrib handling ([fabf447](https://github.com/thi-ng/umbrella/commit/fabf447d5ef7f666f16ee11d46188496121766d2)) 

##  [3.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@3.2.3...@thi.ng/hiccup@3.2.4) (2019-08-21) 

###  Bug Fixes 

- **hiccup:** update/rename regexes & tag maps ([6dba80d](https://github.com/thi-ng/umbrella/commit/6dba80d)) 

#  [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@3.1.9...@thi.ng/hiccup@3.2.0) (2019-07-07) 

###  Features 

- **hiccup:** enable TS strict compiler flags (refactor) ([d0fce75](https://github.com/thi-ng/umbrella/commit/d0fce75)) 

#  [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@3.0.3...@thi.ng/hiccup@3.1.0) (2019-02-18) 

###  Features 

- **hiccup:** add support for XML/DTD proc tags, update readme, tests ([ede2842](https://github.com/thi-ng/umbrella/commit/ede2842)) 

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@2.7.2...@thi.ng/hiccup@3.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

#  [2.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@2.6.1...@thi.ng/hiccup@2.7.0) (2018-12-13) 

###  Features 

- **hiccup:** add __skip support, add test, update readme ([d3500df](https://github.com/thi-ng/umbrella/commit/d3500df)) 

#  [2.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@2.5.0...@thi.ng/hiccup@2.6.0) (2018-11-07) 

###  Features 

- **hiccup:** update derefContext() to only apply to selected keys ([749925f](https://github.com/thi-ng/umbrella/commit/749925f)) 

#  [2.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@2.4.3...@thi.ng/hiccup@2.5.0) (2018-11-06) 

###  Features 

- **hiccup:** add support for dynamic user context values ([a947873](https://github.com/thi-ng/umbrella/commit/a947873)) 

#  [2.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@2.3.0...@thi.ng/hiccup@2.4.0) (2018-09-23) 

###  Features 

- **hiccup:** emmet class & class attrib merging in normalize() ([1d8eeb4](https://github.com/thi-ng/umbrella/commit/1d8eeb4)) 

#  [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@2.2.1-alpha.1...@thi.ng/hiccup@2.3.0) (2018-09-22) 

###  Features 

- **hiccup:** add control attrib handling, add comment support ([363c241](https://github.com/thi-ng/umbrella/commit/363c241)) 

#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@2.0.11...@thi.ng/hiccup@2.1.0) (2018-08-31) 

###  Bug Fixes 

- **hiccup:** disable spans for certain element types ([1b97a25](https://github.com/thi-ng/umbrella/commit/1b97a25)) 
- **hiccup:** serialize() args ([1e8b4ef](https://github.com/thi-ng/umbrella/commit/1e8b4ef)) 

###  Features 

- **hiccup:** add optional support for spans & auto keying ([#39](https://github.com/thi-ng/umbrella/issues/39)) ([1b0deb2](https://github.com/thi-ng/umbrella/commit/1b0deb2)) 

##  [2.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@2.0.10...@thi.ng/hiccup@2.0.11) (2018-08-27) 

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@1.3.16...@thi.ng/hiccup@2.0.0) (2018-05-13) 

###  Code Refactoring 

- **hiccup:** fix [#19](https://github.com/thi-ng/umbrella/issues/19), add support for context object ([feca566](https://github.com/thi-ng/umbrella/commit/feca566)) 

###  Performance Improvements 

- **hiccup:** update css() ([b1cb7d9](https://github.com/thi-ng/umbrella/commit/b1cb7d9)) 

###  BREAKING CHANGES 

- **hiccup:** component functions now take a global context object as first argument (like w/ @thi.ng/hdom) 
    - update serialize() to accept & pass optional context 
    - add support for component objects 
    - add/update tests 

#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@1.2.5...@thi.ng/hiccup@1.3.0) (2018-03-21) 

###  Features 

- **hiccup:** update error handling, add [@thi](https://github.com/thi).ng/api dep ([a3238ab](https://github.com/thi-ng/umbrella/commit/a3238ab)) 

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@1.1.3...@thi.ng/hiccup@1.2.0) (2018-03-14) 

###  Features 

- **hiccup:** add auto deref() support ([0d2c16f](https://github.com/thi-ng/umbrella/commit/0d2c16f)) 
- **hiccup:** support fn values in style objects ([93343d6](https://github.com/thi-ng/umbrella/commit/93343d6)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@1.0.2...@thi.ng/hiccup@1.1.0) (2018-02-24) 

###  Features 

- **hiccup:** add support for more SVG tags (66 total) ([44f33df](https://github.com/thi-ng/umbrella/commit/44f33df)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup@0.1.7...@thi.ng/hiccup@1.0.0) (2018-02-03) 

###  Features 

- **hiccup:** skip fn exec for event attribs, update tests, readme ([7ae706e](https://github.com/thi-ng/umbrella/commit/7ae706e)) 

###  BREAKING CHANGES 

- **hiccup:** event attribs w/ function values will be omitted, see readme for details/examples
