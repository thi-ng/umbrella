# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [1.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.6.0/packages/imago) (2026-03-07)

#### 🚀 Features

- add `autoOrient` option for `processImage()` ([87c6958](https://codeberg.org/thi.ng/umbrella/commit/87c6958))

### [1.5.8](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.5.8/packages/imago) (2026-02-07)

#### ♻️ Refactoring

- replace deprecated `unsupported()` call sites in all pkgs ([3abbddf](https://codeberg.org/thi.ng/umbrella/commit/3abbddf))

### [1.5.4](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.5.4/packages/imago) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [1.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.5.0/packages/imago) (2025-11-17)

#### 🚀 Features

- add `maxsize()` operator ([d8484ff](https://codeberg.org/thi.ng/umbrella/commit/d8484ff))

## [1.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.4.0/packages/imago) (2025-07-25)

#### 🚀 Features

- add support for absolute output paths ([c440e25](https://codeberg.org/thi.ng/umbrella/commit/c440e25))
  - update `formatPath()` to always return abs path
  - simplify `outputProc()` path handling

## [1.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.3.0/packages/imago) (2025-07-21)

#### 🚀 Features

- add `dataURL` output option ([eca0ee3](https://codeberg.org/thi.ng/umbrella/commit/eca0ee3))

### [1.2.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.2.1/packages/imago) (2025-07-14)

#### 🩹 Bug fixes

- update `outputMeta` value type ([294afc8](https://codeberg.org/thi.ng/umbrella/commit/294afc8))

## [1.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.2.0/packages/imago) (2025-07-14)

#### 🚀 Features

- add `outputMeta` for raw outputs ([37810d3](https://codeberg.org/thi.ng/umbrella/commit/37810d3))

### [1.1.6](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.1.6/packages/imago) (2025-07-12)

#### 🩹 Bug fixes

- update raw output, remove alpha if needed ([c0559bf](https://codeberg.org/thi.ng/umbrella/commit/c0559bf))

### [1.1.3](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.1.3/packages/imago) (2025-07-02)

#### 🩹 Bug fixes

- update non-file (in-memory) output handling ([cef4642](https://codeberg.org/thi.ng/umbrella/commit/cef4642))
  - update `outputProc()` if no path is given

## [1.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@1.1.0/packages/imago) (2025-05-28)

#### 🚀 Features

- add support for [@thi.ng/pixel](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/pixel) int buffers as input ([e0b6de6](https://codeberg.org/thi.ng/umbrella/commit/e0b6de6))
  - update `processImage()`, update docs
  - add `isIntBufferLike()` helper
  - rename `src/units.ts` => `src/utils.ts`

## [0.8.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.8.0/packages/imago) (2024-07-06)

#### 🚀 Features

- make output path optional, record img buffer ([90258b2](https://codeberg.org/thi.ng/umbrella/commit/90258b2))
  - update OutputSpec.path handling
  - if no path given, record encoded img buffer itself in outputs
  - update outputProc() & __outputRaw()
  - update docs

### [0.7.8](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.7.8/packages/imago) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [0.7.3](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.7.3/packages/imago) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([32b862a](https://codeberg.org/thi.ng/umbrella/commit/32b862a))

## [0.7.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.7.0/packages/imago) (2024-04-01)

#### 🚀 Features

- add ICC profile assignment op ([5d022cb](https://codeberg.org/thi.ng/umbrella/commit/5d022cb))

## [0.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.6.0/packages/imago) (2024-03-06)

#### 🚀 Features

- update ImgProcOpts/Ctx, add custom env object ([2b160e0](https://codeberg.org/thi.ng/umbrella/commit/2b160e0))
  - update processImage() & result

## [0.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.5.0/packages/imago) (2024-03-01)

#### 🚀 Features

- update/improve/fix fluid position handling ([55284cd](https://codeberg.org/thi.ng/umbrella/commit/55284cd))
  - update computeSize(), computMargins(), refSize(), positionOrGravity()
  - update CompLayerBase
  - add `ref`-side support for crop, resize, and all comp layer types
  - update imageLayer(), use "fill" mode for resizing
  - add tests
  - add docs
- add defLayerSpec() and layer factory fns ([2fc4334](https://codeberg.org/thi.ng/umbrella/commit/2fc4334))
- add/update layer types, positioning, origin, gravity ([eae646f](https://codeberg.org/thi.ng/umbrella/commit/eae646f))
- add RawLayer, update other layer types ([ad59ce3](https://codeberg.org/thi.ng/umbrella/commit/ad59ce3))
  - add rawLayer() & impl
  - update CompLayer types & impls
  - update imageLayer() to support buffer inputs
  - add docs
- add suport for cropping with aspect ratio ([2b3db06](https://codeberg.org/thi.ng/umbrella/commit/2b3db06))
- add `aspect` format ID for formatPath() ([25d8377](https://codeberg.org/thi.ng/umbrella/commit/25d8377))
- update resize, add support for proportional resize ([6b13b0d](https://codeberg.org/thi.ng/umbrella/commit/6b13b0d))
  - update resizeProc() to handle scalar `size` to scale proportionally
    with automatic aspect detection

#### 🩹 Bug fixes

- use transparent black as default `extend()` bg color ([d5a98ef](https://codeberg.org/thi.ng/umbrella/commit/d5a98ef))

#### ♻️ Refactoring

- update defLayer() & CompLayerFn args ([294c6d0](https://codeberg.org/thi.ng/umbrella/commit/294c6d0))
- update types, add docs, minor changes ([e3de1e2](https://codeberg.org/thi.ng/umbrella/commit/e3de1e2))

### [0.4.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.4.1/packages/imago) (2024-02-28)

#### 🩹 Bug fixes

- fix typedarray input handling in processImage() ([075ecaa](https://codeberg.org/thi.ng/umbrella/commit/075ecaa))

## [0.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.4.0/packages/imago) (2024-02-27)

#### 🚀 Features

- add blurhash output option, update deps ([b7ffedd](https://codeberg.org/thi.ng/umbrella/commit/b7ffedd))

## [0.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.3.0/packages/imago) (2024-02-23)

#### 🚀 Features

- major update ([f938d60](https://codeberg.org/thi.ng/umbrella/commit/f938d60))
  - restructure package, split out all ops into separate files
  - update `ProcSpec`, rename `type` => `op`
  - add text layer support (via SVG)
  - add/update EXIF handling & opts
  - add ICC profile handling & opts
  - update output path collection to use object
    - update `OutputSpec` to require output `id`
  - update `NestSpec` to support multiple child pipelines
    - spawn children via Promise.all()
  - add/update docstrings
  - update deps & pkg exports

## [0.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.2.0/packages/imago) (2024-02-22)

#### 🚀 Features

- add support for custom path part replacements ([b0419e1](https://codeberg.org/thi.ng/umbrella/commit/b0419e1))
- add more path part replacements ([9f84a8a](https://codeberg.org/thi.ng/umbrella/commit/9f84a8a))
- collect all output paths, update processImage() result ([a3ca52f](https://codeberg.org/thi.ng/umbrella/commit/a3ca52f))

## [0.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imago@0.1.0/packages/imago) (2024-02-22)

#### 🚀 Features

- import as new pkg ([66b62ff](https://codeberg.org/thi.ng/umbrella/commit/66b62ff))
- add output path formatters, restructure pkg ([0b06527](https://codeberg.org/thi.ng/umbrella/commit/0b06527))

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://codeberg.org/thi.ng/umbrella/commit/c71a526))
