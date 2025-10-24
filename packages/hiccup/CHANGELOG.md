# Change Log

- **Last updated**: 2025-10-24T14:08:37Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@5.3.0) (2025-01-22)

#### 🚀 Features

- add special `INLINE` tag & `__escape` behavior attrib ([42e7717](https://github.com/thi-ng/umbrella/commit/42e7717))
  - add `INLINE` tag & handling for embedded markup
  - add `__escape` control attrib to enable/disable entity escaping (per element)
  - add tests

### [5.2.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@5.2.11) (2024-08-23)

#### 🩹 Bug fixes

- update mergeClasses() arg types ([eaca539](https://github.com/thi-ng/umbrella/commit/eaca539))
  - add support for SVGAnimatedString as `existing` arg
    to enable full support for SVG elements
- update SVGAnimatedString handling in `mergeClasses()` ([540cc70](https://github.com/thi-ng/umbrella/commit/540cc70))

### [5.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@5.2.2) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@5.2.0) (2024-04-25)

#### 🚀 Features

- add `SerializeOpts.xml`, update serializeAttrib ([8fdcab9](https://github.com/thi-ng/umbrella/commit/8fdcab9))

### [5.1.29](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@5.1.29) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([33f8451](https://github.com/thi-ng/umbrella/commit/33f8451))

### [5.1.23](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@5.1.23) (2024-03-18)

#### ♻️ Refactoring

- minor update regexp ([c2eb896](https://github.com/thi-ng/umbrella/commit/c2eb896))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@5.1.0) (2023-12-09)

#### 🚀 Features

- allow `class` attrib as string array ([448edd0](https://github.com/thi-ng/umbrella/commit/448edd0))
  - update mergeClasses()
  - update docs & tests

#### 🩹 Bug fixes

- fix mergeClasses(), add tests ([c734794](https://github.com/thi-ng/umbrella/commit/c734794))

### [5.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@5.0.6) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@5.0.0) (2023-09-19)

#### 🛑 Breaking changes

- add SerializeOpts, update serialize() ([442d777](https://github.com/thi-ng/umbrella/commit/442d777))
- BREAKING CHANGE: update serialize() args, replace with options object
  - only a breaking change for "advanced" use cases
  - add SerializeOpts to simplify serialize() args
  - add customizable entity escaping (via new opts)
  - add/update tests

#### 🩹 Bug fixes

- update entity escapes in serialize() ([369d83e](https://github.com/thi-ng/umbrella/commit/369d83e))
  - use [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/main/packages/strings) escapeEntitiesNum() for better XML/SVG compatibility
  - add tests

#### ♻️ Refactoring

- minor updates ([94b3de6](https://github.com/thi-ng/umbrella/commit/94b3de6))

## [4.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@4.3.0) (2023-08-27)

#### 🚀 Features

- add XML_PROC & DOCTYPE_HTML constants ([4ec98fd](https://github.com/thi-ng/umbrella/commit/4ec98fd))
  - update tests
