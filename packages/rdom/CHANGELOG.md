# Change Log

- **Last updated**: 2025-05-28T12:02:40Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.7.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.7.19) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [1.7.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.7.13) (2024-11-24)

#### ⏱ Performance improvements

- minor update `$el()`, avoid object spread for null attribs ([a970b79](https://github.com/thi-ng/umbrella/commit/a970b79))

### [1.7.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.7.5) (2024-10-03)

#### ⏱ Performance improvements

- internal update __setAttrib() ([15ed31d](https://github.com/thi-ng/umbrella/commit/15ed31d))
  - only lookup property setters if value non-nullish

### [1.7.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.7.4) (2024-09-22)

#### 🩹 Bug fixes

- further fix __updateValueAttrib() ([378441c](https://github.com/thi-ng/umbrella/commit/378441c))
  - also skip cursor pos update for readonly elements
  - fix textarea handling

### [1.7.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.7.3) (2024-09-19)

#### 🩹 Bug fixes

- fix selection update in  __updateValueAttrib() ([dada2de](https://github.com/thi-ng/umbrella/commit/dada2de))
  - don't update selection (cursor pos) when updating disabled elements
    - workaround for Safari focus issue

## [1.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.7.0) (2024-08-28)

#### 🚀 Features

- support setting CSS vars via $style() ([81169ee](https://github.com/thi-ng/umbrella/commit/81169ee))

## [1.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.6.0) (2024-08-10)

#### 🚀 Features

- add `$inputToggle()` HOF event handler ([50e0c29](https://github.com/thi-ng/umbrella/commit/50e0c29))

### [1.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.5.1) (2024-07-06)

#### 🩹 Bug fixes

- update $compile() handling of embedded functions ([#477](https://github.com/thi-ng/umbrella/issues/477)) ([5ac2831](https://github.com/thi-ng/umbrella/commit/5ac2831))
  - add fn checks & branches to call embedded fn and compile its result
  - update docs

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.5.0) (2024-07-03)

#### 🚀 Features

- add support for no-arg fns in child positions ([6327fd3](https://github.com/thi-ng/umbrella/commit/6327fd3))
  - update `$tree()` to support no-arg functions in child positions

### [1.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.4.1) (2024-06-21)

#### 🩹 Bug fixes

- fix [#469](https://github.com/thi-ng/umbrella/issues/469), update setAttrib() `class` handling ([6cf8c56](https://github.com/thi-ng/umbrella/commit/6cf8c56))
  - use `el.setAttribute()` to be compatible w/ SVG elements
    - https://developer.mozilla.org/en-US/docs/Web/API/Element/className#notes

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.4.0) (2024-05-08)

#### 🚀 Features

- add rdom-klist example project, update readmes ([cd458ac](https://github.com/thi-ng/umbrella/commit/cd458ac))
- add rdom-klist example project, update readmes ([531437f](https://github.com/thi-ng/umbrella/commit/531437f))

### [1.3.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.3.3) (2024-04-26)

#### 🩹 Bug fixes

- update $compile() async-iterable attrib handling ([f977556](https://github.com/thi-ng/umbrella/commit/f977556))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.3.0) (2024-04-20)

#### 🚀 Features

- add support for async iterables ([742e0db](https://github.com/thi-ng/umbrella/commit/742e0db))
  - add $async() component wrapper
  - add $asyncA() attribute wrapper
  - update $compile() to support embedded `AsyncIterable` values
- update wrapper() to support reactive/async attribs ([96ea779](https://github.com/thi-ng/umbrella/commit/96ea779))
  - internally switch from `$el()` => `$compile()`

#### ♻️ Refactoring

- update type usage ([56d5747](https://github.com/thi-ng/umbrella/commit/56d5747))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.2.0) (2024-04-11)

#### 🚀 Features

- update setAttrib() property vs. attrib handling ([52cfe72](https://github.com/thi-ng/umbrella/commit/52cfe72))
  - add/build cache of property setters
  - update setAttrib() to prioritize setters and only fallback to attributes

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.1.0) (2024-02-10)

#### 🚀 Features

- add $toggleClasses() DOM util ([31d19b1](https://github.com/thi-ng/umbrella/commit/31d19b1))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@1.0.0) (2024-01-23)

#### 🛑 Breaking changes

- remove scheduler, update IComponent signatures ([3728c9b](https://github.com/thi-ng/umbrella/commit/3728c9b))
- BREAKING CHANGE: remove scheduler, update IComponent and
  various DOM update fn signatures
  - remove scheduler support since never used (other than
    default/dummy `NullScheduler`) and `RAFScheduler` logic is
    better handled via `synRAF()` or similar (also see [#402](https://github.com/thi-ng/umbrella/issues/402))
  - update IComponent.mount() signature to use `ParentNode
    as type for `parent` arg, e.g. to support use w/ `ShadowRoot`
  - update various DOM update fns with same parent arg type
  - update all utility components/wrappers

## [0.14.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.14.0) (2023-12-28)

#### 🚀 Features

- add $lazy() component wrapper ([5ad3856](https://github.com/thi-ng/umbrella/commit/5ad3856))

### [0.13.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.13.4) (2023-12-11)

#### ♻️ Refactoring

- update boolean attrib handling in setAttrib() ([96a21ab](https://github.com/thi-ng/umbrella/commit/96a21ab))

### [0.13.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.13.3) (2023-12-09)

#### 🩹 Bug fixes

- fix updateValueAttrib() for some input types ([81facee](https://github.com/thi-ng/umbrella/commit/81facee))

## [0.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.13.0) (2023-11-12)

#### 🚀 Features

- add $wrapEl() DOM element component wrapper ([298e9a1](https://github.com/thi-ng/umbrella/commit/298e9a1))
- update $compile() to support existing DOM elements ([859521a](https://github.com/thi-ng/umbrella/commit/859521a))
- update $attribs() to return element ([1f82021](https://github.com/thi-ng/umbrella/commit/1f82021))

### [0.12.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.12.21) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.12.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.12.13) (2023-10-18)

#### 🩹 Bug fixes

- update $text() to set el.textContent, simplify ([7cd6cc0](https://github.com/thi-ng/umbrella/commit/7cd6cc0))

## [0.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.12.0) (2023-08-22)

#### 🚀 Features

- update $text() handling of undefined values ([55faa71](https://github.com/thi-ng/umbrella/commit/55faa71))

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.11.0) (2023-04-08)

#### 🚀 Features

- add null check for $remove() ([db9d2a1](https://github.com/thi-ng/umbrella/commit/db9d2a1))
- add stream IDs for $list/$klist/$Sub/$SubA ([bfd4058](https://github.com/thi-ng/umbrella/commit/bfd4058))
- add $subWithID(), add IDs for various constructs ([404eacb](https://github.com/thi-ng/umbrella/commit/404eacb))

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.10.0) (2022-11-30)

#### 🚀 Features

- add DOM comment support ([#367](https://github.com/thi-ng/umbrella/issues/367)), other refactorings ([3fd5f8e](https://github.com/thi-ng/umbrella/commit/3fd5f8e))
  - add $comment(), isComment()
  - add Component.$comment() syntax sugar
  - add comment check/branch in $tree()
  - update args for $addChild(), $remove(), $moveTo()
  - update $text(), $html() to support SVG elements
  - add doc strings

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.9.0) (2022-07-12)

#### 🚀 Features

- update $input() generics ([6be320a](https://github.com/thi-ng/umbrella/commit/6be320a))
  - allow any string-derived stream types

### [0.8.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom@0.8.7) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))
