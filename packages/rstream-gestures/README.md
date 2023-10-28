<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/rstream-gestures](https://media.thi.ng/umbrella/banners-20230807/thing-rstream-gestures.svg?cb215875)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-gestures.svg)](https://www.npmjs.com/package/@thi.ng/rstream-gestures)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-gestures.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
  - [Breaking changes](#breaking-changes)
    - [v3.0.0](#v300)
    - [v2.0.0](#v200)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [GestureType](#gesturetype)
  - [GestureEvent](#gestureevent)
  - [GestureStreamOpts](#gesturestreamopts)
  - [Basic usage](#basic-usage)
  - [Resettable zoom](#resettable-zoom)
- [Authors](#authors)
- [License](#license)

## About

Unified mouse, mouse wheel & multi-touch event stream abstraction. This is a support package for [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brstream-gestures%5D+in%3Atitle)

### Breaking changes

#### v3.0.0

The `gestureStream()` now supports external zoom control/resetting via providing
a subscription as `zoom` option. That itself isn't a breaking change, however a
result of this is that the `GestureEvent`s emitted by the stream do not *always*
contain the original [DOM
event](https://docs.thi.ng/umbrella/rstream-gestures/interfaces/GestureEvent.html#event)
anymore (i.e. not in the case when the zoom factor is being reset via attached
subscription).

#### v2.0.0
Multi-touch support has been added in v2.0.0, resulting in a complete
rewrite of `gestureStream()` and new event data formats.

## Related packages

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) - Lightweight, reactive, VDOM-less UI/DOM components with async lifecycle and [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) compatible

## Installation

```bash
yarn add @thi.ng/rstream-gestures
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rstream-gestures"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const rstreamGestures = await import("@thi.ng/rstream-gestures");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.20 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                 | Description                                                       | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/canvas-dial.png" width="240"/>         | Canvas based dial widget                                          | [Demo](https://demo.thi.ng/umbrella/canvas-dial/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/canvas-dial)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ellipse-proximity.png" width="240"/>   | Interactive visualization of closest points on ellipses           | [Demo](https://demo.thi.ng/umbrella/ellipse-proximity/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ellipse-proximity)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>           | Interactive inverse FFT toy synth                                 | [Demo](https://demo.thi.ng/umbrella/fft-synth/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn.jpg" width="240"/>            | Doodle w/ K-nearest neighbor search result visualization          | [Demo](https://demo.thi.ng/umbrella/geom-knn/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn-hash.jpg" width="240"/>       | K-nearest neighbor search in an hash grid                         | [Demo](https://demo.thi.ng/umbrella/geom-knn-hash/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn-hash)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/gesture-analysis.png" width="240"/>    | Mouse gesture / stroke analysis, simplification, corner detection | [Demo](https://demo.thi.ng/umbrella/gesture-analysis/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gesture-analysis)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-draw.jpg" width="240"/>    | Interactive pattern drawing demo using transducers                | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-draw)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>              | Canvas based Immediate Mode GUI components                        | [Demo](https://demo.thi.ng/umbrella/imgui/)               | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)               |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/imgui-basics.png" width="240"/>        | Minimal IMGUI usage example                                       | [Demo](https://demo.thi.ng/umbrella/imgui-basics/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui-basics)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mandelbrot.jpg" width="240"/>          | Worker based, interactive Mandelbrot visualization                | [Demo](https://demo.thi.ng/umbrella/mandelbrot/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mandelbrot)          |
|                                                                                                                            | Basic rstream-gestures multi-touch demo                           | [Demo](https://demo.thi.ng/umbrella/multitouch/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/multitouch)          |
|                                                                                                                            | Minimal rstream dataflow graph                                    | [Demo](https://demo.thi.ng/umbrella/rstream-dataflow/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-dataflow)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-graph.jpg" width="240"/>        | Minimal shader graph developed during livestream #2               | [Demo](https://demo.thi.ng/umbrella/shader-graph/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-graph)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>        | Multi-layer vectorization & dithering of bitmap images            | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/> | rdom & WebGL-based image channel editor                           | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-channel-mixer) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rstream-gestures/)

### GestureType

All native events are abstracted into one of the following event types:

- `move` - movemove
- `start` - mousedown / touchstart
- `drag` - mousemove (whilst dragging) / touchmove
- `end` - mouseup / touchend / touchcancel
- `zoom` -  wheel

### GestureEvent

The stream emits
[`GestureEvent`](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-gestures/src/api.ts#L37)
objects of:

- **type** - Current translated/abstracted event type (`GestureType`)
- **event** - Original DOM event
- **pos** - Event position (transformed as per
  [`GestureStreamOpts`](#gesturestreamopts))
- **active** - Active cursors (i.e. ongoing drag / touch gestures)
- **buttons** - Mouse button bitmask (same as in standard `MouseEvent`),
  or, if `isTouch` is true, number of `active` touches.
- **zoom** - Current zoom factor (as per
  [`GestureStreamOpts`](#gesturestreamopts) config)
- **zoomDelta** - Last `WheelEvent`'s transformed `deltaY`,
  `wheelDeltaY`
- **isTouch** - True, if original event was a `TouchEvent`

```ts
// example mouse gesture event
{
  "type": "drag"
  "event": MouseEvent,
  "pos": [254, 169],
  "active": [
    {
      "id": 0, // always 0 for mouse gestures
      "start": [443, 37],
      "pos": [254, 169],
      "delta": [-189, 132]
    }
  ],
  "buttons": 2, // right button pressed
  "zoom": 1,
  "zoomDelta": 0,
  "isTouch": false
}
```

### GestureStreamOpts

See the
[`GestureStreamOpts`](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-gestures/src/api.ts#L74)
config options for further details.

### Basic usage

```ts
import { gestureStream } from "@thi.ng/rstream-gestures";
import { trace } from "@thi.ng/rstream";
import { comp, dedupe, filter, map, pluck } from "@thi.ng/transducers";

// create event stream with custom options
const gestures = gestureStream(document.body, { smooth: 0.01 });

// subscription logging zoom value changes
gestures.subscribe(
    // trace is simply logging received values to console
    trace("zoom"),
    // composed transducer, `dedupe` ensures only changed values are received
    comp(pluck("zoom"), dedupe())
);

// another subscription computing & logging drag gesture distance(s)
gestures.subscribe(
    trace("distance"),
    comp(
        filter((e) => e.type === "drag"),
        map((e) => e.active.map((g) => Math.hypot(...g.delta)))
    )
);
```

### Resettable zoom

For some applications (e.g. graphical editors), it can be helpful to reset the
zoom value. This can be done by supplying a stream/subscription as part of the
config options:

```ts
// create stream for initial zoom value & for resetting
const zoomReset = reactive(1);

// create gesture stream w/ zoom subscription
const gestures = gestureStream(document.body, {
    smooth: 0.01,
    zoom: zoomReset
});

// ... then to reset the zoom at some point (e.g to zoom=2)
zoomReset.next(2);
```

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [Arthur Carabott](https://github.com/acarabott)
- [Matei Adriel](https://github.com/Mateiadrielrafael)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rstream-gestures,
  title = "@thi.ng/rstream-gestures",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/rstream-gestures",
  year = 2018
}
```

## License

&copy; 2018 - 2023 Karsten Schmidt // Apache License 2.0
