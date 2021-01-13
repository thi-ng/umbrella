<!-- This file is generated - DO NOT EDIT! -->

# ![ksuid](https://media.thi.ng/umbrella/banners/thing-ksuid.svg?451df049)

[![npm version](https://img.shields.io/npm/v/@thi.ng/ksuid.svg)](https://www.npmjs.com/package/@thi.ng/ksuid)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/ksuid.svg)
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

Configurable K-sortable unique identifiers, binary & base-N encoded.

Idea based on [segmentio/ksuid](https://github.com/segmentio/ksuid), though with
added flexibility in terms of configuration & implementation:

- Configurable bit size (default: 128bits)
- Base-N encoding scheme (default: base62, see
  [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n)
  for alternatives)
- Epoch start time offset
- RNG source (default: `window.crypto`)

KSUIDs generated w/ this package consist of the lower 32bits of an Unix epoch
(potentially time shifted to free up bits for future timestamps) and N bits of a
random payload (from a configurable source). IDs can be generated as byte arrays
or base-N encoded strings. For the latter, the JS runtime MUST support
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bksuid%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/ksuid
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/ksuid?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/ksuid/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 447 bytes / CJS: 503 bytes / UMD: 627 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## API

[Generated API docs](https://docs.thi.ng/umbrella/ksuid/)

```ts
import { defKSUID } from "@thi.ng/ksuid";

// init w/ defaults
const id = defKSUID();

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
```

Creating custom IDs:

```ts
import { BASE36 } from "@thi.ng/base-n";

// no time shift, 64bit random
const id36 = defKSUID({ base: BASE36, epoch: 0, bytes: 8 });
// '2VOUKH4K59AG0RXR4XH'
```

## Authors

Karsten Schmidt

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

&copy; 2020 - 2021 Karsten Schmidt // Apache Software License 2.0
