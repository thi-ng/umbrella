# Change Log

- **Last updated**: 2025-02-19T20:59:58Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@3.2.13) (2024-10-17)

#### ♻️ Refactoring

- undeprecate `into()`, refactor `pipe()` ([c8788d9](https://github.com/thi-ng/umbrella/commit/c8788d9))
  - update docstrings

### [3.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@3.2.2) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- dedupe pipe() logic, deprecate into() ([5979527](https://github.com/thi-ng/umbrella/commit/5979527))
  - update fromAsyncIterable()
  - add docstrings

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@3.2.0) (2024-04-28)

#### 🚀 Features

- update Mult/PubSub unsub handling, add docs ([32ad70e](https://github.com/thi-ng/umbrella/commit/32ad70e))
  - add optional auto-closing for Mult.unsubscribe(), PubSub.unsubscribeTopic()
  - add docs

#### 🩹 Bug fixes

- update select() ([5e87c8d](https://github.com/thi-ng/umbrella/commit/5e87c8d))
  - update select(), ensure write queue of selected channel is being updated
  - mark Channel.updateQueue() as internal

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@3.1.0) (2024-04-26)

#### 🚀 Features

- add opt. generics for PubSub.subscribe()/unsubscribe() ([b4e9d20](https://github.com/thi-ng/umbrella/commit/b4e9d20))
- add into() to feed (async) iterables into a channel ([c7c1f6d](https://github.com/thi-ng/umbrella/commit/c7c1f6d))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@3.0.0) (2024-04-25)

#### 🛑 Breaking changes

- complete rewrite of Channel, Mult, PubSub, remove deps, add new operators ([2cf7431](https://github.com/thi-ng/umbrella/commit/2cf7431))
- BREAKING CHANGES: complete rewrite of Channel, Mult, PubSub, remove deps, add new operators
  - remove/replace types
  - remove buffer impls (now using [@thi.ng/buffers](https://github.com/thi-ng/umbrella/tree/main/packages/buffers))
  - remove transducer handling (now done externally, e.g. via [@thi.ng/transducers-async](https://github.com/thi-ng/umbrella/tree/main/packages/transducers-async))
  - replace Channel, Mult, PubSub
  - remove obsolete dependencies
  - add/update channel operators:
    - broadcast()
    - concat()
    - consume() / consumeWith()
    - drain()
    - fromAsyncIterable()
    - merge()
    - pipe()
    - select()
    - timeout()
  - add/update tests, remove old/obsolete ones

#### 🚀 Features

- update consume() to accept opt. limit ([164d1dd](https://github.com/thi-ng/umbrella/commit/164d1dd))
- add write queue, update tests ([f201401](https://github.com/thi-ng/umbrella/commit/f201401))

### [2.1.115](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@2.1.115) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([749b24c](https://github.com/thi-ng/umbrella/commit/749b24c))

### [2.1.114](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@2.1.114) (2024-04-11)

#### 🚀 Features

- add initial new Channel impl & related ops/tests ([edddf61](https://github.com/thi-ng/umbrella/commit/edddf61))

### [2.1.113](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@2.1.113) (2024-04-08)

#### ♻️ Refactoring

- update reducer handling due to updates in [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/main/packages/transducers) pkg ([5af4868](https://github.com/thi-ng/umbrella/commit/5af4868))

### [2.1.99](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@2.1.99) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://github.com/thi-ng/umbrella/commit/c71a526))

### [2.1.76](https://github.com/thi-ng/umbrella/tree/@thi.ng/csp@2.1.76) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))
