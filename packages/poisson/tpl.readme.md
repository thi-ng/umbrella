<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

![example screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-voronoi.jpg)

nD Stratified grid and [Poisson disc
sampling](https://en.wikipedia.org/wiki/Supersampling#Poisson_disc) with
support for variable spatial density, custom PRNGs (via
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)'s
`IRandom` interface & implementations) and customizable quality
settings.

The Poisson disc sampler requires a spatial index and we recommend using
`KdTreeSet` from the
[@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
package to speed up the sampling process, but other
[`ISpatialSet`-compatible](https://docs.thi.ng/umbrella/geom-api/interfaces/ISpatialSet.html)
indices are supported as well...

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

### Poisson disc sampling

The package provides a single function `samplePoisson()` and the
following options to customize the sampling process:

- **points**: Point generator function. Responsible for producing a new
  candidate point within user defined bounds using provided RNG.
- **density**: Density field function. Called for each new candidate
  point created by point generator and should return the poisson disc
  exclusion radius for the given point location. The related candidate
  point can only be placed if no other points are already existing
  within the given radius/distance. If this option is given as number,
  uses this value to create a uniform distance field.
- **index**: Spatial indexing implementation for nearest neighbor
  searches of candidate points. Currently only
  [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
  types are supported. The data structure is used to store all
  successful sample points. Furthermore, pre-seeding the data structure
  allows already indexed points to participate in the sampling process
  and so can be used to define exclusion zones. It also can be used as
  mechanism for progressive sampling, i.e. generating a large number of
  samples and distributing the process over multiple invocations of
  smaller sample sizes (see `max` option) to avoid long delays.
- **max**:  Max number of samples to produce. Must be given, no default.
- **jitter?**: Step distance for the random walk each failed
  candidate point is undergoing. This distance should be adjusted
  depending on overall sampling area/bounds. Default: 1
- **iter?**: Number of random walk steps performed before giving up on a
  candidate point. Increasing this value improves overall quality.
  Default: 1
- **quality?**: Number of allowed failed consecutive candidate points
  before stopping entire sampling process (most likely due to not being
  able to place any further points). As with the `iter` param,
  increasing this value improves overall quality, especially in dense
  regions with small radii. Default: 500
- **rnd?**: Random number generator instance. Default:
  [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
  `SYSTEM` (aka Math.random)

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/poisson.jpg)

```ts
import { asSvg, circle, svgDoc } from "@thi.ng/geom";
import { KdTreeSet } from "@thi.ng/geom-accel";
import { fit01 } from "@thi.ng/math";
import { samplePoisson } from "@thi.ng/poisson";
import { dist, randMinMax2 } from "@thi.ng/vectors";

const index = new KdTreeSet(2);

const pts = samplePoisson({
    index,
    points: () => randMinMax2(null, [0, 0], [500, 500]),
    density: (p) => fit01(Math.pow(dist(p, [250, 250]) / 250, 2), 2, 10),
    iter: 5,
    max: 8000,
    quality: 500,
});

// use thi.ng/geom to visualize results
// each circle's radius is set to distance to its nearest neighbor
const circles = pts.map((p) =>
    circle(p, dist(p, index.queryKeys(p, 40, 2)[1]) / 2)
);

document.body.innerHTML = asSvg(
    svgDoc({ fill: "none", stroke: "blue" }, ...circles)
);
```

### Stratified grid sampling

The `stratifiedGrid` function can produce 2D or 3D grid samples based on the
following config options:

- **dim**: 2D/3D vector defining grid size (in cells)
- **scale**: Scale factor/vector applied to all generated points. If omitted,
  the points will be in grid coordinates.
- **separation?**: Enforced minimum distance between samples (in [0 .. 0.99] range)
- **rnd?**: Random number generator instance. Default:
  [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
  `SYSTEM` (aka Math.random)

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/stratified-grid.png)

```ts
import { asSvg, group, line, points, svgDoc } from "@thi.ng/geom";
import { stratifiedGrid2 } from "@thi.ng/poisson";
import { map, range } from "@thi.ng/transducers";

const W = 50;

document.body.innerHTML = asSvg(
    svgDoc(
        {
            width: 600,
            height: 600,
            fill: "blue",
            stroke: "none",
        },
        // grid lines
        group({ stroke: "#fcc", weight: 0.1 }, [
            ...map((x) => line([x, 0], [x, W]), range(1, W)),
            ...map((y) => line([0, y], [W, y]), range(1, W)),
        ]),
        // grid samples as point cloud
        points(
            [...stratifiedGrid2({ dim: [W, W], separation: 0.5 })],
            { shape: "circle", size: 0.25 }
        )
    )
);
```

<!-- include ../../assets/tpl/footer.md -->
