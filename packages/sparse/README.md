<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/sparse](https://media.thi.ng/umbrella/banners-20230807/thing-sparse.svg?39a81555)

[![npm version](https://img.shields.io/npm/v/@thi.ng/sparse.svg)](https://www.npmjs.com/package/@thi.ng/sparse)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/sparse.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Sparse vector & matrix implementations.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bsparse%5D+in%3Atitle)

## Related packages

- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices) - Matrix & quaternion operations for 2D/3D geometry processing
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations, support for memory mapping/layouts

## Installation

```bash
yarn add @thi.ng/sparse
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/sparse"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const sparse = await import("@thi.ng/sparse");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.40 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/sparse/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-sparse,
  title = "@thi.ng/sparse",
  author = "Karsten Schmidt",
  note = "https://thi.ng/sparse",
  year = 2018
}
```

## License

&copy; 2018 - 2024 Karsten Schmidt // Apache License 2.0
