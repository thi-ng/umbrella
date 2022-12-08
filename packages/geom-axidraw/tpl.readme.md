# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This package only deals with the conversion aspects. The
[@thi.ng/axidraw](https://github.com/thi-ng/umbrella/blob/develop/packages/axidraw)
is responsible for the actual plotter output...

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
| points     | point cloud (stipples)                          |
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

- `clip` - Optional clip polygon vertices (if given only the parts of strokes
  inside that polygon will be plotted)
- `delay` - Optional shape specific delay (in ms), e.g. hold time for pen down
  when stippling...
- `down` - Optional custom pen down position (in %)
- `speed` - Optional speed factor (multiple of globally configured draw speed).
  Depending on pen used, slower speeds might result in thicker strokes.

```ts
// a circle which will be plotted with only 10% of the normal speed
circle(100, { __axi: { speed: 0.1 } })
```

In addition to the above attributes, the thi.ng/geom package itself also makes
use of the `__samples` attribute to control the re-sampling of individual
shapes. Please see the following links for more details:

- [`SamplingOpts`](https://docs.thi.ng/umbrella/geom-api/interfaces/SamplingOpts.html)
- [`vertices()`](https://docs.thi.ng/umbrella/geom/functions/vertices.html)

### Basic usage & examples

This package only exposes a single polymorphic function
[`asAxiDraw()`](https://docs.thi.ng/umbrella/geom-axidraw/functions/asAxiDraw.html)
to convert any of the supported shape types into an iterable of
[thi.ng/axidraw](https://github.com/thi-ng/umbrella/blob/develop/packages/axidraw)
drawing commands. This conversion happens **semi-lazily** (via generator
functions) to minimize memory usage and spread out the computational load of the
conversions.

The below example can be directly launched via `node cubics.js` (obviously
provided you have an AxiDraw connected and all listed packages installed):

```ts tangle:export/cubics.ts
import { AxiDraw, complete } from "@thi.ng/axidraw";
import { asCubic, group, pathFromCubics, star } from "@thi.ng/geom";
import { asAxiDraw } from "@thi.ng/geom-axidraw";
import { map, range } from "@thi.ng/transducers";

(async () => {
	// create group of bezier-interpolated star polygons
	// each path uses a different interpolation config
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
	await axi.draw(complete(asAxiDraw(geo, { samples: 40 })));
})();
```

${status}

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

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
