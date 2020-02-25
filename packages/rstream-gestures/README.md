<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/rstream-gestures](https://media.thi.ng/umbrella/banners/thing-rstream-gestures.svg?1582660668)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-gestures.svg)](https://www.npmjs.com/package/@thi.ng/rstream-gestures)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-gestures.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Breaking changes](#breaking-changes)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [GestureType](#gesturetype)
  - [GestureEvent](#gestureevent)
  - [GestureStreamOpts](#gesturestreamopts)
  - [Basic usage](#basic-usage)
- [Authors](#authors)
  - [Maintainer](#maintainer)
  - [Contributors](#contributors)
- [License](#license)

## About

Unified mouse, mouse wheel & multi-touch event stream abstraction. This is a support package for [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream).

### Status

**STABLE** - used in production

### Breaking changes

Multi-touch support has been added in v2.0.0, resulting in a complete
rewrite of `gestureStream()` and new event data formats.

## Installation

```bash
yarn add @thi.ng/rstream-gestures
```

Package sizes (gzipped): ESM: 1.2KB / CJS: 1.2KB / UMD: 1.3KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

### canvas-dial <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/canvas-dial.png)

Canvas based dial widget

[Live demo](https://demo.thi.ng/umbrella/canvas-dial/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/canvas-dial)

### geom-knn <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn.jpg)

[Live demo](https://demo.thi.ng/umbrella/geom-knn/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn)

### gesture-analysis <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/gesture-analysis.png)

Mouse gesture / stroke analysis, simplification, corner detection

[Live demo](https://demo.thi.ng/umbrella/gesture-analysis/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gesture-analysis)

### hdom-canvas-draw <!-- NOTOC -->

Interactive @thi.ng/hdom-canvas pattern drawing demo using transducers

[Live demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-draw)

### imgui <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png)

Canvas based Immediate Mode GUI components

[Live demo](https://demo.thi.ng/umbrella/imgui/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)

### mandelbrot <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mandelbrot.jpg)

Worker based, interactive Mandelbrot visualization

[Live demo](https://demo.thi.ng/umbrella/mandelbrot/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mandelbrot)

### multitouch <!-- NOTOC -->

Basic @thi.ng/rstream-gestures multi-touch demo

[Live demo](https://demo.thi.ng/umbrella/multitouch/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/multitouch)

## API

[Generated API docs](https://docs.thi.ng/umbrella/rstream-gestures/)

### GestureType

All native events are abstracted into one of the following event types:

- `START` - mousedown / touchstart
- `MOVE` - movemove
- `DRAG` - mousemove (whilst dragging) / touchmove
- `END` - mouseup / touchend / touchcancel
- `ZOOM` -  wheel

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
  "type": 2, // GestureType.DRAG
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
import { GestureType, gestureStream } from "@thi.ng/rstream-gestures";
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
        filter((e) => e.type === GestureType.DRAG),
        map((e) => e.active.map((g) => Math.hypot(...g.delta)))
    )
);
```

## Authors

### Maintainer

- Karsten Schmidt ([@postspectacular](https://github.com/postspectacular))

### Contributors

- Arthur Carabott ([@acarabott](https://github.com/acarabott))
- Matei Adriel ([@Mateiadrielrafael](https://github.com/Mateiadrielrafael))

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
