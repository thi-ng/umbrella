<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-clip-poly](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-geom-clip-poly.svg?36977eab)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-clip-poly.svg)](https://www.npmjs.com/package/@thi.ng/geom-clip-poly)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-clip-poly.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
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

2D polygon clipping / offsetting (Sutherland-Hodgeman, Grainer-Hormann). This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

Current implementations are based on [toxiclibs](http://toxiclibs.org)
(Java) and Clojure versions [thi.ng/geom-clj](http://thi.ng/geom-clj).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-clip-poly%5D+in%3Atitle)

## Related packages

- [@thi.ng/geom-clip-line](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-line) - 2D line clipping (Liang-Barsky)

## Installation

```bash
yarn add @thi.ng/geom-clip-poly
```

ESM import:

```ts
import * as gcp from "@thi.ng/geom-clip-poly";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-clip-poly"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gcp = await import("@thi.ng/geom-clip-poly");
```

Package sizes (brotli'd, pre-treeshake): ESM: 317 bytes

## Dependencies

- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-poly-utils)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-clip-poly/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-clip-poly,
  title = "@thi.ng/geom-clip-poly",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-clip-poly",
  year = 2013
}
```

## License

&copy; 2013 - 2025 Karsten Schmidt // Apache License 2.0
