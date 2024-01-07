<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

The API of this package is still unstable, but the underlying implementations
have been used in many of the author's projects since ~2005... The agent/boid
behaviors are fully modular and can be highly customized via the given
parameters (which can also be dynamically/spatially adjusted). As with other
thi.ng packages, the visual representation of the boids is entirely separate and
out of scope of this package. This package only deals with the simulation of
agents, their behavioral aspects and essentially only processes points in space
(and their directions, forces)...

### Available behaviors

The following behavior building blocks are provided. All of them can be freely
combined (incl. multiple instances with different configurations) and assigned
to individual boids (or groups of them). Each behavior also has an associated
weight to adjust its impact on the overall movement of the boids (also
dynamically adjustable).

- [`alignment()`](https://docs.thi.ng/umbrella/boids/functions/alignment.html):
  Steer towards the average direction of neighbors within given radius
- [`attractPolyline()`](https://docs.thi.ng/umbrella/boids/functions/attractPolyline.html):
  Steer towards the nearest point on a pre-configured polyline (or polygon)
- [`braitenberg2()`](https://docs.thi.ng/umbrella/boids/functions/braitenberg2.html):
  Field-based 3-sensor (left/right/center) Braitenberg vehicle steering
- [`cohesion()`](https://docs.thi.ng/umbrella/boids/functions/cohesion.html):
  Steer towards the centroid of neighbors within given radius
- [`dynamicTarget()`](https://docs.thi.ng/umbrella/boids/functions/dynamicTarget.html):
  Steer towards user defined (dynamically changeable) location(s)
- [`followPolyline()`](https://docs.thi.ng/umbrella/boids/functions/followPolyline.html):
  Steer towards the following/next point on a pre-configured polyline (or
  polygon)
- [`separation()`](https://docs.thi.ng/umbrella/boids/functions/separation.html):
  Steer away from neighbors within given radius

### Acceleration structures

Intended for behaviors requiring neighbor lookups, the package defines &
utilizes the [`IBoidAccel`
interface](https://docs.thi.ng/umbrella/boids/interfaces/IBoidAccel.html). It's
recommended to use a compatible spatial acceleration structure such as
[`HashGrid2` or
`HashGrid3`](https://docs.thi.ng/umbrella/geom-accel/classes/HashGrid2.html#queryNeighborhood)
from the [@thi.ng/geom-accel
package](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel).
For cases where this isn't needed, the
[`noAccel`](https://docs.thi.ng/umbrella/boids/functions/noAccel.html) dummy
implementation of this interface can be used... In all cases, an acceleration
structure has to be provided to the boid ctor and factory functions
[`defBoid2()`](https://docs.thi.ng/umbrella/boids/functions/defBoid2.html) /
[`defBoid3()`](https://docs.thi.ng/umbrella/boids/functions/defBoid3.html).

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
