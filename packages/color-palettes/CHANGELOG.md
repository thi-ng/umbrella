# Change Log

- **Last updated**: 2025-02-19T20:59:58Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@1.4.0) (2024-06-29)

#### 🚀 Features

- add filteredThemes() ([58a9712](https://github.com/thi-ng/umbrella/commit/58a9712))
- update asCSS/Int/LCH/RGB() args ([9aa2f43](https://github.com/thi-ng/umbrella/commit/9aa2f43))
  - accept existing themes (array of colors) as arg (in addition to theme IDs)

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@1.3.0) (2024-06-21)

#### 🚀 Features

- add themeIDs() iterator ([b86bb32](https://github.com/thi-ng/umbrella/commit/b86bb32))

### [1.2.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@1.2.30) (2024-02-06)

#### ♻️ Refactoring

- update base64 handling ([48918f1](https://github.com/thi-ng/umbrella/commit/48918f1))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@1.2.0) (2023-09-25)

#### 🚀 Features

- add opt arg to get theme in reverse order ([4163fda](https://github.com/thi-ng/umbrella/commit/4163fda))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@1.1.0) (2023-04-25)

#### 🚀 Features

- add new themes, update swatch gen & binary ([6b2405c](https://github.com/thi-ng/umbrella/commit/6b2405c))

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@1.0.2) (2023-02-17)

#### ⏱ Performance improvements

- update compFilter() for single arg ([ea8dc86](https://github.com/thi-ng/umbrella/commit/ea8dc86))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@1.0.0) (2023-02-10)

#### 🛑 Breaking changes

- major restructuring/updates ([410d99d](https://github.com/thi-ng/umbrella/commit/410d99d))
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

- add 18 new themes ([d9ea6dd](https://github.com/thi-ng/umbrella/commit/d9ea6dd))
- add LCH support, update iterators ([8f1bf32](https://github.com/thi-ng/umbrella/commit/8f1bf32))
  - add asLCH(), lchThemes()
  - return typed colors for theme getters (SRGB/LCH)
  - update all theme iterators to accept filter predicates or indices
- add theme filter predicates ([e8e7a23](https://github.com/thi-ng/umbrella/commit/e8e7a23))
  - add defFilter(), compFilter()
  - add hue(), chroma(), luma() filters
  - add proximityRGB/LCH() filters
- add packed ARGB int format support ([73a3d8e](https://github.com/thi-ng/umbrella/commit/73a3d8e))
  - add/update types
  - add asInt(), intThemes()
  - update deps

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@0.9.0) (2022-08-23)

#### 🚀 Features

- add new themes, update swatch tool ([1051b7e](https://github.com/thi-ng/umbrella/commit/1051b7e))
  - update swatch gen to emit 3-column tables

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/color-palettes@0.8.0) (2022-03-11)

#### 🚀 Features

- add 12 new palettes ([eab99c7](https://github.com/thi-ng/umbrella/commit/eab99c7))
- add new themes ([f3d4446](https://github.com/thi-ng/umbrella/commit/f3d4446))
