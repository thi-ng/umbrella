<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/axidraw](https://media.thi.ng/umbrella/banners-20220914/thing-axidraw.svg?25c834ce)

[![npm version](https://img.shields.io/npm/v/@thi.ng/axidraw.svg)](https://www.npmjs.com/package/@thi.ng/axidraw)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/axidraw.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Declarative vs. imperative](#declarative-vs-imperative)
  - [Units, limits & clipping](#units-limits--clipping)
  - [Path planning](#path-planning)
  - [thi.ng/geom support](#thinggeom-support)
  - [SVG support](#svg-support)
  - [Serial port support](#serial-port-support)
  - [Draw control](#draw-control)
  - [Metrics](#metrics)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Example usage](#example-usage)
    - [Basics](#basics)
  - [geom-axidraw example](#geom-axidraw-example)
- [Authors](#authors)
- [License](#license)

## About

Minimal AxiDraw plotter/drawing machine controller for Node.js.

This package provides a super-lightweight alternative to control an [AxiDraw
plotter](https://axidraw.com/) directly from Node.js, using a small custom set
of medium/high-level drawing commands. Structurally, these custom commands are
[thi.ng/hiccup](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup/)-like
S-expressions, which can be easily serialized to/from JSON and are translated to
the native [EBB commands](https://evil-mad.github.io/EggBot/ebb.html) for the
plotter.

### Declarative vs. imperative

Due to AxiDraw's lack of G-Code support, most other available AxiDraw support
libraries are providing only a purely imperative API to control the machine. In
contrast, this package utilizes a more declarative approach, also very much
following the pattern of other packages in the
[thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo, which allows
(geometry) data to be inspected, augmented, converted/transformed, serialized up
until the very last moment before being sent to the machine for physical
output...

### Units, limits & clipping

This package performs **no bounds checking nor clipping** and expects all given
coordinates to be valid and within machine limits. Coordinates can be given in
any unit, but if not using millimeters (default), a conversion factor to inches
(`unitsPerInch`) **MUST** be provided as part of the [options
object](https://docs.thi.ng/umbrella/axidraw/interfaces/AxiDrawOpts.html) given
to the `AxiDraw` constructor. Clipping can be handled by the geom or
geom-axidraw packages (see below)...

### Path planning

Path planning is considered a higher level operation than what's addressed by
this package and is therefore out of scope. The
[thi.ng/geom-axidraw](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-axidraw)
provides some configurable point & shape sorting functions, but this is an
interim solution and a full path/route planning facility is currently still
outstanding and awaiting to be ported from other projects.

### thi.ng/geom support

The [thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
package provides numerous shape types & operations to generate & transform
geometry. Additionally,
[thi.ng/geom-axidraw](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-axidraw)
can act as bridge API and provides the polymorphic
[`asAxiDraw()`](https://docs.thi.ng/umbrella/geom-axidraw/functions/asAxiDraw.html)
function to convert single shapes or entire shape groups/hierarchies directly
into the draw commands used by this (axidraw) package. See package readme for
more details and examples.

### SVG support

This package does **not** provide any direct conversions from SVG or any other
geometry format. But again, whilst not containing a full SVG parser (at current
only single paths can be parsed), the family of
[thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
packages provides numerous shape types & operations which can be directly
utilized to output generated geometry together with this package...

The only built-in conversion provided here is the
[`polyline()`](https://docs.thi.ng/umbrella/axidraw/functions/polyline.html)
utility function to convert an array of points (representing a polyline) to an
array of drawing commands (with various config options). All other conversions
are out of scope for this package (& for now).

### Serial port support

We're using the [serialport](https://serialport.io/) NPM package to submit data
directly to the drawing machine. That package includes native bindings for
Linux, MacOS and Windows.

The
[`AxiDraw.connect()`](https://docs.thi.ng/umbrella/axidraw/classes/AxiDraw.html#connect)
function (see example below) attempts to find the drawing machine by matching a
given regexp with available port names. The default regexp might only work on
Mac, but YMMV!

At some point it would also be worth looking into
[WebSerial](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)
support to enable plotting directly from the browser. Right now this package is
only aimed at Node.js though...

### Draw control

The main
[`draw()`](https://docs.thi.ng/umbrella/axidraw/classes/AxiDraw.html#draw)
function provided by this package is async and supports custom implementations
to pause, resume or cancel the processing of further drawing commands. By the
default
[`AxiDrawControl`](https://docs.thi.ng/umbrella/axidraw/classes/AxiDrawControl.html)
is used as default implementation.

If a control is provided, it will be checked prior to processing each individual
command. Drawing will be paused if the control state is in paused state and the
control will be rechecked every N milliseconds for updates (configurable). In
paused state, the pen will be automatically lifted (if it wasn't already) and
when resuming it will be sent down again (if it was originally down). Draw
commands are only sent to the machine if no control is provided at all or if the
control is in the "continue" state.

### Metrics

The [`draw()`](https://docs.thi.ng/umbrella/axidraw/classes/AxiDraw.html#draw)
function also records several
[metrics](https://docs.thi.ng/umbrella/axidraw/interfaces/Metrics.html), useful
for further analysis (or to identify optimizations) of the plotting process.
These metrics include:

- total duration
- total distance traveled
- draw distance (i.e. only whilst pen is down)
- number of pen up/down commands (i.e. to consider servo lifespan)
- total number of commands

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Baxidraw%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/axidraw
```

For Node.js REPL:

```js
const axidraw = await import("@thi.ng/axidraw");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.15 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/date](https://github.com/thi-ng/umbrella/tree/develop/packages/date)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
- [serialport](git://github.com/serialport/node-serialport.git)

## API

[Generated API docs](https://docs.thi.ng/umbrella/axidraw/)

### Example usage

#### Basics

```js tangle:export/readme-basic.js
import { AxiDraw, polyline } from "@thi.ng/axidraw";

(async () => {

// instantiate w/ default options (see docs for info)
const axi = new AxiDraw();

// connect to 1st serial port matching given pre-string or regexp
// (the port used here is the default arg)
await axi.connect("/dev/tty.usbmodem");
// true

// vertices defining a polyline of a 100x100 mm square (top left at 20,20)
const verts = [[20, 20], [120, 20], [120, 120], [20, 120], [20, 20]];

// convert to drawing commands (w/ custom speed, 25%)
// see docs for config options
const path = polyline(verts, { speed: 0.25 })
// [
//   ["m", [20, 20]],
//   ["d"],
//   ["m", [120, 20], 0.25],
//   ["m", [120, 120], 0.25],
//   ["m", [20, 120], 0.25],
//   ["m", [20, 20], 0.25],
//   ["u"]
// ]

// draw/send seq of commands
// by default the given commands will be wrapped with a start/end
// command sequence, configurable via options given to AxiDraw ctor)...
await axi.draw(path);

})();
```

### geom-axidraw example

Result shown here: https://mastodon.thi.ng/@toxi/109473655772673067

```js tangle:export/readme-geom.js
import { AxiDraw } from "@thi.ng/axidraw";
import { asCubic, group, pathFromCubics, star } from "@thi.ng/geom";
import { asAxiDraw } from "@thi.ng/geom-axidraw";
import { map, range } from "@thi.ng/transducers";

(async () => {
    // create group of bezier-interpolated star polygons,
    // with each path using a slightly different configuration
    const geo = group({ translate: [100, 100] }, [
        ...map(
            (t) =>
                pathFromCubics(
                    asCubic(star(90, 6, [t, 1]), {
                        breakPoints: true,
                        scale: 0.66,
                    })
                ),
            range(0.3, 1.01, 0.05)
        ),
    ]);

    // connect to plotter
    const axi = new AxiDraw();
    await axi.connect();
    // convert geometry to drawing commands & send to plotter
    await axi.draw(asAxiDraw(geo, { samples: 40 }));
})();
```

Other selected toots/tweets:

- https://mastodon.thi.ng/@toxi/109490174709589253
- https://mastodon.thi.ng/@toxi/109473655772673067
- https://mastodon.thi.ng/@toxi/109474947869078797
- https://mastodon.thi.ng/@toxi/109483553358349473
- https://mastodon.thi.ng/@toxi/109570540391689321
- https://mastodon.thi.ng/@toxi/109586780630493994
- more to come...

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-axidraw,
  title = "@thi.ng/axidraw",
  author = "Karsten Schmidt",
  note = "https://thi.ng/axidraw",
  year = 2022
}
```

## License

&copy; 2022 - 2023 Karsten Schmidt // Apache License 2.0
