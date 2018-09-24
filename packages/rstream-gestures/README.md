# @thi.ng/rstream-gestures

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-gestures.svg)](https://www.npmjs.com/package/@thi.ng/rstream-gestures)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-gestures.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Unified mouse, mouse wheel & single-touch event stream abstraction.
Stream emits tuples of:

```ts
[type, {pos, click?, delta?, zoom}]
```

The `click` and `delta` values are only present if `type ==
GestureType.DRAG`. Both (and `pos` too) are 2-element arrays of `[x,y]`
coordinates.

The `zoom` value is always present, but is only updated with wheel
events. The value will be constrained to `minZoom` ... `maxZoom`
interval (provided via options object).

Also see the
[`GestureStreamOpts`](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-gestures/src/index.ts#L26)
config options for further details.

## Installation

```bash
yarn add @thi.ng/rstream-gestures
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

Several small, fully commented projects can be found in the `/examples` folder:

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/canvas-dial.png)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/canvas-dial) |
[Live version](https://demo.thi.ng/umbrella/canvas-dial)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-dataflow) |
[Live version](https://demo.thi.ng/umbrella/rstream-dataflow)

### Basic usage

```ts
import { GestureType, gestureStream } from "@thi.ng/rstream-gestures";
import { trace } from "@thi.ng/rstream";
import { comp, dedupe, filter, map } from "@thi.ng/transducers";

// create event stream with custom option
const gestures = gestureStream(document.body, { smooth: 0.5 });

// subscription logging zoom value changes
gestures.subscribe(
    // trace is simply logging received values to console
    trace("zoom"),
    // composed transducer, `dedupe` ensures only changed values are received
    comp(
        map(([_, {zoom}]) => zoom),
        dedupe()
    )
);

// another subscription computing & logging drag gesture distance
gestures.subscribe(
    trace("distance"),
    comp(
        filter(([type]) => type === GestureType.DRAG),
        map(([_, {delta}]) => Math.hypot(...delta))
    )
);
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
