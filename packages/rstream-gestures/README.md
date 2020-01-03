<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/rstream-gestures

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-gestures.svg)](https://www.npmjs.com/package/@thi.ng/rstream-gestures)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-gestures.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
- [Authors](#authors)
  - [Maintainer](#maintainer)
  - [Contributors](#contributors)
- [License](#license)

## About

Unified mouse, mouse wheel & single-touch event stream abstraction. This is a support package for [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream).

The stream emits tuples of:

```ts
[type, { pos, click?, delta?, zoom, zoomDelta }]
```

The `click` and `delta` values are only present if `type ==
GestureType.DRAG`. Both (and `pos` too) are 2-element arrays of `[x,y]`
coordinates.

The `zoom` value is always present, but is only updated with wheel
events. The value will be constrained to `minZoom` ... `maxZoom`
interval (provided via options object).

Also see the
[`GestureStreamOpts`](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-gestures/src/index.ts#L31)
config options for further details.

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/rstream-gestures
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### canvas-dial <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/canvas-dial.png)

Canvas based dial widget

[Live demo](https://demo.thi.ng/umbrella/canvas-dial/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/canvas-dial)

### geom-knn <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/geom-knn.jpg)

[Live demo](https://demo.thi.ng/umbrella/geom-knn/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/geom-knn)

### gesture-analysis <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/gesture-analysis.png)

Mouse gesture / stroke analysis, simplification, corner detection

[Live demo](https://demo.thi.ng/umbrella/gesture-analysis/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/gesture-analysis)

### hdom-canvas-draw <!-- NOTOC -->

Interactive @thi.ng/hdom-canvas pattern drawing demo using transducers

[Live demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/hdom-canvas-draw)

### imgui <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/imgui/imgui-all.png)

Canvas based Immediate Mode GUI components

[Live demo](https://demo.thi.ng/umbrella/imgui/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/imgui)

### mandelbrot <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/mandelbrot.jpg)

Worker based, interactive Mandelbrot visualization

[Live demo](https://demo.thi.ng/umbrella/mandelbrot/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/mandelbrot)

## API

[Generated API docs](https://docs.thi.ng/umbrella/rstream-gestures/)

### Basic usage

```ts
import { GestureType, gestureStream } from "@thi.ng/rstream-gestures";
import { trace } from "@thi.ng/rstream";
import { comp, dedupe, filter, map } from "@thi.ng/transducers";

// create event stream with custom option
const gestures = gestureStream(document.body, { smooth: 0.01 });

// subscription logging zoom value changes
gestures.subscribe(
    // trace is simply logging received values to console
    trace("zoom"),
    // composed transducer, `dedupe` ensures only changed values are received
    comp(
        map(([_, { zoom }]) => zoom),
        dedupe()
    )
);

// another subscription computing & logging drag gesture distance
gestures.subscribe(
    trace("distance"),
    comp(
        filter(([type]) => type === GestureType.DRAG),
        map(([_, { delta }]) => Math.hypot(...delta))
    )
);
```

## Authors

### Maintainer

- Karsten Schmidt ([@postspectacular](https://github.com/postspectacular))

### Contributors

- Arthur Carabott ([@acarabott](https://github.com/acarabott))

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
