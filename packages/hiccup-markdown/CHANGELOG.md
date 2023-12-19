# Change Log

- **Last updated**: 2023-12-19T11:01:47Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.42](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@3.2.42) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@3.2.0) (2023-03-07)

#### 🚀 Features

- update parse grammar ([e0be40a](https://github.com/thi-ng/umbrella/commit/e0be40a))
  - char escapes now usable in almost all situs
    (excl. metadata for code/custom blocks)
  - add support for these HTML tags:
    - comments `<!-- ... -->`
    - `<sub>` / `<sup>`
  - add tests
- update parse grammar & handlers ([7bd4edb](https://github.com/thi-ng/umbrella/commit/7bd4edb))
  - update TransformCtx, add .column & .align fields
  - update table row/cell handlers
  - update olitem handler (index now a string)
    - this is to support alphabetical ordered lists
  - add `<sub>`/`<sup>` handlers
  - update tests
  - update docs
- update char escapes & inline format nesting rules ([2fde69b](https://github.com/thi-ng/umbrella/commit/2fde69b))
  - allow nested kbd/sub/sup elements
  - update char escape rules for inline code, codeblocks, custom blocks & meta blocks
  - update __trimBody() helper to remove isolate trailing WS
  - add/update tests

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@3.1.0) (2023-03-05)

#### 🚀 Features

- add anchor ID syntax support for headings ([86ce79e](https://github.com/thi-ng/umbrella/commit/86ce79e))
  - update parse grammar & hd parser
  - support for `{#id}` suffixes for defining heading anchor IDs
  - only auto-generate anchor IDs if not explicitly specified
  - update tests

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@3.0.0) (2023-02-27)

#### 🛑 Breaking changes

- replace parser ([e425e87](https://github.com/thi-ng/umbrella/commit/e425e87))
- BREAKING CHANGE: replace parser implementation
  - switch to new parser (non-transducer based):
    - [dcb7b193f](https://github.com/thi-ng/umbrella/commit/dcb7b193f)
    - [5d030ad9c](https://github.com/thi-ng/umbrella/commit/5d030ad9c)
    - [656b90be3](https://github.com/thi-ng/umbrella/commit/656b90be3)
    - [8b215c690](https://github.com/thi-ng/umbrella/commit/8b215c690)
  - add/update parser types/interfaces
  - add/update tests
  - update deps

#### 🚀 Features

- add new parser (incomplete WIP) ([dcb7b19](https://github.com/thi-ng/umbrella/commit/dcb7b19))
- update/extend new parser ([5d030ad](https://github.com/thi-ng/umbrella/commit/5d030ad))
  - update blockquote handling
  - add emoji support (& dependency)
  - update/improve metablock format/handling
    - add meta type/syntax identifier
    - TODO meta data parsing
  - update TagTransforms to accept meta data
  - update horizontal rule parser (keep track of length)
- update/extend new parser ([656b90b](https://github.com/thi-ng/umbrella/commit/656b90b))
  - add support for all outstanding elements:
    - code blocks
    - footnotes
    - link refs
    - tables
  - update metablock handling (add tag handler to tx raw string)
  - update all tag handlers to accept parse ctx as 1st arg
  - allow all tag handlers to return nothing to exclude elem in result
  - collect footnotes, link refs & headings separately in parse ctx
- update parser, add img & logger support ([8b215c6](https://github.com/thi-ng/umbrella/commit/8b215c6))
  - add logger support for tracing parse scopes
  - trim codeblock body
  - fix footnote handling/appending
  - fix hd tag handler if level>6
  - fix table column alignment parsing
  - update pkg deps
- update/extend parser ([27c4084](https://github.com/thi-ng/umbrella/commit/27c4084))
  - update parser grammar
  - add support for nested inline formats in:
    - headings
    - paragraphs
    - blockquotes
    - link labels
    - lists
    - tables
  - add support for escaping format chars
  - add support for explicit linebreaks in paragraphs & blockquotes
  - add `<kbd>` support
  - add parse option to auto-escape chars as HTML entities
  - update TagTransforms
  - extract DEFAULT_TAG_TRANSFORMS
  - update parse() signature, add parseRaw()
  - refactor/improve reuse for various internal parse helpers
  - update tests
- add escaped char support ([6671b73](https://github.com/thi-ng/umbrella/commit/6671b73))
- update parser ([33aea4e](https://github.com/thi-ng/umbrella/commit/33aea4e))
  - add wikiref link parser/handler
  - fix codeblock & customblock handlers
  - add slugified ID attrib for headings
  - expose withMeta() & extractBody() utils for custom handlers
- update img & link parsers ([8750fbd](https://github.com/thi-ng/umbrella/commit/8750fbd))
  - add support for optional title attrib for links & images
    (eg. `[label](url "title")`)
  - fix linkref handling
  - add/update tests
- update/extend parser (blockquotes, formats) ([13cb309](https://github.com/thi-ng/umbrella/commit/13cb309))
  - update grammar & handler to support nested blockquotes
  - update inline formats to allow links & images in body
  - update tests
- update parser & tag transforms ([a6c0b36](https://github.com/thi-ng/umbrella/commit/a6c0b36))
  - auto-compute heading ID in parser and provide as new arg to tag transform
  - add row index as new arg for tableRow transform
  - add tableHead tag transform (for 1st row cells)
  - update lazy value handling in linkRef tag transform
  - update tests
  - update pkg deps
- add metadata support for <hr> tags ([d5c84c9](https://github.com/thi-ng/umbrella/commit/d5c84c9))
- update parser types/fns, add docs ([0208a53](https://github.com/thi-ng/umbrella/commit/0208a53))
  - add ParseResult
  - rename MDParseContext => TransformCtx
  - rename walk => transformScope
  - update parse() args
  - add docstrings
  - update tests

#### 🩹 Bug fixes

- add/update tests ([f444506](https://github.com/thi-ng/umbrella/commit/f444506))
- update emoji parse grammar ([b7c310f](https://github.com/thi-ng/umbrella/commit/b7c310f))

#### ♻️ Refactoring

- update serializer ([a489c0e](https://github.com/thi-ng/umbrella/commit/a489c0e))
  - add support for nested blockquotes
  - add support for link labels
  - rename internal fns
  - update tests

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@2.1.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@2.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports (text-canvas) ([fe5c91e](https://github.com/thi-ng/umbrella/commit/fe5c91e))
- update imports (transducers) ([3ddf8f3](https://github.com/thi-ng/umbrella/commit/3ddf8f3))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update defmulti impls ([0188d23](https://github.com/thi-ng/umbrella/commit/0188d23))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@1.3.0) (2021-01-22)

#### 🚀 Features

- update DEFAULT_TAGS ([8f7f9d4](https://github.com/thi-ng/umbrella/commit/8f7f9d4))
  - emit normalized hiccup (w/ attribs obj)
  - update tests

### [1.2.38](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@1.2.38) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@1.2.0) (2020-03-28)

#### 🚀 Features

- add table serializer & test, update deps ([7cecf24](https://github.com/thi-ng/umbrella/commit/7cecf24))
- add table caption support ([4b72b92](https://github.com/thi-ng/umbrella/commit/4b72b92))
  - update `th` serializer to use bold formatting

### [1.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@1.1.10) (2020-02-25)

#### ♻️ Refactoring

- update imports ([1b511d7](https://github.com/thi-ng/umbrella/commit/1b511d7))

### [1.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@1.1.6) (2019-11-09)

#### 🩹 Bug fixes

- [#156](https://github.com/thi-ng/umbrella/issues/156) update parse(), remove CR chars, add initial test ([602510c](https://github.com/thi-ng/umbrella/commit/602510c))
- [#156](https://github.com/thi-ng/umbrella/issues/156) fix blockquote default tag factory args, add test ([12e445a](https://github.com/thi-ng/umbrella/commit/12e445a))
- [#156](https://github.com/thi-ng/umbrella/issues/156) undo trimming of element children ([ccc9d40](https://github.com/thi-ng/umbrella/commit/ccc9d40))
  - was wrongly introduced in [602510c5150dbf26d43a1c9e7ca8afd7c5230f28](https://github.com/thi-ng/umbrella/commit/602510c5150dbf26d43a1c9e7ca8afd7c5230f28)

### [1.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@1.1.4) (2019-08-21)

#### ♻️ Refactoring

- update serializeElement, add SerializeState ([745ea65](https://github.com/thi-ng/umbrella/commit/745ea65))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([36c8109](https://github.com/thi-ng/umbrella/commit/36c8109))

#### ♻️ Refactoring

- TS strictNullChecks, add tests ([9e44bfd](https://github.com/thi-ng/umbrella/commit/9e44bfd))

### [1.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@1.0.5) (2019-02-15)

#### ♻️ Refactoring

- update fsm until() usage ([e8cd242](https://github.com/thi-ng/umbrella/commit/e8cd242))
- update to use [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays) ([3a74bf1](https://github.com/thi-ng/umbrella/commit/3a74bf1))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### 🩹 Bug fixes

- re-export TagFactories interface ([b198c19](https://github.com/thi-ng/umbrella/commit/b198c19))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@0.2.0) (2019-01-04)

#### 🚀 Features

- add & refactor markdown parser (from example), update docs ([35db07f](https://github.com/thi-ng/umbrella/commit/35db07f))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@0.1.0) (2018-12-20)

#### 🚀 Features

- add new package ([58f591e](https://github.com/thi-ng/umbrella/commit/58f591e))
