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

| Example outputs                                                                                            |                                                                                                      |
|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/scatter-linear-3.svg)        | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/scatter-log-3.svg)     |
| Logarithmic X-axis, linear Y                                                                               | Log X, Log Y                                                                                         |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/lineplot-3.svg)              | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/areaplot-3.svg)        |
| Line plot (cartesian)                                                                                      | Area plot (cartesian)                                                                                |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/lineplot-polar-3.svg)        | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/areaplot-polar-3.svg)  |
| Line plot (polar)                                                                                          | Area plot (polar)                                                                                    |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/bars-3.svg)                  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/bars-interleave-3.svg) |
| Single value per domain position                                                                           | 3 interleaved values (datasets) per domain position                                                  |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/radarplot-3.svg)             | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/radarplot-minmax.svg)  |
| 6 categories, 3 data sets, single values                                                                   | 6 categories, 3 data sets, min-max intervals                                                         |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/hm-rainbow2.svg)             | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/hm-orange-blue.svg)    |
| Heatmap w/ rainbow gradient presets                                                                        |                                                                                                      |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/hmp-yellow-magenta-cyan.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/hmp-green-magenta.svg) |
| Heatmap polar projection                                                                                   |                                                                                                      |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/hms-rainbow2.svg)            | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/hmsp-rainbow2.svg)     |
| w/ custom shape fn                                                                                         | polar projection, custom shape fn                                                                    |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/contours-4.svg)              | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/terrain-6.svg)         |
| Contour plot                                                                                               |                                                                                                      |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/viz/timeline-3.svg)              |                                                                                                      |

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
