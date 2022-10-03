<!-- This file is generated - DO NOT EDIT! -->

# ![transducers-fsm](https://media.thi.ng/umbrella/banners-20220914/thing-transducers-fsm.svg?badc9ef5)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transducers-fsm.svg)](https://www.npmjs.com/package/@thi.ng/transducers-fsm)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers-fsm.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
  - [3-state FSM](#3-state-fsm)
- [API](#api)
  - [fsm transducer](#fsm-transducer)
- [Authors](#authors)
- [License](#license)

## About

Transducer-based Finite State Machine transformer. This is a support package for [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).

This package provides a single function, a general purpose [Finite State
Machine](https://en.wikipedia.org/wiki/Finite-state_machine) transducer,
which acts as useful & lightweight mechanism to provide
context-sensitive processing capabilities as part of a transducer
transformation pipeline.

## Status

**DEPRECATED** - no further development planned

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btransducers-fsm%5D+in%3Atitle)

This package might be merged with (or deprecated by) the newer
[@thi.ng/parse](https://github.com/thi-ng/umbrella/tree/develop/packages/parse)
package.

## Related packages

- [@thi.ng/fsm](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm) - Composable primitives for building declarative, transducer based Finite-State Machines & matchers for arbitrary data streams
- [@thi.ng/sax](https://github.com/thi-ng/umbrella/tree/develop/packages/sax) - Transducer-based, SAX-like, non-validating, speedy & tiny XML parser

## Installation

```bash
yarn add @thi.ng/transducers-fsm
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/transducers-fsm"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const transducersFsm = await import("@thi.ng/transducers-fsm");
```

Package sizes (gzipped, pre-treeshake): ESM: 240 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

For a real world example, the
[@thi.ng/sax](https://github.com/thi-ng/umbrella/tree/develop/packages/sax)
package provides a SAX-like XML parser transducer, built around the FSM
provided here.

### 3-state FSM

The following example defines a simple FSM with 3 states:

- `skip`
- `take`
- `done`

The FSM always starts in the `skip` state.

The FSM alternates between skipping or consuming (passing through) 5
inputs as long as each input is < 20. Once an input is >= 20, the FSM
switches into the `done` state, which has been declared as a *terminal*
state and once entered will cause processing to terminate (also see API
description further below).

```ts
import { fsm } from '@thi.ng/transducers-fsm'
import * as tx from '@thi.ng/transducers'
import { isOdd } from '@thi.ng/checks'

const testFSM = fsm({

    // initial state initializer
    // (called before processing 1st input)
    init: () => ({ state: "skip", count: 0 }),

    // terminal state ID
    terminate: "done",

    // individual state handlers
    states: {
        // skip state
        skip: (state, x) => {
            if (x < 20) {
                if (++state.count > 5) {
                    state.state = "take";
                    state.count = 1;
                    return [x];
                }
            } else {
                state.state = "done";
            }
        },

        // take state
        take: (state, x) => {
            if (x < 20) {
                if (++state.count > 5) {
                    state.state = "skip";
                    state.count = 1;
                } else {
                    return [x];
                }
            } else {
                state.state = "done";
            }
        },

        // terminal state, ignore inputs
        done: () => { },
    },
});

[...tx.iterator(testFSM, tx.range(100))]
// [ 5, 6, 7, 8, 9, 15, 16, 17, 18, 19 ]

// Use FSM as part of composed transducers...

[...tx.iterator(tx.comp(tx.takeNth(2), testFSM), tx.range(100))]
// [ 10, 12, 14, 16, 18 ]

[
    ...tx.iterator(
        tx.comp(
            tx.mapcat((x) => x.split(/[,\s]+/g)),
            tx.map((x) => parseInt(x)),
            testFSM,
            tx.filter(isOdd)
        ),
        ["9,8,7,6", "14 1 0 17 15 16", "19,23,12,42,4"]
    )
]
// [ 1, 17, 15 ]
```

## API

[Generated API docs](https://docs.thi.ng/umbrella/transducers-fsm/)

### fsm transducer

`fsm<T extends FSMState, A, B>(opts: FSMOpts<T, A, B[]>): Transducer<A, B>`

Finite State Machine transducer. Takes an FSM configuration object and
returns a transducer, which processes inputs using the provided state
handler functions, which in turn can produce any number of outputs per
consumed input.

Before processing the first input, the FSM state is initialized by
calling the user provided `init()` function, which MUST return a state
object with at least a `state` key, whose value is used for dynamic
(i.e. stateful) dispatch during input processing. This state object is
passed with each input value to the current state handler, which is
expected to mutate this object, e.g. to cause state changes based on
given inputs.

If a state handler needs to "emit" results for downstream processing, it
can return an array of values. Any such values are passed on
(individually, not as array) to the next reducer in the chain. If a
state handler returns `null` or `undefined`, further downstream
processing of the current input is skipped.

Regardless of return value, if a state handler has caused a state change
to the configured `terminate` state, processing is terminated (by calling
`ensureReduced()`) and no further inputs will be consumed.

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-transducers-fsm,
  title = "@thi.ng/transducers-fsm",
  author = "Karsten Schmidt",
  note = "https://thi.ng/transducers-fsm",
  year = 2018
}
```

## License

&copy; 2018 - 2022 Karsten Schmidt // Apache Software License 2.0
