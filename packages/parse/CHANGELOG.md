# Change Log

- **Last updated**: 2021-11-17T23:56:32Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.0.0) (2021-10-12)

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

- update defmulti impls ([0303769](https://github.com/thi-ng/umbrella/commit/0303769))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [0.9.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.9.7) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([85874bc](https://github.com/thi-ng/umbrella/commit/85874bc))

### [0.9.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.9.4) (2020-09-22)

#### ♻️ Refactoring

- update ESC parse preset ([ec94064](https://github.com/thi-ng/umbrella/commit/ec94064))
  - re-use ESCAPES LUT from strings pkgs

### [0.9.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.9.3) (2020-09-13)

#### ♻️ Refactoring

- update imports ([b600b00](https://github.com/thi-ng/umbrella/commit/b600b00))

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.9.0) (2020-08-17)

#### 🚀 Features

- enable replacement rule transforms ([ca22432](https://github.com/thi-ng/umbrella/commit/ca22432))
  - allow strings as rule transform in grammar
- add replace/xfReplace() xform ([7291181](https://github.com/thi-ng/umbrella/commit/7291181))

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.8.0) (2020-07-19)

#### 🚀 Features

- update repeat grammar ([7aae9ac](https://github.com/thi-ng/umbrella/commit/7aae9ac))
  - support specifying min repeat count only (max: infinity), e.g. `{3,}`
- update grammar (xform rule refs) ([22188a4](https://github.com/thi-ng/umbrella/commit/22188a4))
  - allow other parse rules as rule xform (via `xfNest()`)
  - add tests
- add nest()/xfNest() transform ([af9c97b](https://github.com/thi-ng/umbrella/commit/af9c97b))

### [0.7.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.7.2) (2020-07-18)

#### 🩹 Bug fixes

- export ContextOpts, move to api.ts ([2dfc445](https://github.com/thi-ng/umbrella/commit/2dfc445))

### [0.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.7.1) (2020-07-17)

#### ⏱ Performance improvements

- update grammar, use discarding parsers where possible ([d269a8a](https://github.com/thi-ng/umbrella/commit/d269a8a))
  - update compile() impls w/ CompileFlags and use `D` versions if poss
  - refactor/add compileRD(), compileRDL() helpers
  - expose DNL preset rule in defGrammar()
  - add alwaysD()
  - add tests

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.7.0) (2020-07-08)

#### 🚀 Features

- turn xfPrint() into HOF xform ([d86fa53](https://github.com/thi-ng/umbrella/commit/d86fa53))
  - add opt support for custom print fns (other than console)
- update/fix grammar DSL, add trim ([f82ba1f](https://github.com/thi-ng/umbrella/commit/f82ba1f))
  - update lookahead (cap, non-cap versions)
  - add lookahead for alt terms
  - update `compileLookahead()`
  - add line comment support
  - fix `{n}` repeat modifier handling
  - add `trim()`/`xfTrim()` xforms
- lookahead w/ configurable capture ([542c066](https://github.com/thi-ng/umbrella/commit/542c066))
- update grammar DSL ([accacf9](https://github.com/thi-ng/umbrella/commit/accacf9))
  - add `.` catch-all term
  - add `(?=...)` suffix form for lookahead
  - update TERM/TERM_BODY
- update lookahead ([51a8dc5](https://github.com/thi-ng/umbrella/commit/51a8dc5))
  - add pass flag and only succeed if main parser passed at least once
- add lookahead() combinator, add tests ([ee35038](https://github.com/thi-ng/umbrella/commit/ee35038))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.6.0) (2020-06-28)

#### 🚀 Features

- add count/xfCount transform ([056ae08](https://github.com/thi-ng/umbrella/commit/056ae08))
- add `!` discard modifier to grammar ([456efdc](https://github.com/thi-ng/umbrella/commit/456efdc))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.5.0) (2020-04-23)

#### 🚀 Features

- add built-ins, extract STRING, minor updates ([458f5b3](https://github.com/thi-ng/umbrella/commit/458f5b3))
  - add anchors to built-in grammar rules
  - extract STRING preset parser
  - add doc strings
  - add s-expr parser test
  - update imports
  - update readme

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.4.0) (2020-04-21)

#### 🚀 Features

- update grammar DSL, hoist xforms ([861e7f3](https://github.com/thi-ng/umbrella/commit/861e7f3))
  - allow esc sequences in grammar string literals
  - expose various preset parser for re-use in grammar DSL
  - rename xfHoist => hoistResult
  - add new xfHoist to hoist entire child node
  - add doc strings

#### 🩹 Bug fixes

- update not() behavior, add passD() ([1d0f4c4](https://github.com/thi-ng/umbrella/commit/1d0f4c4))

#### ♻️ Refactoring

- update wrap() combinator ([a3dae6e](https://github.com/thi-ng/umbrella/commit/a3dae6e))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.3.0) (2020-04-20)

#### 🚀 Features

- add grammar default transforms, update/fix rules ([03ed965](https://github.com/thi-ng/umbrella/commit/03ed965))
- update ESC & whitespace parsers ([069a6ef](https://github.com/thi-ng/umbrella/commit/069a6ef))
- add discarding combinators, move discard ([e09a2c4](https://github.com/thi-ng/umbrella/commit/e09a2c4))
  - add repeatD, oneOrMoreD, zeroOrMoreD
- update grammar parser & compiler ([822fcba](https://github.com/thi-ng/umbrella/commit/822fcba))
  - add GrammarOpts
  - update rules to enable repetition of all terms
  - add string term
  - make debug output optional
- add/update/rename parser presets ([12f2499](https://github.com/thi-ng/umbrella/commit/12f2499))
- add withID() xform, add doc strings ([e16426b](https://github.com/thi-ng/umbrella/commit/e16426b))
- add/update combinators ([e4eab03](https://github.com/thi-ng/umbrella/commit/e4eab03))
  - add startsWith, endsWith, entireLine, entirely
  - add wrap()
  - rename dalt/dseq => altD/seqD
- add/update/rename parser primitives ([328103f](https://github.com/thi-ng/umbrella/commit/328103f))
  - add LitParser type to annotate single-char parsers
  - add satisfyD()
  - add stringOf() for predicated strings
  - add wordBoundary anchor
  - add/update/rename discarding parser prims:
    - litD(), stringD(), noneOfD(), oneOfD(), rangeD()
  - export predicate versions:
    - litP(), noneOfP(), oneOfP(), rangeP()
  - update skipWhile() behavior
- add ParseContext.reset(), update addChild() ([d47c0a2](https://github.com/thi-ng/umbrella/commit/d47c0a2))
- initial checkin grammar compiler ([38e9c66](https://github.com/thi-ng/umbrella/commit/38e9c66))
- add dynamic() & DynamicParser ([b914267](https://github.com/thi-ng/umbrella/commit/b914267))
- add more whitespace presets ([1398e2b](https://github.com/thi-ng/umbrella/commit/1398e2b))
- add skipWhile(), more discarded wrappers ([832c0b7](https://github.com/thi-ng/umbrella/commit/832c0b7))
  - add skipWhile()
  - add dalt(), dseq() wrappers
  - add NL, DNL presets
  - add ParseContext .state setter

#### ♻️ Refactoring

- update grammar & pkg re-exports ([3ba8973](https://github.com/thi-ng/umbrella/commit/3ba8973))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.2.0) (2020-04-17)

#### 🚀 Features

- add/rename/reorg parsers, xforms, ctx ([ee537f4](https://github.com/thi-ng/umbrella/commit/ee537f4))
  - add dlit(), dstring()
  - add fail()
  - rename lift() => pass(), Lift<T> => PassValue<T>
  - rename merge()/xfMerge() => join()/xfJoin()
  - add hoist()/xfHoist()
  - migrate xform syntax sugars to /xform
  - add indent() util for ParseContext & print()

#### ⏱ Performance improvements

- major speedup satisfy() (~1.6x faster) ([8ca5c7f](https://github.com/thi-ng/umbrella/commit/8ca5c7f))
  - update ParseContext.addChild() to optionally progress reader
  - update call sites in satisfy(), lift(), repeat()

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@0.1.0) (2020-04-16)

#### 🚀 Features

- update defContext, add basic array test ([cd7363d](https://github.com/thi-ng/umbrella/commit/cd7363d))
- make retained state info optional ([a89ee87](https://github.com/thi-ng/umbrella/commit/a89ee87))
- add ArrayReader, update pkg info ([3bec0db](https://github.com/thi-ng/umbrella/commit/3bec0db))
- add ctx getters, add presets, update maybe ([02597bf](https://github.com/thi-ng/umbrella/commit/02597bf))
- update ParseContext, repeat & lift ([bef1d4f](https://github.com/thi-ng/umbrella/commit/bef1d4f))
  - add context debug option / tracing
  - add .addChild()
  - update repeat zero-match handling
  - simplify lift()
- add collect/xfCollect, update xfPrint ([43f3368](https://github.com/thi-ng/umbrella/commit/43f3368))
- update repeat ops, reader, initial state ([c5cfabe](https://github.com/thi-ng/umbrella/commit/c5cfabe))
- import as new package ([151e50c](https://github.com/thi-ng/umbrella/commit/151e50c))

#### ♻️ Refactoring

- split presets into sep files ([43f62c5](https://github.com/thi-ng/umbrella/commit/43f62c5))
- update context, rename ops, remove arrays dep ([a913c96](https://github.com/thi-ng/umbrella/commit/a913c96))
