# ${pkg.name}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

```bash
yarn add ${pkg.name}
```

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

${authors}

## License

&copy; ${copyright} // ${license}
