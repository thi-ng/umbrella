# Change Log

- **Last updated**: 2025-10-24T14:17:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [5.0.75](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@5.0.75) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [5.0.71](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@5.0.71) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([3116bab](https://github.com/thi-ng/umbrella/commit/3116bab))

### [5.0.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@5.0.31) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-gestures@5.0.0) (2023-04-08)

#### 🛑 Breaking changes

- support zoom reset via subscription ([03b1621](https://github.com/thi-ng/umbrella/commit/03b1621))
- BREAKING CHANGE: Original DOM event **might** not anymore be present in all cases
  - update GestureStreamOpts.zoom to accept subscription
  - update gestureStream() to support resetting of zoom value via subscription
  - update docs

#### ♻️ Refactoring

- update stream ID handling ([2c9fa02](https://github.com/thi-ng/umbrella/commit/2c9fa02))
