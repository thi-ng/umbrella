# @thi.ng/transducers-hdom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/transducers-hdom.svg)](https://www.npmjs.com/package/@thi.ng/transducers-hdom)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

This package provides a single `updateUI` function, a side-effecting &
stateful transducer which receives
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
component trees, diffs each against the previous value and applies any
required changes to the browser DOM, starting at given root element. By
default, incoming values are first normalized using @thi.ng/hdom's
`normalizeTree()` function.

This transducer is primarily intended for
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)-based
dataflow graphs, where this transducer can be used as final leaf
subscription / transformer to reflect UI changes back to the user,
without using the standard RAF update loop used by @thi.ng/hdom by
default. In this setup, UI updates will only be performed if the stream
this transducer is attached to receives new values (i.e. hdom component
trees).

## Installation

```bash
yarn add @thi.ng/transducers-hdom
```

## Usage examples

The below example is also available in the
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples/transducers-hdom)
directory.

[Live demo](https://demo.thi.ng/umbrella/transducers-hdom/)

```ts
import * as rs from "@thi.ng/rstream";
import * as tx from "@thi.ng/transducers";
import { updateUI } from "@thi.ng/transducers-hdom";

// root component function
const app = ({ ticks, clicks }) =>
    ["div",
        `${ticks} ticks and `,
        ["a",
            { href: "#", onclick: () => clickStream.next(0) },
            `${clicks} clicks`]
    ];

// click stream (click counter)
const clickStream = new rs.Stream().transform(tx.scan(tx.count(-1)));

// stream combinator
rs.sync({
    src: {
        ticks: rs.fromInterval(1000),
        clicks: clickStream,
    },
    reset: false,
}).transform(
    // transform into hdom component
    tx.map(app),
    // apply as DOM
    updateUI(document.body)
);

// kick off
clickStream.next(0);
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
