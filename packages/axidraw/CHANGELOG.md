# Change Log

- **Last updated**: 2024-01-30T21:37:18Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@0.3.0) (2022-12-29)

#### 🚀 Features

- add draw metrics ([0ff015c](https://github.com/thi-ng/umbrella/commit/0ff015c))
  - add Metrics interface
  - update AxiDraw.draw() to record metrics
  - update .moveTo() to return delay & distance
- add serial port abstraction & impls ([c774da1](https://github.com/thi-ng/umbrella/commit/c774da1))
  - add SerialConnection adapter
  - add `SERIAL_PORT` default impl (actual serial port)
  - add `MOCK_SERIAL` & MockSerial impl for testing
  - update AxiDrawOpts & AxiDraw to use adapter only
- add registrationMark() util, fix imports ([e05e99d](https://github.com/thi-ng/umbrella/commit/e05e99d))
- add Metrics.penCommands, fix nested metrics handling ([a7149cd](https://github.com/thi-ng/umbrella/commit/a7149cd))
  - add counter for pen up/down commands
  - add start/stop cmd metrics to current tally

#### ♻️ Refactoring

- update "no-browser" pkg handling ([0e84f1b](https://github.com/thi-ng/umbrella/commit/0e84f1b))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@0.2.0) (2022-12-10)

#### 🚀 Features

- major updates/additions ([eb41c28](https://github.com/thi-ng/umbrella/commit/eb41c28))
  - extract polyline() as standalone fn
  - add complete() syntax sugar
  - update UP/DOWN commands to accept opt. pen level/position
  - add RESET command
  - extract various draw commands into separate methods, simplify draw()
  - update draw() w/ FSM to pause/resume/cancel processing
  - add AxiDrawState FSM enum
  - add AxiDrawControl class, use as default controller
  - update AxiDrawOpts w/ new options
  - update connect() to throw error if unsuccessful
  - add SIGINT signal handler to handle Ctrl+C
- update .draw() to auto-wrap command seq ([60aaad2](https://github.com/thi-ng/umbrella/commit/60aaad2))
- add PolylineOpts, update polyline() ([c8a271f](https://github.com/thi-ng/umbrella/commit/c8a271f))

#### 🩹 Bug fixes

- fix polyline(), only apply custom speed for drawing ([c43b6f5](https://github.com/thi-ng/umbrella/commit/c43b6f5))
- update draw calls to disable cmd wrapping ([4cd5e53](https://github.com/thi-ng/umbrella/commit/4cd5e53))
- fix waiting for start/stop/home commands ([42bf4eb](https://github.com/thi-ng/umbrella/commit/42bf4eb))

#### ⏱ Performance improvements

- remove obsolete UP command (and delay) in polyline() ([f71c64b](https://github.com/thi-ng/umbrella/commit/f71c64b))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@0.1.0) (2022-12-06)

#### 🚀 Features

- import as new pkg ([cc43e84](https://github.com/thi-ng/umbrella/commit/cc43e84))
- arbitrary unit support, measure draw time ([32e3212](https://github.com/thi-ng/umbrella/commit/32e3212))
  - add AxiDrawOpts.unitsPerInch to support any worldspace units
  - remove paperSize opt
  - add command constants for better mem use
  - update AxiDraw.draw() to measure & return time taken
  - add/update doc strings
