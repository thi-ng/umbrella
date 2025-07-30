<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-axidraw](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-geom-axidraw.svg?a2db6741)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-axidraw.svg)](https://www.npmjs.com/package/@thi.ng/geom-axidraw)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-axidraw.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Supported shape types](#supported-shape-types)
  - [AxiDraw specific shape attributes](#axidraw-specific-shape-attributes)
    - [Shape interpolation/resampling](#shape-interpolationresampling)
  - [Draw order](#draw-order)
  - [Command visualization](#command-visualization)
  - [Basic usage & examples](#basic-usage--examples)
    - [Interpolated polygons](#interpolated-polygons)
    - [Clipping](#clipping)
  - [Supporting custom drawing tools](#supporting-custom-drawing-tools)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Conversion and preparation of thi.ng/geom shapes & shape groups to/from AxiDraw pen plotter draw commands. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

This package only deals with the (bi-directional) conversion aspects between
geometry and plotter commands. The
[@thi.ng/axidraw](https://github.com/thi-ng/umbrella/blob/develop/packages/axidraw)
package is responsible for the actual plotter output...

### Supported shape types

| Shape type  | Remarks                                         |
|-------------|-------------------------------------------------|
| arc         | elliptic arc<sup>(1)</sup>                      |
| circle      | circle<sup>(1)</sup>                            |
| complexpoly | polygon with optional holes                     |
| cubic       | cubic bezier segment<sup>(1)</sup>              |
| ellipse     | ellipse<sup>(1)</sup>                           |
| group       | shape group (possibly nested)<sup>(3)</sup>     |
| line        | line segment<sup>(2)</sup>                      |
| path        | optionally with holes or multiple curves        |
| points      | point cloud (stippling)<sup>(3)</sup>           |
| polyline    | polyline (any number of vertices)<sup>(2)</sup> |
| polygon     | simple polygon, no holes<sup>(2)</sup>          |
| quad        | arbitrary 4-gon<sup>(2)</sup>                   |
| quadratic   | quadratic bezier segment<sup>(1)</sup>          |
| rect        | axis aligned rectangle<sup>(2)</sup>            |
| triangle    | triangle<sup>(2)</sup>                          |

- <sup>(1)</sup> always interpolated/sampled
- <sup>(2)</sup> only interpolated if forced via attrib
- <sup>(3)</sup> supports command sequence interleaving

### AxiDraw specific shape attributes

All
[thi.ng/geom](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/)
shape types have support for arbitrary attributes. Different support packages
can then utilize these attribs to customize usage or behaviors. In this case,
any package-specific attribs must be stored under the `__axi` key:

- `clip`: Optional clip polygon vertices. If given only the parts of strokes
  inside that polygon will be plotted. The clip polygon itself can only have a
  single boundary, no holes supported (yet?).
- `delayDown`: Shape specific delay (in ms), i.e. initial hold time for the
  stroke or when stippling...
- `delayUp`: Delay for pen up command at the end this particular
  shape/polyline/point.
- `down`: Pen down position (in \%) for this particular shape/polyline. Will be
  reset to globally configured default at the end of the shape.
- `speed`: Speed factor (multiple of globally configured draw speed). Depending
  on pen used, slower speeds might result in thicker strokes.
- `skip`: Only used for groups or point clouds. If given, only every (n+1)th
  child shape or point is being processed and the others ignored. Useful for low
  detail test runs.
- `sort`: Ordering function (in lieu of full path planning/optimization, which
  is planned for a later stage). For shapes other than `points()`, order of
  appearance is used by default.
- `interleave`: Currently only supported for point clouds. See [Supporting
  custom drawing tools](#supporting-custom-drawing-tools).

```ts
import { circle } from "@thi.ng/geom";

// a circle which will be plotted at only 10% of the normal speed
circle(100, { __axi: { speed: 0.1 } })
```

#### Shape interpolation/resampling

Since many of the supported shapes are not inherently vertex-based, their
boundaries/outlines need to be sampled when they are being converted to
polylines. Therefore, in addition to the above attributes, the thi.ng/geom
package itself also makes use of the `__samples` attribute to control the
re-sampling of individual shapes. Please see the following links for more
details and supported options:

- [`SamplingOpts`](https://docs.thi.ng/umbrella/geom-api/interfaces/SamplingOpts.html)
- [`vertices()`](https://docs.thi.ng/umbrella/geom/functions/vertices.html)

### Draw order

As mentioned above, the default draw order for shapes within a group is order of
appearance. For point clouds, the {@link pointsByNearestNeighbor} ordering
function is used by default, which attempts to minimize travel distance between
points.

Currently, the following ordering functions are available, but custom
implementations can be provided too...

- [`pointsByNearestNeighbor()`](https://docs.thi.ng/umbrella/geom-axidraw/functions/pointsByNearestNeighbor.html)
- [`shapesByNearestNeighbor()`](https://docs.thi.ng/umbrella/geom-axidraw/functions/shapesByNearestNeighbor.html)
- [`pointsByProximity()`](https://docs.thi.ng/umbrella/geom-axidraw/functions/pointsByProximity.html)
- [`shapesByProximity()`](https://docs.thi.ng/umbrella/geom-axidraw/functions/shapesByProximity.html)

### Command visualization

For debug, optimization & visualization purposes it's useful to convert a
sequence of plotter commands back into 2D geometry. This can be done via the
supplied
[`asGeometry()`](https://docs.thi.ng/umbrella/geom-axidraw/functions/asGeometry.html)
function, which also takes several options to customize the resulting output.
One of the [examples](#clipping) below is demonstrating basic usage.

![Example draw command visualization based on the code example in this readme](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-axidraw/readme-commands.png)

### Basic usage & examples

The main function of this package is the polymorphic function
[`asAxiDraw()`](https://docs.thi.ng/umbrella/geom-axidraw/functions/asAxiDraw.html),
which converts any of the supported shape types into an iterable of
[thi.ng/axidraw](https://github.com/thi-ng/umbrella/blob/develop/packages/axidraw)
drawing commands. This conversion happens **semi-lazily** (via generator
functions) to minimize memory usage and spread out the computational load of the
conversions.

The below example can be directly launched via `node cubics.js` (obviously
provided you have an AxiDraw connected and all listed packages installed):

#### Interpolated polygons

(Result: https://mastodon.thi.ng/@toxi/109473655772673067)

```ts tangle:export/readme-cubics.ts
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

#### Clipping

(Result: https://mastodon.thi.ng/@toxi/109483553358349473)

```ts tangle:export/readme-clipping.ts
import { AxiDraw } from "@thi.ng/axidraw";
import {
    asSvg,
    circle,
    group,
    starWithCentroid,
    svgDoc,
    vertices,
} from "@thi.ng/geom";
import { asAxiDraw, asGeometry } from "@thi.ng/geom-axidraw";
import { map, range } from "@thi.ng/transducers";
import { writeFileSync } "node:fs";

(async () => {
    const origin = [100, 100];
    const radius = 50;
    const boundary = starWithCentroid(origin, radius, 5, [1, 0.45], { __axi: { speed: 0.25 } });
    // group of concentric circles using boundary as clip polygon
    const geo = group({}, [
        boundary,
        group({ __samples: 60, __axi: { clip: vertices(boundary) } }, [
            ...map((r) => circle(origin, r), range(2, radius, 2)),
        ]),
    ]);

    // convert into AxiDraw command sequence
    const commands = [...asAxiDraw(geo)];

    // now visualize command sequence (convert back to geometry, incl. pen movements)
    const { paths, rapids, ups, downs } = asGeometry(commands);
    // write visualization as SVG
    writeFileSync(
        "export/clipping-commands.svg",
        asSvg(svgDoc({ width: 600, weight: 0.2 }, paths, rapids, ups, downs))
    );

    // actually connect & send to plotter
    const axi = new AxiDraw();
    await axi.connect();
    await axi.draw(commands);
})();
```

### Supporting custom drawing tools

AxiDraw (and other pen plotters) are not restricted to just using pens, but can
be used with all sorts of custom drawing tools, some of which (like paint
brushes) require regular "refills" every N strokes/dots. For that reason, some
shape types (currently **only** shape groups and point clouds) are supporting
config & behavior options for interleaving their normal shape command sequence
with additional tool-specific arbitrary utility command sequences (e.g. to
regularly dip a brush into a paint pot/palette).

```ts tangle:export/readme-interleave.ts
import { AxiDraw, COMMENT, dip, MOVE } from "@thi.ng/axidraw";
import { circle, points, vertices } from "@thi.ng/geom";
import { asAxiDraw } from "@thi.ng/geom-axidraw";

(async () => {
    // create point cloud container
    const pts = points(
        // using 24 points on a circle w/ origin @ 150,150, radius=100
        vertices(circle([150, 150], 100), 24),
        { __axi: {
            // use command interleaving
            interleave: {
                // every 5 points/dots
                num: 5,
                // insert these draw commands:
                // (this function is being re-called every `num` points and
                // can produce different commands to insert each time...)
                commands: (n) => [
                    // no-op command, but will be logged during plotting
                    COMMENT(`--- refill brush (@ ${n} points) ---`),
                    // move to XY pos (i.e. position of paint reservoir)
                    MOVE([10,50]),
                    // dip the brush 3x times down & up (each time wait 200ms whilst down)
                    // (dip() creates a cmd sequence, so need to use the spread operator `...` here)
                    ...dip(3, { downDelay: 200 }),
                    // (...and then drawing continues w/ next 5 points)
                ]
            }
        }
    });

    // actually connect & send to plotter
    const axi = new AxiDraw();
    await axi.connect();
    await axi.draw(asAxiDraw(pts));
})();
```

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-axidraw%5D+in%3Atitle)

## Related packages

- [@thi.ng/axidraw](https://github.com/thi-ng/umbrella/tree/develop/packages/axidraw) - Minimal AxiDraw plotter/drawing machine controller for Node.js

## Installation

```bash
yarn add @thi.ng/geom-axidraw
```

ESM import:

```ts
import * as gaxi from "@thi.ng/geom-axidraw";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-axidraw"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gaxi = await import("@thi.ng/geom-axidraw");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.52 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/axidraw](https://github.com/thi-ng/umbrella/tree/develop/packages/axidraw)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
- [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
- [@thi.ng/geom-clip-line](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-line)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-axidraw/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-axidraw,
  title = "@thi.ng/geom-axidraw",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-axidraw",
  year = 2022
}
```

## License

&copy; 2022 - 2025 Karsten Schmidt // Apache License 2.0
