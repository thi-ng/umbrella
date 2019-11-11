# @thi.ng/idgen

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/idgen.svg)](https://www.npmjs.com/package/@thi.ng/idgen)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/idgen.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
    - [ID generator with 16 bit range and no versioning](#id-generator-with-16-bit-range-and-no-versioning)
    - [ID generator w/ 24 bit range & 8 bit version range](#id-generator-w-24-bit-range--8-bit-version-range)
    - [IDGen is iterable](#idgen-is-iterable)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

This package provides a generator of opaque numeric identifiers with
optional support for ID versioning and efficient re-use via an implicit
list of free IDs after previously generated IDs have been discarded. The
range of IDs can be specified/limited at construction time and is based
on a given bit width. The largest range currently supported is 32 bits,
less if versioning is enabled (also configurable).

If versioning is used, the produced IDs are *composite* values, i.e. the
lowest bits contain the actual ID (e.g for indexing purposes) and other
bits contain the version information.

![composite ID](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/idgen/composite-id.png)

Both parts can be extracted via the generator's `.id()` and `.version()`
methods. Each time a valid versioned ID is being discarded via
`.free(id)`, its version is being increased and, depending on use case
and usage frequency, will eventually overflow back to 0. Once an ID's
version has been updated, the old version is considered invalid. IDs can
be checked for validity via `.has(id)`.

## Installation

```bash
yarn add @thi.ng/idgen
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)

## Usage examples

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
// the 8bit version range is being deduced automatically, but can also be overwritten
const ids = idgen(24);

const a = ids.next();
// 0

ids.free(a);
// true

const b = ids.next();
// 16777216

ids.id(b);
// 0

ids.version(b)
// 1

ids.has(b);
// true

ids.has(a);
// false (even though a's .id() part is the same as b's)
```

### IDGen is iterable

```ts
const ids = ig.idgen(8);

ids.next();
ids.next();
ids.next();
ids.next();

ids.free(2);

// only currently used IDs are returned
// NO ordering guarantee!
[...ids]
// [ 3, 1, 0 ]

ids.next();
// [3, 258, 1, 0]
```

## Authors

- Karsten Schmidt

## License

&copy; 2017 - 2019 Karsten Schmidt // Apache Software License 2.0
