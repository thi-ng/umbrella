<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/transducers-hdom](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-transducers-hdom.svg?cba26689)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transducers-hdom.svg)](https://www.npmjs.com/package/@thi.ng/transducers-hdom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers-hdom.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

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

Transducer based UI updater for [@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom). This is a support package for [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers).

This package provides a single `updateDOM` function, a side-effecting &
stateful transducer which receives
[@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom)
component trees, diffs each against the previous value and applies any
required changes to the browser DOM, starting at given root element. By
default, incoming values are first normalized using @thi.ng/hdom's
`normalizeTree()` function. See [hdom's `start()`
function](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom#start)
for more details.

If the `hydrate` option is given, the first received tree is only used
to inject event listeners and initialize components with lifecycle
`init()` methods and expects an otherwise identical pre-existing DOM.
All succeeding trees are diffed then as usual.

This transducer is primarily intended for
[@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream)-based
dataflow graphs, where it can be used as final leaf subscription /
stream transformer to reflect UI changes back to the user, without using
the usual RAF update loop used by @thi.ng/hdom by default. In this
setup, DOM updates will only be performed if the stream this transducer
is attached to receives new values (i.e. hdom component trees).

Please also see the following hdom references for further details:

- [start()](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom/src/start.ts)
- [HDOMOpts](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom/src/api.ts#L19)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Btransducers-hdom%5D)

## Related packages

- [@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/interceptors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/interceptors) - Interceptor based event bus, side effect & immutable state handling
- [@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream) - Reactive streams & subscription primitives for constructing dataflow graphs / pipelines

## Installation

```bash
yarn add @thi.ng/transducers-hdom
```

ESM import:

```ts
import * as th from "@thi.ng/transducers-hdom";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/transducers-hdom"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const th = await import("@thi.ng/transducers-hdom");
```

Package sizes (brotli'd, pre-treeshake): ESM: 272 bytes

## Dependencies

- [@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom)
- [@thi.ng/hiccup](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)

## Usage examples

21 projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                                   | Description                                                                      | Live demo                                                 | Source                                                                                         |
|:---------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:----------------------------------------------------------|:-----------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/adaptive-threshold.png" width="240"/>            | Interactive image processing (adaptive threshold)                                | [Demo](https://demo.thi.ng/umbrella/adaptive-threshold/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/adaptive-threshold)  |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/canvas-dial.png" width="240"/>                   | Canvas based dial widget                                                         | [Demo](https://demo.thi.ng/umbrella/canvas-dial/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/canvas-dial)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/crypto-chart.png" width="240"/>                  | Basic crypto-currency candle chart with multiple moving averages plots           | [Demo](https://demo.thi.ng/umbrella/crypto-chart/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/crypto-chart)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/fft-synth.png" width="240"/>                     | Interactive inverse FFT toy synth                                                | [Demo](https://demo.thi.ng/umbrella/fft-synth/)           | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/fft-synth)           |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-knn.jpg" width="240"/>                      | Doodle w/ K-nearest neighbor search result visualization                         | [Demo](https://demo.thi.ng/umbrella/geom-knn/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-knn)            |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-knn-hash.jpg" width="240"/>                 | K-nearest neighbor search in an hash grid                                        | [Demo](https://demo.thi.ng/umbrella/geom-knn-hash/)       | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-knn-hash)       |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/gesture-analysis.png" width="240"/>              | Mouse gesture / stroke analysis, simplification, corner detection                | [Demo](https://demo.thi.ng/umbrella/gesture-analysis/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/gesture-analysis)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/hdom-canvas-draw.jpg" width="240"/>              | Interactive pattern drawing demo using transducers                               | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-canvas-draw)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export             | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-canvas-shapes)  |
|                                                                                                                                              | Isolated, component-local DOM updates                                            | [Demo](https://demo.thi.ng/umbrella/hdom-local-render/)   | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-local-render)   |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/imgui/imgui-all.png" width="240"/>                        | Canvas based Immediate Mode GUI components                                       | [Demo](https://demo.thi.ng/umbrella/imgui/)               | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/imgui)               |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/mandelbrot.jpg" width="240"/>                    | Worker based, interactive Mandelbrot visualization                               | [Demo](https://demo.thi.ng/umbrella/mandelbrot/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/mandelbrot)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/markdown-parser.jpg" width="240"/>               | Markdown to Hiccup to HTML parser / transformer                                  | [Demo](https://demo.thi.ng/umbrella/markdown/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/markdown)            |
|                                                                                                                                              | Basic rstream-gestures multi-touch demo                                          | [Demo](https://demo.thi.ng/umbrella/multitouch/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/multitouch)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/poly-spline.png" width="240"/>                   | Polygon to cubic curve conversion & visualization                                | [Demo](https://demo.thi.ng/umbrella/poly-spline/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/poly-spline)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rotating-voronoi.jpg" width="240"/>              | Animated Voronoi diagram, cubic splines & SVG download                           | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rotating-voronoi)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rstream-event-loop.png" width="240"/>            | Minimal demo of using rstream constructs to form an interceptor-style event loop | [Demo](https://demo.thi.ng/umbrella/rstream-event-loop/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rstream-event-loop)  |
|                                                                                                                                              | rstream based UI updates & state handling                                        | [Demo](https://demo.thi.ng/umbrella/rstream-hdom/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rstream-hdom)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rstream-spreadsheet.png" width="240"/>           | rstream based spreadsheet w/ S-expression formula DSL                            | [Demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rstream-spreadsheet) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/talk-slides.png" width="240"/>                   | hdom based slide deck viewer & slides from my ClojureX 2018 keynote              | [Demo](https://demo.thi.ng/umbrella/talk-slides/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/talk-slides)         |
|                                                                                                                                              | Transducer & rstream based hdom UI updates                                       | [Demo](https://demo.thi.ng/umbrella/transducers-hdom/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/transducers-hdom)    |

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

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-transducers-hdom,
  title = "@thi.ng/transducers-hdom",
  author = "Karsten Schmidt",
  note = "https://thi.ng/transducers-hdom",
  year = 2018
}
```

## License

&copy; 2018 - 2026 Karsten Schmidt // Apache License 2.0
