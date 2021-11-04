# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

The functions in this package can be used with any
[`IGrid2D`](https://docs.thi.ng/umbrella/api/interfaces/IGrid2D.html) compatible
grid/image type (e.g. those provided by
[@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
or
[@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas)).

Currently the following functions are available:

### Circle

Filled or outline implementation of [Bresenham's circle
algorithm](https://en.wikipedia.org/wiki/Midpoint_circle_algorithm). A clipping
check is pre-applied to see if the circle lies entirely outside the target grid.

### Line

Implementation of [Bresenham's line
algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) with
pre-applied [Liang-Barsky
clipping](https://en.wikipedia.org/wiki/Liang%E2%80%93Barsky_algorithm). The
higher-order function
[`drawLineWith()`](https://docs.thi.ng/umbrella/rasterize/modules.html#drawLineWith)
can be used to apply custom brushes to trace the line.

### Rect

Filled or outline implementation with pre-applied clipping against the target grid.

### Flood fill

Fills grid in the connected region around `x,y` with given value or pattern. See
[`floodFill()` in the @thi.ng/grid-iterators
package](https://docs.thi.ng/umbrella/grid-iterators/modules.html#floodFill) for
further details.

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
