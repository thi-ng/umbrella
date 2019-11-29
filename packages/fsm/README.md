<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/fsm

[![npm version](https://img.shields.io/npm/v/@thi.ng/fsm.svg)](https://www.npmjs.com/package/@thi.ng/fsm)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/fsm.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Matchers](#matchers)
  - [FSM transducer](#fsm-transducer)
- [Authors](#authors)
- [License](#license)

## About

Composable primitives for building declarative, transducer based Finite-State Machines & matchers for arbitrary data streams.

See the [hiccup-markdown
parser](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-markdown/src/parser.ts)
& [example](https://demo.thi.ng/umbrella/markdown/) for a concrete use
case.

### Status

**ALPHA** - bleeding edge / work-in-progress

This package will be merged with and update the existing
[@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-fsm)
package.

## Installation

```bash
yarn add @thi.ng/fsm
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/master/packages/arrays)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### markdown <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/markdown-parser.jpg)

Minimal Markdown to Hiccup to HTML parser / transformer

[Live demo](https://demo.thi.ng/umbrella/markdown/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/markdown)

## API

[Generated API docs](https://docs.thi.ng/umbrella/fsm/)

There're two key concepts provided by this package:

### Matchers

Matchers are composable functions which receive a single input value and
attempt to match it to their configured criteria / patterns. Matchers
also support optional user callbacks, which are executed when a match
was made and are responsible for state transitions, state update and
production of any result values.

- [`alts()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/alts.ts)
- [`altsLit()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/alts-lit.ts)
- [`always()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/always.ts)
- [`lit()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/lit.ts)
- [`never()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/never.ts)
- [`not()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/not.ts)
- [`range()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/range.ts) (plus multiple presets)
- [`repeat()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/repeat.ts)
- [`seq()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/seq.ts)
- [`str()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/str.ts)
- [`until()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/until.ts)

See docs strings in `/src` folder for now.

### FSM transducer

The
[`fsm()`](https://github.com/thi-ng/umbrella/tree/master/packages/fsm/src/fsm.ts)
function is a Finite-state machine transducer / iterator with support
for single lookahead values. Takes an object of `states` and their
matchers, an arbitrary context object and an `initial` state ID.

The returned transducer consumes inputs of type `T` and produces results
of type `R`. The results are produced by callbacks of the given state
matchers. Each can produce any number of values. If a callback returns a
result wrapped w/ `reduced()`, the FSM causes early termination of the
overall transducer pipeline. Failed state callbacks too can produce
outputs, but will afterwards terminate the FSM.

An `IllegalStateError` will be thrown if a transition to an undefined
state ID occurs.

The optional `update` function will be invoked for each input prior to
executing the currently active state matcher. It is intended to update
the context object (e.g. to update input location info for generating
error messages).

If the optional `src` iterable is given, the function returns a
transforming iterator of the FSM results.

## Authors

Karsten Schmidt

## License

&copy; 2018 - 2019 Karsten Schmidt // Apache Software License 2.0
