<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Also includes an implementation of [Douglas-Peucker polyline / polygon
simplification](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm).

Current implementations partially based on
[toxiclibs](http://toxiclibs.org) (Java) and Clojure version of
[thi.ng/geom](http://thi.ng/geom).

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
import { resample, simplify } from "@thi.ng/geom-resample";

// resample polygon w/ uniform distance
const pts = resample([[0,0], [100,0], [100,100], [0,100]], { dist: 25 }, true)

// [ [ 0, 0 ], [ 25, 0 ], [ 50, 0 ], [ 75, 0 ],
//   [ 100, 0 ], [ 100, 25 ], [ 100, 50 ], [ 100, 75 ],
//   [ 100, 100 ], [ 75, 100 ], [ 50, 100 ], [ 25, 100 ],
//   [ 0, 100 ], [ 0, 75 ], [ 0, 50 ], [ 0, 25 ] ]

// simply polygon
// (epsilon = 0 only removes co-linear points, increase if necessary)
simplify(pts, 0, true)

// [ [ 0, 0 ], [ 100, 0 ], [ 100, 100 ], [ 0, 100 ] ]
```

<!-- include ../../assets/tpl/footer.md -->
