# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

| Type   | Circle | Line | Poly | Ray | Rect | Tri |
|--------|:------:|:----:|:----:|:---:|:----:|:---:|
| Circle |   ✓    |      |      |     |      |     |
| Line   |        |  ✓   |      |     |      |     |
| Point  |   ✓    |  ✓   |  ✓   |     |  ✓   |  ✓  |
| Ray    |   ✓    |  ✓   |  ✓   |     |  ✓   |     |
| Rect   |   ✓    |      |      |     |  ✓   |     |

### 3D tests

| Type   | AABB | Plane | Point | Ray | Sphere |
|--------|:----:|:-----:|:-----:|:---:|:------:|
| AABB   |  ✓   |       |       |     |   ✓    |
| Plane  |      |   ✓   |       |     |        |
| Point  |  ✓   |       |       |     |   ✓    |
| Ray    |  ✓   |   ✓   |       |     |   ✓    |
| Sphere |      |       |       |     |   ✓    |

Current implementations partially based on
[toxiclibs](http://toxiclibs.org) (Java) and Clojure version of
[thi.ng/geom](http://thi.ng/geom).

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

```ts
import * as isec from "@thi.ng/geom-isec";

const res = isec.intersectLineLine([0, 0], [100, 50], [50, 100], [50, -100]);
// { type: 4, isec: [ 50, 25 ], alpha: 0.5, beta: 0.375, det: -20000 }

res.type === isec.IntersectionType.INTERSECT
// true
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
