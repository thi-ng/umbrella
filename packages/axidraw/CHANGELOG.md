# Change Log

- **Last updated**: 2026-01-23T13:09:44Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.1.161](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@1.1.161) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

### [1.1.123](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@1.1.123) (2025-04-16)

#### ♻️ Refactoring

- minor internal optimizations (vector ops) ([adfebba](https://github.com/thi-ng/umbrella/commit/adfebba))

### [1.1.59](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@1.1.59) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@1.1.0) (2023-03-22)

#### 🚀 Features

- add save/restore commands ([317f8e0](https://github.com/thi-ng/umbrella/commit/317f8e0))
  - add/update command types
  - add SAVE/RESTORE to store/restore pen levels
  - update AxiDraw.draw() to restore state after one-off pen config
- update DipOpts & dip() ([52d8924](https://github.com/thi-ng/umbrella/commit/52d8924))
  - rename `down` => `downDelay`, `up` => `upDelay`
  - add `down`/`up` level opts
  - update dip() impl to store/restore pen state if using custom
    up/down levels for dipping
- add palette command seq gens ([0e453c1](https://github.com/thi-ng/umbrella/commit/0e453c1))
  - add linearPalette() & radialPalette() and config options
  - update pkg export maps
- add global clipping bounds option ([a99a58e](https://github.com/thi-ng/umbrella/commit/a99a58e))
  - add AxiDrawOpts.clip
- add support for paper sizes, home offset ([c44510f](https://github.com/thi-ng/umbrella/commit/c44510f))
  - update AxiDrawOpts.bounds to accept paper sizes ([@thi.ng/units](https://github.com/thi-ng/umbrella/tree/main/packages/units) quantities)
  - add AxiDrawOpts.home
  - update AxiDraw ctor & move/sendMove methods
  - add AxiDraw.setHome()
  - update pkg deps

#### ♻️ Refactoring

- remove obsolete clamping ([50978ba](https://github.com/thi-ng/umbrella/commit/50978ba))
  - update linearPalette()
- update bounds handling/clamping ([7850ed6](https://github.com/thi-ng/umbrella/commit/7850ed6))
  - precalc scale factor & bounds in ctor

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@1.0.0) (2023-03-19)

#### 🛑 Breaking changes

- add/update command presets ([610f873](https://github.com/thi-ng/umbrella/commit/610f873))
- BREAKING CHANGE: update DrawCommands and cmd presets
  - update MoveXYCommand to use `"M"`
  - add MoveRelCommand (using `"m"`)
  - add/update AxiDraw.moveTo()/moveRelative()
  - migrate command presets to commands.ts
  - refactor parametric command type presets as functions:
    -  PEN(), UP(), DOWN(), MOVE(), MOVE_REL(), WAIT(), COMMENT()
  - add DIP() command sequence gen

#### 🚀 Features

- add command fns, add COMMENT cmd ([0d64b55](https://github.com/thi-ng/umbrella/commit/0d64b55))
  - add MOVE(), WAIT(), COMMENT()
  - add CommentCommand
  - update AxiDraw.draw() to log comments
- add disconnect() ([af93177](https://github.com/thi-ng/umbrella/commit/af93177))
  - add disconnect() for ISerial & AxiDraw
  - update MockSerial impl
- update commands, docs & pkg exports ([1324cb8](https://github.com/thi-ng/umbrella/commit/1324cb8))
- update dip(), update imports. restructure /src ([b108760](https://github.com/thi-ng/umbrella/commit/b108760))
  - add DipOpts, extend dip() functionality
  - move dip() to own file dip.ts
  - move complete() to commands.ts
  - move registrationMark() to own file registration.ts
  - update all imports
  - update pkg exports map

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@0.5.0) (2023-02-05)

#### 🚀 Features

- add speedUp config, rename speed => speedDown ([197d610](https://github.com/thi-ng/umbrella/commit/197d610))

#### 🩹 Bug fixes

- add [@thi.ng/date](https://github.com/thi-ng/umbrella/tree/main/packages/date) dependency ([bd35a9e](https://github.com/thi-ng/umbrella/commit/bd35a9e))
  required by axidraw.ts

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@0.4.0) (2023-01-10)

#### 🚀 Features

- also send "reset" cmd in .reset() ([30fe365](https://github.com/thi-ng/umbrella/commit/30fe365))
