# Change Log

- **Last updated**: 2025-10-24T13:42:49Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.1.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/tsne@0.1.15) (2025-06-03)

#### ⏱ Performance improvements

- avoid allocations, optimize computeGradient() ([8888892](https://github.com/thi-ng/umbrella/commit/8888892))
  - pre-allocate arrays for gradient & yMean
  - skip gradient update if same rows
  - use destructured Math fns

### [0.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/tsne@0.1.9) (2025-04-16)

#### ♻️ Refactoring

- minor internal updates ([52958dd](https://github.com/thi-ng/umbrella/commit/52958dd))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/tsne@0.1.1) (2025-02-20)

#### ⏱ Performance improvements

- more efficient use of vector ops ([af07e27](https://github.com/thi-ng/umbrella/commit/af07e27))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tsne@0.1.0) (2025-02-19)

#### 🚀 Features

- import as new pkg ([6761949](https://github.com/thi-ng/umbrella/commit/6761949))
