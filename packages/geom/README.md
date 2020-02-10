<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/geom](https://media.thi.ng/umbrella/banners/thing-geom.svg?1581297788)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom.svg)](https://www.npmjs.com/package/@thi.ng/geom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Support packages](#support-packages)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Functional, polymorphic API for 2D geometry types & SVG generation.

This project is a partially ported from the [Clojure version of the same
name](http://thi.ng/geom). All polymorphic operations built on
[@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti).

[**Up-to-date feature matrix spreadsheet**](https://docs.google.com/spreadsheets/d/1GxJm-zOQaGECui2MJUmy3gQPTF-T6BJ6vhNlUnPsmDs/edit?usp=sharing)

This package acts as a higher-level frontend for most of the following
related packages (which are more low-level, lightweight and usable by
themselves too):

### Support packages

- [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel) - n-D spatial indexing data structures
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api) - Shared type & interface declarations for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) packages
- [@thi.ng/geom-arc](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-arc) - 2D circular / elliptic arc operations
- [@thi.ng/geom-clip](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip) - 2D line & convex polygon clipping (Liang-Barsky / Sutherland-Hodgeman)
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-closest-point) - 2D / 3D closest point / proximity helpers
- [@thi.ng/geom-hull](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-hull) - Fast 2D convex hull (Graham Scan)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec) - 2D/3D shape intersection checks
- [@thi.ng/geom-isoline](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isoline) - Fast 2D contour line extraction / generation
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-poly-utils) - 2D polygon / triangle analysis & processing utilities
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-resample) - Customizable nD polyline interpolation, re-sampling, splitting & nearest point computation
- [@thi.ng/geom-splines](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-splines) - nD cubic & quadratic curve analysis, conversion, interpolation, splitting
- [@thi.ng/geom-subdiv-curve](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-subdiv-curve) - Freely customizable, iterative nD subdivision curves for open / closed geometries
- [@thi.ng/geom-tessellate](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate) - 2D/3D convex polygon tessellators
- [@thi.ng/geom-voronoi](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-voronoi) - Fast, incremental 2D Delaunay & Voronoi mesh implementation

### Status

**BETA** - possibly breaking changes forthcoming

## Installation

```bash
yarn add @thi.ng/geom
```

Package sizes (gzipped): ESM: 9.1KB / CJS: 9.3KB / UMD: 8.8KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-arc](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-arc)
- [@thi.ng/geom-clip](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip)
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-closest-point)
- [@thi.ng/geom-hull](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-hull)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-poly-utils)
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-resample)
- [@thi.ng/geom-splines](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-splines)
- [@thi.ng/geom-subdiv-curve](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-subdiv-curve)
- [@thi.ng/geom-tessellate](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

### geom-convex-hull <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-convex-hull.png)

[Live demo](https://demo.thi.ng/umbrella/geom-convex-hull/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-convex-hull)

### geom-tessel <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/tessel.png)

[Live demo](https://demo.thi.ng/umbrella/geom-tessel/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-tessel)

### geom-voronoi-mst <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg)

Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization

[Live demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst)

### gesture-analysis <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/gesture-analysis.png)

Mouse gesture / stroke analysis, simplification, corner detection

[Live demo](https://demo.thi.ng/umbrella/gesture-analysis/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gesture-analysis)

### imgui <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png)

Canvas based Immediate Mode GUI components

[Live demo](https://demo.thi.ng/umbrella/imgui/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)

### iso-plasma <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png)

Animated sine plasma effect visualized using contour lines

[Live demo](https://demo.thi.ng/umbrella/iso-plasma/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma)

### poly-spline <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/poly-spline/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline)

### rotating-voronoi <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg)

[Live demo](https://demo.thi.ng/umbrella/rotating-voronoi/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)

### scenegraph <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png)

[Live demo](https://demo.thi.ng/umbrella/scenegraph/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)

### scenegraph-image <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png)

[Live demo](https://demo.thi.ng/umbrella/scenegraph-image/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2013 - 2020 Karsten Schmidt // Apache Software License 2.0
