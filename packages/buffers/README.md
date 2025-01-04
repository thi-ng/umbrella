<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/buffers](https://media.thi.ng/umbrella/banners-20230807/thing-buffers.svg?d167ce16)

[![npm version](https://img.shields.io/npm/v/@thi.ng/buffers.svg)](https://www.npmjs.com/package/@thi.ng/buffers)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/buffers.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 200 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Buffering behaviors](#buffering-behaviors)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

General purpose and generic read/write buffer implementations with different behaviors/orderings.

The
package provides different buffer implementations to control blocking behaviors
and backpressure handling (aka attempting to write faster than
values are being read, essentially a memory management issue).

### Buffering behaviors

The following buffer types/behaviors are included, all accepting a max. capacity
and all implementing the
[IReadWriteBuffer](https://docs.thi.ng/umbrella/buffers/interfaces/IReadWriteBuffer.html)
interface:

- [`fifo`](https://docs.thi.ng/umbrella/buffers/functions/fifo.html): First in,
  first out ring buffer.
- [`lifo`](https://docs.thi.ng/umbrella/buffers/functions/lifo.html): Last in,
  first out. Write behavior is the same as with `fifo`, reads are in reverse
  order (as the name indicates), i.e. the last value written will be the first
  value read (i.e. stack behavior).
- [`sliding`](https://docs.thi.ng/umbrella/buffers/functions/sliding.html):
  Sliding window ring buffer. Whilst the buffer is at full capacity, new
  writes will first expunge the oldest buffered value (similar to [LRU
  cache](https://github.com/thi-ng/umbrella/blob/develop/packages/cache/README.md#lru)
  behavior). Read behavior is the same as for `fifo`.
- [`dropping`](https://docs.thi.ng/umbrella/buffers/functions/dropping.html):
  Dropping value ring buffer. Whilst the buffer is at full capacity, new writes
  will be silently ignored. Read behavior is the same as for `fifo`.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bbuffers%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/buffers
```

ESM import:

```ts
import * as buf from "@thi.ng/buffers";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/buffers"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const buf = await import("@thi.ng/buffers");
```

Package sizes (brotli'd, pre-treeshake): ESM: 623 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/buffers/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-buffers,
  title = "@thi.ng/buffers",
  author = "Karsten Schmidt",
  note = "https://thi.ng/buffers",
  year = 2016
}
```

## License

&copy; 2016 - 2025 Karsten Schmidt // Apache License 2.0
