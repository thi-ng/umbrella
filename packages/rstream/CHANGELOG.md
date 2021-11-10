# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@7.0.8...@thi.ng/rstream@7.0.9) (2021-11-10)

**Note:** Version bump only for package @thi.ng/rstream





## [7.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@7.0.7...@thi.ng/rstream@7.0.8) (2021-11-03)

**Note:** Version bump only for package @thi.ng/rstream





# [7.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@6.0.21...@thi.ng/rstream@7.0.0) (2021-10-12)


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






##  [6.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@6.0.13...@thi.ng/rstream@6.0.14) (2021-08-08)

###  Bug Fixes

- **rstream:** fix [#305](https://github.com/thi-ng/umbrella/issues/305), metaStream() factory arg type ([2bc7bff](https://github.com/thi-ng/umbrella/commit/2bc7bff2eff9331d3a52830d0275d47fc7c59e78))

#  [6.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream@5.1.7...@thi.ng/rstream@6.0.0) (2021-03-12)

###  Bug Fixes

- **rstream:** fix wrong imports ([ae4866a](https://github.com/thi-ng/umbrella/commit/ae4866adb52800af4dee30392d8482befd8a9435))
- **rstream:** minor update/revert sub ctor args ([c651421](https://github.com/thi-ng/umbrella/commit/c651421e7809df1a37103628e54d3e21161e8c0a))
- **rstream:** PubSub dispatch & error handling ([cca0f34](https://github.com/thi-ng/umbrella/commit/cca0f34568c9e1a6c30a6a423e7469a477e5a76d))
- **rstream:** update failing tests ([ae591a1](https://github.com/thi-ng/umbrella/commit/ae591a1a8a8647768d38b783c094ae1bbe94a278))

###  Features

- **rstream:** [#281](https://github.com/thi-ng/umbrella/issues/281) update Subscription error/teardown logic ([a9e4040](https://github.com/thi-ng/umbrella/commit/a9e40407d0c0ec4e3ffdd3983d70a9e40aec2356))
- **rstream:** add .transform() error handler opt ([#276](https://github.com/thi-ng/umbrella/issues/276)) ([22c6f7c](https://github.com/thi-ng/umbrella/commit/22c6f7cb25516359690811c39a184b0e9838ea02))
- **rstream:** add generic type for PubSub topics ([08adc5f](https://github.com/thi-ng/umbrella/commit/08adc5f2f6c719cdda0a8eb4e5548bf6c5c1cf75))
- **rstream:** add ISubscription interface ([98edee0](https://github.com/thi-ng/umbrella/commit/98edee0bc84763547a1c06394d78456565fbc9de))
- **rstream:** add PubSub.transformTopic() ([123e15d](https://github.com/thi-ng/umbrella/commit/123e15d84557990c682ed80f9f97eafe94c09b43))
- **rstream:** add sidechainPartitionRAF() ([a101626](https://github.com/thi-ng/umbrella/commit/a10162625836d5392199d34149c281f9cc47a572))
- **rstream:** add StreamSource error handling ([73023b6](https://github.com/thi-ng/umbrella/commit/73023b6979dd0cf4b95c6d072bfbda8c12ba9438))
- **rstream:** add Sub2 WIP impl ([de4149b](https://github.com/thi-ng/umbrella/commit/de4149bc0504c4be9faef8b467eee74ecf9caa05))
- **rstream:** further simplify ISubscribable & impls ([9e290fe](https://github.com/thi-ng/umbrella/commit/9e290fe2e3813d0096eacd28d700f9000155bc5e))
- **rstream:** log error to console ([594d806](https://github.com/thi-ng/umbrella/commit/594d806fbc2176d3458d80e390baa0cb4b0d7b60)), closes [#125](https://github.com/thi-ng/umbrella/issues/125) [#276](https://github.com/thi-ng/umbrella/issues/276)
- **rstream:** update DONE state & teardown logic ([a8a8c44](https://github.com/thi-ng/umbrella/commit/a8a8c44ed8a42b91f92fe9040cb1ce28b17113e7))
- **rstream:** update error handler sig ([#281](https://github.com/thi-ng/umbrella/issues/281)) ([015380a](https://github.com/thi-ng/umbrella/commit/015380ac20e342f83757556e158320e23a42502a))
- **rstream:** update ITransformable.transform() ([fe0eaa9](https://github.com/thi-ng/umbrella/commit/fe0eaa9f145d627dce67acfe2650c38222121ad1))
- **rstream:** update PubSub ([fa87168](https://github.com/thi-ng/umbrella/commit/fa87168ffbb683aed495b7786a4d100510d29c04))
- **rstream:** update Sub2, State enum ([db0ab34](https://github.com/thi-ng/umbrella/commit/db0ab34fcea8869d9c85c51f5faacf1e1f6bb0ec))
- **rstream:** update Subscription FSM, add/update tests ([ea1d0c1](https://github.com/thi-ng/umbrella/commit/ea1d0c1fe2132cf00e2f2851cb770007a5965c13))

###  Performance Improvements

- **rstream:** revert to storing child subs in array ([014bf20](https://github.com/thi-ng/umbrella/commit/014bf20ee3fdfa31377a08eaa5dc8fe211cadeac))

###  BREAKING CHANGES

- **rstream:** remove `.subscribe(sub, xform, opts)` signature. Transducer now supplied via `xform` key in `opts` (or use `.transform()` instead of `.subscribe()`)
