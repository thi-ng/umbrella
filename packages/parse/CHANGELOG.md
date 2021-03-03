# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.9.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.9.13...@thi.ng/parse@0.9.14) (2021-03-03)

**Note:** Version bump only for package @thi.ng/parse





## [0.9.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.9.12...@thi.ng/parse@0.9.13) (2021-02-20)

**Note:** Version bump only for package @thi.ng/parse





# [0.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.8.2...@thi.ng/parse@0.9.0) (2020-08-17)


### Features

* **parse:** add replace/xfReplace() xform ([7291181](https://github.com/thi-ng/umbrella/commit/7291181f6eb74751aa02dffbb95bb6787a5ef02f))
* **parse:** enable replacement rule transforms ([ca22432](https://github.com/thi-ng/umbrella/commit/ca224328e55cb525cefd39dd53028a86a580fd7e))





# [0.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.7.2...@thi.ng/parse@0.8.0) (2020-07-19)


### Features

* **parse:** add nest()/xfNest() transform ([af9c97b](https://github.com/thi-ng/umbrella/commit/af9c97b55cba15175bff917d0b2522be8c98517d))
* **parse:** update grammar (xform rule refs) ([22188a4](https://github.com/thi-ng/umbrella/commit/22188a41d5db58fb9dae9cb01bd04ad8d1ac788e))
* **parse:** update repeat grammar ([7aae9ac](https://github.com/thi-ng/umbrella/commit/7aae9ac02d23dd7e5a0643d3a418be67044465bd))





## [0.7.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.7.1...@thi.ng/parse@0.7.2) (2020-07-18)


### Bug Fixes

* **parse:** export ContextOpts, move to api.ts ([2dfc445](https://github.com/thi-ng/umbrella/commit/2dfc445971dc788abcb6576ef4e6836dec6df33a))





## [0.7.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.7.0...@thi.ng/parse@0.7.1) (2020-07-17)


### Performance Improvements

* **parse:** update grammar, use discarding parsers where possible ([d269a8a](https://github.com/thi-ng/umbrella/commit/d269a8a3f5b5ee47d60f86343a163c9903ce6923))





# [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.6.2...@thi.ng/parse@0.7.0) (2020-07-08)


### Features

* **parse:** add lookahead() combinator, add tests ([ee35038](https://github.com/thi-ng/umbrella/commit/ee35038cdae0692cc369221eb7623ba7b973d2f1))
* **parse:** lookahead w/ configurable capture ([542c066](https://github.com/thi-ng/umbrella/commit/542c0662b4901a6cfd32a99e5241dace0ddde807))
* **parse:** turn xfPrint() into HOF xform ([d86fa53](https://github.com/thi-ng/umbrella/commit/d86fa535a530f0fe84e08e5969ca01c96ef75c23))
* **parse:** update grammar DSL ([accacf9](https://github.com/thi-ng/umbrella/commit/accacf9fa73b09f6cb8454cd4d85f10bb0f55795))
* **parse:** update lookahead ([51a8dc5](https://github.com/thi-ng/umbrella/commit/51a8dc55dd3b40fcfbffbcb5f3aeaea618441269))
* **parse:** update/fix grammar DSL, add trim ([f82ba1f](https://github.com/thi-ng/umbrella/commit/f82ba1f9aeed03571e50953c6d41255a569d121f))





# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.5.8...@thi.ng/parse@0.6.0) (2020-06-28)


### Features

* **parse:** add `!` discard modifier to grammar ([456efdc](https://github.com/thi-ng/umbrella/commit/456efdcb6ded913b0f2b137ebe99634421d552c0))
* **parse:** add count/xfCount transform ([056ae08](https://github.com/thi-ng/umbrella/commit/056ae084c08a826f09c65181c01426bbdff59e87))





# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.4.1...@thi.ng/parse@0.5.0) (2020-04-23)


### Features

* **parse:** add built-ins, extract STRING, minor updates ([458f5b3](https://github.com/thi-ng/umbrella/commit/458f5b34a4fa1c58f55b23be8455e6bd7b7bb72d))





# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.3.0...@thi.ng/parse@0.4.0) (2020-04-21)


### Bug Fixes

* **parse:** update not() behavior, add passD() ([1d0f4c4](https://github.com/thi-ng/umbrella/commit/1d0f4c4baef5b1cfb207f606f4e3873a14c3afce))


### Features

* **parse:** update grammar DSL, hoist xforms ([861e7f3](https://github.com/thi-ng/umbrella/commit/861e7f32d98a9f693a9271d31235d1603700b36c))





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.2.0...@thi.ng/parse@0.3.0) (2020-04-20)


### Features

* **parse:** add discarding combinators, move discard ([e09a2c4](https://github.com/thi-ng/umbrella/commit/e09a2c40d1ad7272a5abc15c8b11e497f79eb0dd))
* **parse:** add dynamic() & DynamicParser ([b914267](https://github.com/thi-ng/umbrella/commit/b914267b88325d5c94a028aee192268e75736181))
* **parse:** add grammar default transforms, update/fix rules ([03ed965](https://github.com/thi-ng/umbrella/commit/03ed96592f1598767d5feeac1b49b8cc4b1d6285))
* **parse:** add more whitespace presets ([1398e2b](https://github.com/thi-ng/umbrella/commit/1398e2b06a8eace8b61333c36db6e82d6e1478f3))
* **parse:** add ParseContext.reset(), update addChild() ([d47c0a2](https://github.com/thi-ng/umbrella/commit/d47c0a220e4912a30c59a7fd3c81b8376d74d720))
* **parse:** add skipWhile(), more discarded wrappers ([832c0b7](https://github.com/thi-ng/umbrella/commit/832c0b7e88d87b2da0e37f602e592ad7b548da09))
* **parse:** add withID() xform, add doc strings ([e16426b](https://github.com/thi-ng/umbrella/commit/e16426b82f0dda94ab9aa92ba6e3af8d769f3fed))
* **parse:** add/update combinators ([e4eab03](https://github.com/thi-ng/umbrella/commit/e4eab036243f4f646880b974624ae680e77cff7f))
* **parse:** add/update/rename parser presets ([12f2499](https://github.com/thi-ng/umbrella/commit/12f2499253163a923c42e3be29ce2223a6648e11))
* **parse:** add/update/rename parser primitives ([328103f](https://github.com/thi-ng/umbrella/commit/328103f55f4bb311470b8767a27d28a78d0dcb4b))
* **parse:** initial checkin grammar compiler ([38e9c66](https://github.com/thi-ng/umbrella/commit/38e9c66c25c02db4d7fb79837645dfaf654e6788))
* **parse:** update ESC & whitespace parsers ([069a6ef](https://github.com/thi-ng/umbrella/commit/069a6ef11c9423bdb2974b11823cc39743dfceec))
* **parse:** update grammar parser & compiler ([822fcba](https://github.com/thi-ng/umbrella/commit/822fcba9a29a05bad98eecf2b341d07a3a90abeb))





# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/parse@0.1.0...@thi.ng/parse@0.2.0) (2020-04-17)


### Features

* **parse:** add/rename/reorg parsers, xforms, ctx ([ee537f4](https://github.com/thi-ng/umbrella/commit/ee537f49c239de19326865687853e9b2814330bf))


### Performance Improvements

* **parse:** major speedup satisfy() (~1.6x faster) ([8ca5c7f](https://github.com/thi-ng/umbrella/commit/8ca5c7f184af3d03f06b03b9136a675fb9e63d64))





# 0.1.0 (2020-04-16)


### Features

* **parse:** add ArrayReader, update pkg info ([3bec0db](https://github.com/thi-ng/umbrella/commit/3bec0dbf759d9742adefb936e58359f95da58fc8))
* **parse:** add collect/xfCollect, update xfPrint ([43f3368](https://github.com/thi-ng/umbrella/commit/43f33687431f9ea8269c1eba0342d0589f7ac4dc))
* **parse:** add ctx getters, add presets, update maybe ([02597bf](https://github.com/thi-ng/umbrella/commit/02597bf825df3e467cf2d090c69198d85f1767f2))
* **parse:** import as new package ([151e50c](https://github.com/thi-ng/umbrella/commit/151e50cc1e2bfaf8d70a6bb82907eec483dd8316))
* **parse:** make retained state info optional ([a89ee87](https://github.com/thi-ng/umbrella/commit/a89ee871a098582c909fcf8558ed979d04942250))
* **parse:** update defContext, add basic array test ([cd7363d](https://github.com/thi-ng/umbrella/commit/cd7363d7f93e0db00797a9ec30bd44b399396860))
* **parse:** update ParseContext, repeat & lift ([bef1d4f](https://github.com/thi-ng/umbrella/commit/bef1d4f628320d1aac9cf6d924749d4f15864d07))
* **parse:** update repeat ops, reader, initial state ([c5cfabe](https://github.com/thi-ng/umbrella/commit/c5cfabeaf5ab6e124d5fc2455fd3f5ede96248cd))
