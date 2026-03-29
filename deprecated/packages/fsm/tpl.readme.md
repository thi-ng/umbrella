<!-- include ../../assets/tpl/header.md -->

> [!IMPORTANT]
> This package has been deprecated and superseded by
> [@thi.ng/parse](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/parse/).

<!-- toc -->

## About

{{pkg.description}}

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

There're two key concepts provided by this package:

### Matchers

Matchers are composable functions which receive a single input value and
attempt to match it to their configured criteria / patterns. Matchers
also support optional user callbacks, which are executed when a match
was made and are responsible for state transitions, state update and
production of any result values.

- [`alts()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/alts.ts)
- [`altsLit()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/alts-lit.ts)
- [`always()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/always.ts)
- [`lit()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/lit.ts)
- [`never()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/never.ts)
- [`not()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/not.ts)
- [`range()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/range.ts) (plus multiple presets)
- [`repeat()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/repeat.ts)
- [`seq()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/seq.ts)
- [`str()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/str.ts)
- [`until()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/until.ts)

See docs strings in `/src` folder for now.

### FSM transducer

The
[`fsm()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fsm/src/fsm.ts)
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

<!-- include ../../assets/tpl/footer.md -->
