# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

${status}

### Breaking changes

Multi-touch support has been added in v2.0.0, resulting in a complete
rewrite of `gestureStream()` and new event data formats.

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
