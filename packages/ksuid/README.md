<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/ksuid](https://media.thi.ng/umbrella/banners-20230807/thing-ksuid.svg?2a899961)

[![npm version](https://img.shields.io/npm/v/@thi.ng/ksuid.svg)](https://www.npmjs.com/package/@thi.ng/ksuid)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/ksuid.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

- [About](#about)
  - [CLI usage](#cli-usage)
- [Status](#status)
  - [Breaking changes](#breaking-changes)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Benchmarks](#benchmarks)
- [Authors](#authors)
- [License](#license)

## About

Configurable K-sortable unique IDs, ULIDs, binary & base-N encoded, 32/48/64bit time resolutions.

Idea based on [segmentio/ksuid](https://github.com/segmentio/ksuid), though the
added flexibility in terms of configuration & implementation also enables the
creation of [ULIDs](https://github.com/ulid/spec):

| Feature                               | KSUID default                    | ULID default           |
|---------------------------------------|----------------------------------|------------------------|
| Configurable bit size                 | 160 bits                         | 128 bits               |
| Base-N encoding scheme                | base62<sup>(1)</sup>             | base32 (Crockford)     |
| Timestamp resolution                  | seconds (32 bits)                | milliseconds (48 bits) |
|                                       | milliseconds (64 bits)           |                        |
| Epoch start time offset               | approx. 2020-09-13<sup>(2)</sup> | none                   |
| Time-only base ID generation          | ✅                                | ✅                      |
| ID parsing / decomposition            | ✅                                | ✅                      |
| Configurable RNG source<sup>(3)</sup> | ✅                                | ✅                      |

- <sup>(1)</sup> See
  [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n)
  for alternatives
- <sup>(2)</sup> With the default offset, the max. supported date for `KSUID32` is 2156-10-20T18:54:55Z
- <sup>(3)</sup> Default: `window.crypto`, `Math.random` as fallback

IDs generated w/ this package are composed of a 32, 48 or 64 bit Unix epochs and
N additional bits of a random payload (from a configurable source). By default
all timestamps are shifted to free up bits for the future. IDs can be generated
as byte arrays or base-N encoded strings. For the latter, the JS runtime MUST
support
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

![KSUID bit layout diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/ksuid/ksuid.png)

### CLI usage

Since v3.1.0 a small CLI for ad-hoc KSUID generation is included. Currently only
KSUID32 is supported and IDs are always based on the current time:

```bash
npx @thi.ng/ksuid
# 0dwncLZE8byaQdccncWDmsNmlYt

# optionally provide number of random bytes to be used (default: 16)
npx @thi.ng/ksuid 8
# 01ogp9KDpWlQ0pXCY
```

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bksuid%5D+in%3Atitle)

### Breaking changes

Since v3.0.0 all
[`epoch`](https://docs.thi.ng/umbrella/ksuid/interfaces/KSUIDOpts.html#epoch)
time-shift config values are to be given in milliseconds. This change is
unifying this behavior and is only a breaking change if using `KSUID32` and
specifying custom `epoch` offsets (using defaults is **not** impacted).
Previously, `KSUID32` used an offset given in seconds, whereas the other
implementations already used milliseconds.

## Related packages

- [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n) - Arbitrary base-n conversions w/ presets for base8/16/32/36/58/62/64/85, support for bigints and encoding/decoding of byte arrays
- [@thi.ng/idgen](https://github.com/thi-ng/umbrella/tree/develop/packages/idgen) - Generator of opaque numeric identifiers with optional support for ID versioning and efficient re-use
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random) - Pseudo-random number generators w/ unified API, distributions, weighted choices, ID generation

## Installation

```bash
yarn add @thi.ng/ksuid
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/ksuid"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const ksuid = await import("@thi.ng/ksuid");
```

Package sizes (brotli'd, pre-treeshake): ESM: 997 bytes

## Dependencies

- [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## API

[Generated API docs](https://docs.thi.ng/umbrella/ksuid/)

```ts
import { defKSUID32, defKSUID64, defULID } from "@thi.ng/ksuid";

// init 32bit epoch (resolution: seconds) w/ defaults
const id = defKSUID32();
// init 64bit epoch (resolution: milliseconds), same API
const id = defKSUID64();
// init 48bit epoch (resolution: milliseconds), same API
const id = defULID();

id.next();
// '05XCWbXa3akRqLDBUw4ogCVKGkd'

const a = id.nextBinary()
// Uint8Array(20) [
//     0, 160,  48, 77, 101, 251,
//   244,  17, 155, 97,  24, 101,
//    70,  71, 207, 23,  32,  21,
//   244, 116
// ]

// format a binary KSUID
id.format(a);
// '05XCZ32AaDZfZt0SWE2C22o6cqK'

id.parse("05XCZ32AaDZfZt0SWE2C22o6cqK")
// {
//   epoch: 1610498125000,
//   id: Uint8Array(16) [
//     101, 251, 244,  17, 155, 97,
//      24, 101,  70,  71, 207, 23,
//      32,  21, 244, 116
//   ]
// }

new Date(1610498125000).toISOString()
// '2021-01-13T00:35:25.000Z'
```

Creating custom IDs:

```ts
import { BASE36 } from "@thi.ng/base-n";

// using base36, no time shift, 64bit random part
const id36 = defKSUID32({ base: BASE36, epoch: 0, bytes: 8 });

id36.next();
// '2VOUKH4K59AG0RXR4XH'
```

## Benchmarks

Benchmarks can be run via `yarn bench`. All timings in milliseconds (test
config: Node v20.4.0, MBA M1 2021, 16GB). The benchmark collects N KSUIDs w/
different configs in an array, with each case being run 100 times.

|                   Title|    Iter|    Size|       Total|    Mean|  Median|     Min|     Max|      Q1|      Q3|     SD%|
|------------------------|-------:|-------:|-----------:|-------:|-------:|-------:|-------:|-------:|-------:|-------:|
|    b62, 128bit, n=10000|     100|       1|     2158.68|   21.59|   21.57|   19.91|   25.91|   20.42|   21.87|    6.26|
|     b62, 64bit, n=10000|     100|       1|     1200.40|   12.00|   11.95|   11.27|   14.66|   11.82|   12.10|    3.99|

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-ksuid,
  title = "@thi.ng/ksuid",
  author = "Karsten Schmidt",
  note = "https://thi.ng/ksuid",
  year = 2020
}
```

## License

&copy; 2020 - 2023 Karsten Schmidt // Apache License 2.0
