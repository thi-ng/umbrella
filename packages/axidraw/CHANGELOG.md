# Change Log

- **Last updated**: 2022-12-06T17:16:38Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@0.1.0) (2022-12-06)

#### 🚀 Features

- import as new pkg ([cc43e84](https://github.com/thi-ng/umbrella/commit/cc43e84))
- arbitrary unit support, measure draw time ([32e3212](https://github.com/thi-ng/umbrella/commit/32e3212))
  - add AxiDrawOpts.unitsPerInch to support any worldspace units
  - remove paperSize opt
  - add command constants for better mem use
  - update AxiDraw.draw() to measure & return time taken
  - add/update doc strings
