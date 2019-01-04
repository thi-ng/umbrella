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

### FSM transducer

The `fsm()` function returns a Finite-state machine transducer w/
support for single lookahead value. It takes an object of `states` and
their matchers, an arbitrary context object which will be uses as state
container for the various matchers and an `initial` state ID.

The returned transducer consumes inputs of type `T` and produces results
of type `R`. The results are produced by callbacks of the given state
matchers. For each input consumed, the callbacks can produce any number
of result values. If a callback returns a result wrapped w/ `reduced()`,
the FSM causes early termination of the overall transducer pipeline.

See docs strings in `/src` folder for now.

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
