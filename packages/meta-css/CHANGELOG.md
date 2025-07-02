# Change Log

- **Last updated**: 2025-07-02T09:55:21Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.19.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.19.2) (2025-06-27)

#### ♻️ Refactoring

- minor update CLI wrapper ([e0b0c34](https://github.com/thi-ng/umbrella/commit/e0b0c34))

## [0.19.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.19.0) (2025-06-26)

#### 🚀 Features

- add support for string literals in var assignments ([2749c30](https://github.com/thi-ng/umbrella/commit/2749c30))
  - use string lit to ignore white space in var assignments
    - `name="a b c"` => `--name: a b c;`
  - add/update tests
- add tween-colors() template fn ([a5b8f9d](https://github.com/thi-ng/umbrella/commit/a5b8f9d))
- add border-style specs ([c4cbd2f](https://github.com/thi-ng/umbrella/commit/c4cbd2f))
- add/replace color ops ([ba78142](https://github.com/thi-ng/umbrella/commit/ba78142))
  - replace existing `def-rgb/hsl/lch` / `adjust-rgb/hsl/lch` with:
    - `adjust-color()`
    - `lighten-color()`
    - `rotate-color()`
    - `saturate-color()`
    - `with-alpha()`
  - all color ops using `oklch()` now
- add `font-family()` tpl fn ([38c65d4](https://github.com/thi-ng/umbrella/commit/38c65d4))

## [0.18.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.18.0) (2025-02-11)

#### 🚀 Features

- update CLI wrapper, make `bun` optional ([a694c9d](https://github.com/thi-ng/umbrella/commit/a694c9d))
  - check if `bun` is available, otherwise fallback to `node`
  - update CLI args (add metacss pkg dir)
  - update readme

### [0.17.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.17.8) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [0.17.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.17.4) (2024-12-13)

#### 🩹 Bug fixes

- update var assignment check in parser ([7dfe792](https://github.com/thi-ng/umbrella/commit/7dfe792))
  - use more strict regexp to check for var assignment
  - update tests

### [0.17.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.17.3) (2024-12-12)

#### 🩹 Bug fixes

- support `:` in template args ([a5657dd](https://github.com/thi-ng/umbrella/commit/a5657dd))
  - update `__parseMediaQueryToken()`
  - add/update tests

## [0.17.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.17.0) (2024-11-24)

#### 🚀 Features

- update width/height specs ([5e59d5e](https://github.com/thi-ng/umbrella/commit/5e59d5e))
- remove obsolete template defs, update readme ([2f607c0](https://github.com/thi-ng/umbrella/commit/2f607c0))
  - commit which actually removed defs: [ecac29da87](https://github.com/thi-ng/umbrella/commit/ecac29da87)

#### 🩹 Bug fixes

- update `i` key/index handling in generator rules ([4150775](https://github.com/thi-ng/umbrella/commit/4150775))
- update verbatim prop parsing ([0876811](https://github.com/thi-ng/umbrella/commit/0876811))
  - fixes nested selectors in the form `[sel] { ... }`
  - update tests

#### ♻️ Refactoring

- remove obsolete default template specs ([ecac29d](https://github.com/thi-ng/umbrella/commit/ecac29d))
  - remove template specs from base framework which can be easily replicated
    via verbatim properties
    - i.e. `prop-name(value)` => `prop-name-[value]`
  - update framework version
  - update readme

### [0.16.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.16.1) (2024-11-15)

#### 🩹 Bug fixes

- fix parser to priortize var assignments ([937ed79](https://github.com/thi-ng/umbrella/commit/937ed79))
  - order of checks in previous impl didn't allow for
    `var2=var(--var1)` style assignments
  - update tests

## [0.16.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.16.0) (2024-11-15)

#### 🚀 Features

- add verbatim property syntax ([0233ba1](https://github.com/thi-ng/umbrella/commit/0233ba1))
  - add support for `prop-name-[value]` syntax in .mcss stylesheets
  - add/update tests
- add/update framework specs ([7069752](https://github.com/thi-ng/umbrella/commit/7069752))

### [0.15.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.15.11) (2024-11-13)

#### 🩹 Bug fixes

- fix `fill()` template spec ([9151d85](https://github.com/thi-ng/umbrella/commit/9151d85))

## [0.15.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.15.0) (2024-08-28)

#### 🚀 Features

- update font-family tpl ([56dd1d3](https://github.com/thi-ng/umbrella/commit/56dd1d3))

## [0.14.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.14.0) (2024-08-18)

#### 🚀 Features

- add shadow templates ([5a1b3f9](https://github.com/thi-ng/umbrella/commit/5a1b3f9))

## [0.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.13.0) (2024-08-13)

#### 🚀 Features

- add `br-pill` variations ([c293f5f](https://github.com/thi-ng/umbrella/commit/c293f5f))

### [0.12.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.12.2) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [0.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.12.0) (2024-04-26)

#### 🚀 Features

- add color-scheme, light-dark() and appearance rules/tpls ([5f90a48](https://github.com/thi-ng/umbrella/commit/5f90a48))

### [0.11.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.11.1) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([1455b8f](https://github.com/thi-ng/umbrella/commit/1455b8f))

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.11.0) (2024-04-11)

#### 🚀 Features

- add/update CSS rule specs ([dfab906](https://github.com/thi-ng/umbrella/commit/dfab906))

### [0.10.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.10.3) (2024-04-08)

#### ♻️ Refactoring

- update reducer handling due to updates in [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/main/packages/transducers) pkg ([6eba744](https://github.com/thi-ng/umbrella/commit/6eba744))

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.10.0) (2024-03-27)

#### 🚀 Features

- add/update CSS specs ([e93d033](https://github.com/thi-ng/umbrella/commit/e93d033))
- update responsive media query breakpoints ([f61a119](https://github.com/thi-ng/umbrella/commit/f61a119))
- add `font-family()` template spec ([849c104](https://github.com/thi-ng/umbrella/commit/849c104))
- add `doc` command, update script aliases ([943b7d7](https://github.com/thi-ng/umbrella/commit/943b7d7))
- add CSS scoping option, internal refactor ([d7286c5](https://github.com/thi-ng/umbrella/commit/d7286c5))

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.9.0) (2024-03-21)

#### 🚀 Features

- check for invalid template IDs ([ceb8bb2](https://github.com/thi-ng/umbrella/commit/ceb8bb2))
- add/update CSS specs/templates ([468877b](https://github.com/thi-ng/umbrella/commit/468877b))
- add CSS specs/templates, update readme ([febe609](https://github.com/thi-ng/umbrella/commit/febe609))

### [0.8.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.8.1) (2024-03-18)

#### 🩹 Bug fixes

- fix template unit alias handling ([d7f11c0](https://github.com/thi-ng/umbrella/commit/d7f11c0))
  - update TEMPLATE_UNITS aliases
  - update __templateValue() helper
  - add tests

#### ♻️ Refactoring

- rename fill/stroke specs, update color ops docs ([731ad15](https://github.com/thi-ng/umbrella/commit/731ad15))

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.8.0) (2024-03-17)

#### 🚀 Features

- add/update animation genspecs ([d7cb506](https://github.com/thi-ng/umbrella/commit/d7cb506))
  - add animation-delay
  - add shrink anim & keyframes
- add support for templated class specs ([eb09f16](https://github.com/thi-ng/umbrella/commit/eb09f16))
  - add TemplateSpec, update CompiledSpecs
  - add expandTemplateSpec()
  - update expandSpec() to also handle templates, compute tpl arity
  - update generateFramework(), make specs/templates optional
  - update convert command impl to support templates
  - refactor export command impl
  - add/update tests
- add/update framework specs/templates ([119f385](https://github.com/thi-ng/umbrella/commit/119f385))
- update spec format, add spec doc object & handling ([dc63b3a](https://github.com/thi-ng/umbrella/commit/dc63b3a))
  - update expandSpec() to handle docs & interpolate doc strings
  - refactor convert & export commands
- major update base framework specs ([a985039](https://github.com/thi-ng/umbrella/commit/a985039))
  - add docs for all specs
  - refactor various specs as parametric templates
    - massively reduce number of specs (~90 less)
  - rename various specs to be less cryptic
- major update spec doc generator ([7117ae9](https://github.com/thi-ng/umbrella/commit/7117ae9))
- improve doc interpolation ([9509cc3](https://github.com/thi-ng/umbrella/commit/9509cc3))
  - also process doc strings for template args
  - extract __interpolateDoc() helper
- update stylesheet line parsing ([ee43572](https://github.com/thi-ng/umbrella/commit/ee43572))
  - add splitLine() to correctly handle more complex tokenization rules
    and perform more checks (e.g. parens matching, nesting)
  - add tests
- add color operation templates (rgb, hsl, lch, oklch) ([b49860e](https://github.com/thi-ng/umbrella/commit/b49860e))
- add/update template specs ([e4ef222](https://github.com/thi-ng/umbrella/commit/e4ef222))

#### 🩹 Bug fixes

- comma-handling in template arg list parsing ([e8d45a5](https://github.com/thi-ng/umbrella/commit/e8d45a5))
  - use negative lookbehind to support `\,` comma-escaping in single args
- update template arity calculation ([ac50c39](https://github.com/thi-ng/umbrella/commit/ac50c39))

#### ♻️ Refactoring

- update color var templates ([5f08683](https://github.com/thi-ng/umbrella/commit/5f08683))
  - update color(), bg-color(), border-color(), fill(), stroke()
    - now accepting full var name as arg, rather than just an index

### [0.7.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.7.5) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://github.com/thi-ng/umbrella/commit/c71a526))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.7.0) (2024-02-10)

#### 🚀 Features

- add `develop` cmd, update file watchers ([0380923](https://github.com/thi-ng/umbrella/commit/0380923))
  - update `convert` and `generate` commands
  - add `develop` command as combined workflow wrapper
  - extract & re-use file watching setup

### [0.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.6.1) (2024-01-26)

#### ♻️ Refactoring

- update file watchers ([bb4d661](https://github.com/thi-ng/umbrella/commit/bb4d661))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.6.0) (2024-01-23)

#### 🚀 Features

- update .mcss syntax, support var assignments ([468c9c5](https://github.com/thi-ng/umbrella/commit/468c9c5))
  - update syntax to support `varname=value` assignments (incl. media prefixes)
  - add tests
- add --only-decls option for export cmd ([ef8ef65](https://github.com/thi-ng/umbrella/commit/ef8ef65))
- update/add/rename commands ([3628c4c](https://github.com/thi-ng/umbrella/commit/3628c4c))
  - rename `convert` => `bundle`
  - add new `convert` command to transpile individual stylesheets
  - update CLI arg specs/re-use
- merge bundle & convert cmds ([a2187cb](https://github.com/thi-ng/umbrella/commit/a2187cb))

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.5.1) (2023-12-31)

#### ♻️ Refactoring

- update spec format (key & variations) ([f7f2d09](https://github.com/thi-ng/umbrella/commit/f7f2d09))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.5.0) (2023-12-28)

#### 🚀 Features

- add supported for quoted fns ([5d8e2fc](https://github.com/thi-ng/umbrella/commit/5d8e2fc))
- update generate cmd input handling ([c156762](https://github.com/thi-ng/umbrella/commit/c156762))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.4.0) (2023-12-26)

#### 🚀 Features

- add support for file-local variation defs ([3a8e1a3](https://github.com/thi-ng/umbrella/commit/3a8e1a3))
- support parametric units in generator specs ([004a23d](https://github.com/thi-ng/umbrella/commit/004a23d))
- add support for hiccup-css declarations ([cd2ceca](https://github.com/thi-ng/umbrella/commit/cd2ceca))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.3.0) (2023-12-22)

#### 🚀 Features

- update convert cmd ([d0275ce](https://github.com/thi-ng/umbrella/commit/d0275ce))
  - add --eval option to convert from string arg

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.2.0) (2023-12-21)

#### 🚀 Features

- update specs/format, simplify generate, update tests ([394ba09](https://github.com/thi-ng/umbrella/commit/394ba09))
- update specs format, add support for user data ([7e3ec01](https://github.com/thi-ng/umbrella/commit/7e3ec01))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.1.1) (2023-12-18)

#### ♻️ Refactoring

- update export cmd args ([7a2feaf](https://github.com/thi-ng/umbrella/commit/7a2feaf))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/meta-css@0.1.0) (2023-12-18)

#### 🚀 Features

- import as new pkg ([08628b3](https://github.com/thi-ng/umbrella/commit/08628b3))
- switch generated framework output to JSON, simplify ([8850cae](https://github.com/thi-ng/umbrella/commit/8850cae))
- merge media query refs from all inputs ([34047c9](https://github.com/thi-ng/umbrella/commit/34047c9))
- dedupe & merge all selectors & decls ([fd333c8](https://github.com/thi-ng/umbrella/commit/fd333c8))
- add input file watching ([717dbe1](https://github.com/thi-ng/umbrella/commit/717dbe1))
- add error handling for watch mode ([3b8dab9](https://github.com/thi-ng/umbrella/commit/3b8dab9))
- add support for line comments in .meta files ([a6273c8](https://github.com/thi-ng/umbrella/commit/a6273c8))
- add export cmd, update other cmds & arg handling ([f8b326a](https://github.com/thi-ng/umbrella/commit/f8b326a))
- add pretty printing for generate cmd ([2c27c9b](https://github.com/thi-ng/umbrella/commit/2c27c9b))
- add convert option to force include CSS classes ([9932e91](https://github.com/thi-ng/umbrella/commit/9932e91))
- update generate & convert cmds ([15daa6e](https://github.com/thi-ng/umbrella/commit/15daa6e))
- support reading force includes from file ([f92456b](https://github.com/thi-ng/umbrella/commit/f92456b))
- update convert cmd flag spec ([606a585](https://github.com/thi-ng/umbrella/commit/606a585))

#### 🩹 Bug fixes

- resolve out file path ([6e7f7dd](https://github.com/thi-ng/umbrella/commit/6e7f7dd))
