<!-- This file is generated - DO NOT EDIT! -->

# ![base-n](https://media.thi.ng/umbrella/banners/thing-base-n.svg?4cffdce7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/base-n.svg)](https://www.npmjs.com/package/@thi.ng/base-n)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/base-n.svg)
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

Arbitrary base-n conversions w/ presets for base16/32/36/58/62/64/85, support for arrays & bigints.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bbase-n%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/base-n
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/base-n?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/base-n/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 817 bytes / CJS: 925 bytes / UMD: 1001 bytes

## Dependencies

- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)

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

Karsten Schmidt

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

&copy; 2017 - 2021 Karsten Schmidt // Apache Software License 2.0
