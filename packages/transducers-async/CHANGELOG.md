# Change Log

- **Last updated**: 2025-10-25T22:30:00Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-async@0.4.0) (2025-01-29)

#### 🚀 Features

- add PubSub.subscribeOnce(), add tests ([34beec5](https://github.com/thi-ng/umbrella/commit/34beec5))

### [0.3.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-async@0.3.8) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [0.3.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-async@0.3.6) (2024-12-27)

#### ♻️ Refactoring

- update `throttleTime()` ([87e5ed3](https://github.com/thi-ng/umbrella/commit/87e5ed3))
  - add [@thi.ng/timestamp](https://github.com/thi-ng/umbrella/tree/main/packages/timestamp) micro dependency
  - update timestamp handling (more precise in some contexts)

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-async@0.3.0) (2024-10-14)

#### 🚀 Features

- add intercept() transducer ([8d87215](https://github.com/thi-ng/umbrella/commit/8d87215))
  - add tests & docs
  - update pkg exports

### [0.2.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-async@0.2.6) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- update merge()/sync() ([ef82528](https://github.com/thi-ng/umbrella/commit/ef82528))
  - dedupe internal shared functionality
- dedupe iter removal in merge()/sync() ([abc6a46](https://github.com/thi-ng/umbrella/commit/abc6a46))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-async@0.2.0) (2024-04-20)

#### 🚀 Features

- add delayed() & wait() helpers ([d2f0738](https://github.com/thi-ng/umbrella/commit/d2f0738))
- add mult() for 1:N splitting (multiple subscribers) ([ad1b63b](https://github.com/thi-ng/umbrella/commit/ad1b63b))
- add asAsyncIterable() helper ([8e40424](https://github.com/thi-ng/umbrella/commit/8e40424))
- add source(), refactor events() ([b94d150](https://github.com/thi-ng/umbrella/commit/b94d150))
- add syncRAF(), update sidechain() args ([54ded8b](https://github.com/thi-ng/umbrella/commit/54ded8b))
- add pubsub() ([1f406d0](https://github.com/thi-ng/umbrella/commit/1f406d0))
- update/extend Source interface/impl ([a95819b](https://github.com/thi-ng/umbrella/commit/a95819b))
- add [@thi.ng/buffers](https://github.com/thi-ng/umbrella/tree/main/packages/buffers) support for source() ([c46d862](https://github.com/thi-ng/umbrella/commit/c46d862))
- update Source API, add docs ([7a7b5ab](https://github.com/thi-ng/umbrella/commit/7a7b5ab))

#### ♻️ Refactoring

- add ClosableAsyncGenerator type, update events() & source() ([929d860](https://github.com/thi-ng/umbrella/commit/929d860))
- simplify raf() impl ([38c36b9](https://github.com/thi-ng/umbrella/commit/38c36b9))
  - rewrite to use source()
- update type usage ([bec044c](https://github.com/thi-ng/umbrella/commit/bec044c))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-async@0.1.1) (2024-04-11)

#### ♻️ Refactoring

- use Promise.race() for merge/sidechain/sync ([c712bca](https://github.com/thi-ng/umbrella/commit/c712bca))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-async@0.1.0) (2024-04-08)

#### 🚀 Features

- re-import as new pkg ([c51d817](https://github.com/thi-ng/umbrella/commit/c51d817))
  - redevelopment after stopping 2018-08-01 (d52e3aa6eb42d65c0a8e43387a43b2b9f2a52ba2)
- add/update arg types & fn overrides ([047d0d3](https://github.com/thi-ng/umbrella/commit/047d0d3))
- add concat(), update core types, add tests ([2367e59](https://github.com/thi-ng/umbrella/commit/2367e59))
- add zip() ([8e1d1a3](https://github.com/thi-ng/umbrella/commit/8e1d1a3))
- add events(), sync() iterators, refactor push() ([5fdc04f](https://github.com/thi-ng/umbrella/commit/5fdc04f))
  - add tests
- add range() & tests ([e4de8ff](https://github.com/thi-ng/umbrella/commit/e4de8ff))
- add merge() & tests ([dfe970d](https://github.com/thi-ng/umbrella/commit/dfe970d))
- add SyncOpts, update `sync()` ([c257fa5](https://github.com/thi-ng/umbrella/commit/c257fa5))
  - add tests
- add `raf()`, `sidechain()` ([da56401](https://github.com/thi-ng/umbrella/commit/da56401))
  - add tests
- remove obsolete cycle() ([1198b9d](https://github.com/thi-ng/umbrella/commit/1198b9d))
