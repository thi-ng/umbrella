<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/base-n](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-base-n.svg?457ce45a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/base-n.svg)](https://www.npmjs.com/package/@thi.ng/base-n)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/base-n.svg)
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
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Arbitrary base-n conversions w/ presets for base8/16/32/36/58/62/64/83/85, support for bigints and encoding/decoding of byte arrays.

In addition to the actual converters/encoders, the package also provides the
plain character strings for each base and variations.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bbase-n%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/base-n
```

ESM import:

```ts
import * as base from "@thi.ng/base-n";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/base-n"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const base = await import("@thi.ng/base-n");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.25 KB

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/base-n/)

```ts
import { BASE85, defBase } from "@thi.ng/base-n";

BASE85.encodeBigInt(2n ** 128n - 1);
// '=r54lj&NUUO~Hi%c2ym0'

BASE85.decodeBigInt("=r54lj&NUUO~Hi%c2ym0").toString(16);
// 'ffffffffffffffffffffffffffffffff'

// define a custom base impl
const ternary = defBase("012");

ternary.encode(12345678)
// '212020020002100'

ternary.decode("212020020002100");
// 12345678
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-base-n,
  title = "@thi.ng/base-n",
  author = "Karsten Schmidt",
  note = "https://thi.ng/base-n",
  year = 2017
}
```

## License

&copy; 2017 - 2025 Karsten Schmidt // Apache License 2.0
