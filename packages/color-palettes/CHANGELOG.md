# Change Log

- **Last updated**: 2026-04-02T10:52:05Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.5.36](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.5.36/packages/color-palettes) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [1.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.5.0/packages/color-palettes) (2025-05-10)

#### 🚀 Features

- add 35 new themes ([1220656](https://codeberg.org/thi.ng/umbrella/commit/1220656))

## [1.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.4.0/packages/color-palettes) (2024-06-29)

#### 🚀 Features

- add filteredThemes() ([58a9712](https://codeberg.org/thi.ng/umbrella/commit/58a9712))
- update asCSS/Int/LCH/RGB() args ([9aa2f43](https://codeberg.org/thi.ng/umbrella/commit/9aa2f43))
  - accept existing themes (array of colors) as arg (in addition to theme IDs)

## [1.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.3.0/packages/color-palettes) (2024-06-21)

#### 🚀 Features

- add themeIDs() iterator ([b86bb32](https://codeberg.org/thi.ng/umbrella/commit/b86bb32))

### [1.2.30](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.2.30/packages/color-palettes) (2024-02-06)

#### ♻️ Refactoring

- update base64 handling ([48918f1](https://codeberg.org/thi.ng/umbrella/commit/48918f1))

### [1.2.11](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.2.11/packages/color-palettes) (2023-11-09)

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [1.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.2.0/packages/color-palettes) (2023-09-25)

#### 🚀 Features

- add opt arg to get theme in reverse order ([4163fda](https://codeberg.org/thi.ng/umbrella/commit/4163fda))

## [1.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.1.0/packages/color-palettes) (2023-04-25)

#### 🚀 Features

- add new themes, update swatch gen & binary ([6b2405c](https://codeberg.org/thi.ng/umbrella/commit/6b2405c))

### [1.0.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.0.2/packages/color-palettes) (2023-02-17)

#### ⏱ Performance improvements

- update compFilter() for single arg ([ea8dc86](https://codeberg.org/thi.ng/umbrella/commit/ea8dc86))

#### 🧪 Tests

- add tests ([359c83f](https://codeberg.org/thi.ng/umbrella/commit/359c83f))

# [1.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/color-palettes@1.0.0/packages/color-palettes) (2023-02-10)

#### 🛑 Breaking changes

- major restructuring/updates ([410d99d](https://codeberg.org/thi.ng/umbrella/commit/410d99d))
- BREAKING CHANGE: entirely new pkg structure & API
  - themes now stored in single flat byte array
  - remove need for KSUID theme IDs
  - add single theme accessors: asCSS()/asRGB()
  - add multi theme iterators: cssThemes()/rgbThemes()
  - add new /tools/encode.ts to generate /src/binary.ts
  - update swatch/table generator
  - update dependencies
  - update readme
  - regenerate & rename assets (swatch files)

#### 🚀 Features

- add 18 new themes ([d9ea6dd](https://codeberg.org/thi.ng/umbrella/commit/d9ea6dd))
- add LCH support, update iterators ([8f1bf32](https://codeberg.org/thi.ng/umbrella/commit/8f1bf32))
  - add asLCH(), lchThemes()
  - return typed colors for theme getters (SRGB/LCH)
  - update all theme iterators to accept filter predicates or indices
- add theme filter predicates ([e8e7a23](https://codeberg.org/thi.ng/umbrella/commit/e8e7a23))
  - add defFilter(), compFilter()
  - add hue(), chroma(), luma() filters
  - add proximityRGB/LCH() filters
- add packed ARGB int format support ([73a3d8e](https://codeberg.org/thi.ng/umbrella/commit/73a3d8e))
  - add/update types
  - add asInt(), intThemes()
  - update deps
