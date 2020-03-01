<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/transducers-hdom](https://media.thi.ng/umbrella/banners/thing-transducers-hdom.svg?1583078717)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transducers-hdom.svg)](https://www.npmjs.com/package/@thi.ng/transducers-hdom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers-hdom.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Transducer based UI updater for [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom). This is a support package for [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).

This package provides a single `updateDOM` function, a side-effecting &
stateful transducer which receives
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
component trees, diffs each against the previous value and applies any
required changes to the browser DOM, starting at given root element. By
default, incoming values are first normalized using @thi.ng/hdom's
`normalizeTree()` function. See [hdom's `start()`
function](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom#start)
for more details.

If the `hydrate` option is given, the first received tree is only used
to inject event listeners and initialize components with lifecycle
`init()` methods and expects an otherwise identical pre-existing DOM.
All succeeding trees are diffed then as usual.

This transducer is primarily intended for
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)-based
dataflow graphs, where it can be used as final leaf subscription /
stream transformer to reflect UI changes back to the user, without using
the usual RAF update loop used by @thi.ng/hdom by default. In this
setup, DOM updates will only be performed if the stream this transducer
is attached to receives new values (i.e. hdom component trees).

Please also see the following hdom references for further details:

- [start()](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom/src/start.ts)
- [HDOMOpts](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom/src/api.ts#L19)

### Status

**STABLE** - used in production

### Related packages

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/develop/packages/interceptors) - Interceptor based event bus, side effect & immutable state handling
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) - Reactive streams & subscription primitives for constructing dataflow graphs / pipelines

## Installation

```bash
yarn add @thi.ng/transducers-hdom
```

Package sizes (gzipped): ESM: 0.3KB / CJS: 0.3KB / UMD: 0.4KB

## Dependencies

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

### adaptive-threshold <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/adaptive-threshold.png)

Interactive image processing (adaptive threshold)

[Live demo](https://demo.thi.ng/umbrella/adaptive-threshold/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/adaptive-threshold)

### bitmap-font <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/bitmap-font.gif)

Figlet-style bitmap font creation with transducers

[Live demo](https://demo.thi.ng/umbrella/bitmap-font/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/bitmap-font)

### crypto-chart <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/crypto-chart.png)

Basic crypto-currency candle chart with multiple moving averages plots

[Live demo](https://demo.thi.ng/umbrella/crypto-chart/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/crypto-chart)

### gesture-analysis <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/gesture-analysis.png)

Mouse gesture / stroke analysis, simplification, corner detection

[Live demo](https://demo.thi.ng/umbrella/gesture-analysis/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gesture-analysis)

### hdom-canvas-draw <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-draw.jpg)

Interactive pattern drawing demo using transducers

[Live demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-draw)

### hdom-canvas-shapes <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png)

Various hdom-canvas shape drawing examples & SVG conversion / export

[Live demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)

### imgui <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png)

Canvas based Immediate Mode GUI components

[Live demo](https://demo.thi.ng/umbrella/imgui/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)

### mandelbrot <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mandelbrot.jpg)

Worker based, interactive Mandelbrot visualization

[Live demo](https://demo.thi.ng/umbrella/mandelbrot/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mandelbrot)

### markdown <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/markdown-parser.jpg)

Minimal Markdown to Hiccup to HTML parser / transformer

[Live demo](https://demo.thi.ng/umbrella/markdown/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown)

### multitouch <!-- NOTOC -->

Basic rstream-gestures multi-touch demo

[Live demo](https://demo.thi.ng/umbrella/multitouch/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/multitouch)

### poly-spline <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-spline.png)

Polygon to cubic curve conversion & visualization

[Live demo](https://demo.thi.ng/umbrella/poly-spline/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline)

### rotating-voronoi <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg)

Animated Voronoi diagram, cubic splines & SVG download

[Live demo](https://demo.thi.ng/umbrella/rotating-voronoi/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)

### rstream-event-loop <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-event-loop.png)

Minimal demo of using rstream constructs to form an interceptor-style event loop

[Live demo](https://demo.thi.ng/umbrella/rstream-event-loop/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-event-loop)

### rstream-spreadsheet <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-spreadsheet.png)

rstream based spreadsheet w/ S-expression formula DSL

[Live demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-spreadsheet)

### talk-slides <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/talk-slides.png)

hdom based slide deck viewer & slides from my ClojureX 2018 keynote

[Live demo](https://demo.thi.ng/umbrella/talk-slides/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/talk-slides)

### transducers-hdom <!-- NOTOC -->

Transducer & rstream based hdom UI updates

[Live demo](https://demo.thi.ng/umbrella/transducers-hdom/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/transducers-hdom)

## API

[Generated API docs](https://docs.thi.ng/umbrella/transducers-hdom/)

Code for the above linked [transducers-hdom](#transducers-hdom) example...

```ts
import * as rs from "@thi.ng/rstream";
import * as tx from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";

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
    updateDOM({ root: document.body })
);

// kick off
clickStream.next(0);
```

## Authors

Karsten Schmidt

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
