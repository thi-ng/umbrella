<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Current implementation is partially based on [toxiclibs](http://toxiclibs.org)
(Java) and Clojure version [thi.ng/geom-clj](http://thi.ng/geom-clj). Also see
[@thi.ng/geom-clip-poly](https://github.com/thi-ng/umbrella/blob/develop/packages/geom-clip-poly)
sister package.

The following main functions are provided:

- [`clipLinePoly()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/clipLinePoly.html)
- [`clipLineSegmentPoly()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/clipLineSegmentPoly.html)
- [`clipPolylinePoly()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/clipPolylinePoly.html)
- [`liangBarsky2()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/liangBarsky2.html)

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

```ts
import { clipPolylinePoly, liangBarsky2 } from "@thi.ng/geom-clip-line";

clipPolylinePoly(
	// polyline vertices
	[[10, -50], [30, 30], [-50, 50], [150, 50], [70, 70], [90, 150]],
	// boundary polygon vertices
	[[0, 0], [100, 0], [100, 100], [0, 100]]
);
// result is 3 polylines:
// (since the original is temporarily leaving the poly)
// [
//   [ [ 22.5, 0 ], [ 30, 30 ], [ 0, 37.5 ] ],
//   [ [ 0, 50 ], [ 100, 50 ] ],
//   [ [ 100, 62.5 ], [ 70, 70 ], [ 77.5, 100 ] ]
// ]

// Liang-Barsky is optimized for rectangular clipping regions
liangBarsky2(
    // line end points
    [-10, -20], [30, 400],
    // min/max clip rect
    [0, 0], [100, 200]
)
// [ [ 0, 85 ], [ 10.952380952380953, 200 ], 0.25, 0.5238095238095238 ]

// returns undefined if line is completely outside the clip rect
liangBarsky2(
    // line end points
    [-10, -20], [-30, 400],
    // min/max bbox
    [0, 0], [100, 200]
)
// undefined
```

<!-- include ../../assets/tpl/footer.md -->
