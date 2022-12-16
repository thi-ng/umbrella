<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package largely started as a port of the visualization module of the
Clojure version [thi.ng/geom-clj](https://github.com/thi-ng/geom/) and is still
undergoing major redesigns.

For reference & what to expect (links to the Clojure version):

- [Examples](https://github.com/thi-ng/geom/blob/feature/no-org/org/examples/viz/demos.org)
- [Source](https://github.com/thi-ng/geom/blob/feature/no-org/org/src/viz/core.org)

| Example outputs                                                |                                                          |
|----------------------------------------------------------------|----------------------------------------------------------|
| ![](https://media.thi.ng/geom/viz/scatter-linear-3.svg)        | ![](https://media.thi.ng/geom/viz/scatter-log-3.svg)     |
| Logarithmic X-axis, linear Y                                   | Log X, Log Y                                             |
| ![](https://media.thi.ng/geom/viz/lineplot-3.svg)              | ![](https://media.thi.ng/geom/viz/areaplot-3.svg)        |
| Line plot (cartesian)                                          | Area plot (cartesian)                                    |
| ![](https://media.thi.ng/geom/viz/lineplot-polar-3.svg)        | ![](https://media.thi.ng/geom/viz/areaplot-polar-3.svg)  |
| Line plot (polar)                                              | Area plot (polar)                                        |
| ![](https://media.thi.ng/geom/viz/bars-3.svg)                  | ![](https://media.thi.ng/geom/viz/bars-interleave-3.svg) |
| Single value per domain position                               | 3 interleaved values (datasets) per domain position      |
| ![](https://media.thi.ng/geom/viz/radarplot-3.svg)             | ![](https://media.thi.ng/geom/viz/radarplot-minmax.svg)  |
| 6 categories, 3 data sets, single values                       | 6 categories, 3 data sets, min-max intervals             |
| ![](https://media.thi.ng/geom/viz/hm-rainbow2.svg)             | ![](https://media.thi.ng/geom/viz/hm-orange-blue.svg)    |
| Heatmap w/ rainbow gradient presets                            |                                                          |
| ![](https://media.thi.ng/geom/viz/hmp-yellow-magenta-cyan.svg) | ![](https://media.thi.ng/geom/viz/hmp-green-magenta.svg) |
| Heatmap polar projection                                       |                                                          |
| ![](https://media.thi.ng/geom/viz/hms-rainbow2.svg)            | ![](https://media.thi.ng/geom/viz/hmsp-rainbow2.svg)     |
| w/ custom shape fn                                             | polar projection, custom shape fn                        |
| ![](https://media.thi.ng/geom/viz/contours-4.svg)              | ![](https://media.thi.ng/geom/viz/terrain-6.svg)         |
| Contour plot                                                   |                                                          |
| ![](https://media.thi.ng/geom/viz/timeline-3.svg)              |                                                          |

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
