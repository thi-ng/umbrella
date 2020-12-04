# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

See the [hiccup-markdown
parser](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-markdown/src/parser.ts)
& [example](https://demo.thi.ng/umbrella/markdown/) for a concrete use
case.

${status}

This package will be merged with and update the existing
[@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-fsm)
package.

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

There're two key concepts provided by this package:

### Matchers

Matchers are composable functions which receive a single input value and
attempt to match it to their configured criteria / patterns. Matchers
also support optional user callbacks, which are executed when a match
was made and are responsible for state transitions, state update and
production of any result values.

- [`alts()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/alts.ts)
- [`altsLit()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/alts-lit.ts)
- [`always()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/always.ts)
- [`lit()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/lit.ts)
- [`never()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/never.ts)
- [`not()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/not.ts)
- [`range()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/range.ts) (plus multiple presets)
- [`repeat()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/repeat.ts)
- [`seq()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/seq.ts)
- [`str()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/str.ts)
- [`until()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/until.ts)

See docs strings in `/src` folder for now.

### FSM transducer

The
[`fsm()`](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm/src/fsm.ts)
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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
