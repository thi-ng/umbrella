# Change Log

- **Last updated**: 2025-10-24T17:47:43Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.118](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@3.2.118) (2025-01-21)

#### ⏱ Performance improvements

- update parser grammar ([18b3032](https://github.com/thi-ng/umbrella/commit/18b3032))
  - update grammar rules to use more char selections

### [3.2.116](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@3.2.116) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [3.2.88](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@3.2.88) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- simplify/split-up serialize() internals ([5ed9b11](https://github.com/thi-ng/umbrella/commit/5ed9b11))

### [3.2.84](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-markdown@3.2.84) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([1a71e1c](https://github.com/thi-ng/umbrella/commit/1a71e1c))

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
