<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/transducers](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-transducers.svg?58ca567a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transducers.svg)](https://www.npmjs.com/package/@thi.ng/transducers)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
  - [9.0.0 release](#900-release)
- [Support packages](#support-packages)
- [Related packages](#related-packages)
  - [Blog posts](#blog-posts)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
  - [Basic usage patterns](#basic-usage-patterns)
  - [Interpolation & SVG generation](#interpolation--svg-generation)
  - [Fuzzy search](#fuzzy-search)
  - [Histogram generation & result grouping](#histogram-generation--result-grouping)
  - [Pagination](#pagination)
  - [Multiplexing / parallel transducer application](#multiplexing--parallel-transducer-application)
  - [Moving average using sliding window](#moving-average-using-sliding-window)
  - [Benchmark function execution time](#benchmark-function-execution-time)
  - [Apply inspectors to debug transducer pipeline](#apply-inspectors-to-debug-transducer-pipeline)
  - [Stream parsing / structuring](#stream-parsing--structuring)
  - [CSV parsing](#csv-parsing)
  - [Early termination](#early-termination)
  - [Scan operator](#scan-operator)
  - [Weighted random choices](#weighted-random-choices)
  - [Keyframe interpolation](#keyframe-interpolation)
- [API](#api)
  - [Types](#types)
    - [Reducer](#reducer)
    - [Reduced](#reduced)
    - [IReducible](#ireducible)
    - [Transducer](#transducer)
    - [IXform interface](#ixform-interface)
  - [Composition & execution](#composition--execution)
    - [comp](#comp)
    - [compR](#compr)
    - [iterator](#iterator)
    - [reduce](#reduce)
    - [reduceRight](#reduceright)
    - [transduce](#transduce)
    - [transduceRight](#transduceright)
    - [run](#run)
    - [consume](#consume)
  - [Transducers](#transducers)
  - [Generators / Iterators](#generators--iterators)
  - [Reducers](#reducers)
- [Authors](#authors)
- [License](#license)

## About

Collection of ~170 lightweight, composable transducers, reducers, generators, iterators for functional data transformations.

This library provides altogether ~170 transducers, reducers, sequence generators
(ES6 generators/iterators) and additional supporting functions for composing
data transformation pipelines.

The overall concept and many of the core functions offered here are directly
inspired by the original Clojure implementation by Rich Hickey, though the
implementation does heavily differ (also in contrast to some other JS based
implementations) and dozens of less common, but generally highly useful
operators have been added. See full list below.

Furthermore, most transducers & reducers provided here accept an optional input
iterable, which allows them to be used directly as transformers instead of
having to wrap them in one of the execution functions (i.e.
`transduce()`/`transduceRight()`, `reduce()`/`reduceRight()`, `iterator()`,
`run()`, `step()`). If called this way, transducer functions will return a
transforming ES6 iterator (generator) and reducing functions will return a
reduced result of the given input iterable.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btransducers%5D+in%3Atitle)

### 9.0.0 release

This release corrects a longstanding stylistic issue regarding the order of
generic type args given to [`Reducer<A, B>`](#reducer), which now uses the
swapped & more logical order (i.e. reduce from `A` to `B`) and is the same order
of generic type args for `Transducer` and `AsyncTransducer` / `AsyncReducer` (in
the [thi.ng/transducers-async
package](https://github.com/thi-ng/umbrella/blob/develop/packages/transducers-async)).
Most userland code should be unimpacted by this change - this is only a breaking
change for custom reducer impls.

## Support packages

- [@thi.ng/transducers-async](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-async) - Async versions of various highly composable transducers, reducers and iterators
- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary) - Binary data related transducers & reducers
- [@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-fsm) - Transducer-based Finite State Machine transformer
- [@thi.ng/transducers-hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-hdom) - Transducer based UI updater for [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
- [@thi.ng/transducers-patch](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-patch) - Reducers for patch-based, immutable-by-default array & object editing
- [@thi.ng/transducers-stats](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats) - Transducers for statistical / technical analysis

## Related packages

- [@thi.ng/csv](https://github.com/thi-ng/umbrella/tree/develop/packages/csv) - Customizable, transducer-based CSV parser/object mapper and transformer
- [@thi.ng/grid-iterators](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators) - 2D grid and shape iterators w/ multiple orderings
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) - Reactive streams & subscription primitives for constructing dataflow graphs / pipelines
- [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-graph) - Declarative dataflow graph construction for [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-log) - Structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/sax](https://github.com/thi-ng/umbrella/tree/develop/packages/sax) - Transducer-based, SAX-like, non-validating, speedy & tiny XML parser

### Blog posts

- [HOFs, Transducers, Reducers](https://medium.com/@thi.ng/of-umbrellas-transducers-reactive-streams-mushrooms-pt-2-9c540beb0023)
- [Convolution, 1D/2D Cellular automata](https://medium.com/@thi.ng/of-umbrellas-transducers-reactive-streams-mushrooms-pt-3-a1c4e621db9b)
- [Disjoint Sets, Graph analysis, Signed Distance Fields](https://medium.com/@thi.ng/of-umbrellas-transducers-reactive-streams-mushrooms-pt-4-62d8e71e5603)

## Installation

```bash
yarn add @thi.ng/transducers
```

ESM import:

```ts
import * as tx from "@thi.ng/transducers";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/transducers"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const tx = await import("@thi.ng/transducers");
```

Package sizes (brotli'd, pre-treeshake): ESM: 9.20 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/timestamp](https://github.com/thi-ng/umbrella/tree/develop/packages/timestamp)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

74 projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                           | Description                                                                                             | Live demo                                                  | Source                                                                                  |
|:-------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------|:----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/adaptive-threshold.png" width="240"/>            | Interactive image processing (adaptive threshold)                                                       | [Demo](https://demo.thi.ng/umbrella/adaptive-threshold/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/adaptive-threshold)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ascii-raymarch.jpg" width="240"/>                | ASCII art raymarching with thi.ng/shader-ast & thi.ng/text-canvas                                       | [Demo](https://demo.thi.ng/umbrella/ascii-raymarch/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ascii-raymarch)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/big-font.png" width="240"/>                      | Large ASCII font text generator using @thi.ng/rdom                                                      | [Demo](https://demo.thi.ng/umbrella/big-font/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/big-font)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/bitmap-font.gif" width="240"/>                   | Figlet-style bitmap font creation with transducers                                                      | [Demo](https://demo.thi.ng/umbrella/bitmap-font/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/bitmap-font)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/canvas-recorder.png" width="240"/>               | Self-modifying, animated typographic grid with emergent complex patterns                                | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/canvas-recorder)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/cellular-automata.png" width="240"/>             | 2D transducer based cellular automata                                                                   | [Demo](https://demo.thi.ng/umbrella/cellular-automata/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/cellular-automata)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-contrast.avif" width="240"/>               | Tool to interactively compute & visualize color contrasts against WCAG threshold                        | [Demo](https://demo.thi.ng/umbrella/color-contrast/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-contrast)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/commit-heatmap.png" width="240"/>                | Heatmap visualization of this mono-repo's commits                                                       |                                                            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/commit-heatmap)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/commit-table-ssr.png" width="240"/>              | Filterable commit log UI w/ minimal server to provide commit history                                    | [Demo](https://demo.thi.ng/umbrella/commit-table-ssr/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/commit-table-ssr)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/crypto-chart.png" width="240"/>                  | Basic crypto-currency candle chart with multiple moving averages plots                                  | [Demo](https://demo.thi.ng/umbrella/crypto-chart/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/crypto-chart)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>               | Color palette generation via dominant color extraction from uploaded images                             | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ellipse-proximity.png" width="240"/>             | Interactive visualization of closest points on ellipses                                                 | [Demo](https://demo.thi.ng/umbrella/ellipse-proximity/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ellipse-proximity)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>                     | Interactive inverse FFT toy synth                                                                       | [Demo](https://demo.thi.ng/umbrella/fft-synth/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fiber-basics.png" width="240"/>                  | Fiber-based cooperative multitasking basics                                                             | [Demo](https://demo.thi.ng/umbrella/fiber-basics/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fiber-basics)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-complex-poly.png" width="240"/>             | Shape conversions & operations using polygons with holes                                                | [Demo](https://demo.thi.ng/umbrella/geom-complex-poly/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-complex-poly)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-csv-piechart.png" width="240"/>             | Piechart visualization of CSV data                                                                      | [Demo](https://demo.thi.ng/umbrella/geom-csv-piechart/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-csv-piechart)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-hexgrid.png" width="240"/>                  | Hex grid generation & tessellations                                                                     | [Demo](https://demo.thi.ng/umbrella/geom-hexgrid/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-hexgrid)         |
|                                                                                                                                      | GPU-based data reduction using thi.ng/shader-ast & WebGL multi-pass pipeline                            | [Demo](https://demo.thi.ng/umbrella/gpgpu-reduce/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gpgpu-reduce)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/grid-iterators.png" width="240"/>                | Visualization of different grid iterator strategies                                                     | [Demo](https://demo.thi.ng/umbrella/grid-iterators/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/grid-iterators)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-benchmark2.png" width="240"/>               | hdom update performance benchmark w/ config options                                                     | [Demo](https://demo.thi.ng/umbrella/hdom-benchmark2/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-benchmark2)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-clock.png" width="240"/>             | Realtime analog clock demo                                                                              | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-clock/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-clock)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-draw.jpg" width="240"/>              | Interactive pattern drawing demo using transducers                                                      | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-draw)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export                                    | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)   |
|                                                                                                                                      | Custom dropdown UI component w/ fuzzy search                                                            | [Demo](https://demo.thi.ng/umbrella/hdom-dropdown-fuzzy/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-dropdown-fuzzy)  |
|                                                                                                                                      | Isolated, component-local DOM updates                                                                   | [Demo](https://demo.thi.ng/umbrella/hdom-local-render/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-local-render)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hiccup-canvas-basics.png" width="240"/>          | Basic hiccup-based canvas drawing                                                                       | [Demo](https://demo.thi.ng/umbrella/hiccup-canvas-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hiccup-canvas-basics) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>                        | Canvas based Immediate Mode GUI components                                                              | [Demo](https://demo.thi.ng/umbrella/imgui/)                | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)                |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png" width="240"/>                      | Animated sine plasma effect visualized using contour lines                                              | [Demo](https://demo.thi.ng/umbrella/iso-plasma/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/json-components.jpg" width="240"/>               | Transforming JSON into UI components                                                                    | [Demo](https://demo.thi.ng/umbrella/json-components/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/json-components)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/layout-gridgen.png" width="240"/>                | Randomized space-filling, nested grid layout generator                                                  | [Demo](https://demo.thi.ng/umbrella/layout-gridgen/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/layout-gridgen)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/lispy-repl.png" width="240"/>                    | Browser REPL for a Lispy S-expression based mini language                                               | [Demo](https://demo.thi.ng/umbrella/lispy-repl/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/lispy-repl)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mandelbrot.jpg" width="240"/>                    | Worker based, interactive Mandelbrot visualization                                                      | [Demo](https://demo.thi.ng/umbrella/mandelbrot/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mandelbrot)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mastodon-feed.jpg" width="240"/>                 | Mastodon API feed reader with support for different media types, fullscreen media modal, HTML rewriting | [Demo](https://demo.thi.ng/umbrella/mastodon-feed/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mastodon-feed)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/optical-flow.avif" width="240"/>                 | Optical flow analysis of web cam or video inputs                                                        | [Demo](https://demo.thi.ng/umbrella/optical-flow/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/optical-flow)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/package-stats.png" width="240"/>                 | CLI util to visualize umbrella pkg stats                                                                |                                                            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/package-stats)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>              | Parser grammar livecoding editor/playground & codegen                                                   | [Demo](https://demo.thi.ng/umbrella/parse-playground/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-waveform.jpg" width="240"/>                | RGB waveform image analysis                                                                             | [Demo](https://demo.thi.ng/umbrella/pixel-waveform/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-waveform)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-spline.png" width="240"/>                   | Polygon to cubic curve conversion & visualization                                                       | [Demo](https://demo.thi.ng/umbrella/poly-spline/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-subdiv.jpg" width="240"/>                   | Animated, iterative polygon subdivisions & visualization                                                | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-subdiv)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/procedural-text.jpg" width="240"/>               | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation                | [Demo](https://demo.thi.ng/umbrella/procedural-text/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/procedural-text)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-synth.png" width="240"/>                    | Unison wavetable synth with waveform editor                                                             | [Demo](https://demo.thi.ng/umbrella/ramp-synth/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ramp-synth)           |
|                                                                                                                                      | Demonstates various rdom usage patterns                                                                 | [Demo](https://demo.thi.ng/umbrella/rdom-basics/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-basics)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-canvas-basics.jpg" width="240"/>            | Minimal rdom-canvas animation                                                                           | [Demo](https://demo.thi.ng/umbrella/rdom-canvas-basics/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-canvas-basics)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-key-sequences.jpg" width="240"/>            | rstream & transducer-based FSM for converting key event sequences into high-level commands              | [Demo](https://demo.thi.ng/umbrella/rdom-key-sequences/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-key-sequences)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lissajous.png" width="240"/>                | rdom & hiccup-canvas interop test                                                                       | [Demo](https://demo.thi.ng/umbrella/rdom-lissajous/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lissajous)       |
|                                                                                                                                      | Full umbrella repo doc string search w/ paginated results                                               | [Demo](https://demo.thi.ng/umbrella/rdom-search-docs/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-search-docs)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-svg-nodes.png" width="240"/>                | rdom powered SVG graph with draggable nodes                                                             | [Demo](https://demo.thi.ng/umbrella/rdom-svg-nodes/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-svg-nodes)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-web-components.png" width="240"/>           | Defining & using basic Web Components (with shadow DOM) via @thi.ng/rdom & @thi.ng/meta-css             | [Demo](https://demo.thi.ng/umbrella/rdom-web-components/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-web-components)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/related-images.jpg" width="240"/>                | Responsive image gallery with tag-based Jaccard similarity ranking                                      | [Demo](https://demo.thi.ng/umbrella/related-images/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/related-images)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/render-audio.png" width="240"/>                  | Generative audio synth offline renderer and WAV file export                                             | [Demo](https://demo.thi.ng/umbrella/render-audio/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/render-audio)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/>              | Animated Voronoi diagram, cubic splines & SVG download                                                  | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rs-dflow.png" width="240"/>                      | Minimal rstream dataflow graph                                                                          | [Demo](https://demo.thi.ng/umbrella/rstream-dataflow/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-dataflow)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-event-loop.png" width="240"/>            | Minimal demo of using rstream constructs to form an interceptor-style event loop                        | [Demo](https://demo.thi.ng/umbrella/rstream-event-loop/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-event-loop)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-grid.jpg" width="240"/>                  | Interactive grid generator, SVG generation & export, undo/redo support                                  | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-grid)         |
|                                                                                                                                      | rstream based UI updates & state handling                                                               | [Demo](https://demo.thi.ng/umbrella/rstream-hdom/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-hdom)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-sync.png" width="240"/>                  | Minimal rstream sync() example using rdom                                                               | [Demo](https://demo.thi.ng/umbrella/rstream-sync/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-sync)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>                    | 2D scenegraph & shape picking                                                                           | [Demo](https://demo.thi.ng/umbrella/scenegraph/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-easings.png" width="240"/>            | Shader-AST meta-programming techniques for animated function plots                                      | [Demo](https://demo.thi.ng/umbrella/shader-ast-easings/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-easings)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/>            | Fork-join worker-based raymarch renderer (JS/CPU only)                                                  | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-barchart.png" width="240"/>                  | Simplistic SVG bar chart component                                                                      | [Demo](https://demo.thi.ng/umbrella/svg-barchart/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-barchart)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-resample.png" width="240"/>                  | SVG path parsing & dynamic resampling                                                                   | [Demo](https://demo.thi.ng/umbrella/svg-resample/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-resample)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-waveform.jpg" width="240"/>                  | Additive waveform synthesis & SVG visualization with undo/redo                                          | [Demo](https://demo.thi.ng/umbrella/svg-waveform/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-waveform)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/talk-slides.png" width="240"/>                   | hdom based slide deck viewer & slides from my ClojureX 2018 keynote                                     | [Demo](https://demo.thi.ng/umbrella/talk-slides/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/talk-slides)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/thing-browser.avif" width="240"/>                | Tree-based UI to find & explore thi.ng projects via their associated keywords                           | [Demo](https://demo.thi.ng/umbrella/thing-browser/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/thing-browser)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>                  | Multi-layer vectorization & dithering of bitmap images                                                  | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/triple-query.png" width="240"/>                  | Triple store query results & sortable table                                                             | [Demo](https://demo.thi.ng/umbrella/triple-query/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/triple-query)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/viz-ridge-lines.avif" width="240"/>              | Interactive ridge-line plot                                                                             | [Demo](https://demo.thi.ng/umbrella/viz-ridge-lines/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/viz-ridge-lines)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/>           | rdom & WebGL-based image channel editor                                                                 | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-channel-mixer)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cube.png" width="240"/>                    | WebGL multi-colored cube mesh                                                                           | [Demo](https://demo.thi.ng/umbrella/webgl-cube/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cube)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-float-fbo.jpg" width="240"/>               | Drawing to floating point offscreen / multi-pass shader pipeline                                        | [Demo](https://demo.thi.ng/umbrella/webgl-float-fbo/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-float-fbo)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-grid.jpg" width="240"/>                    | WebGL instancing, animated grid                                                                         | [Demo](https://demo.thi.ng/umbrella/webgl-grid/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-grid)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-msdf.jpg" width="240"/>                    | WebGL MSDF text rendering & particle system                                                             | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-msdf)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/wolfram.png" width="240"/>                       | 1D Wolfram automata with OBJ point cloud export                                                         | [Demo](https://demo.thi.ng/umbrella/wolfram/)              | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/wolfram)              |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/xml-converter.png" width="240"/>                 | XML/HTML/SVG to hiccup/JS conversion                                                                    | [Demo](https://demo.thi.ng/umbrella/xml-converter/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/xml-converter)        |

### Basic usage patterns

```ts
import { comp, distinct, filter, map } from "@thi.ng/transducers";

// compose transducer
xform = comp(
    filter((x) => (x & 1) > 0), // odd numbers only
    distinct(),                 // distinct numbers only
    map((x) => x * 3)           // times 3
);

import { transduce, push } from "@thi.ng/transducers";

// collect into array (push)
transduce(xform, push(), [1, 2, 3, 4, 5, 4, 3, 2, 1]);
// [ 3, 9, 15 ]

// re-use same xform, but collect into ES6 Set
transduce(xform, conj(), [1, 2, 3, 4, 5, 4, 3, 2, 1]);
// Set { 3, 9, 15 }

import { iterator } from "@thi.ng/transducers";

// or apply as transforming iterator
// no reduction, only transformations
[...iterator(xform, [1, 2, 3, 4, 5])]
// [ 3, 9, 15]

// alternatively provide an input iterable and
// use xform as transforming iterator
[...filter((x) => /[A-Z]/.test(x), "Hello World!")]
// ["H", "W"]

import { step } from "@thi.ng/transducers";

// single step execution
// returns undefined if transducer returned no result for this input
// returns array if transducer step produced multiple results
f = step(xform);
f(1) // 3
f(2) // undefined
f(3) // 9
f(4) // undefined

f = step(take)
```

### Interpolation & SVG generation

This example uses the
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
package for quick SVG generation.

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/transducers/hermite-tx.png)

```ts
import { asSvg, svgDoc, circle, polyline } from "@thi.ng/geom";

// source values
const values = [5, 10, 4, 8, 20, 2, 11, 7];

// interpolate values and transform into 2D points
const vertices = [...iterator(
    comp(
        interpolateHermite(10),
        mapIndexed((x, y) => [x, y])
    ),
    // duplicate first & last vals (1x LHS / 2x RHS)
    // this is only needed for hermite interpolation
    // (see doc string for `interpolateHermite`)
    extendSides(values, 1, 2)
)];

// generate SVG
asSvg(
    svgDoc(
        { width: 800, height: 200, "stroke-width": 0.1 },
        // interpolated points as polyline
        polyline(vertices, { stroke: "red" }),
        // original values as dots
        ...values.map((y, x) => circle([x * 10, y], 0.2))
    )
)
```

### Fuzzy search

```ts
import { filterFuzzy } from "@thi.ng/transducers";

[...filterFuzzy("ho", ["hello", "hallo", "hey", "heyoka"])]
// ["hello", "hallo", "heyoka"]
[...filterFuzzy("hlo", ["hello", "hallo", "hey", "heyoka"])]
// ["hello", "hallo"]

// works with any array-like values & supports custom key extractors
[...filterFuzzy(
    [1, 3],
    { key: (x) => x.tags },
    [
        { tags: [1, 2, 3] },
        { tags: [2, 3, 4] },
        { tags: [4, 5, 6] },
        { tags: [1, 3, 6] }
    ]
)]
// [ { tags: [ 1, 2, 3 ] }, { tags: [ 1, 3, 6 ] } ]
```

### Histogram generation & result grouping

```ts
import { frequencies, map, reduce, transduce } from "@thi.ng/transducers";

// use the `frequencies` reducer to create
// a map counting occurrence of each value
transduce(map((x) => x.toUpperCase()), frequencies(), "hello world");
// Map { 'H' => 1, 'E' => 1, 'L' => 3, 'O' => 2, ' ' => 1, 'W' => 1, 'R' => 1, 'D' => 1 }

// reduction only (no transform)
reduce(frequencies(), [1, 1, 1, 2, 3, 4, 4]);
// Map { 1 => 3, 2 => 1, 3 => 1, 4 => 2 }

// direct reduction if input is given
frequencies([1, 1, 1, 2, 3, 4, 4]);
// Map { 1 => 3, 2 => 1, 3 => 1, 4 => 2 }

// with optional key function, here to bin by word length
frequencies(
    (x) => x.length,
    "my camel is collapsing and needs some water".split(" ")
);
// Map { 2 => 2, 5 => 3, 10 => 1, 3 => 1, 4 => 1 }
```

```ts
import { groupByMap } from "@thi.ng/transducers";

// actual grouping (here: by word length)
groupByMap(
    { key: (x) => x.length },
    "my camel is collapsing and needs some water".split(" ")
);
// Map {
//   2 => [ 'my', 'is' ],
//   3 => [ 'and' ],
//   4 => [ 'some' ],
//   5 => [ 'camel', 'needs', 'water' ],
//   10 => [ 'collapsing' ]
// }
```

### Pagination

```ts
import { page, comp, iterator, map, padLast, range } from "@thi.ng/transducers";

// extract only items for given page id & page length
[...page(0, 5, range(12))]
// [ 0, 1, 2, 3, 4 ]

// when composing with other transducers
// it's most efficient to place `page()` early on in the chain
// that way only the page items will be further processed
[...iterator(comp(page(1, 5), map(x => x * 10)), range(12))]
// [ 50, 60, 70, 80, 90 ]

// use `padLast()` to fill up missing values
[...iterator(comp(page(2, 5), padLast(5, "n/a")), range(12))]
// [ 10, 11, 'n/a', 'n/a', 'n/a' ]

// no values produced for invalid pages
[...page(3, 5, range(12))]
// []
```

### Multiplexing / parallel transducer application

`multiplex` and `multiplexObj` can be used to transform values in
parallel using the provided transducers (which can be composed as usual)
and results in a tuple or keyed object.

```ts
import { map, multiplex, multiplexObj, push, transduce } from "@thi.ng/transducers";

transduce(
    multiplex(
        map((x) => x.charAt(0)),
        map((x) => x.toUpperCase()),
        map((x) => x.length)
    ),
    push(),
    ["Alice", "Bob", "Charlie"]
);
// [ [ "A", "ALICE", 5 ], [ "B", "BOB", 3 ], [ "C", "CHARLIE", 7 ] ]

transduce(
    multiplexObj({
        initial: map((x) => x.charAt(0)),
        name: map((x) => x.toUpperCase()),
        len: map((x) => x.length)
    }),
    push(),
    ["Alice", "Bob", "Charlie"]
);
// [ { len: 5, name: 'ALICE', initial: 'A' },
//   { len: 3, name: 'BOB', initial: 'B' },
//   { len: 7, name: 'CHARLIE', initial: 'C' } ]
```

### Moving average using sliding window

```ts
import { comp, map, mean, partition, push, reduce transduce } from "@thi.ng/transducers";

// use nested reduce to compute window averages
transduce(
    comp(
        partition(5, 1),
        map(x => reduce(mean(), x))
    ),
    push(),
    [1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10]
)
// [ 2.6, 3.4, 4, 4.6, 5.4, 6.2, 6.8, 7.6, 8.4 ]
```

This combined transducer is also directly available as:

```ts
import { movingAverage } from "@thi.ng/transducers";

[...movingAverage(5, [1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10])]
// [ 2.6, 3.4, 4, 4.6, 5.4, 6.2, 6.8, 7.6, 8.4 ]
```

### Benchmark function execution time

```ts
import { benchmark, mean, repeatedly, transduce } from "@thi.ng/transducers";

// function to test
fn = () => {
    let x;
    for (i = 0; i < 1e6; i++) {
        x = Math.cos(i);
    }
    return x;
};

// compute the mean of 100 runs
transduce(benchmark(), mean(), repeatedly(fn, 100));
// 1.93 (milliseconds)
```

### Apply inspectors to debug transducer pipeline

```ts
import { comp, filter, map, push, trace, transduce } from "@thi.ng/transducers";

// alternatively, use sideEffect() for arbitrary side fx
transduce(
    comp(
        trace("orig"),
        map((x) => x + 1),
        trace("mapped"),
        filter((x) => (x & 1) > 0)
    ),
    push(),
    [1, 2, 3, 4]
);
// orig 1
// mapped 2
// orig 2
// mapped 3
// orig 3
// mapped 4
// orig 4
// mapped 5
// [ 3, 5 ]
```

### Stream parsing / structuring

The `struct` transducer is simply a composition of: `partitionOf -> partition -> rename -> mapKeys`. [See code
here](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/struct.ts).

```ts
import { struct } from "@thi.ng/transducers";

// Higher-order transducer to convert linear input into structured objects
// using given field specs and ordering. A single field spec is an array of
// 2 or 3 items: `[name, size, transform?]`. If `transform` is given, it will
// be used to produce the final value for this field. In the example below,
// it is used to unwrap the ID field values, e.g. from `[0] => 0`
[
    ...struct(
        [["id", 1, (id) => id[0]], ["pos", 2], ["vel", 2], ["color", 4]],
        [0, 100, 200, -1, 0, 1, 0.5, 0, 1, 1, 0, 0, 5, 4, 0, 0, 1, 1]
    )
];
// [ { color: [ 1, 0.5, 0, 1 ],
//     vel: [ -1, 0 ],
//     pos: [ 100, 200 ],
//     id: 0 },
//   { color: [ 0, 0, 1, 1 ],
//     vel: [ 5, 4 ],
//     pos: [ 0, 0 ],
//     id: 1 } ]
```

### CSV parsing

```ts
import { comp, map, mapcat, push, rename, transduce } from "@thi.ng/transducers";

transduce(
    comp(
        // split into rows
        mapcat((x) => x.split("\n")),
        // split each row
        map((x) => x.split(",")),
        // convert each row into object, rename array indices
        rename({ id: 0, name: 1, alias: 2, num: "length" })
    ),
    push(),
    ["100,typescript\n101,clojure,clj\n110,rust,rs"]
);
// [ { num: 2, name: 'typescript', id: '100' },
//   { num: 3, alias: 'clj', name: 'clojure', id: '101' },
//   { num: 3, alias: 'rs', name: 'rust', id: '110' } ]
```

### Early termination

```ts
import { comp, flatten, push, take, transduce } from "@thi.ng/transducers";

// result is realized after max. 7 values, irrespective of nesting
transduce(comp(flatten(), take(7)), push(), [
    1,
    [2, [3, 4, [5, 6, [7, 8], 9, [10]]]]
]);
// [1, 2, 3, 4, 5, 6, 7]
```

### Scan operator

```ts
import {
    comp, count, iterator, map, push, pushCopy, repeat, scan, transduce
} from "@thi.ng/transducers";

// this transducer uses 2 scans (a scan = inner reducer per item)
// 1) counts incoming values
// 2) forms an array of the current counter value `x` & repeated `x` times
// 3) emits results as series of reductions in the outer array produced
//    by the main reducer
// IMPORTANT: since arrays are mutable we use `pushCopy` as the inner reducer
// instead of `push` (the outer reducer)
xform = comp(
    scan(count()),
    map(x => [...repeat(x,x)]),
    scan(pushCopy())
)

[...iterator(xform, [1, 1, 1, 1])]
// [ [ [ 1 ] ],
//   [ [ 1 ], [ 2, 2 ] ],
//   [ [ 1 ], [ 2, 2 ], [ 3, 3, 3 ] ],
//   [ [ 1 ], [ 2, 2 ], [ 3, 3, 3 ], [ 4, 4, 4, 4 ] ] ]

// more simple & similar to previous, but without the 2nd xform step
transduce(comp(scan(count()), scan(pushCopy())), push(), [1,1,1,1])
// [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 2, 3, 4 ] ]
```

### Weighted random choices

```ts
import { choices, frequencies, take, transduce } from "@thi.ng/transducers";

[...take(10, choices("abcd", [1, 0.5, 0.25, 0.125]))]
// [ 'a', 'a', 'b', 'a', 'a', 'b', 'a', 'c', 'd', 'b' ]

transduce(
    take(1000),
    frequencies(),
    choices("abcd", [1, 0.5, 0.25, 0.125])
);
// Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
```

### Keyframe interpolation

See
[`tween()`](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/tween.ts)
docs for details.

```ts
import { tween } from "@thi.ng/transducers";

[
    ...tween(
        10,
        0,
        100,
        (a, b) => [a, b],
        ([a, b], t) => Math.floor(a + (b - a) * t),
        [20, 100],
        [50, 200],
        [80, 0]
    )
];
// [ 100, 100, 100, 133, 166, 200, 133, 66, 0, 0, 0 ]
```

## API

[Generated API docs](https://docs.thi.ng/umbrella/transducers/)

### Types

Apart from type aliases, the only real types defined are:

#### Reducer

Reducers are the core building blocks of transducers. Unlike other
implementations using OOP approaches, a `Reducer` in this lib is a simple
3-element array of functions, each addressing a separate processing step.

The bundled reducers are all wrapped in functions to provide a uniform API (and
some of them can be preconfigured and/or are stateful closures). However, it's
completely fine to define stateless reducers as constant arrays.

A `Reducer` is a 3-tuple of functions defining the different stages of a
reduction process: A `Reducer<A, B>` reduces values of type A to a single value
of type B.

The tuple items/functions in order:

1. Initialization function used to produce an initial default result (only used
   if no such initial result was given by the user)
2. Completion function to post-process an already reduced result (for most
   reducers this is merely the identity function)
3. Accumulation function, merging a new input value with the currently existing
   (partially) reduced result/accumulator

```ts
type Reducer<A, B> = [
    // init
    () => B,
    // completion
    (x: B) => B,
    // accumulation
    (acc: B, x: A) => B
];

// A concrete example:
const push: Reducer<any, any[]> = [
    // init
    () => [],
    // completion (nothing to do in this case)
    (acc) => acc,
    // accumulation
    (acc, x) => (acc.push(x), acc)
];
```

#### Reduced

Simple type wrapper to mark & identify a reducer's early termination. Does not
modify wrapped value by injecting magic properties.

```ts
import type { IDeref } from "@thi.ng/api";

class Reduced<T> implements IDeref<T> {
    protected value: T;
    constructor(val: T);
    deref(): T;
}
```

Instances can be created via `reduced(x)` and handled via these helper
functions:

- `reduced(x: any): any`
- `isReduced(x: any): boolean`
- `ensureReduced(x: any): Reduced<any>`
- `unreduced(x: any): any`

#### IReducible

By default `reduce()` consumes inputs via the standard ES6 `Iterable` interface,
i.e. using a `for..of..` loop, but the function also supports optimized routes
for some types: Array-like inputs are consumed via a traditional `for`-loop and
custom optimized iterations can be provided via implementations of the
`IReducible` interface in the source collection type. Examples can be found
here:

- [DCons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons/src/index.ts#L156)
- [SortedMap](https://github.com/thi-ng/umbrella/tree/develop/packages/associative/src/sorted-map.ts#L276)

**Note:** The `IReducible` interface is only used by `reduce()`, `transduce()`
and `run()`.

#### Transducer

From Rich Hickey's original definition:

> A transducer is a transformation from one reducing function to another

As shown in the examples above, transducers can be dynamically composed (using
`comp()`) to form arbitrary data transformation pipelines without causing large
overheads for intermediate collections.

```ts
type Transducer<A, B> = (rfn: Reducer<B, any>) => Reducer<A, any>;

// concrete example of a stateless transducer (expanded for clarity)
function map<A, B>(fn: (x: A) => B): Transducer<A, B> {
    return ([init, complete, reduce]: Reducer<B, any>) => {
        return <Reducer<A, any>>[
            init,
            complete,
            (acc, x: A) => reduce(acc, fn(x))
        ];
    };
}

// stateful transducer
// removes successive value repetitions
function dedupe<T>(): Transducer<T, T> {
    return ([init, complete, reduce]: Reducer<T, any>) => {
        // state initialization
        let prev = {};
        return <Reducer<T, any>>[
            init,
            complete,
            (acc, x) => {
                if (prev !== x) acc = reduce(acc, x);
                prev = x;
                return acc;
            }
        ];
    };
}
```

#### IXform interface

Interface for types able to provide some internal functionality (or derive some
related transformation) as `Transducer`. Implementations of this interface can
be directly passed to all functions in this package where a `Transducer` arg is
expected.

```ts
import { map, push, range, transduce, type IXform } from "@thi.ng/transducers";

class Mul implements IXform<number, number> {

    constructor(public factor = 10) {}

    xform() {
        return map((x) => this.factor * x);
    }
}

transduce(new Mul(11), push(), range(4))
// [0, 11, 22, 33, 44]

import { comp, drop, push, range, takeNth, transduce } from "@thi.ng/transducers";

// also usable w/ comp(), iterator(), step(), run() etc.
transduce(
    comp(drop(1), new Mul(11), takeNth(2)),
    push(),
    range(4)
)
// [11, 33]
```

### Composition & execution

#### comp

`comp(f1, f2, ...)`

Returns new transducer composed from given transducers. Data flow is from left
to right. Offers fast paths for up to 10 args. If more are given, composition is
done dynamically via for loop.

#### compR

`compR(rfn: Reducer<any, any>, fn: (acc, x) => any): Reducer<any, any>`

Helper function to compose reducers.

#### iterator

`iterator<A, B>(tx: Transducer<A, B>, xs: Iterable<A>): IterableIterator<B>`

Similar to `transduce()`, but emits results as ES6 iterator (and hence doesn't
use a reduction function).

#### reduce

`reduce<A, B>(rfn: Reducer<A, B>, acc?: A, xs: Iterable<B>): A`

Reduces `xs` using given reducer and optional initial accumulator/result. If
`xs` implements the `IReducible` interface, delegates to that implementation.
Likewise, uses a fast route if `xs` is an `ArrayLike` type.

#### reduceRight

`reduceRight<A, B>(rfn: Reducer<A, B>, acc?: A, xs: ArrayLike<B>): A`

Similar to `reduce`, however only accepts `ArrayLike` sources and reduces them
into right-to-left order.

#### transduce

`transduce<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>, acc?: C, xs: Iterable<A>): C`

Transforms iterable using given transducer and combines results with given
reducer and optional initial accumulator/result.

#### transduceRight

`transduceRight<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>, acc?: C, xs: ArrayLike<A>): C`

Similar to `transduce`, however only accepts `ArrayLike` sources and processes
them into right-to-left order.

#### run

`run<A, B>(tx: Transducer<A, B>, fx: (x: B) => void, xs: Iterable<A>)`

Transforms iterable with given transducer and optional side effect without any
reduction step. If `fx` is given it will be called with every value produced by
the transducer. If `fx` is _not_ given, the transducer is assumed to include at
least one `sideEffect()` step itself. Returns nothing.

#### consume

`consume(src: Iterable<any>): void`

Similar to `run()`, consumes given iterable, presumably for any implicit
side-effects. Iterable MUST be finite!

```ts
import { consume, repeatedly2d } from "@thi.ng/transducers";

// here the function given to repeatedly2d() has only a side-effect, however
// repeatedly2d() itself is lazy. Using consume() then forces this lazy iterator/generator
// to be realized and so also the side-effects to be executed
consume(repeatedly2d((x, y) => console.log("output:", [x, y]), 2, 3));
// output: [ 0, 0 ]
// output: [ 1, 0 ]
// output: [ 0, 1 ]
// output: [ 1, 1 ]
// output: [ 0, 2 ]
// output: [ 1, 2 ]
```

### Transducers

All of the following functions can be used and composed as transducers. With a
few exceptions, most also accept an input iterable and then directly yield a
transforming iterator, e.g.

```ts
import { map, push, range, transduce } from "@thi.ng/transducers";

// as transducer
transduce(map((x) => x*10), push(), range(4))
// [ 0, 10, 20, 30 ]

// as transforming iterator
[...map((x) => x*10, range(4))]
// [ 0, 10, 20, 30 ]
```

- [benchmark](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/benchmark.ts)
- [binned](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/binned.ts)
- [cat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/cat.ts)
- [converge](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/converge.ts)
- [convolve2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/convolve.ts)
- [dedupe](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/dedupe.ts)
- [delayed](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/delayed.ts)
- [distinct](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/distinct.ts)
- [dropNth](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/drop-nth.ts)
- [dropWhile](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/drop-while.ts)
- [drop](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/drop.ts)
- [duplicate](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/duplicate.ts)
- [filterFuzzy](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/filter-fuzzy.ts)
- [filter](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/filter.ts)
- [flattenWith](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/flatten-with.ts)
- [flatten](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/flatten.ts)
- [flatten1](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/flatten1.ts)
- [indexed](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/indexed.ts)
- [interleave](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interleave.ts)
- [interpolate](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interpolate.ts)
- [interpolate-hermite](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interpolate-hermite.ts)
- [interpolate-linear](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interpolate-linear.ts)
- [interpose](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/interpose.ts)
- [keep](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/keep.ts)
- [labeled](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/labeled.ts)
- [length](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/length.ts)
- [mapDeep](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-deep.ts)
- [mapIndexed](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-indexed.ts)
- [mapKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-keys.ts)
- [mapNth](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-nth.ts)
- [mapVals](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map-vals.ts)
- [map](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/map.ts)
- [mapcat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/mapcat.ts)
- [matchFirst](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/match-first.ts)
- [matchLast](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/match-last.ts)
- [movingAverage](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/moving-average.ts)
- [movingMedian](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/moving-median.ts)
- [multiplexObj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/multiplex-obj.ts)
- [multiplex](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/multiplex.ts)
- [noop](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/noop.ts)
- [padLast](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/pad-last.ts)
- [page](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/page.ts)
- [partitionBy](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-by.ts)
- [partitionOf](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-of.ts)
- [partitionSort](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-sort.ts)
- [partitionSync](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-sync.ts)
- [partitionTime](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-time.ts)
- [partitionWhen](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition-when.ts)
- [partition](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/partition.ts)
- [peek](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/peek.ts)
- [pluck](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/pluck.ts)
- [rechunk](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rechunk.ts)
- [rename](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/rename.ts)
- [sample](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/sample.ts)
- [scan](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/scan.ts)
- [selectKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/select-keys.ts)
- [sideEffect](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/side-effect.ts)
- [slidingWindow](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/sliding-window.ts)
- [streamShuffle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/stream-shuffle.ts)
- [streamSort](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/stream-sort.ts)
- [struct](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/struct.ts)
- [syncTuples](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/syncTuples.ts)
- [swizzle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/swizzle.ts)
- [takeLast](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/take-last.ts)
- [takeNth](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/take-nth.ts)
- [takeWhile](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/take-while.ts)
- [take](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/take.ts)
- [throttleTime](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/throttle-time.ts)
- [throttle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/throttle.ts)
- [toggle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/toggle.ts)
- [trace](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/trace.ts)
- [wordWrap](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/word-wrap.ts)

### Generators / Iterators

- [choices](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/choices.ts)
- [concat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/concat.ts)
- [curve](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/curve.ts)
- [cycle](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/cycle.ts)
- [dup](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/dup.ts)
- [extendSides](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/extend-sides.ts)
- [iterate](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/iterate.ts)
- [keyPermutations](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/key-permutations.ts)
- [keys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/keys.ts)
- [line](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/line.ts)
- [normRange](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-range.ts)
- [normRange2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-range.ts)
- [normRange3d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-range.ts)
- [padSides](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/pad-sides.ts)
- [pairs](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/pairs.ts)
- [palindrome](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/palindrome.ts)
- [permutations](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/permutations.ts)
- [permutationsN](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/permutationsN.ts)
- [range](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/range.ts)
- [range2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/range2d.ts)
- [range3d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/range3d.ts)
- [rangeNd](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/range-nd.ts)
- [repeat](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/repeat.ts)
- [repeatedly](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/repeatedly.ts)
- [repeatedly2d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/repeatedly2d.ts)
- [repeatedly3d](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/repeatedly3d.ts)
- [reverse](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/reverse.ts)
- [sortedKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/sorted-keys.ts)
- [symmetric](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/symmetric.ts)
- [tween](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/tween.ts)
- [vals](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/vals.ts)
- [wrapSides](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/wrap-sides.ts)
- [zip](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/zip.ts)

### Reducers

As with transducer functions, reducer functions can also given an optional input
iterable. If done so, the function will consume the input and return a reduced
result (as if it would be called via `reduce()`).

- [add](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/add.ts)
- [assocMap](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/assoc-map.ts)
- [assocObj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/assoc-obj.ts)
- [conj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/conj.ts)
- [count](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/count.ts)
- [div](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/div.ts)
- [every](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/every.ts)
- [fill](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/fill.ts)
- [frequencies](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/frequencies.ts)
- [groupBinary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/group-binary.ts)
- [groupByMap](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/group-by-map.ts)
- [groupByObj](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/group-by-obj.ts)
- [last](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/last.ts)
- [max](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/max.ts)
- [maxCompare](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/max-compare.ts)
- [maxMag](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/max-mag.ts)
- [mean](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/mean.ts)
- [min](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/min.ts)
- [minCompare](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/min-compare.ts)
- [minMag](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/min-mag.ts)
- [minMax](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/min-max.ts)
- [mul](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/mul.ts)
- [normCount](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-count.ts)
- [normFrequencies](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-frequencies.ts)
- [normFrequenciesAuto](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/norm-frequencies-auto.ts)
- [push](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/push.ts)
- [pushCopy](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/push-copy.ts)
- [pushKeys](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/push-keys.ts)
- [pushSort](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/push-sort.ts)
- [reductions](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/reductions.ts)
- [some](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/some.ts)
- [sortedFrequencies](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/sorted-frequencies.ts)
- [str](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/str.ts)
- [sub](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/src/sub.ts)

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [Gavin Cannizzaro](https://github.com/gavinpc-mindgrub)
- [@nkint](https://github.com/nkint)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-transducers,
  title = "@thi.ng/transducers",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/transducers",
  year = 2016
}
```

## License

&copy; 2016 - 2025 Karsten Schmidt // Apache License 2.0
