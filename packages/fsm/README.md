# @thi.ng/fsm

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/fsm.svg)](https://www.npmjs.com/package/@thi.ng/fsm)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/fsm.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

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

<!-- /TOC -->

## About

Functional & composable primitives for building declarative,
[transducer](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
based Finite-State machines and parsers for arbitrary input data streams
(not necessarily string based).

See the [minimal markdown parser
example](https://github.com/thi-ng/umbrella/tree/master/examples/markdown)
for a concrete use case.

## Status

**ALPHA**. This package will be merged with and update the existing
[@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-fsm)
package.

## Installation

```bash
yarn add @thi.ng/fsm
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

Checkout the minimal Markdown parser example:

[Source code](https://github.com/thi-ng/umbrella/tree/master/examples/markdown) |
[Live demo](https://demo.thi.ng/umbrella/markdown/)

The parser itself is defined here:
[@thi.ng/hiccup-markdown](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-markdown/src/parse.ts)

```ts
import * as fsm from "@thi.ng/fsm";
```

## API

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

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
