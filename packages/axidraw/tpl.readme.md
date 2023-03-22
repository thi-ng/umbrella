<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

![AXI-SCAPE #000](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/axidraw/axiscape-1280.jpg)

<small>AXI-SCAPE \#000, 12-layer watercolor painting/plot of cellular automata, © 2023 Karsten Schmidt</small>

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

### Units, limits & clamping

By default, bounds checking and coordinate clamping are applied (against a user
defined bounding rect or paper size), however this can be disabled (in which
case all given coordinates are expected to be valid and within machine limits).
Coordinates can be given in any unit, but if not using millimeters (default), a
conversion factor to inches (`unitsPerInch`) **MUST** be provided as part of the
[options
object](https://docs.thi.ng/umbrella/axidraw/interfaces/AxiDrawOpts.html) given
to the `AxiDraw` constructor. Actual geometry clipping can be handled by the
[geom or geom-axidraw](#thinggeom-support) packages...

The bounding rect can be either defined by a tuple of `[[minX,minY],
[maxX,maxY]]` (in worldspace units) or as paper size defined as a
[`quantity()`](https://docs.thi.ng/umbrella/units/functions/quantity-1.html). The
default value is DIN A3 landscape.

If given as paper size (e.g. via
[thi.ng/units](https://github.com/thi-ng/umbrella/blob/develop/packages/units/)
presets), the actual units used to define these dimensions are irrelevant and
will be automatically converted.

[List of paper
sizes/presets](https://github.com/thi-ng/umbrella/blob/develop/packages/units/README.md#constants)

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

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

## Available draw commands

All
[`DrawCommand`s](https://docs.thi.ng/umbrella/axidraw/types/DrawCommand.html)
are expressed as S-expression-like, [thi.ng/hiccup]()-style elements, aka JS
arrays/tuples of `[command, ...args]`. The following commands are supported. All
also as predefined constants or factory functions for the parametric ones:

| Command                                           | Preset/factory                                                                                                                      | Description                                        |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| `["comment", msg]`                                | [`COMMENT`](https://docs.thi.ng/umbrella/axidraw/functions/COMMENT.html)                                                            | Ignored, but logged during plotting                |
| `["d", delay?, level?]` / `["u", delay?, level?]` | [`DOWN`](https://docs.thi.ng/umbrella/axidraw/functions/DOWN.html) / [`UP`](https://docs.thi.ng/umbrella/axidraw/functions/UP.html) | Move pen up/down w/ optional delay & level (0-100) |
| `["home"]`                                        | `HOME`                                                                                                                              | Move to home position (origin)                     |
| `["m", [x,y], speed?]`                            | [`MOVE_REL`](https://docs.thi.ng/umbrella/axidraw/functions/MOVE_REL.html)                                                          | Move to relative position w/ optional speed factor |
| `["M", [x,y], speed?]`                            | [`MOVE`](https://docs.thi.ng/umbrella/axidraw/functions/MOVE.html)                                                                  | Move to absolute position w/ optional speed factor |
| `["on"]` / `["off"]`                              | `ON` / `OFF`                                                                                                                        | Turn motors on/off                                 |
| `["pen", down, up]`                               | [`PEN`](https://docs.thi.ng/umbrella/axidraw/functions/PEN.html)                                                                    | Pen config (up/down levels)                        |
| `["reset"]`                                       | `RESET`                                                                                                                             | Execute user defined reset sequence<sup>(1)</sup>  |
| `["restore"]`                                     | `RESTORE`                                                                                                                           | Restore saved pen up/down levels                   |
| `["save"]`                                        | `SAVE`                                                                                                                              | Save current pen up/down levels                    |
| `["start"]`                                       | `START`                                                                                                                             | Execute user defined start sequence<sup>(1)</sup>  |
| `["stop"]`                                        | `STOP`                                                                                                                              | Execute user defined stop sequence<sup>(1)</sup>   |
| `["w", delay]`                                    | [`WAIT`](https://docs.thi.ng/umbrella/axidraw/functions/WAIT.html)                                                                  | Wait N milliseconds                                |

- <sup>(1)</sup> See
  [AxiDrawOpts](https://docs.thi.ng/umbrella/axidraw/interfaces/AxiDrawOpts.html)
  for details.

### Command sequence generators

Additionally, the following command sequence generators are provided (see their
docs for details and code examples):

- [`complete()`](https://docs.thi.ng/umbrella/axidraw/functions/complete.html)
- [`dip()`](https://docs.thi.ng/umbrella/axidraw/functions/dip.html)
- [`linearPalette()`](https://docs.thi.ng/umbrella/axidraw/functions/linearPalette.html)
- [`polyline()`](https://docs.thi.ng/umbrella/axidraw/functions/polyline.html)
- [`radialPalette()`](https://docs.thi.ng/umbrella/axidraw/functions/radialPalette.html)
- [`registrationMark()`](https://docs.thi.ng/umbrella/axidraw/functions/registrationMark.html)

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

### Brush & paint palette

This example illustrates how the [`linearPalette()`]() command sequence
generator can be used to paint random dots with a brush which gets re-dipped in
different paints every 10 dots...

Also see
[`InterleaveOpts`](https://docs.thi.ng/umbrella/geom-axidraw/interfaces/InterleaveOpts.html)
for more details...

```ts
import { points } from "@thi.ng/geom";
import { asAxiDraw } from "@thi.ng/geom-axidraw";
import { repeatedly } from "@thi.ng/transducers";
import { randMinMax2 } from "@thi.ng/vectors";

// configure palette
// "linear" here means the palette slots are arranged in a line
// (there's also a radialPalette() function for circular/elliptical palette layouts)
const palette = linearPalette({
    // first palette slot is near the world origin (slight offset)
    pos: [2, 0],
    // 2mm jitter radius (to not always move to exact same position)
    jitter: 2,
    // palette has 5 paint slots
    num: 5,
    // each slot 40mm separation along Y-axis
    // (needs to be measured/determined manually)
    step: [0, 40],
    // dip brush 3x each time
    repeat: 3,
});

// define point cloud of 100 random points
// using a random palette slot each time (for each refill)
// assign axidraw-specific attribs to refill brush every 10 dots
const cloud = points(
    // pick random points
    [...repeatedly(() => randMinMax2([], [10, 10], [190, 190]), 100)],
    // shape attributes
    {
        __axi: {
            interleave: {
                // every 10 elements/dots...
                num: 10,
                // execute these commands...
                commands: () => [
                    // first brush cleaning in water
                    // (we decide to use the last palette slot for that)
                    ...palette(4),
                    // now "refill" brush at a random other slot
                    ...palette(Math.floor(Math.random() * 4))
                ]
            }
        }
    }
);

// AxiDraw setup
const axi = new AxiDraw();
...

// convert geometry into axidraw commands and send to plotter
axi.draw(asAxiDraw(cloud));
```

Other selected toots/tweets:

- [Project announcement](https://mastodon.thi.ng/@toxi/109490174709589253)
- [Geometry conversion basics](https://mastodon.thi.ng/@toxi/109473655772673067)
- [Shape group conversion and stippling](https://mastodon.thi.ng/@toxi/109474947869078797)
- [Per-shape & on-the-fly polyline clipping](https://mastodon.thi.ng/@toxi/109483553358349473)
- [Bitmap-to-vector conversions & shape sorting](https://mastodon.thi.ng/@toxi/109570540391689321)
- [Multi-color plotting](https://mastodon.thi.ng/@toxi/109586780630493994)
- [Using water color & paintbrush](https://mastodon.thi.ng/@toxi/110044424626641749)
- [Water color brush tests](https://mastodon.thi.ng/@toxi/110051629944117139)
- more to come...

<!-- include ../../assets/tpl/footer.md -->
