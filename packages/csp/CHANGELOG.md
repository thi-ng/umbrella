# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.3.9](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@3.3.9/packages/csp) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [3.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@3.3.0/packages/csp) (2025-10-07)

#### 🚀 Features

- update `select()`, shuffle inputs, update deps ([bbfad51](https://codeberg.org/thi.ng/umbrella/commit/bbfad51))
  - add [@thi.ng/arrays](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/arrays) dependency
  - update docs

### [3.2.13](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@3.2.13/packages/csp) (2024-10-17)

#### ♻️ Refactoring

- undeprecate `into()`, refactor `pipe()` ([c8788d9](https://codeberg.org/thi.ng/umbrella/commit/c8788d9))
  - update docstrings

### [3.2.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@3.2.2/packages/csp) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))
- dedupe pipe() logic, deprecate into() ([5979527](https://codeberg.org/thi.ng/umbrella/commit/5979527))
  - update fromAsyncIterable()
  - add docstrings

## [3.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@3.2.0/packages/csp) (2024-04-28)

#### 🚀 Features

- update Mult/PubSub unsub handling, add docs ([32ad70e](https://codeberg.org/thi.ng/umbrella/commit/32ad70e))
  - add optional auto-closing for Mult.unsubscribe(), PubSub.unsubscribeTopic()
  - add docs

#### 🩹 Bug fixes

- update select() ([5e87c8d](https://codeberg.org/thi.ng/umbrella/commit/5e87c8d))
  - update select(), ensure write queue of selected channel is being updated
  - mark Channel.updateQueue() as internal

## [3.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@3.1.0/packages/csp) (2024-04-26)

#### 🚀 Features

- add opt. generics for PubSub.subscribe()/unsubscribe() ([b4e9d20](https://codeberg.org/thi.ng/umbrella/commit/b4e9d20))
- add into() to feed (async) iterables into a channel ([c7c1f6d](https://codeberg.org/thi.ng/umbrella/commit/c7c1f6d))

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@3.0.0/packages/csp) (2024-04-25)

#### 🛑 Breaking changes

- complete rewrite of Channel, Mult, PubSub, remove deps, add new operators ([2cf7431](https://codeberg.org/thi.ng/umbrella/commit/2cf7431))
- BREAKING CHANGES: complete rewrite of Channel, Mult, PubSub, remove deps, add new operators
  - remove/replace types
  - remove buffer impls (now using [@thi.ng/buffers](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/buffers))
  - remove transducer handling (now done externally, e.g. via [@thi.ng/transducers-async](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/transducers-async))
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

- update consume() to accept opt. limit ([164d1dd](https://codeberg.org/thi.ng/umbrella/commit/164d1dd))
- add write queue, update tests ([f201401](https://codeberg.org/thi.ng/umbrella/commit/f201401))

### [2.1.115](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@2.1.115/packages/csp) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([749b24c](https://codeberg.org/thi.ng/umbrella/commit/749b24c))

### [2.1.114](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@2.1.114/packages/csp) (2024-04-11)

#### 🚀 Features

- add initial new Channel impl & related ops/tests ([edddf61](https://codeberg.org/thi.ng/umbrella/commit/edddf61))

### [2.1.113](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@2.1.113/packages/csp) (2024-04-08)

#### ♻️ Refactoring

- update reducer handling due to updates in [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/transducers) pkg ([5af4868](https://codeberg.org/thi.ng/umbrella/commit/5af4868))

### [2.1.99](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@2.1.99/packages/csp) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://codeberg.org/thi.ng/umbrella/commit/c71a526))

### [2.1.76](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@2.1.76/packages/csp) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

### [2.1.45](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csp@2.1.45/packages/csp) (2023-03-27)

#### 🧪 Tests

- update all tests (mainly imports) ([63a85f9](https://codeberg.org/thi.ng/umbrella/commit/63a85f9))
