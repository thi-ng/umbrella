<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/binary](https://media.thi.ng/umbrella/banners-20230807/thing-binary.svg?69792d31)

[![npm version](https://img.shields.io/npm/v/@thi.ng/binary.svg)](https://www.npmjs.com/package/@thi.ng/binary)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/binary.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 199 standalone projects, maintained as part
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
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

100+ assorted binary / bitwise operations, conversions, utilities, lookup tables.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bbinary%5D+in%3Atitle)

## Related packages

- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary) - Binary data related transducers & reducers

## Installation

```bash
yarn add @thi.ng/binary
```

ESM import:

```ts
import * as bin from "@thi.ng/binary";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/binary"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const bin = await import("@thi.ng/binary");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.20 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Two projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                             | Description                                                           | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-benchmark2.png" width="240"/> | hdom update performance benchmark w/ config options                   | [Demo](https://demo.thi.ng/umbrella/hdom-benchmark2/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-benchmark2) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/simd-plot.png" width="240"/>       | Fitting, transforming & plotting 10k data points per frame using SIMD | [Demo](https://demo.thi.ng/umbrella/simd-plot/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/simd-plot)       |

## API

[Generated API docs](https://docs.thi.ng/umbrella/binary/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-binary,
  title = "@thi.ng/binary",
  author = "Karsten Schmidt",
  note = "https://thi.ng/binary",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
