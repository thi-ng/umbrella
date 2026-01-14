<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/sparse-set](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-sparse-set.svg?eb275e55)

[![npm version](https://img.shields.io/npm/v/@thi.ng/sparse-set.svg)](https://www.npmjs.com/package/@thi.ng/sparse-set)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/sparse-set.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 213 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [SparseSet8/16/32](#sparseset81632)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

TypedArray-based sparse set implementations with extended ES Set API.

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/associative](https://thi.ng/associative) package.

### SparseSet8/16/32

[Sparse sets](https://research.swtch.com/sparse) provide super fast
(approx. 4x faster than the native `Set` impl) insertion & lookups for
numeric values in the interval `[0..n)` . The implementation in this
package provides most of the ES6 Set API and internally relies on 2 uint
typed arrays, with the actual backing type dependent on `n`.

Furthermore, unless (or until) values are being removed from the set,
they retain their original insertion order. For some use cases (e.g.
deduplication of values), this property can be very useful.

```ts
import { defSparseSet } from "@thi.ng/sparse-set";

// create sparse set for value range 0 - 99 (uint8 backed)
const a = defSparseSet(100);
a.into([99, 42, 66, 23, 66, 42]);
// SparseSet8 { 99, 42, 66, 23 }

a.has(66)
// true

// sparse sets are iterable
[...a]
// [ 99, 42, 66, 23 ]

// attempting to add out-of-range values will fail
a.add(100)
// SparseSet8 { 99, 42, 66, 23 }

// create sparse set for 16 bit value range 0 - 0xffff (uint16 backed)
const b = defSparseSet(0x10000);
// SparseSet16 {}
```

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bsparse-set%5D+in%3Atitle)

## Related packages

- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative) - ES Map/Set-compatible implementations with customizable equality semantics & supporting operations

## Installation

```bash
yarn add @thi.ng/sparse-set
```

ESM import:

```ts
import * as ss from "@thi.ng/sparse-set";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/sparse-set"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ss = await import("@thi.ng/sparse-set");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.12 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/sparse-set/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-sparse-set,
  title = "@thi.ng/sparse-set",
  author = "Karsten Schmidt",
  note = "https://thi.ng/sparse-set",
  year = 2019
}
```

## License

&copy; 2019 - 2026 Karsten Schmidt // Apache License 2.0
