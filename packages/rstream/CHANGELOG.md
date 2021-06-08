# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@5.1.7...@thi.ng/rstream@6.0.0) (2021-03-12)


### Bug Fixes

* **rstream:** fix wrong imports ([ae4866a](https://github.com/thi-ng/umbrella/commit/ae4866adb52800af4dee30392d8482befd8a9435))
* **rstream:** minor update/revert sub ctor args ([c651421](https://github.com/thi-ng/umbrella/commit/c651421e7809df1a37103628e54d3e21161e8c0a))
* **rstream:** PubSub dispatch & error handling ([cca0f34](https://github.com/thi-ng/umbrella/commit/cca0f34568c9e1a6c30a6a423e7469a477e5a76d))
* **rstream:** update failing tests ([ae591a1](https://github.com/thi-ng/umbrella/commit/ae591a1a8a8647768d38b783c094ae1bbe94a278))


### Features

* **rstream:** [#281](https://github.com/thi-ng/umbrella/issues/281) update Subscription error/teardown logic ([a9e4040](https://github.com/thi-ng/umbrella/commit/a9e40407d0c0ec4e3ffdd3983d70a9e40aec2356))
* **rstream:** add .transform() error handler opt ([#276](https://github.com/thi-ng/umbrella/issues/276)) ([22c6f7c](https://github.com/thi-ng/umbrella/commit/22c6f7cb25516359690811c39a184b0e9838ea02))
* **rstream:** add generic type for PubSub topics ([08adc5f](https://github.com/thi-ng/umbrella/commit/08adc5f2f6c719cdda0a8eb4e5548bf6c5c1cf75))
* **rstream:** add ISubscription interface ([98edee0](https://github.com/thi-ng/umbrella/commit/98edee0bc84763547a1c06394d78456565fbc9de))
* **rstream:** add PubSub.transformTopic() ([123e15d](https://github.com/thi-ng/umbrella/commit/123e15d84557990c682ed80f9f97eafe94c09b43))
* **rstream:** add sidechainPartitionRAF() ([a101626](https://github.com/thi-ng/umbrella/commit/a10162625836d5392199d34149c281f9cc47a572))
* **rstream:** add StreamSource error handling ([73023b6](https://github.com/thi-ng/umbrella/commit/73023b6979dd0cf4b95c6d072bfbda8c12ba9438))
* **rstream:** add Sub2 WIP impl ([de4149b](https://github.com/thi-ng/umbrella/commit/de4149bc0504c4be9faef8b467eee74ecf9caa05))
* **rstream:** further simplify ISubscribable & impls ([9e290fe](https://github.com/thi-ng/umbrella/commit/9e290fe2e3813d0096eacd28d700f9000155bc5e))
* **rstream:** log error to console ([594d806](https://github.com/thi-ng/umbrella/commit/594d806fbc2176d3458d80e390baa0cb4b0d7b60)), closes [#125](https://github.com/thi-ng/umbrella/issues/125) [#276](https://github.com/thi-ng/umbrella/issues/276)
* **rstream:** update DONE state & teardown logic ([a8a8c44](https://github.com/thi-ng/umbrella/commit/a8a8c44ed8a42b91f92fe9040cb1ce28b17113e7))
* **rstream:** update error handler sig ([#281](https://github.com/thi-ng/umbrella/issues/281)) ([015380a](https://github.com/thi-ng/umbrella/commit/015380ac20e342f83757556e158320e23a42502a))
* **rstream:** update ITransformable.transform() ([fe0eaa9](https://github.com/thi-ng/umbrella/commit/fe0eaa9f145d627dce67acfe2650c38222121ad1))
* **rstream:** update PubSub ([fa87168](https://github.com/thi-ng/umbrella/commit/fa87168ffbb683aed495b7786a4d100510d29c04))
* **rstream:** update Sub2, State enum ([db0ab34](https://github.com/thi-ng/umbrella/commit/db0ab34fcea8869d9c85c51f5faacf1e1f6bb0ec))
* **rstream:** update Subscription FSM, add/update tests ([ea1d0c1](https://github.com/thi-ng/umbrella/commit/ea1d0c1fe2132cf00e2f2851cb770007a5965c13))


### Performance Improvements

* **rstream:** revert to storing child subs in array ([014bf20](https://github.com/thi-ng/umbrella/commit/014bf20ee3fdfa31377a08eaa5dc8fe211cadeac))


### BREAKING CHANGES

* **rstream:** remove `.subscribe(sub, xform, opts)` signature.
Transducer now supplied via `xform` key in `opts` (or use `.transform()`
instead of `.subscribe()`)

- further simplify `Subscription.subscribe()` / `.transform()`
- update Subscription ctor args
- make `.subscribe()` child subs partial again
- remove temporary & obsolete again `DUMMY` subscriber
- add docs
- update tests
* **rstream:** replace transducer only version of
`PubSub.subscribeTopic()` with new `.transformTopic()`.
Similarly to 22c6f7cb2, `.subscribeTopic()` subs also need to
provide at least a `next` key (for typechecking only)

- add .transformTopic() w/ opt error handling support
- TODO multi-transducer overrides for .transformTopic()
* **rstream:** update ISubscribable contract, remove transducer
only version of `.subscribe()`, MUST provide dummy sub w/ transducer
OR (better) use `.transform()` instead (which also more clearly
communicates intention...)

- another breaking change side effect for `.subscribe()`:
  `next()` handlers MUST be provided now in first arg (child sub), this
   is NOT because they're mandatory now, but TS won't be able to
   correctly infer arg types when using `Partial<ISubscriber<T>>`
- add `DUMMY` subscriber constant w/ empty `next() {}`
- simplify internal `.subscribe()` logic
- add `WithErrorHandlerOpts` interface
- update `.transform()` & `.map()`: add error handling support





## [5.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@5.1.1...@thi.ng/rstream@5.1.2) (2021-02-22)


### Bug Fixes

* **rstream:** add auto IDs for bisect/debounce() ([89b1def](https://github.com/thi-ng/umbrella/commit/89b1def89f34723ebd1bc1c188b0166293eac6cc))





# [5.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@5.0.15...@thi.ng/rstream@5.1.0) (2021-01-22)


### Features

* **rstream:** add CommonOpts for .map() ([6324123](https://github.com/thi-ng/umbrella/commit/63241231a93c34fa5fb834706f26e024adf3100b))





## [5.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@5.0.3...@thi.ng/rstream@5.0.4) (2020-09-13)


### Bug Fixes

* **rstream:** update PubSub.subscribeTopic(), fix [#248](https://github.com/thi-ng/umbrella/issues/248) ([3e2240a](https://github.com/thi-ng/umbrella/commit/3e2240ababeee342857eead64c491789cc97b960))





# [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.6.5...@thi.ng/rstream@5.0.0) (2020-07-28)


### Features

* **rstream:** fix/update StreamSync type inference ([c9d983d](https://github.com/thi-ng/umbrella/commit/c9d983dec69f508efb8cd66f377f57c78489abcc))


### BREAKING CHANGES

* **rstream:** better StreamSync generics handling/inference &
updated StreamSyncOpts

- `src` opt (input sources) MUST be given as object now
  (specifying inputs as array not supported anymore, use `autoObj()`
  from transducers package to convert array into auto-labeled object)
- update StreamSync inference rules to better determine result type
- simplify .addAll()
- generics now *usually* don't need to manually be specified anymore
  (with some exceptions)
- update tests





# [4.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.5.1...@thi.ng/rstream@4.6.0) (2020-07-08)


### Features

* **rstream:** add Subscription.map() syntax sugar ([a00485e](https://github.com/thi-ng/umbrella/commit/a00485e93600783691d6eaf6088d6625fb26630c))





# [4.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.4.1...@thi.ng/rstream@4.5.0) (2020-07-02)


### Features

* **rstream:** add reactive(), update readme ([e508faa](https://github.com/thi-ng/umbrella/commit/e508faa2fa110ddc812e8f3d750a6d7060ee57d6))





# [4.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.3.5...@thi.ng/rstream@4.4.0) (2020-06-14)


### Features

* **rstream:** add debounce() sub & tests ([9c53bb4](https://github.com/thi-ng/umbrella/commit/9c53bb4faffee0a06046de64325f0b4ddeedd3a0))
* **rstream:** add emitLast metastream option ([1073735](https://github.com/thi-ng/umbrella/commit/107373574cd6f15531e6210c016cde1a9939e040))
* **rstream:** add error handling for transducer phase ([609424e](https://github.com/thi-ng/umbrella/commit/609424e6b332e5f2df89d07b6b5af02fc5b4ba99))





## [4.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.3.0...@thi.ng/rstream@4.3.1) (2020-05-16)


### Bug Fixes

* **rstream:** initial default val handling in fromObject() ([25117e3](https://github.com/thi-ng/umbrella/commit/25117e3e6fe145c2a1c30fa5a97d997e1929900c))





# [4.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.2.0...@thi.ng/rstream@4.3.0) (2020-05-16)


### Features

* **rstream:** extend fromObject() features/opts ([975f74c](https://github.com/thi-ng/umbrella/commit/975f74c88ccd8ca9560505f0de74cc8d28c05ac0))





# [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.1.0...@thi.ng/rstream@4.2.0) (2020-05-15)


### Features

* **rstream:** add fromObject(), add docs & tests ([5e854eb](https://github.com/thi-ng/umbrella/commit/5e854eb64c28eac2221b656db528b819449bdcbd))
* **rstream:** update fromObject(), add StreamObjOpts, update docs ([f3ca3b6](https://github.com/thi-ng/umbrella/commit/f3ca3b6fef4568cb5c8992166e1db931c173ffca))





# [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.0.8...@thi.ng/rstream@4.1.0) (2020-05-14)


### Features

* **rstream:** [#221](https://github.com/thi-ng/umbrella/issues/221), update StreamSync input removal ([52ee040](https://github.com/thi-ng/umbrella/commit/52ee04010814aa6aa3362f8bd1b52ea857ff8ed0))





## [4.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.0.7...@thi.ng/rstream@4.0.8) (2020-05-03)


### Bug Fixes

* **rstream:** MetaStream close mode handling ([2d9e907](https://github.com/thi-ng/umbrella/commit/2d9e907e9c5a7ef9b0944473561c7c6d52f82841))





## [4.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.0.6...@thi.ng/rstream@4.0.7) (2020-04-28)


### Bug Fixes

* **rstream:** subscribe() w/ xform, add test ([20ce586](https://github.com/thi-ng/umbrella/commit/20ce586fdc0b4f9633f93581f7480572334317f1))





## [4.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@4.0.2...@thi.ng/rstream@4.0.3) (2020-04-06)


### Bug Fixes

* **rstream:** fix Subscription.subscribe() ([2a7f6ad](https://github.com/thi-ng/umbrella/commit/2a7f6ad01f6b239e46eb59d4b12f30356dbf078a))





# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@3.0.7...@thi.ng/rstream@4.0.0) (2020-03-28)


### Features

* **rstream:** update/rename fromView() ([f5df4ab](https://github.com/thi-ng/umbrella/commit/f5df4abbdaa82e666b9fcea9135a6e3d2f563666))


### BREAKING CHANGES

* **rstream:** update/rename fromView(), add fromViewUnsafe()

- fromView() now performs type checking on given path and/or view transform
- existing `fromView()` renamed to `fromViewUnsafe()` (this is in line w/ related
  updates in thi.ng/atom & thi.ng/paths pkgs)





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.5.6...@thi.ng/rstream@3.0.0) (2019-11-30)

### Bug Fixes

* **rstream:** add missing timeout() re-export ([7062332](https://github.com/thi-ng/umbrella/commit/7062332137125e86b8f956ceafcb0d2fe16a30e6))
* **rstream:** update StreamSync.remove(), refactor ctor ([d5fd4b4](https://github.com/thi-ng/umbrella/commit/d5fd4b4db759d26270491c38334f1e4258a74c4f))

### Documentation

* **rstream:** update readme ([4ecdbf9](https://github.com/thi-ng/umbrella/commit/4ecdbf92e53e24099cc3a136c18ab51563ddd06f))

### Features

* **rstream:** add back pressure opts to StreamSyncOpts & ForkJoinOpts ([e236987](https://github.com/thi-ng/umbrella/commit/e2369879b3972568eac985daf11766b292fce84a))
* **rstream:** add CommonOpts support for ISubscribable & ITransformable ([0a70b90](https://github.com/thi-ng/umbrella/commit/0a70b90a244b8d1285ee6c0c01e8e4d570c18a91))
* **rstream:** add forkBuffer/joinBuffer HOFs, add docs ([a35c8e8](https://github.com/thi-ng/umbrella/commit/a35c8e86d212b4186c2642f19230c0153356e203))
* **rstream:** add forkJoin() parallel worker processing ([da03722](https://github.com/thi-ng/umbrella/commit/da03722897995a61c46d255ccfac4d81c4af24d0))
* **rstream:** add ITransformable interface, minor updates ([da52b98](https://github.com/thi-ng/umbrella/commit/da52b9872b5063b617bb217a7c54743d427aa219))
* **rstream:** add Subscription.done() error handling ([c911006](https://github.com/thi-ng/umbrella/commit/c911006e7990f4283e5a3f93191b03638cc39905))
* **rstream:** add/update fork/joinBuffer generics, optimize ([8f0c55c](https://github.com/thi-ng/umbrella/commit/8f0c55c1680558292c022a2dd535bbb8d49200ab))
* **rstream:** initial work on [#74](https://github.com/thi-ng/umbrella/issues/74), [#81](https://github.com/thi-ng/umbrella/issues/81), [#91](https://github.com/thi-ng/umbrella/issues/91), [#92](https://github.com/thi-ng/umbrella/issues/92), add stream opts ([e770469](https://github.com/thi-ng/umbrella/commit/e77046995ff4cdb4b2582620b32bee001ceb664c))
* **rstream:** update args for various fromXXX() stream factories ([b466ebc](https://github.com/thi-ng/umbrella/commit/b466ebc553dd00e37a84fe20cc61d8e1f275ed37))
* **rstream:** update sidechainPartition/Toggle and timeout ([898eb53](https://github.com/thi-ng/umbrella/commit/898eb537c6812eecc1b6f0dd720ce5a24b431f13))
* **rstream:** update Stream cancel & reset behavior for CloseMode.NEVER ([250dfe1](https://github.com/thi-ng/umbrella/commit/250dfe12560d4629d867a0a2c0cc3e03756fdab6))

### BREAKING CHANGES

* **rstream:** document new stream/sub config opts in readme
* **rstream:** update stream factories to use options object args

- fromAtom
- fromInterval
- fromIterable
- fromView
- fromWorker

## [2.5.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.5.2...@thi.ng/rstream@2.5.3) (2019-08-16)

### Bug Fixes

* **rstream:** preserve const enums ([765a9ac](https://github.com/thi-ng/umbrella/commit/765a9ac))

# [2.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.4.4...@thi.ng/rstream@2.5.0) (2019-07-07)

### Bug Fixes

* **rstream:** generics & type hints (TS 3.5.2) ([eb2e18a](https://github.com/thi-ng/umbrella/commit/eb2e18a))
* **rstream:** TS strictNullChecks, add assertions ([1aad856](https://github.com/thi-ng/umbrella/commit/1aad856))

### Features

* **rstream:** add fromDOMEvent() ([6e3fec8](https://github.com/thi-ng/umbrella/commit/6e3fec8))
* **rstream:** enable TS strict compiler flags (refactor) ([d796e21](https://github.com/thi-ng/umbrella/commit/d796e21))

# [2.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.3.8...@thi.ng/rstream@2.4.0) (2019-04-11)

### Features

* **rstream:** add tweenNumber() ([cb6d46a](https://github.com/thi-ng/umbrella/commit/cb6d46a))

## [2.3.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.3.7...@thi.ng/rstream@2.3.8) (2019-04-11)

### Bug Fixes

* **rstream:** add missing Subscription.deref() return type hint ([0ae1243](https://github.com/thi-ng/umbrella/commit/0ae1243))

## [2.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.3.1...@thi.ng/rstream@2.3.2) (2019-04-02)

### Bug Fixes

* **rstream:** fix [#80](https://github.com/thi-ng/umbrella/issues/80) update StreamSource alias ([f7b9fbd](https://github.com/thi-ng/umbrella/commit/f7b9fbd))

# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.2.4...@thi.ng/rstream@2.3.0) (2019-03-21)

### Features

* **rstream:** update clock control for tween(), update docs ([65e9c44](https://github.com/thi-ng/umbrella/commit/65e9c44))

## [2.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.2.0...@thi.ng/rstream@2.2.1) (2019-03-05)

### Bug Fixes

* **rstream:** add __owner info for MetaStream, update ISubscriber ([b5801e9](https://github.com/thi-ng/umbrella/commit/b5801e9))

# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.1.0...@thi.ng/rstream@2.2.0) (2019-03-03)

### Bug Fixes

* **rstream:** update MetaStream unsub handling ([b2e6e6f](https://github.com/thi-ng/umbrella/commit/b2e6e6f))

### Features

* **rstream:** add CloseMode enum, update StreamMerge, StreamSync & opts ([f0d53b4](https://github.com/thi-ng/umbrella/commit/f0d53b4))
* **rstream:** add tween() stream operator ([c74a2d0](https://github.com/thi-ng/umbrella/commit/c74a2d0))

# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@2.0.6...@thi.ng/rstream@2.1.0) (2019-03-01)

### Features

* **rstream:** add metaStream() ([bc36005](https://github.com/thi-ng/umbrella/commit/bc36005))

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.14.9...@thi.ng/rstream@2.0.0) (2019-01-21)

### Bug Fixes

* **rstream:** avoid Subscription ctor to workaround parceljs build issue ([d1e275b](https://github.com/thi-ng/umbrella/commit/d1e275b))
* **rstream:** disable __State reverse enum lookups ([b238a3a](https://github.com/thi-ng/umbrella/commit/b238a3a))

### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols

# [1.14.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.13.8...@thi.ng/rstream@1.14.0) (2018-11-24)

### Bug Fixes

* **rstream:** make maxWorkers optional ([46c2882](https://github.com/thi-ng/umbrella/commit/46c2882))

### Features

* **rstream:** add StreamSync.getSources() / getSourceForID() ([ef0fe42](https://github.com/thi-ng/umbrella/commit/ef0fe42))
* **rstream:** add support multiple workers in Tunnel & TunnelOpts ([67a5b10](https://github.com/thi-ng/umbrella/commit/67a5b10))
* **rstream:** add worker tunnel() sub ([4750e79](https://github.com/thi-ng/umbrella/commit/4750e79))

<a name="1.13.2"></a>
## [1.13.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.13.1...@thi.ng/rstream@1.13.2) (2018-09-24)

### Performance Improvements

* **rstream:** `State` => const enum ([7ac83c6](https://github.com/thi-ng/umbrella/commit/7ac83c6))

<a name="1.13.0"></a>
# [1.13.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.12.2-alpha.2...@thi.ng/rstream@1.13.0) (2018-09-22)

### Features

* **rstream:** add trigger() generics ([288b68d](https://github.com/thi-ng/umbrella/commit/288b68d))
* **rstream:** add trigger() utility stream ([929c6f4](https://github.com/thi-ng/umbrella/commit/929c6f4))

<a name="1.12.0"></a>
# [1.12.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.11.10...@thi.ng/rstream@1.12.0) (2018-09-08)

### Features

* **rstream:** add merge-only mode for StreamSync, update docs ([162aa2d](https://github.com/thi-ng/umbrella/commit/162aa2d))

<a name="1.11.6"></a>
## [1.11.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.11.5...@thi.ng/rstream@1.11.6) (2018-08-27)

### Bug Fixes

* **rstream:** Fix unbound this in method call expression ([34a97b4](https://github.com/thi-ng/umbrella/commit/34a97b4))

<a name="1.11.1"></a>
## [1.11.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.11.0...@thi.ng/rstream@1.11.1) (2018-08-06)

### Bug Fixes

* **rstream:** add generics for stream() ([378772f](https://github.com/thi-ng/umbrella/commit/378772f))

<a name="1.11.0"></a>
# [1.11.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.10.4...@thi.ng/rstream@1.11.0) (2018-08-03)

### Features

* **rstream:** add stream() & subscription() factories, add/update docs ([e97aac0](https://github.com/thi-ng/umbrella/commit/e97aac0))
* **rstream:** update StreamSync to use `reset: false` by default, update docs ([55499cc](https://github.com/thi-ng/umbrella/commit/55499cc))

<a name="1.10.0"></a>
# [1.10.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.9.7...@thi.ng/rstream@1.10.0) (2018-07-20)

### Features

* **rstream:** Add a timeout() subscription ([aa55973](https://github.com/thi-ng/umbrella/commit/aa55973))
* **rstream:** add reset option for timeout() ([cd751fb](https://github.com/thi-ng/umbrella/commit/cd751fb))

### Performance Improvements

* **rstream:** optimize dispatch if only single child ([a59c5c9](https://github.com/thi-ng/umbrella/commit/a59c5c9))

<a name="1.9.6"></a>
## [1.9.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.9.5...@thi.ng/rstream@1.9.6) (2018-07-16)

### Bug Fixes

* **rstream:** emit first value immediately in fromInterval() ([9be2018](https://github.com/thi-ng/umbrella/commit/9be2018))

<a name="1.9.3"></a>
## [1.9.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.9.2...@thi.ng/rstream@1.9.3) (2018-07-09)

### Bug Fixes

* **rstream:** Fix potential reference error in transduce() ([7f2d5dd](https://github.com/thi-ng/umbrella/commit/7f2d5dd))

<a name="1.9.0"></a>
# [1.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.8.2...@thi.ng/rstream@1.9.0) (2018-07-04)

### Features

* **rstream:** add support for event listener opts in `fromEvent()` ([d5ac264](https://github.com/thi-ng/umbrella/commit/d5ac264))

<a name="1.8.1"></a>
## [1.8.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.8.0...@thi.ng/rstream@1.8.1) (2018-07-03)

### Bug Fixes

* **rstream:** unsubscribe on error in transduce() ([8c7d937](https://github.com/thi-ng/umbrella/commit/8c7d937))

<a name="1.8.0"></a>
# [1.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.7.3...@thi.ng/rstream@1.8.0) (2018-06-21)

### Features

* **rstream:** option to avoid auto-closing `fromInterval()`, add docs ([cc5b736](https://github.com/thi-ng/umbrella/commit/cc5b736))

<a name="1.7.3"></a>
## [1.7.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.7.2...@thi.ng/rstream@1.7.3) (2018-06-19)

<a name="1.7.0"></a>
# [1.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.6.14...@thi.ng/rstream@1.7.0) (2018-05-20)

### Bug Fixes

* **rstream:** minor update PubSub topic fn return type ([cbc600e](https://github.com/thi-ng/umbrella/commit/cbc600e))

### Features

* **rstream:** re-implement bisect() using PubSub, update tests ([846aaf9](https://github.com/thi-ng/umbrella/commit/846aaf9))
* **rstream:** update resolve(), update subscribe() overrides ([23fdd39](https://github.com/thi-ng/umbrella/commit/23fdd39))

<a name="1.6.14"></a>
## [1.6.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.6.13...@thi.ng/rstream@1.6.14) (2018-05-14)

<a name="1.6.1"></a>
## [1.6.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.6.0...@thi.ng/rstream@1.6.1) (2018-04-25)

### Bug Fixes

* **rstream:** minor fix StreamSync.addAll() ([cc286e1](https://github.com/thi-ng/umbrella/commit/cc286e1))

<a name="1.6.0"></a>
# [1.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.5.1...@thi.ng/rstream@1.6.0) (2018-04-24)

### Features

* **rstream:** add owner meta data & IDs for merge/sync inputs ([33f55b3](https://github.com/thi-ng/umbrella/commit/33f55b3))

### Performance Improvements

* **rstream:** support (re)named StreamSync inputs ([b392817](https://github.com/thi-ng/umbrella/commit/b392817))

<a name="1.5.0"></a>
# [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.4.3...@thi.ng/rstream@1.5.0) (2018-04-20)

### Features

* **rstream:** add PubSub, add ISubscribableSubscriber, remove cache() ([27a098d](https://github.com/thi-ng/umbrella/commit/27a098d))
* **rstream:** allow arbitrary PubSub topic vals, add [@thi](https://github.com/thi).ng/associative dep ([ba10907](https://github.com/thi-ng/umbrella/commit/ba10907))

<a name="1.4.0"></a>
# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.3.1...@thi.ng/rstream@1.4.0) (2018-04-16)

### Features

* **rstream:** add StreamMerge/Sync.removeID() & removeAllIDs() ([8bcc287](https://github.com/thi-ng/umbrella/commit/8bcc287))

<a name="1.3.0"></a>
# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.2.9...@thi.ng/rstream@1.3.0) (2018-04-15)

### Features

* **rstream:** add Subscription.transform() ([2164ddf](https://github.com/thi-ng/umbrella/commit/2164ddf))

<a name="1.2.4"></a>
## [1.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.2.3...@thi.ng/rstream@1.2.4) (2018-04-05)

### Bug Fixes

* **rstream:** correct wrong isString() import ([48310a6](https://github.com/thi-ng/umbrella/commit/48310a6))

<a name="1.2.0"></a>
# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.1.0...@thi.ng/rstream@1.2.0) (2018-03-21)

### Features

* **rstream:** update error handling, add [@thi](https://github.com/thi).ng/api dep ([1ce7054](https://github.com/thi-ng/umbrella/commit/1ce7054))

<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.0.22...@thi.ng/rstream@1.1.0) (2018-03-21)

### Bug Fixes

* **rstream:** bisect() add downstream impl checks, add tests ([2ad2f48](https://github.com/thi-ng/umbrella/commit/2ad2f48))

### Features

* **rstream:** add fromView(), update fromAtom() docs, update re-exports ([41bb385](https://github.com/thi-ng/umbrella/commit/41bb385))
* **rstream:** add IDeref impl for Subscription ([907d599](https://github.com/thi-ng/umbrella/commit/907d599))
* **rstream:** add merge()/sync() ctor wrappers ([1fee7d5](https://github.com/thi-ng/umbrella/commit/1fee7d5))
* **rstream:** add StreamSync ([791a993](https://github.com/thi-ng/umbrella/commit/791a993))
* **rstream:** add transduce(), update re-exports ([eec56de](https://github.com/thi-ng/umbrella/commit/eec56de))
* **rstream:** fix [#6](https://github.com/thi-ng/umbrella/issues/6) update StreamMerge to support transduced input streams ([8026409](https://github.com/thi-ng/umbrella/commit/8026409))
* **rstream:** Subscription stores last value and passes to new subs ([6b87bca](https://github.com/thi-ng/umbrella/commit/6b87bca))
* **rstream:** update Sidechain*.next(), add unsubscribe() ([d18a115](https://github.com/thi-ng/umbrella/commit/d18a115))
* **rstream:** update Subscription.unsubscribe() ([01a751e](https://github.com/thi-ng/umbrella/commit/01a751e))

<a name="1.0.22"></a>
## [1.0.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@1.0.21...@thi.ng/rstream@1.0.22) (2018-03-19)

<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@0.9.4...@thi.ng/rstream@1.0.0) (2018-02-18)

### Features

* **rstream:** fix [#8](https://github.com/thi-ng/umbrella/issues/8), support infinite StreamMerge's, update ctor ([4942e2e](https://github.com/thi-ng/umbrella/commit/4942e2e))

### BREAKING CHANGES

* **rstream:** StreamMerge ctor now accepts an options object
only (`StreamMergeOpts`).

<a name="0.9.0"></a>
# [0.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@0.8.1...@thi.ng/rstream@0.9.0) (2018-02-01)

### Features

* **rstream:** add Cache subscription class ([ea638be](https://github.com/thi-ng/umbrella/commit/ea638be))

<a name="0.8.1"></a>
## [0.8.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@0.8.0...@thi.ng/rstream@0.8.1) (2018-01-31)

### Bug Fixes

* **rstream:** subscription unhandled error handling ([54cd526](https://github.com/thi-ng/umbrella/commit/54cd526))

<a name="0.8.0"></a>
# [0.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@0.7.6...@thi.ng/rstream@0.8.0) (2018-01-31)

### Features

* **rstream:** add changed predicate for fromAtom(), add tests ([d58cf70](https://github.com/thi-ng/umbrella/commit/d58cf70))

<a name="0.7.4"></a>
## [0.7.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@0.7.3...@thi.ng/rstream@0.7.4) (2018-01-29)

### Bug Fixes

* **rstream:** fatal recursion w/ error handling ([382aa05](https://github.com/thi-ng/umbrella/commit/382aa05))

<a name="0.7.2"></a>
## [0.7.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@0.7.1...@thi.ng/rstream@0.7.2) (2018-01-29)

### Bug Fixes

* **rstream:** fix [#1](https://github.com/thi-ng/umbrella/issues/1) update fromPromise(), add test ([822b297](https://github.com/thi-ng/umbrella/commit/822b297))

<a name="0.7.0"></a>
# [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@0.6.0...@thi.ng/rstream@0.7.0) (2018-01-29)

### Features

* **rstream:** add atom dep, add fromAtom() & docs ([ca3994a](https://github.com/thi-ng/umbrella/commit/ca3994a))
* **rstream:** add fromPromises(), add docs ([55ba0e1](https://github.com/thi-ng/umbrella/commit/55ba0e1))
* **rstream:** add trace() error handler ([2247f72](https://github.com/thi-ng/umbrella/commit/2247f72))

<a name="0.6.0"></a>
# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@0.5.1...@thi.ng/rstream@0.6.0) (2018-01-28)

### Features

* **rstream-csp:** add new package, remove CSP dep from rstream ([e37f6a1](https://github.com/thi-ng/umbrella/commit/e37f6a1))
