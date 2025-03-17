<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/leaky-bucket](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-leaky-bucket.svg?92dc6543)

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

Configurable, counter-based Leaky Bucket abstractions for generalized rate-limiting purposes.

[Leaky Buckets](https://en.wikipedia.org/wiki/Leaky_bucket) are commonly used in
communication networks for rate limiting, traffic shaping and bandwidth control,
but are equally useful in other domains requiring similar constraints.

A Leaky Bucket is a managed counter with an enforced maximum value (i.e. bucket
capacity). The counter is incremented for each a new event to check if it
can/should be processed. If the bucket capacity has already been reached, the
bucket will report an overflow, which we can then handle accordingly (e.g. by
dropping or queuing events). The bucket also has a configurable time interval at
which the counter is decreasing (aka the "leaking" behavior) until it reaches
zero again (i.e. until the bucket is empty). Altogether, this setup can be
utilized to ensure both an average rate, whilst also supporting temporary
bursting in a controlled fashion.

```ts tangle:export/readme-1.ts
import { LeakyBucket } from "@thi.ng/leaky-bucket";

// create bucket w/ 1Hz mean target rate, burstable to 3Hz
const bucket = new LeakyBucket({ capacity: 3, leakInterval: 1000 });

let event = 0;
let t0 = Date.now();

// trigger events at 5Hz
setInterval(() => {
    event++;
    // update bucket and only log successful events (discard the rest)
    if (bucket.update()) {
        console.log("time", Date.now() - t0, "/ event", event);
    }
}, 200);

// time 200 / event 1   <-- initial burst
// time 401 / event 2   <-- initial burst
// time 601 / event 3   <-- initial burst
// time 1003 / event 5  <-- average rate enforced
// time 2007 / event 10
// time 3012 / event 15
// time 4017 / event 20
// ...
```

In addition to individual `LeakyBucket`s, this package also provides a
`LeakyBucketMap` for managing multiple buckets in a key-value store, with shared
configuration and more efficient updates (only using a single timer). Other
features include:

- enforces max number of active (non-empty) buckets
- auto-pruning of empty buckets
- auto-creation of new buckets
- per-bucket capacity overrides

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

Package sizes (brotli'd, pre-treeshake): ESM: 624 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/leaky-bucket/)

```ts tangle:export/readme-2.ts
import { LeakyBucketMap } from "@thi.ng/leaky-bucket";

const buckets = new LeakyBucketMap({
    maxBuckets: 2,
    capacity: 3,
    leakInterval: 1000,
});

buckets.update("a") // true
buckets.update("a") // true
buckets.update("a") // true

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
