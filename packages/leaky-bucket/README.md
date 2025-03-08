<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/leaky-bucket](https://media.thi.ng/umbrella/banners-20230807/thing-leaky-bucket.svg?92dc6543)

[![npm version](https://img.shields.io/npm/v/@thi.ng/leaky-bucket.svg)](https://www.npmjs.com/package/@thi.ng/leaky-bucket)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/leaky-bucket.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 203 standalone projects, maintained as part
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

Configurable, counter-based Leaky Bucket abstractions.

Reference:

- https://en.wikipedia.org/wiki/Leaky_bucket

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bleaky-bucket%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/leaky-bucket
```

ESM import:

```ts
import * as lb from "@thi.ng/leaky-bucket";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/leaky-bucket"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const lb = await import("@thi.ng/leaky-bucket");
```

Package sizes (brotli'd, pre-treeshake): ESM: 591 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/leaky-bucket/)

```ts tangle:export/readme-1.ts
import { LeakyBucketMap } from "@thi.ng/leaky-bucket";

const buckets = new LeakyBucketMap({
    maxBuckets: 2,
    capacity: 3,
    leakInterval: 1000,
});

buckets.update("a") //true
buckets.update("a") //true
buckets.update("a") //true

// max capacity=3 reached
buckets.update("a"); // false

// another bucket
buckets.update("b"); // true

// max buckets=2 reached
buckets.update("c"); // false

// wait > 1000ms, buckets have leaked...

// bucket A has capacity again
buckets.update("a"); // true

// bucket B has been removed (since emtpy)
buckets.has("b"); // false
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-leaky-bucket,
  title = "@thi.ng/leaky-bucket",
  author = "Karsten Schmidt",
  note = "https://thi.ng/leaky-bucket",
  year = 2025
}
```

## License

&copy; 2025 Karsten Schmidt // Apache License 2.0
