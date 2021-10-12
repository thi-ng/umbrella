# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@2.0.80...@thi.ng/rstream-csp@3.0.0) (2021-10-12)


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






#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.33...@thi.ng/rstream-csp@2.0.0) (2019-11-30) 

###  Code Refactoring 

- **rstream-csp:** use options object arg ([b39f4d0](https://github.com/thi-ng/umbrella/commit/b39f4d023fdb90d5ad095b2e50d76e69c2b50843)) 

###  BREAKING CHANGES 

- **rstream-csp:** use options object arg for fromChannel() 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@0.1.125...@thi.ng/rstream-csp@1.0.0) (2019-01-21) 

###  Build System 

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84)) 

###  BREAKING CHANGES 

- enable multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols 

#  0.1.0 (2018-01-28) 

###  Features 

- **rstream-csp:** add new package, remove CSP dep from rstream ([e37f6a1](https://github.com/thi-ng/umbrella/commit/e37f6a1))
