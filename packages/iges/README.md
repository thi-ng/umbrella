<!-- This file is generated - DO NOT EDIT! -->

# ![iges](https://media.thi.ng/umbrella/banners/thing-iges.svg?5d61f971)

[![npm version](https://img.shields.io/npm/v/@thi.ng/iges.svg)](https://www.npmjs.com/package/@thi.ng/iges)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/iges.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

IGES 5.3 serializer for (currently only) polygonal geometry, both open & closed.

Mainly intended for exporting geometry to be used in various CAD
applications (e.g. Rhino, Houdini, Fusion 360)

![houdini](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/iges/iges-houdini.png)

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/iges
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/iges?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/iges/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 2.82 KB / CJS: 2.86 KB / UMD: 2.79 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/iges/)

```ts
import * as iges from "@thi.ng/iges";

const doc = iges.newDocument({
    maxCoord: 100,
    precision: 3,
    author: "toxi",
    authorOrg: "thi.ng",
});

doc.start = [
    "Example file for @thi.ng/iges",
    "Defines single open 2D polyline (type 106)"
];

iges.addPolyline(doc, [
    [0,0],
    [0, 100],
    [50, 150],
    [100, 100],
    [0, 100],
    [100, 0],
    [0, 0],
    [100, 100],
    [100, 0]
]);

console.log(iges.serialize(doc));
```

Resulting output (IGES is a text file format):

```iges
Example file for @thi.ng/iges                                           S      1
Defines single open 2D polyline (type 106)                              S      2
1H,,1H;,,,12H@thi.ng/iges,5H0.0.1,32,38,6,308,15,,1.000,2,2HMM,1,0.254, G      1
15H20180712.212228,0.001,100.000,4Htoxi,6Hthi.ng,11,0,                  G      2
15H20180712.212228;                                                     G      3
     106       1       0       0       0       0       0       000000000D      1
     106       0       0       3      11       0       0               0D      2
106,1,9,0.000,0.000,0.000,0.000,100.000,50.000,150.000,100.000,  0000001P      1
100.000,0.000,100.000,100.000,0.000,0.000,0.000,100.000,100.000, 0000001P      2
100.000,0.000;                                                   0000001P      3
S0000002G0000003D0000002P0000003                                        T      1
```

## Authors

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
