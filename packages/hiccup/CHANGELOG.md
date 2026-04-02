# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.4.0/packages/hiccup) (2026-03-19)

#### 🚀 Features

- add serialize() support for "textarea" value attrib ([30cee2d](https://codeberg.org/thi.ng/umbrella/commit/30cee2d))
  - update `serialize()` for textarea elements with value attrib:
    - use value attrib as element body
    - delete value attrib
  - add tests

### [5.3.33](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.3.33/packages/hiccup) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [5.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.3.0/packages/hiccup) (2025-01-22)

#### 🚀 Features

- add special `INLINE` tag & `__escape` behavior attrib ([42e7717](https://codeberg.org/thi.ng/umbrella/commit/42e7717))
  - add `INLINE` tag & handling for embedded markup
  - add `__escape` control attrib to enable/disable entity escaping (per element)
  - add tests

### [5.2.11](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.2.11/packages/hiccup) (2024-08-23)

#### 🩹 Bug fixes

- update mergeClasses() arg types ([eaca539](https://codeberg.org/thi.ng/umbrella/commit/eaca539))
  - add support for SVGAnimatedString as `existing` arg
    to enable full support for SVG elements
- update SVGAnimatedString handling in `mergeClasses()` ([540cc70](https://codeberg.org/thi.ng/umbrella/commit/540cc70))

### [5.2.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.2.2/packages/hiccup) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

## [5.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.2.0/packages/hiccup) (2024-04-25)

#### 🚀 Features

- add `SerializeOpts.xml`, update serializeAttrib ([8fdcab9](https://codeberg.org/thi.ng/umbrella/commit/8fdcab9))

### [5.1.29](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.1.29/packages/hiccup) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([33f8451](https://codeberg.org/thi.ng/umbrella/commit/33f8451))

### [5.1.23](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.1.23/packages/hiccup) (2024-03-18)

#### ♻️ Refactoring

- minor update regexp ([c2eb896](https://codeberg.org/thi.ng/umbrella/commit/c2eb896))

## [5.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.1.0/packages/hiccup) (2023-12-09)

#### 🚀 Features

- allow `class` attrib as string array ([448edd0](https://codeberg.org/thi.ng/umbrella/commit/448edd0))
  - update mergeClasses()
  - update docs & tests

#### 🩹 Bug fixes

- fix mergeClasses(), add tests ([c734794](https://codeberg.org/thi.ng/umbrella/commit/c734794))

### [5.0.6](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.0.6/packages/hiccup) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

# [5.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@5.0.0/packages/hiccup) (2023-09-19)

#### 🛑 Breaking changes

- add SerializeOpts, update serialize() ([442d777](https://codeberg.org/thi.ng/umbrella/commit/442d777))
- BREAKING CHANGE: update serialize() args, replace with options object
  - only a breaking change for "advanced" use cases
  - add SerializeOpts to simplify serialize() args
  - add customizable entity escaping (via new opts)
  - add/update tests

#### 🩹 Bug fixes

- update entity escapes in serialize() ([369d83e](https://codeberg.org/thi.ng/umbrella/commit/369d83e))
  - use [@thi.ng/strings](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/strings) escapeEntitiesNum() for better XML/SVG compatibility
  - add tests

#### ♻️ Refactoring

- minor updates ([94b3de6](https://codeberg.org/thi.ng/umbrella/commit/94b3de6))

## [4.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hiccup@4.3.0/packages/hiccup) (2023-08-27)

#### 🚀 Features

- add XML_PROC & DOCTYPE_HTML constants ([4ec98fd](https://codeberg.org/thi.ng/umbrella/commit/4ec98fd))
  - update tests
