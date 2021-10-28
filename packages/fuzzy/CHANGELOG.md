# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy@2.0.4...@thi.ng/fuzzy@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/fuzzy





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy@2.0.3...@thi.ng/fuzzy@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/fuzzy





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy@2.0.2...@thi.ng/fuzzy@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/fuzzy





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy@2.0.1...@thi.ng/fuzzy@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/fuzzy





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy@2.0.0...@thi.ng/fuzzy@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/fuzzy





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy@1.0.4...@thi.ng/fuzzy@2.0.0) (2021-10-12)


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






##  [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/fuzzy@1.0.3...@thi.ng/fuzzy@1.0.4) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/fuzzy 

#  0.1.0 (2020-12-22) 

###  Features 

- **fuzzy:** add alphaCut() & implication() fns ([8ec15fa](https://github.com/thi-ng/umbrella/commit/8ec15fa5c0f33fd7342c4047a5523e9fd0597ed1)) 
- **fuzzy:** add evaluate() ([0ffc9d0](https://github.com/thi-ng/umbrella/commit/0ffc9d01f9bd40ba616d1f59e3ced74fa7c0dc7f)) 
- **fuzzy:** add maxima(), compose(), restructure ([f15d8d7](https://github.com/thi-ng/umbrella/commit/f15d8d73df2a438d4866d57fc25fed625acd7a8a)) 
- **fuzzy:** add min true threshold for classify() ([6f49a30](https://github.com/thi-ng/umbrella/commit/6f49a308c62a598f6d0a0e6e5046cd8e24d81eab)) 
- **fuzzy:** add shapes, strongAnd(), update combineTerms() ([5bf8f0c](https://github.com/thi-ng/umbrella/commit/5bf8f0c01541afeb367eff21cb45118a1b62549a)) 
- **fuzzy:** add strict arg for classify(), update docs ([b39248f](https://github.com/thi-ng/umbrella/commit/b39248f359aa0148ff72c484d78175f8f435fe97)) 
- **fuzzy:** add/update/migrate defuzz strategies ([c1ee15f](https://github.com/thi-ng/umbrella/commit/c1ee15fdce2b08176c5bc97ba9ca7a56a84817c7)) 
- **fuzzy:** import as new pkg, refactor ([a578194](https://github.com/thi-ng/umbrella/commit/a57819454f38de4c35095b64b9e7028d9ac21454)) 
- **fuzzy:** make lvar, rules, defuzz() typesafe ([0b210c3](https://github.com/thi-ng/umbrella/commit/0b210c3841ce9184b8dfb83ca2dde5ceca0a3b6e)) 
- **fuzzy:** migrate t-norms from [@thi](https://github.com/thi).ng/math pkg ([f8993e0](https://github.com/thi-ng/umbrella/commit/f8993e0dc1aed0243629a21d36ee85e91b2e938d)) 
- **fuzzy:** update defuzz() & strategies ([cf337f3](https://github.com/thi-ng/umbrella/commit/cf337f36dbf24a9cfc4c6f364c3aea82428b5940)) 
- **fuzzy:** update defuzz() output prep ([81abe8c](https://github.com/thi-ng/umbrella/commit/81abe8cb718ce335940234aecf693ba53564a715)) 
- **fuzzy:** update types, update compose ([566469d](https://github.com/thi-ng/umbrella/commit/566469d5c420cc2c4fdc3b107e04b52929b61915)) 

###  Performance Improvements 

- **fuzzy:** update defuzz() ([60030dd](https://github.com/thi-ng/umbrella/commit/60030dd9a5ceb02d58ad89766e14f80019f6f72f))
