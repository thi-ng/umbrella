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

| Example outputs                                                                                       |                                                                                                 |
|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/scatter-linear-3.svg)        | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/scatter-log-3.svg)     |
| Logarithmic X-axis, linear Y                                                                          | Log X, Log Y                                                                                    |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/lineplot-3.svg)              | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/areaplot-3.svg)        |
| Line plot (cartesian)                                                                                 | Area plot (cartesian)                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/lineplot-polar-3.svg)        | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/areaplot-polar-3.svg)  |
| Line plot (polar)                                                                                     | Area plot (polar)                                                                               |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/bars-3.svg)                  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/bars-interleave-3.svg) |
| Single value per domain position                                                                      | 3 interleaved values (datasets) per domain position                                             |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/radarplot-3.svg)             | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/radarplot-minmax.svg)  |
| 6 categories, 3 data sets, single values                                                              | 6 categories, 3 data sets, min-max intervals                                                    |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hm-rainbow2.svg)             | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hm-orange-blue.svg)    |
| Heatmap w/ rainbow gradient presets                                                                   |                                                                                                 |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hmp-yellow-magenta-cyan.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hmp-green-magenta.svg) |
| Heatmap polar projection                                                                              |                                                                                                 |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hms-rainbow2.svg)            | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hmsp-rainbow2.svg)     |
| w/ custom shape fn                                                                                    | polar projection, custom shape fn                                                               |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/contours-4.svg)              | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/terrain-6.svg)         |
| Contour plot                                                                                          |                                                                                                 |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/timeline-3.svg)              |                                                                                                 |

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
