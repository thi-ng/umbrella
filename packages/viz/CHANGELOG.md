# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/viz@0.3.6...@thi.ng/viz@0.3.7) (2021-10-28)

**Note:** Version bump only for package @thi.ng/viz





## [0.3.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/viz@0.3.5...@thi.ng/viz@0.3.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/viz





## [0.3.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/viz@0.3.4...@thi.ng/viz@0.3.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/viz





## [0.3.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/viz@0.3.3...@thi.ng/viz@0.3.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/viz





## [0.3.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/viz@0.3.2...@thi.ng/viz@0.3.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/viz





## [0.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/viz@0.3.1...@thi.ng/viz@0.3.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/viz





## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/viz@0.3.0...@thi.ng/viz@0.3.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/viz





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/viz@0.2.42...@thi.ng/viz@0.3.0) (2021-10-12)


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/viz@0.1.2...@thi.ng/viz@0.2.0) (2020-11-24) 

###  Features 

- **viz:** add barPlot() & interleave opts ([8f3d4e1](https://github.com/thi-ng/umbrella/commit/8f3d4e13f2b81f70ef027780d02e39e4886d3e29)) 
- **viz:** update grid opts (add major flags) ([4fac849](https://github.com/thi-ng/umbrella/commit/4fac84998786c7c884de170775d1797d3218aa19)) 

#  0.1.0 (2020-09-13) 

###  Bug Fixes 

- **viz:** fix/simplify months()/days() iterators ([de6616c](https://github.com/thi-ng/umbrella/commit/de6616c34bbaffbb6df8a01920db6cc7f63836ee)) 
- **viz:** flip Y axis tick direction ([72a3200](https://github.com/thi-ng/umbrella/commit/72a3200c685b039fa8ebfec24ad4ccb02e9d4595)) 
- **viz:** update areaPlot(), linePlot() ([ac20370](https://github.com/thi-ng/umbrella/commit/ac2037061a63b57cfa0143f2a14cc0f2d74a95bd)) 

###  Features 

- **viz:** add background grid support ([ca51cba](https://github.com/thi-ng/umbrella/commit/ca51cba3d7d1d753f7f1b9c593f770d080ddbf41)) 
- **viz:** add lensAxis(), lensScale(), InitialAxisSpec ([b423600](https://github.com/thi-ng/umbrella/commit/b423600bbf208e8630ecb2205eec45895e6b8ea8)) 
- **viz:** import as new package (ongoing port from geom-viz) ([900db82](https://github.com/thi-ng/umbrella/commit/900db82fec61e1e478d7ab08015d2d872f4566c5)) 
- **viz:** improve domain data value handling ([ab89655](https://github.com/thi-ng/umbrella/commit/ab89655fcf1626f15ccde09e18dd986cf07c1a48)) 
- **viz:** redo log scale & ticks, restructure all files ([2f51668](https://github.com/thi-ng/umbrella/commit/2f5166800c880ee4792773048d989eeea26a8583)) 
- **viz:** update candlePlot(), add candle() shape fn ([fbb63d3](https://github.com/thi-ng/umbrella/commit/fbb63d34ce67007bd0f0f0ffeffe063e191bcb93))
