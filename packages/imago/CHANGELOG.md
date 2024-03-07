# Change Log

- **Last updated**: 2024-03-07T20:40:47Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imago@0.6.0) (2024-03-06)

#### 🚀 Features

- update ImgProcOpts/Ctx, add custom env object ([2b160e0](https://github.com/thi-ng/umbrella/commit/2b160e0))
  - update processImage() & result

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imago@0.5.0) (2024-03-01)

#### 🚀 Features

- update/improve/fix fluid position handling ([55284cd](https://github.com/thi-ng/umbrella/commit/55284cd))
  - update computeSize(), computMargins(), refSize(), positionOrGravity()
  - update CompLayerBase
  - add `ref`-side support for crop, resize, and all comp layer types
  - update imageLayer(), use "fill" mode for resizing
  - add tests
  - add docs
- add defLayerSpec() and layer factory fns ([2fc4334](https://github.com/thi-ng/umbrella/commit/2fc4334))
- add/update layer types, positioning, origin, gravity ([eae646f](https://github.com/thi-ng/umbrella/commit/eae646f))
- add RawLayer, update other layer types ([ad59ce3](https://github.com/thi-ng/umbrella/commit/ad59ce3))
  - add rawLayer() & impl
  - update CompLayer types & impls
  - update imageLayer() to support buffer inputs
  - add docs
- add suport for cropping with aspect ratio ([2b3db06](https://github.com/thi-ng/umbrella/commit/2b3db06))
- add `aspect` format ID for formatPath() ([25d8377](https://github.com/thi-ng/umbrella/commit/25d8377))
- update resize, add support for proportional resize ([6b13b0d](https://github.com/thi-ng/umbrella/commit/6b13b0d))
  - update resizeProc() to handle scalar `size` to scale proportionally
    with automatic aspect detection

#### 🩹 Bug fixes

- use transparent black as default `extend()` bg color ([d5a98ef](https://github.com/thi-ng/umbrella/commit/d5a98ef))

#### ♻️ Refactoring

- update defLayer() & CompLayerFn args ([294c6d0](https://github.com/thi-ng/umbrella/commit/294c6d0))
- update types, add docs, minor changes ([e3de1e2](https://github.com/thi-ng/umbrella/commit/e3de1e2))

### [0.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/imago@0.4.1) (2024-02-28)

#### 🩹 Bug fixes

- fix typedarray input handling in processImage() ([075ecaa](https://github.com/thi-ng/umbrella/commit/075ecaa))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imago@0.4.0) (2024-02-27)

#### 🚀 Features

- add blurhash output option, update deps ([b7ffedd](https://github.com/thi-ng/umbrella/commit/b7ffedd))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imago@0.3.0) (2024-02-23)

#### 🚀 Features

- major update ([f938d60](https://github.com/thi-ng/umbrella/commit/f938d60))
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

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imago@0.2.0) (2024-02-22)

#### 🚀 Features

- add support for custom path part replacements ([b0419e1](https://github.com/thi-ng/umbrella/commit/b0419e1))
- add more path part replacements ([9f84a8a](https://github.com/thi-ng/umbrella/commit/9f84a8a))
- collect all output paths, update processImage() result ([a3ca52f](https://github.com/thi-ng/umbrella/commit/a3ca52f))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imago@0.1.0) (2024-02-22)

#### 🚀 Features

- import as new pkg ([66b62ff](https://github.com/thi-ng/umbrella/commit/66b62ff))
- add output path formatters, restructure pkg ([0b06527](https://github.com/thi-ng/umbrella/commit/0b06527))

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://github.com/thi-ng/umbrella/commit/c71a526))
