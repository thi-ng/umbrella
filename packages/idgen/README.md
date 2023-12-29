<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/idgen](https://media.thi.ng/umbrella/banners-20230807/thing-idgen.svg?c0b9cbf9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/idgen.svg)](https://www.npmjs.com/package/@thi.ng/idgen)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/idgen.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [ID generator with 16 bit range and no versioning](#id-generator-with-16-bit-range-and-no-versioning)
  - [ID generator w/ 24 bit range & 8 bit version range](#id-generator-w-24-bit-range--8-bit-version-range)
  - [IDGen is iterable](#idgen-is-iterable)
- [Authors](#authors)
- [License](#license)

## About

Generator of opaque numeric identifiers with optional support for ID versioning and efficient re-use.

Previously generated IDs that have been discarded are stored in a
memory-efficient implicit list of free IDs and will be re-used. The
overall range of IDs can be specified/limited at construction time and
is based on a given bit width. The largest range currently supported is
32 bits, less if versioning is enabled (configurable).

If versioning is used, the produced IDs are *composite* values, i.e. the
lowest bits contain the actual ID (e.g for indexing purposes) and other
bits contain the version information.

![composite ID](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/idgen/composite-id.png)

Both parts can be extracted via the generator's `.id()` and `.version()`
methods. Each time a valid versioned ID is being discarded via
`.free(id)`, its version is being increased and, depending on use case
and usage frequency, will eventually overflow back to 0. Once an ID's
version has been updated, the old version is considered invalid. IDs can
be checked for validity via `.has(id)` (in constant time).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bidgen%5D+in%3Atitle)

## Related packages

- [@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs) - Entity Component System based around typed arrays & sparse sets
- [@thi.ng/ksuid](https://github.com/thi-ng/umbrella/tree/develop/packages/ksuid) - Configurable K-sortable unique IDs, ULIDs, binary & base-N encoded, 32/48/64bit time resolutions

## Installation

```bash
yarn add @thi.ng/idgen
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/idgen"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const idgen = await import("@thi.ng/idgen");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.18 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [tslib](https://www.typescriptlang.org/)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                          | Description                                 | Live demo                                          | Source                                                                          |
|:--------------------------------------------------------------------------------------------------------------------|:--------------------------------------------|:---------------------------------------------------|:--------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fiber-basics.png" width="240"/> | Fiber-based cooperative multitasking basics | [Demo](https://demo.thi.ng/umbrella/fiber-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fiber-basics) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/idgen/)

```ts
import { idgen } from "@thi.ng/idgen";
```

### ID generator with 16 bit range and no versioning

```ts
const ids = idgen(16, 0);

ids.next();
// 0

ids.next();
// 1

ids.next(2);
// 2

// discard ID 0
ids.free(0);
// true

ids.has(0);
// false

// reuse
ids.next()
// 0

ids.has(0);
// true

ids.next()
// 3
```

### ID generator w/ 24 bit range & 8 bit version range

```ts
// the 8bit version range is being deduced automatically (32-24 = 8),
// but can also be overwritten
const ids = idgen(24);

const a = ids.next();
// 0

ids.free(a);
// true

const b = ids.next();
// 16777216

// b is the re-used new version of a
ids.id(b);
// 0

ids.version(b)
// 1

ids.has(b);
// true

// a is invalid at this point
// (even though a's .id() part is the same as b's)
ids.has(a);
// false
```

### IDGen is iterable

```ts
const ids = ig.idgen(8);

ids.next();
// 0
ids.next();
// 1
ids.next();
// 2
ids.next();
// 3

ids.free(2);
// true

// only currently used IDs are returned
// NO ordering guarantee!
[...ids]
// [ 3, 1, 0 ]

ids.next();
// 258

[...ids]
// [3, 258, 1, 0]
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-idgen,
  title = "@thi.ng/idgen",
  author = "Karsten Schmidt",
  note = "https://thi.ng/idgen",
  year = 2019
}
```

## License

&copy; 2019 - 2023 Karsten Schmidt // Apache License 2.0
