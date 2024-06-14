<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

### Tessellators

The following tessellator algorithms are provided, but the package is designed
to be fully extensible. See code examples further below.

The following diagrams each show the effect of a single tessellator applied to a
triangle, square, hexagon and octagon.

#### Ear cut

![diagram of tessellated polygons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-tessellate/ear-cut.png)

- [earCut](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/earcut.ts)

##### Complex polygons

- [earCutComplex](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/earcut-complex.ts)

Higher order tessellator for concave polygons and/or polygons with holes...

TODO add comments, credits & example

#### Edge split

![diagram of tessellated polygons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-tessellate/edge-split.png)

- [edgeSplit](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/edge-split.ts)

#### Inset

![diagram of tessellated polygons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-tessellate/inset.png)

- [inset](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/inset.ts)

Higher order tessellator with configurable inset distance (normalized) toward
centroid and option to keep center polygon (empty by default).

#### Quad fan

![diagram of tessellated polygons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-tessellate/quad-fan.png)

- [quadFan](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/quad-fan.ts)

#### Rim triangles

![diagram of tessellated polygons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-tessellate/rim-tris.png)

- [rimTris](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/rim-tris.ts)

#### Tri fan (with boundary point)

![diagram of tessellated polygons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-tessellate/tri-fan-boundary.png)

- [triFanBoundary](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/tri-fan-boundary.ts)

#### Tri fan (with centroid)

![diagram of tessellated polygons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-tessellate/tri-fan.png)

- [triFan](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/tri-fan.ts)

#### Tri fan (with edge splitting)

![diagram of tessellated polygons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-tessellate/tri-fan-split.png)

- [triFanSplit](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/tri-fan-split.ts)


### The `ITessellation` interface & implementation

The tessellators provided all operate in conjunction with a
[`ITessellation`](https://docs.thi.ng/umbrella/geom-tessellate/interfaces/ITessellation.html)
implementation which is used to collect (or index) points/vertices and generated
faces (not necessarily triangles).

Currently, there're two implementations available:

- [`BasicTessellation`](https://docs.thi.ng/umbrella/geom-tessellate/classes/BasicTessellation.html)
  is used as the default and merely collects points & faces into arrays
- [`MeshTessellation`](https://docs.thi.ng/umbrella/geom-tessellate/classes/MeshTessellation.html)
  uses a kD-tree to deduplicate/weld and re-use points (with configurable
  tolerance) and is recommended for use cases when the result tessellation
  should be converted or used for graph-like analysis or other post-processing.

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

**This is a low(er)-level support package for [thi.ng/geom](https://thi.ng/geom)
and most users are encouraged to use the polymorphic [`tessellate()`
function](https://docs.thi.ng/umbrella/geom/functions/tessellate.html)
provided by that package.**

In addition to the actual tessellator algorithms described above, this package
also provides its own set of `tessellate()` functions to simplify
recursive/iterative application of multiple tessellation passes:

- [`tessellate()`](https://docs.thi.ng/umbrella/geom-tessellate/functions/tessellate.html)
- [`tessellateWith()`](https://docs.thi.ng/umbrella/geom-tessellate/functions/tessellateWith.html)
- [`tessellateFaces()`](https://docs.thi.ng/umbrella/geom-tessellate/functions/tessellateFaces.html)

### Basic usage

```ts tangle:export/readme.ts
import * as gt from "@thi.ng/geom-tessellate";

// points of a square polygon
const points = [[0,0], [100,0], [100,100], [0, 100]];

// tessellate square into a triangle fan
console.log(gt.tessellate(points, gt.triFan));
// BasicTessellation {
//   points: [[ 0, 0 ], [ 100, 0 ], [ 100, 100 ], [ 0, 100 ], [ 50, 50 ]],
//   faces: [[ 4, 0, 1 ], [ 4, 1, 2 ], [ 4, 2, 3 ], [ 4, 3, 0 ]],
//   ...
// }

// tessellate square first into a triangle fan, then each triangle into a quad fan
console.log(gt.tessellate(points, [gt.triFan, gt.quadFan]));
// BasicTessellation {
//   points: [
//     [ 0, 0 ], [ 100, 0 ], [ 100, 100 ], [ 0, 100 ],
//     [ 50, 50 ], [ 50, 16.666 ], [ 75, 25 ], [ 25, 25 ],
//     [ 50, 0 ], [ 83.333, 50 ], [ 75, 75 ], [ 75, 25 ],
//     [ 100, 50 ], [ 50, 83.333 ], [ 25, 75 ], [ 75, 75 ],
//     [ 50, 100 ], [ 16.666, 50 ], [ 25, 25 ], [ 25, 75 ], [ 0, 50 ]
//   ],
//   faces: [
//     [ 5, 6, 4, 7 ], [ 5, 7, 0, 8 ], [ 5, 8, 1, 6 ], [ 9, 10, 4, 11 ],
//     [ 9, 11, 1, 12 ], [ 9, 12, 2, 10 ], [ 13, 14, 4, 15 ], [ 13, 15, 2, 16 ],
//     [ 13, 16, 3, 14 ], [ 17, 18, 4, 19 ], [ 17, 19, 3, 20 ], [ 17, 20, 0, 18 ]
//   ],
//   ...
// }

// apply quadfan twice and use a custom tessellation instance
// (here to dedupe generated edge midpoints)
console.log(gt.tessellateWith(new gt.MeshTessellation(2), points, gt.quadFan, 2));
// MeshTessellation {
//   points: [
//     [ 0, 0 ], [ 100, 0 ], [ 100, 100 ], [ 0, 100 ],
//     [ 50, 50 ], [ 0, 50 ], [ 50, 0 ], [ 100, 50 ],
//     [ 50, 100 ], [ 25, 25 ], [ 50, 25 ], [ 25, 50 ],
//     [ 0, 25 ], [ 25, 0 ], [ 75, 25 ], [ 75, 50 ],
//     [ 75, 0 ], [ 100, 25 ], [ 75, 75 ], [ 50, 75 ],
//     [ 100, 75 ], [ 75, 100 ], [ 25, 75 ], [25, 100], [ 0, 75 ]
//   ],
//   faces: [
//     [ 9, 10, 4, 11 ], [ 9, 11, 5, 12 ], [ 9, 12, 0, 13 ], [ 9, 13, 6, 10 ],
//     [ 14, 15, 4, 10 ], [ 14, 10, 6, 16 ], [ 14, 16, 1, 17 ], [ 14, 17, 7, 15 ],
//     [ 18, 19, 4, 15 ], [ 18, 15, 7, 20 ], [ 18, 20, 2, 21 ], [ 18, 21, 8, 19 ],
//     [ 22, 11, 4, 19 ], [ 22, 19, 8, 23 ], [ 22, 23, 3, 24 ], [ 22, 24, 5, 11 ]
//   ],
//   ...
// }
```

<!-- include ../../assets/tpl/footer.md -->
