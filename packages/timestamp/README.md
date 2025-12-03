<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/timestamp](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-timestamp.svg?3edda6b4)

[![npm version](https://img.shields.io/npm/v/@thi.ng/timestamp.svg)](https://www.npmjs.com/package/@thi.ng/timestamp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/timestamp.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 211 standalone projects, maintained as part
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

Timestamp getter wrapping (in order of preference) `process.hrtime.bigint()`, `performance.now()` or `Date.now()`.

> [!NOTE]
> The functions in this package have been extracted from
> [@thi.ng/bench](https://thi.ng/bench).

This package provides the following functions:

- [`now()`](https://docs.thi.ng/umbrella/timestamp/functions/now.html) attempts
to use high-res ES
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
timestamps (in Node via
[`process.hrtime.bigint()`](https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_process_hrtime_bigint)),
or falls back to `performance.now()`, or lacking that, uses `Date.now()`. In all
cases, returns a (possibly rounded) nanosec-scale timestamp, either as `bigint`
or `number`.
- [`timeDiff()`](https://docs.thi.ng/umbrella/timestamp/functions/timeDiff.html)
function can be used to compute the difference between two such timestamp and
return it as milliseconds.
- [`asMillis()`](https://docs.thi.ng/umbrella/timestamp/functions/asMillis.html)
  takes a duration (either a number or bigint) in nanosec-scale and converts it
  to a JS number in milliseconds

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btimestamp%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/timestamp
```

ESM import:

```ts
import * as tim from "@thi.ng/timestamp";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/timestamp"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const tim = await import("@thi.ng/timestamp");
```

Package sizes (brotli'd, pre-treeshake): ESM: 213 bytes

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/timestamp/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-timestamp,
  title = "@thi.ng/timestamp",
  author = "Karsten Schmidt",
  note = "https://thi.ng/timestamp",
  year = 2018
}
```

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
