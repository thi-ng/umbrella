<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/iges](https://media.thi.ng/umbrella/banners-20230807/thing-iges.svg?98dfafa7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/iges.svg)](https://www.npmjs.com/package/@thi.ng/iges)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/iges.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
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

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Biges%5D+in%3Atitle)

## Related packages

- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation

## Installation

```bash
yarn add @thi.ng/iges
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/iges"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const iges = await import("@thi.ng/iges");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.40 KB

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

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-iges,
  title = "@thi.ng/iges",
  author = "Karsten Schmidt",
  note = "https://thi.ng/iges",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
