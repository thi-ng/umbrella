<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package only deals with the (bi-directional) conversion aspects between
geometry and plotter commands. The
[@thi.ng/axidraw](https://github.com/thi-ng/umbrella/blob/develop/packages/axidraw)
package is responsible for the actual plotter output...

### Supported shape types

| Shape type | Remarks                                         |
|------------|-------------------------------------------------|
| arc        | elliptic arc<sup>(1)</sup>                      |
| circle     | circle<sup>(1)</sup>                            |
| cubic      | cubic bezier segment<sup>(1)</sup>              |
| ellipse    | ellipse<sup>(1)</sup>                           |
| group      | shape group (possibly nested)                   |
| line       | line segment<sup>(2)</sup>                      |
| path       | single outline only, no holes                   |
| points     | point cloud (stippling)                         |
| polyline   | polyline (any number of vertices)<sup>(2)</sup> |
| polygon    | simple polygon, no holes<sup>(2)</sup>          |
| quad       | arbitrary 4-gon<sup>(2)</sup>                   |
| quadratic  | quadratic bezier segment<sup>(1)</sup>          |
| rect       | axis aligned rectangle<sup>(2)</sup>            |
| triangle   | triangle<sup>(2)</sup>                          |

- <sup>(1)</sup> always interpolated/sampled
- <sup>(2)</sup> only interpolated if forced via attrib

### AxiDraw specific shape attributes

All
[thi.ng/geom](https://github.com/thi-ng/umbrella/blob/develop/packages/geom/)
shape types have support for arbitrary attributes. Different support packages
can then utilize these attribs to customize usage or behaviors. In this case,
any package-specific attribs must be stored under the `__axi` key:

- `clip`: Optional clip polygon vertices (if given only the parts of strokes
  inside that polygon will be plotted)
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

```ts
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
import { writeFileSync } from "fs";

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

TODO

<!-- include ../../assets/tpl/footer.md -->
