# Change Log

- **Last updated**: 2023-03-09T13:01:59Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [7.2.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.2.31) (2022-12-16)

#### 🩹 Bug fixes

- (TS4.9 regression) update defWorker(), add explicit typehint ([bce5df7](https://github.com/thi-ng/umbrella/commit/bce5df7))

### [7.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.2.7) (2022-06-09)

#### ♻️ Refactoring

- various (minor) TS4.7 related updates/fixes ([9d9ecae](https://github.com/thi-ng/umbrella/commit/9d9ecae))

## [7.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.2.0) (2021-11-21)

#### 🚀 Features

- update defWorker() arg types ([e07521e](https://github.com/thi-ng/umbrella/commit/e07521e))
  - add `WorkerSource` type alias
  - add support for zero-arg fns returning a worker instance
    - helps v. much with Vite's `xxx?worker` imports
    - see /examples/mandelbrot for usage

### [7.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.1.1) (2021-11-19)

#### 🩹 Bug fixes

- add note about Awaited<T> type sig (1c82afa7e) ([efd8647](https://github.com/thi-ng/umbrella/commit/efd8647))

## [7.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.1.0) (2021-11-17)

#### 🚀 Features

- add fromNodeJS/linesFromNodeJS() ([d56026d](https://github.com/thi-ng/umbrella/commit/d56026d))
  - add NodeJS stream adapter bridges
  - update readme
- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [7.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [7.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports (transducers) ([7fc60cd](https://github.com/thi-ng/umbrella/commit/7fc60cd))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- major pkg restructure ([831c113](https://github.com/thi-ng/umbrella/commit/831c113))
  - flatten /src folder for easier imports in userland
  - move logging from api.ts => logger.ts
  - rename internal helpers (__nextID, __optsWithID, defWorker, ...)
  - update imports
- dedupe removeAllIDs() impls ([57e57cc](https://github.com/thi-ng/umbrella/commit/57e57cc))

### [6.0.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@6.0.14) (2021-08-08)

#### 🩹 Bug fixes

- fix [#305](https://github.com/thi-ng/umbrella/issues/305), metaStream() factory arg type ([2bc7bff](https://github.com/thi-ng/umbrella/commit/2bc7bff))
  - add test case

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@6.0.0) (2021-03-12)

#### 🛑 Breaking changes

- add .transform() error handler opt ([#276](https://github.com/thi-ng/umbrella/issues/276)) ([22c6f7c](https://github.com/thi-ng/umbrella/commit/22c6f7c))
- BREAKING CHANGE: update ISubscribable contract, remove transducer
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
- add PubSub.transformTopic() ([123e15d](https://github.com/thi-ng/umbrella/commit/123e15d))
- BREAKING CHANGE: replace transducer only version of
  `PubSub.subscribeTopic()` with new `.transformTopic()`.
  Similarly to [22c6f7cb2](https://github.com/thi-ng/umbrella/commit/22c6f7cb2), `.subscribeTopic()` subs also need to
  provide at least a `next` key (for typechecking only)
  - add .transformTopic() w/ opt error handling support
  - TODO multi-transducer overrides for .transformTopic()
- further simplify ISubscribable & impls ([9e290fe](https://github.com/thi-ng/umbrella/commit/9e290fe))
- BREAKING CHANGE: remove `.subscribe(sub, xform, opts)` signature.
  Transducer now supplied via `xform` key in `opts` (or use `.transform()`
  instead of `.subscribe()`)
  - further simplify `Subscription.subscribe()` / `.transform()`
  - update Subscription ctor args
  - make `.subscribe()` child subs partial again
  - remove temporary & obsolete again `DUMMY` subscriber
  - add docs
  - update tests

#### 🚀 Features

- log error to console ([594d806](https://github.com/thi-ng/umbrella/commit/594d806))
  - update Subscription.error() and ensure error is at least written to
    console, even if the default `NULL_LOGGER` is used
  - addresses [#125](https://github.com/thi-ng/umbrella/issues/125), [#276](https://github.com/thi-ng/umbrella/issues/276)
- update ITransformable.transform() ([fe0eaa9](https://github.com/thi-ng/umbrella/commit/fe0eaa9))
  - add new `transform()` override to supply transducer as part of options arg
  - update/fix opts arg type in other `transform()` versions
  - add `WithTransform`, `WithErrorHandler` interfaces
  - update `TransformableOpts`, `WithErrorHandlerOpts`
- add generic type for PubSub topics ([08adc5f](https://github.com/thi-ng/umbrella/commit/08adc5f))
  - update PubSub, PubSubOpts w/ new generic for topic types (default: any)
- add ISubscription interface ([98edee0](https://github.com/thi-ng/umbrella/commit/98edee0))
  - replaces obsolete `ISubscribableSubscriber`
- update PubSub ([fa87168](https://github.com/thi-ng/umbrella/commit/fa87168))
  - update PubSub generics
  - update .subscribeTopic() opts to use `TransformableOpts`
- add sidechainPartitionRAF() ([a101626](https://github.com/thi-ng/umbrella/commit/a101626))
- update error handler sig ([#281](https://github.com/thi-ng/umbrella/issues/281)) ([015380a](https://github.com/thi-ng/umbrella/commit/015380a))
  - add `ErrorHandler` type, update to return boolean
  - update `ISubscribable`, `ITransformable` to only refer to `ISubscription`
    interface (rather than `Subscription` class itself)
  - refactor `Subscription.next()`, add `.dispatchXform()`
  - update various error handlers (add return values)
  - update tests
- add Sub2 WIP impl ([de4149b](https://github.com/thi-ng/umbrella/commit/de4149b))
- update Sub2, State enum ([db0ab34](https://github.com/thi-ng/umbrella/commit/db0ab34))
  - add State.UNSUBSCRIBED
  - add missing Sub2.done() handling
  - add Sub2.map()
  - refactor Sub2 value/phase dispatch logic
  - add logging
- [#281](https://github.com/thi-ng/umbrella/issues/281) update Subscription error/teardown logic ([a9e4040](https://github.com/thi-ng/umbrella/commit/a9e4040))
  - replace old `Subscription` class w/ what was recently `Sub2` (removed)
  - update/fix done(), subscribe()/unsubscribe() logic
  - update related constructs (Stream, StreamSync, MetaStream, etc.)
  - update Stream ctor (and factory fns) to support error handler opts arg
  - update Timeout error dispatch
  - fix typehints
- update DONE state & teardown logic ([a8a8c44](https://github.com/thi-ng/umbrella/commit/a8a8c44))
  - DONE state now only valid during depth-first stage of .done()
  - state switches to UNSUBSCRIBED during recursive teardown (unless ERROR)
  - update tests
- add StreamSource error handling ([73023b6](https://github.com/thi-ng/umbrella/commit/73023b6))
  - update stream() opts arg type
  - update Stream.subscribe() to use opt error handler to deal w/ errors
    during execution of stream source function
  - add test
- update Subscription FSM, add/update tests ([ea1d0c1](https://github.com/thi-ng/umbrella/commit/ea1d0c1))
  - add state check in .subscribe()
  - set both parent & child sub to ACTIVE

#### 🩹 Bug fixes

- minor update/revert sub ctor args ([c651421](https://github.com/thi-ng/umbrella/commit/c651421))
- fix wrong imports ([ae4866a](https://github.com/thi-ng/umbrella/commit/ae4866a))
- PubSub dispatch & error handling ([cca0f34](https://github.com/thi-ng/umbrella/commit/cca0f34))
  - store last received value (if caching enabled)
  - update error handler logic
- update failing tests ([ae591a1](https://github.com/thi-ng/umbrella/commit/ae591a1))

#### ⏱ Performance improvements

- revert to storing child subs in array ([014bf20](https://github.com/thi-ng/umbrella/commit/014bf20))

#### ♻️ Refactoring

- update types/generics ([c982288](https://github.com/thi-ng/umbrella/commit/c982288))
  - remove default generics from ISubscription due to inference troubles
  - add ITransformable.map()
  - fix unsubscribe() arg types in various classes
  - update tests (generics only)

### [5.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@5.1.2) (2021-02-22)

#### 🩹 Bug fixes

- add auto IDs for bisect/debounce() ([89b1def](https://github.com/thi-ng/umbrella/commit/89b1def))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@5.1.0) (2021-01-22)

#### 🚀 Features

- add CommonOpts for .map() ([6324123](https://github.com/thi-ng/umbrella/commit/6324123))

### [5.0.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@5.0.10) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([cdf5d62](https://github.com/thi-ng/umbrella/commit/cdf5d62))

### [5.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@5.0.5) (2020-09-22)

#### ♻️ Refactoring

- add isFirstOrLastInput(), update StreamMerge/Sync ([ebab5a0](https://github.com/thi-ng/umbrella/commit/ebab5a0))

### [5.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@5.0.4) (2020-09-13)

#### 🩹 Bug fixes

- update PubSub.subscribeTopic(), fix [#248](https://github.com/thi-ng/umbrella/issues/248) ([3e2240a](https://github.com/thi-ng/umbrella/commit/3e2240a))
  - use CloseMode.NEVER for internal topic subs

#### ♻️ Refactoring

- update imports ([a35efa8](https://github.com/thi-ng/umbrella/commit/a35efa8))

### [5.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@5.0.3) (2020-08-28)

#### ♻️ Refactoring

- update delete op (TS4.0) ([cef8674](https://github.com/thi-ng/umbrella/commit/cef8674))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@5.0.0) (2020-07-28)

#### 🛑 Breaking changes

- fix/update StreamSync type inference ([c9d983d](https://github.com/thi-ng/umbrella/commit/c9d983d))
- BREAKING CHANGE: better StreamSync generics handling/inference &
  updated StreamSyncOpts
  - `src` opt (input sources) MUST be given as object now
    (specifying inputs as array not supported anymore, use `autoObj()`
    from transducers package to convert array into auto-labeled object)
  - update StreamSync inference rules to better determine result type
  - simplify .addAll()
  - generics now *usually* don't need to manually be specified anymore
    (with some exceptions)
  - update tests

#### ♻️ Refactoring

- add opts arg for trigger() ([32340f0](https://github.com/thi-ng/umbrella/commit/32340f0))
- update forkJoin() & tween() impls (StreamSync) ([08ca3e1](https://github.com/thi-ng/umbrella/commit/08ca3e1))
- update StreamSync generics & args ([0a182b0](https://github.com/thi-ng/umbrella/commit/0a182b0))
- update StreamMerge method args ([da648af](https://github.com/thi-ng/umbrella/commit/da648af))

## [4.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.6.0) (2020-07-08)

#### 🚀 Features

- add Subscription.map() syntax sugar ([a00485e](https://github.com/thi-ng/umbrella/commit/a00485e))

## [4.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.5.0) (2020-07-02)

#### 🚀 Features

- add reactive(), update readme ([e508faa](https://github.com/thi-ng/umbrella/commit/e508faa))

## [4.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.4.0) (2020-06-14)

#### 🚀 Features

- add error handling for transducer phase ([609424e](https://github.com/thi-ng/umbrella/commit/609424e))
  - update Subscription.next()
  - update transduce()
- add emitLast metastream option ([1073735](https://github.com/thi-ng/umbrella/commit/1073735))
- add debounce() sub & tests ([9c53bb4](https://github.com/thi-ng/umbrella/commit/9c53bb4))

### [4.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.3.1) (2020-05-16)

#### 🩹 Bug fixes

- initial default val handling in fromObject() ([25117e3](https://github.com/thi-ng/umbrella/commit/25117e3))
  - defaults now applied to initial seed values (if enabled)
  - update tests

## [4.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.3.0) (2020-05-16)

#### 🚀 Features

- extend fromObject() features/opts ([975f74c](https://github.com/thi-ng/umbrella/commit/975f74c))
  - add support for default values, dedupe, equiv predicate

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.2.0) (2020-05-15)

#### 🚀 Features

- add fromObject(), add docs & tests ([5e854eb](https://github.com/thi-ng/umbrella/commit/5e854eb))
- update fromObject(), add StreamObjOpts, update docs ([f3ca3b6](https://github.com/thi-ng/umbrella/commit/f3ca3b6))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.1.0) (2020-05-14)

#### 🚀 Features

- [#221](https://github.com/thi-ng/umbrella/issues/221), update StreamSync input removal ([52ee040](https://github.com/thi-ng/umbrella/commit/52ee040))
  - add StreamSyncOpts.clean option (disabled by default)
  - add support for cleaning result tuple when removing inputs
  - update input add/removal ops to use new partitionSync() hooks
  - add/update tests

#### ♻️ Refactoring

- update opts handling (TS3.9) ([ba76da6](https://github.com/thi-ng/umbrella/commit/ba76da6))

### [4.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.0.8) (2020-05-03)

#### 🩹 Bug fixes

- MetaStream close mode handling ([2d9e907](https://github.com/thi-ng/umbrella/commit/2d9e907))
  - never go into DONE state if `closeIn == CloseMode.NEVER`
  - fix/update unsubscribe() & pass arg
  - update detach() to consider `closeOut` mode
  - add tests

### [4.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.0.7) (2020-04-28)

#### 🩹 Bug fixes

- subscribe() w/ xform, add test ([20ce586](https://github.com/thi-ng/umbrella/commit/20ce586))
  - fixes `.subscribe(sub, xform)` where child `sub` was an actual instance
    of `Subscription` and the given `xform` transducer was silently
    ignored in that case...
  - add test

### [4.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.0.3) (2020-04-06)

#### 🩹 Bug fixes

- fix Subscription.subscribe() ([2a7f6ad](https://github.com/thi-ng/umbrella/commit/2a7f6ad))
  - check if opts arg given, but nullish
  - fixes PubSub.subscribeTopic(id, xform) version, which would wrongly
    infer `xform` as subscriber instead of transducer
  - add tests
  - update readme

### [4.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.0.2) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([1f6221d](https://github.com/thi-ng/umbrella/commit/1f6221d))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@4.0.0) (2020-03-28)

#### 🛑 Breaking changes

- update/rename fromView() ([f5df4ab](https://github.com/thi-ng/umbrella/commit/f5df4ab))
- BREAKING CHANGE: update/rename fromView(), add fromViewUnsafe()
  - fromView() now performs type checking on given path and/or view transform
  - existing `fromView()` renamed to `fromViewUnsafe()` (this is in line w/ related
    updates in [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/main/packages/atom) & [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/main/packages/paths) pkgs)

#### ♻️ Refactoring

- update fromView() & options ([7565448](https://github.com/thi-ng/umbrella/commit/7565448))
- update fromView value type inference ([ba20557](https://github.com/thi-ng/umbrella/commit/ba20557))

### [3.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@3.0.3) (2020-02-25)

#### ♻️ Refactoring

- fix [#201](https://github.com/thi-ng/umbrella/issues/201), extract ASidechain ([b88fa04](https://github.com/thi-ng/umbrella/commit/b88fa04))
  - extract abstract ASidechain base class
  - update SidechainPartition/Toggle classes
- update imports ([d529e86](https://github.com/thi-ng/umbrella/commit/d529e86))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@3.0.0) (2019-11-30)

#### 🛑 Breaking changes

- update args for various fromXXX() stream factories ([b466ebc](https://github.com/thi-ng/umbrella/commit/b466ebc))
  - add types for options objects
  - update tests
- BREAKING CHANGE: update stream factories to use options object args
  - fromAtom
  - fromInterval
  - fromIterable
  - fromView
  - fromWorker
- update readme ([4ecdbf9](https://github.com/thi-ng/umbrella/commit/4ecdbf9))
- BREAKING CHANGE: document new stream/sub config opts in readme

#### 🚀 Features

- update sidechainPartition/Toggle and timeout ([898eb53](https://github.com/thi-ng/umbrella/commit/898eb53))
  - use options objects for args
  - update tests
- add CommonOpts support for ISubscribable & ITransformable ([0a70b90](https://github.com/thi-ng/umbrella/commit/0a70b90))

#### ♻️ Refactoring

- re-use `Path` from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([7e7ef8f](https://github.com/thi-ng/umbrella/commit/7e7ef8f))

### [2.5.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.5.5) (2019-09-21)

#### 🚀 Features

- add ITransformable interface, minor updates ([da52b98](https://github.com/thi-ng/umbrella/commit/da52b98))
- add forkJoin() parallel worker processing ([da03722](https://github.com/thi-ng/umbrella/commit/da03722))
- add back pressure opts to StreamSyncOpts & ForkJoinOpts ([e236987](https://github.com/thi-ng/umbrella/commit/e236987))
- add forkBuffer/joinBuffer HOFs, add docs ([a35c8e8](https://github.com/thi-ng/umbrella/commit/a35c8e8))
- add/update fork/joinBuffer generics, optimize ([8f0c55c](https://github.com/thi-ng/umbrella/commit/8f0c55c))
- add Subscription.done() error handling ([c911006](https://github.com/thi-ng/umbrella/commit/c911006))
- update Stream cancel & reset behavior for CloseMode.NEVER ([250dfe1](https://github.com/thi-ng/umbrella/commit/250dfe1))
  - don't call cancel() if `closeOut`  is CloseMODE.NEVER
  - only initialize stream once and don't re-init on 1st  re-sub after
    all other subs have left

#### 🩹 Bug fixes

- update StreamSync.remove(), refactor ctor ([d5fd4b4](https://github.com/thi-ng/umbrella/commit/d5fd4b4))
  - remove ID from invRealSourceIDs
  - update ctor xform init, avoid one level of comp() if opts.xform given

### [2.5.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.5.4) (2019-08-21)

#### 🚀 Features

- initial work on [#74](https://github.com/thi-ng/umbrella/issues/74), [#81](https://github.com/thi-ng/umbrella/issues/81), [#91](https://github.com/thi-ng/umbrella/issues/91), [#92](https://github.com/thi-ng/umbrella/issues/92), add stream opts ([e770469](https://github.com/thi-ng/umbrella/commit/e770469))
  - add CommonOpts, TransformableOpts, SubscriptionOpts
  - update all ctors & factory fns to accepts options arg
  - fix [#81](https://github.com/thi-ng/umbrella/issues/81) (only keep last received value if `cache` option enabled)
  - check from `closeOut` mode and possibly keep stream alive
    after all current subscribers have left ([#74](https://github.com/thi-ng/umbrella/issues/74))
  - update tests (but need to add various new ones)
  - add optsWithID() helper to inject ID option if needed

#### 🩹 Bug fixes

- add missing timeout() re-export ([7062332](https://github.com/thi-ng/umbrella/commit/7062332))

#### ♻️ Refactoring

- add/update optsWithID() handling ([f0d7f87](https://github.com/thi-ng/umbrella/commit/f0d7f87))

### [2.5.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.5.3) (2019-08-16)

#### 🩹 Bug fixes

- preserve const enums ([765a9ac](https://github.com/thi-ng/umbrella/commit/765a9ac))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.5.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([d796e21](https://github.com/thi-ng/umbrella/commit/d796e21))
- add fromDOMEvent() ([6e3fec8](https://github.com/thi-ng/umbrella/commit/6e3fec8))

#### 🩹 Bug fixes

- TS strictNullChecks, add assertions ([1aad856](https://github.com/thi-ng/umbrella/commit/1aad856))
- generics & type hints (TS 3.5.2) ([eb2e18a](https://github.com/thi-ng/umbrella/commit/eb2e18a))

### [2.4.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.4.2) (2019-04-24)

#### ♻️ Refactoring

- replace DEBUG w/ LOGGER impl, add setLogger() ([8587989](https://github.com/thi-ng/umbrella/commit/8587989))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.4.0) (2019-04-11)

#### 🚀 Features

- add tweenNumber() ([cb6d46a](https://github.com/thi-ng/umbrella/commit/cb6d46a))
  (cherry picked from commit [17d0fdb2ed1130d88be8d9daa36ae7cb5e166864](https://github.com/thi-ng/umbrella/commit/17d0fdb2ed1130d88be8d9daa36ae7cb5e166864))
- add tweenNumber() ([17d0fdb](https://github.com/thi-ng/umbrella/commit/17d0fdb))

### [2.3.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.3.8) (2019-04-11)

#### 🩹 Bug fixes

- add missing Subscription.deref() return type hint ([0ae1243](https://github.com/thi-ng/umbrella/commit/0ae1243))

### [2.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.3.2) (2019-04-02)

#### 🩹 Bug fixes

- fix [#80](https://github.com/thi-ng/umbrella/issues/80) update StreamSource alias ([f7b9fbd](https://github.com/thi-ng/umbrella/commit/f7b9fbd))
  - stream source fns don't need to return StreamCancel

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.3.0) (2019-03-21)

#### 🚀 Features

- update clock control for tween(), update docs ([65e9c44](https://github.com/thi-ng/umbrella/commit/65e9c44))

### [2.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.2.2) (2019-03-10)

#### ♻️ Refactoring

- re-use type aliases from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([0d2fdff](https://github.com/thi-ng/umbrella/commit/0d2fdff))

### [2.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.2.1) (2019-03-05)

#### 🩹 Bug fixes

- add __owner info for MetaStream, update ISubscriber ([b5801e9](https://github.com/thi-ng/umbrella/commit/b5801e9))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.2.0) (2019-03-03)

#### 🚀 Features

- add CloseMode enum, update StreamMerge, StreamSync & opts ([f0d53b4](https://github.com/thi-ng/umbrella/commit/f0d53b4))
- add tween() stream operator ([c74a2d0](https://github.com/thi-ng/umbrella/commit/c74a2d0))

#### 🩹 Bug fixes

- update MetaStream unsub handling ([b2e6e6f](https://github.com/thi-ng/umbrella/commit/b2e6e6f))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.1.0) (2019-03-01)

#### 🚀 Features

- add metaStream() ([bc36005](https://github.com/thi-ng/umbrella/commit/bc36005))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

#### 🩹 Bug fixes

- avoid Subscription ctor to workaround parceljs build issue ([d1e275b](https://github.com/thi-ng/umbrella/commit/d1e275b))
  - use `subscription()` factory instead of `new Subscription`
  - solves issue w/ parcel's scope hoisting build flag
- disable __State reverse enum lookups ([b238a3a](https://github.com/thi-ng/umbrella/commit/b238a3a))

#### ♻️ Refactoring

- use arrow fns, update formatting ([6c3ea08](https://github.com/thi-ng/umbrella/commit/6c3ea08))
- replace Subscription.NEXT_ID w/ nextID() util ([e201ca8](https://github.com/thi-ng/umbrella/commit/e201ca8))

## [1.14.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.14.0) (2018-11-24)

#### 🚀 Features

- add worker tunnel() sub ([4750e79](https://github.com/thi-ng/umbrella/commit/4750e79))
- add StreamSync.getSources() / getSourceForID() ([ef0fe42](https://github.com/thi-ng/umbrella/commit/ef0fe42))
- add support multiple workers in Tunnel & TunnelOpts ([67a5b10](https://github.com/thi-ng/umbrella/commit/67a5b10))

#### 🩹 Bug fixes

- make maxWorkers optional ([46c2882](https://github.com/thi-ng/umbrella/commit/46c2882))

#### ♻️ Refactoring

- move tunnel to /subs, add docs ([f24e69e](https://github.com/thi-ng/umbrella/commit/f24e69e))

### [1.13.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.13.6) (2018-10-17)

#### ♻️ Refactoring

- update Infinity consts in various packages ([296e1e0](https://github.com/thi-ng/umbrella/commit/296e1e0))

### [1.13.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.13.2) (2018-09-24)

#### ⏱ Performance improvements

- `State` => const enum ([7ac83c6](https://github.com/thi-ng/umbrella/commit/7ac83c6))
  - export `__State` for reverse lookups

## [1.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.13.0) (2018-09-22)

#### 🚀 Features

- add trigger() utility stream ([929c6f4](https://github.com/thi-ng/umbrella/commit/929c6f4))
- add trigger() generics ([288b68d](https://github.com/thi-ng/umbrella/commit/288b68d))

#### ♻️ Refactoring

- remove Stream.NEXT_ID, replace w/ Subscription field ([0dcc1b8](https://github.com/thi-ng/umbrella/commit/0dcc1b8))

## [1.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.12.0) (2018-09-08)

#### 🚀 Features

- add merge-only mode for StreamSync, update docs ([162aa2d](https://github.com/thi-ng/umbrella/commit/162aa2d))
  - add `mergeOnly` option to StreamSyncOpts

### [1.11.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.11.6) (2018-08-27)

#### 🩹 Bug fixes

- Fix unbound this in method call expression ([34a97b4](https://github.com/thi-ng/umbrella/commit/34a97b4))

### [1.11.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.11.3) (2018-08-24)

#### ♻️ Refactoring

- update StreamSync transducer init ([cd5c6ff](https://github.com/thi-ng/umbrella/commit/cd5c6ff))
  - fix regression caused by breaking changes in [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/main/packages/transducers)
- use SEMAPHORE from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api), not transducers ([f3d4646](https://github.com/thi-ng/umbrella/commit/f3d4646))

### [1.11.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.11.1) (2018-08-06)

#### 🩹 Bug fixes

- add generics for stream() ([378772f](https://github.com/thi-ng/umbrella/commit/378772f))

## [1.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.11.0) (2018-08-03)

#### 🚀 Features

- update StreamSync to use `reset: false` by default, update docs ([55499cc](https://github.com/thi-ng/umbrella/commit/55499cc))
- add stream() & subscription() factories, add/update docs ([e97aac0](https://github.com/thi-ng/umbrella/commit/e97aac0))

### [1.10.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.10.3) (2018-08-01)

#### ♻️ Refactoring

- cleanup imports ([0f7e82a](https://github.com/thi-ng/umbrella/commit/0f7e82a))

## [1.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.10.0) (2018-07-20)

#### 🚀 Features

- add reset option for timeout() ([cd751fb](https://github.com/thi-ng/umbrella/commit/cd751fb))
  - add tests
  - update docs

#### ⏱ Performance improvements

- optimize dispatch if only single child ([a59c5c9](https://github.com/thi-ng/umbrella/commit/a59c5c9))
  - replace Subscription.subs with array (was Set)
  - update Subscription.dispatch()
  - update call sites
  - add tests

### [1.9.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.9.7) (2018-07-19)

#### 🚀 Features

- Add a timeout() subscription ([aa55973](https://github.com/thi-ng/umbrella/commit/aa55973))

### [1.9.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.9.6) (2018-07-16)

#### 🩹 Bug fixes

- emit first value immediately in fromInterval() ([9be2018](https://github.com/thi-ng/umbrella/commit/9be2018))
  - previously first value was only emitted after `delay` ms

### [1.9.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.9.3) (2018-07-09)

#### 🩹 Bug fixes

- Fix potential reference error in transduce() ([7f2d5dd](https://github.com/thi-ng/umbrella/commit/7f2d5dd))

## [1.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.9.0) (2018-07-04)

#### 🚀 Features

- add support for event listener opts in `fromEvent()` ([d5ac264](https://github.com/thi-ng/umbrella/commit/d5ac264))

### [1.8.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.8.1) (2018-07-03)

#### 🩹 Bug fixes

- unsubscribe on error in transduce() ([8c7d937](https://github.com/thi-ng/umbrella/commit/8c7d937))

## [1.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.8.0) (2018-06-21)

#### 🚀 Features

- option to avoid auto-closing `fromInterval()`, add docs ([cc5b736](https://github.com/thi-ng/umbrella/commit/cc5b736))

## [1.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.7.0) (2018-05-20)

#### 🚀 Features

- update resolve(), update subscribe() overrides ([23fdd39](https://github.com/thi-ng/umbrella/commit/23fdd39))
  - replace resolve() opt `id` arg w/ `ResolveOpts` object
  - if `fail` option is given use as Promise failure handler instead of
    calling `this.error()` and thereby stopping stream
  - add new override for actual child `Subscription`s, fixes generics
  - update `subscribe()` for Subscription, Stream, PubSub
- re-implement bisect() using PubSub, update tests ([846aaf9](https://github.com/thi-ng/umbrella/commit/846aaf9))

#### 🩹 Bug fixes

- minor update PubSub topic fn return type ([cbc600e](https://github.com/thi-ng/umbrella/commit/cbc600e))

### [1.6.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.6.6) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [1.6.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.6.2) (2018-04-26)

#### ♻️ Refactoring

- update ISubscribable (add IDeref parent) ([76f00c3](https://github.com/thi-ng/umbrella/commit/76f00c3))

### [1.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.6.1) (2018-04-25)

#### 🩹 Bug fixes

- minor fix StreamSync.addAll() ([cc286e1](https://github.com/thi-ng/umbrella/commit/cc286e1))

## [1.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.6.0) (2018-04-24)

#### 🚀 Features

- add owner meta data & IDs for merge/sync inputs ([33f55b3](https://github.com/thi-ng/umbrella/commit/33f55b3))

#### ⏱ Performance improvements

- support (re)named StreamSync inputs ([b392817](https://github.com/thi-ng/umbrella/commit/b392817))
  - update StreamSyncOpts
  - allow objects as `src` option, use object keys as input IDs
  - update `add()`, add optional ID arg
  - add various maps to handle real vs. alias IDs

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.5.0) (2018-04-20)

#### 🚀 Features

- add PubSub, add ISubscribableSubscriber, remove cache() ([27a098d](https://github.com/thi-ng/umbrella/commit/27a098d))
- allow arbitrary PubSub topic vals, add [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/main/packages/associative) dep ([ba10907](https://github.com/thi-ng/umbrella/commit/ba10907))
  - use EquivMap for storing topics
  - add/update tests
  - add docs

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.4.0) (2018-04-16)

#### 🚀 Features

- add StreamMerge/Sync.removeID() & removeAllIDs() ([8bcc287](https://github.com/thi-ng/umbrella/commit/8bcc287))
  - update remove() & removeAll() to return boolean

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.3.0) (2018-04-15)

#### 🚀 Features

- add Subscription.transform() ([2164ddf](https://github.com/thi-ng/umbrella/commit/2164ddf))

### [1.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.2.4) (2018-04-05)

#### 🩹 Bug fixes

- correct wrong isString() import ([48310a6](https://github.com/thi-ng/umbrella/commit/48310a6))
  - use [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/main/packages/checks)/is-string, not from node "util" package

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.2.0) (2018-03-21)

#### 🚀 Features

- update error handling, add [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) dep ([1ce7054](https://github.com/thi-ng/umbrella/commit/1ce7054))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.1.0) (2018-03-21)

#### 🚀 Features

- update Subscription.unsubscribe() ([01a751e](https://github.com/thi-ng/umbrella/commit/01a751e))
  - switch to DONE state if unsubscribing itself from parent
  - unsubscribe itself from parent after last child sub unsubscribed
    (effect propagates upstream until no more parent)
- add fromView(), update fromAtom() docs, update re-exports ([41bb385](https://github.com/thi-ng/umbrella/commit/41bb385))
- update Sidechain*.next(), add unsubscribe() ([d18a115](https://github.com/thi-ng/umbrella/commit/d18a115))
  - don't throw errors in next() if state >= DONE
  - unsub sidechain when unsubscribing SidechainPartition/Toggle itself
- fix [#6](https://github.com/thi-ng/umbrella/issues/6) update StreamMerge to support transduced input streams ([8026409](https://github.com/thi-ng/umbrella/commit/8026409))
  - any Subscription values (incl. Streams) sent by inputs are added
     to the set of inputs themselves and not passed downstream
  - add test case
- Subscription stores last value and passes to new subs ([6b87bca](https://github.com/thi-ng/umbrella/commit/6b87bca))
- add transduce(), update re-exports ([eec56de](https://github.com/thi-ng/umbrella/commit/eec56de))
- add merge()/sync() ctor wrappers ([1fee7d5](https://github.com/thi-ng/umbrella/commit/1fee7d5))
- add IDeref impl for Subscription ([907d599](https://github.com/thi-ng/umbrella/commit/907d599))

#### 🩹 Bug fixes

- bisect() add downstream impl checks, add tests ([2ad2f48](https://github.com/thi-ng/umbrella/commit/2ad2f48))

#### ♻️ Refactoring

- simplify Subscription, update all impls ([47b6a92](https://github.com/thi-ng/umbrella/commit/47b6a92))
  - use Set for storing child subs
  - update Stream, StreamMerge, StreamSync
  - only clean sources in StreamMerge/Sync.unsubscribe()
- update & StreamMerge/SyncOpts, minor fixes StreamSync ([ebe222c](https://github.com/thi-ng/umbrella/commit/ebe222c))
  - only allow arrays for sources
  - pre-add/remove source IDs in StreamSync.addAll/removeAll()
  - update mapVals() xform to use copies
- simplify unsubscribe() logic ([26f15b2](https://github.com/thi-ng/umbrella/commit/26f15b2))
  - add Subscription.cleanup()
  - update unsub for Stream, Subscription, StreamMerge/Sync
  - no more calling of done() as part of unsub process
    (strictly unidirectional teardown from child -> parent)
  - fix input unsubs for StreamMerge/Sync

### [1.0.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.0.22) (2018-03-19)

#### 🚀 Features

- add StreamSync ([791a993](https://github.com/thi-ng/umbrella/commit/791a993))

#### ♻️ Refactoring

- add/update Stream ctor arities ([c736433](https://github.com/thi-ng/umbrella/commit/c736433))
- minor cleanup/perf StreamSync ([f7029ef](https://github.com/thi-ng/umbrella/commit/f7029ef))
- simplify StreamMerge source handling ([ff802a4](https://github.com/thi-ng/umbrella/commit/ff802a4))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@1.0.0) (2018-02-18)

#### 🛑 Breaking changes

- fix [#8](https://github.com/thi-ng/umbrella/issues/8), support infinite StreamMerge's, update ctor ([4942e2e](https://github.com/thi-ng/umbrella/commit/4942e2e))
- BREAKING CHANGE: StreamMerge ctor now accepts an options object
  only (`StreamMergeOpts`).

#### ♻️ Refactoring

- don't throw in unsubscribe() if no parent ([ca1caae](https://github.com/thi-ng/umbrella/commit/ca1caae))

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.9.0) (2018-02-01)

#### 🚀 Features

- add Cache subscription class ([ea638be](https://github.com/thi-ng/umbrella/commit/ea638be))

### [0.8.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.8.1) (2018-01-31)

#### 🩹 Bug fixes

- subscription unhandled error handling ([54cd526](https://github.com/thi-ng/umbrella/commit/54cd526))
  - track if any child subs have received error, if not treat as unhandled
    and unsub current sub from parent (if any)

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.8.0) (2018-01-31)

#### 🚀 Features

- add changed predicate for fromAtom(), add tests ([d58cf70](https://github.com/thi-ng/umbrella/commit/d58cf70))

### [0.7.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.7.4) (2018-01-29)

#### 🩹 Bug fixes

- fatal recursion w/ error handling ([382aa05](https://github.com/thi-ng/umbrella/commit/382aa05))
  - use Subscription.dispatch() only for next() calls, wrapped in try..catch
  - update Subscription.error() & done() to call children WITHOUT try...catch
  - revert obsolete test timeout adjustment

### [0.7.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.7.2) (2018-01-29)

#### 🩹 Bug fixes

- fix [#1](https://github.com/thi-ng/umbrella/issues/1) update fromPromise(), add test ([822b297](https://github.com/thi-ng/umbrella/commit/822b297))
  - add catch() outside stream source to catch errors before 1st sub is active

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.7.0) (2018-01-29)

#### 🚀 Features

- add trace() error handler ([2247f72](https://github.com/thi-ng/umbrella/commit/2247f72))
- add fromPromises(), add docs ([55ba0e1](https://github.com/thi-ng/umbrella/commit/55ba0e1))
- add atom dep, add fromAtom() & docs ([ca3994a](https://github.com/thi-ng/umbrella/commit/ca3994a))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.6.0) (2018-01-28)

#### 🚀 Features

- add new package, remove CSP dep from rstream ([e37f6a1](https://github.com/thi-ng/umbrella/commit/e37f6a1))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.4.0) (2018-01-25)

#### 🚀 Features

- add sidechainToggle(), minor update sidechainPartition() ([f6ca3f3](https://github.com/thi-ng/umbrella/commit/f6ca3f3))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.3.0) (2018-01-25)

#### 🚀 Features

- add fromRAF() fallback for node, add docs ([4e5a2ee](https://github.com/thi-ng/umbrella/commit/4e5a2ee))

#### 🩹 Bug fixes

- subscription generics if transducer is used ([592a242](https://github.com/thi-ng/umbrella/commit/592a242))
- don't throw resolve() error, only warning msg ([eef65b9](https://github.com/thi-ng/umbrella/commit/eef65b9))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@0.2.1) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
