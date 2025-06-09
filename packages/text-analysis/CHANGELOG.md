# Change Log

- **Last updated**: 2025-06-09T17:24:08Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-analysis@0.1.0) (2025-06-09)

#### 🚀 Features

- import as new pkg ([89fe9bb](https://github.com/thi-ng/umbrella/commit/89fe9bb))
  - add re-exports from transducers/vectors pkgs
  - add porter stemmer, contractions & stop words from old [@thi.ng/notes](https://github.com/thi-ng/umbrella/tree/main/packages/notes) repo
    - add porter fixtures
  - update defVocab() to use [@thi.ng/bidir-index](https://github.com/thi-ng/umbrella/tree/main/packages/bidir-index)
  - add sparse vector support
  - add/port cosine/jaccard similarities from vectors/sparse pkgs
  - add doc strings & examples
