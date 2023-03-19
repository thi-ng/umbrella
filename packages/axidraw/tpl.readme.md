<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

- [Project announcement](https://mastodon.thi.ng/@toxi/109490174709589253)
- [Geometry conversion basics](https://mastodon.thi.ng/@toxi/109473655772673067)
- [Shape group conversion and stippling](https://mastodon.thi.ng/@toxi/109474947869078797)
- [Per-shape & on-the-fly polyline clipping](https://mastodon.thi.ng/@toxi/109483553358349473)
- [Bitmap-to-vector conversions & shape sorting](https://mastodon.thi.ng/@toxi/109570540391689321)
- [Multi-color plotting](https://mastodon.thi.ng/@toxi/109586780630493994)
- [Using water color & paintbrush](https://mastodon.thi.ng/@toxi/110044424626641749)
- more to come...

### Available draw commands

All
[`DrawCommand`s](https://docs.thi.ng/umbrella/axidraw/types/DrawCommand.html)
are expressed as S-expression-like, [thi.ng/hiccup]()-style elements, aka JS
arrays/tuples of `[command, ...args]`. The following commands are supported. All
also as predefined constants or factory functions for the parametric ones:

| Command                           | Preset/factory                                                                                                                      |
|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `["comment", msg]`                | [`COMMENT`](https://docs.thi.ng/umbrella/axidraw/functions/COMMENT.html)                                                            |
| `["d", delay?]` / `["u", delay?]` | [`DOWN`](https://docs.thi.ng/umbrella/axidraw/functions/DOWN.html) / [`UP`](https://docs.thi.ng/umbrella/axidraw/functions/UP.html) |
| `["home"]`                        | `HOME`                                                                                                                              |
| `["m", [x,y], speed?]`            | [`MOVE_REL`](https://docs.thi.ng/umbrella/axidraw/functions/MOVE_REL.html)                                                          |
| `["M", [x,y], speed?]`            | [`MOVE`](https://docs.thi.ng/umbrella/axidraw/functions/MOVE.html)                                                                  |
| `["on"]` / `["off"]`              | `ON` / `OFF`                                                                                                                        |
| `["pen", down, up]`               | [`PEN`](https://docs.thi.ng/umbrella/axidraw/functions/PEN.html)                                                                    |
| `["reset"]`                       | `RESET`                                                                                                                             |
| `["start"]`                       | `START`                                                                                                                             |
| `["stop"]`                        | `STOP`                                                                                                                              |
| `["w", delay]`                    | [`WAIT`](https://docs.thi.ng/umbrella/axidraw/functions/WAIT.html)                                                                  |

#### Command sequence generators

Additionally, the following command sequence generators are provided (see their docs for code examples):

- [`complete`](https://docs.thi.ng/umbrella/axidraw/functions/complete.html)
- [`dip`](https://docs.thi.ng/umbrella/axidraw/functions/dip.html)
- [`polyline`](https://docs.thi.ng/umbrella/axidraw/functions/polyline.html)
- [`registrationMark`](https://docs.thi.ng/umbrella/axidraw/functions/registrationMark.html)

<!-- include ../../assets/tpl/footer.md -->
