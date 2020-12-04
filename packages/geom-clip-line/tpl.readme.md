# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Current implementation is based on [toxiclibs](http://toxiclibs.org)
(Java) and Clojure version [thi.ng/geom-clj](http://thi.ng/geom-clj).

This package has been extracted from the former (now obsolete)
@thi.ng/geom-clip package.

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

- `liangBarsky2`
- `liangBarksy2Raw`

```ts
import { liangBarsky2 } from "@thi.ng/geom-clip-line";

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

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
