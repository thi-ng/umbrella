# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Idea based on [segmentio/ksuid](https://github.com/segmentio/ksuid), though with
added flexibility in terms of configuration & implementation:

- Configurable bit size (default: 128bits)
- Base-N encoding scheme (default: base62, see
  [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n)
  for alternatives)
- Timestamp resolution (seconds [32 bits], milliseconds [64 bits])
- Epoch start time offset
- Time-only base ID generation (optional)
- KSUID parsing / decomposition
- Configurable RNG source (default: `window.crypto` or `Math.random`)

KSUIDs generated w/ this package consist of the lower 32bits or 64bits of an
Unix epoch (potentially time shifted to free up bits for future timestamps) and
N additional bits of a random payload (from a configurable source). IDs can be
generated as byte arrays or base-N encoded strings. For the latter, the JS
runtime MUST support
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

![KSUID bit layout diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/ksuid/ksuid.png)

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

```ts
import { defKSUID } from "@thi.ng/ksuid";

// init 32bit epoch (resolution: seconds) w/ defaults
const id = defKSUID();
// init 64bit epoch (resolution: milliseconds), same API
const id = defKSUID64();

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

// no time shift, 64bit random
const id36 = defKSUID({ base: BASE36, epoch: 0, bytes: 8 });
// '2VOUKH4K59AG0RXR4XH'
```

## Benchmarks

```text
yarn bench

benchmarking: b62, 128bit, n=10000
        warmup... 659.22ms (10 runs)
        executing...
        total: 6402.18ms, runs: 100
        mean: 64.02ms, median: 63.50ms, range: [59.98..96.15]
        q1: 62.64ms, q3: 64.41ms
        sd: 6.93%
benchmarking: b62, 64bit, n=10000
        warmup... 363.35ms (10 runs)
        executing...
        total: 3469.28ms, runs: 100
        mean: 34.69ms, median: 34.41ms, range: [32.61..56.58]
        q1: 33.35ms, q3: 35.41ms
        sd: 7.47%
benchmarking: b62, 32bit, n=10000
        warmup... 218.78ms (10 runs)
        executing...
        total: 2118.93ms, runs: 100
        mean: 21.19ms, median: 20.95ms, range: [20.20..25.74]
        q1: 20.71ms, q3: 21.30ms
        sd: 4.14%
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
