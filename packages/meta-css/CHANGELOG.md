# Change Log

- **Last updated**: 2024-02-19T15:50:26Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
