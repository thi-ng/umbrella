<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/bencode](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-bencode.svg?30a38d1a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/bencode.svg)](https://www.npmjs.com/package/@thi.ng/bencode)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bencode.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Features / behaviors](#features--behaviors)
    - [Booleans](#booleans)
    - [String handling](#string-handling)
    - [Floating point values](#floating-point-values)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Binary [Bencode](https://en.wikipedia.org/wiki/Bencode) encoder &
decoder for structured data.

### Features / behaviors

#### Booleans

Will be converted to `0` or `1` integers.

#### String handling

All JS strings will be UTF-8 encoded. To write raw bytes without
transformation, wrap them as `Uint8Array`. These too will be written as
Bencode strings (e.g. `len:xxx...`), but are used as is.

When decoding, UTF-8 is used by default, but can be disabled by passing `false`
as 2nd argument to
[`decode()`](https://docs.thi.ng/umbrella/bencode/functions/decode.html). In
that case, strings will be decoded as `Uint8Array`s, with the exception of
dictionary keys, which will be decoded via `String.fromCharCode()`.

#### Floating point values

This implementation has optional (non-standard) support for floating point
values. If these are not desired (e.g. for compatibility reasons), all numeric
values MUST be pre-rounded to integers. The encoder only chooses the custom
float encoding iff a number has a fractional part. Floats are encoded similarly
to standard ints (i.e. as text), but using `f` as prefix. Furthermore, only
floats with an absolute value in the semi-open `[1e-6,1e21)` interval can be
encoded. Float values requiring exponential notation will throw an error during
encoding.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bbencode%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/bencode
```

ESM import:

```ts
import * as bc from "@thi.ng/bencode";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/bencode"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const bc = await import("@thi.ng/bencode");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.22 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/bencode/)

```ts
import { encode, decode } from "@thi.ng/bencode";
import { hexDump } from "@thi.ng/transducers-binary";

[...hexDump({}, encode({ foo: "bar", "baz": [0, 1, 2, 3], "pi": Math.PI }))]
// [ '00000000 | 64 33 3a 62 61 7a 6c 69 30 65 69 31 65 69 32 65 | d3:bazli0ei1ei2e',
//   '00000010 | 69 33 65 65 33 3a 66 6f 6f 33 3a 62 61 72 32 3a | i3ee3:foo3:bar2:',
//   '00000020 | 70 69 66 33 2e 31 34 31 35 39 32 36 35 33 35 38 | pif3.14159265358',
//   '00000030 | 39 37 39 33 65 65 00 00 00 00 00 00 00 00 00 00 | 9793ee..........' ]

// Uin8Array values are written verbatim (as Bencode strings)
[...hexDump({}, encode({ foo: new Uint8Array([0, 1 ,2, 3]) }))]
// [ '00000000 | 64 33 3a 66 6f 6f 34 3a 00 01 02 03 65 00 00 00 | d3:foo4:....e...' ]

const bytes = encode({ foo: [1, "a", { bar: "baz"}, [42]] });
// Uint8Array [ 100, 51, 58, 102, 111, 111, 108, 105, 49, 101, 49, ... ]

decode(bytes)
// { foo: [ 1, 'a', { bar: 'baz' }, [ 42 ] ] }

// decode w/o UTF8 decoding
// (note: dictionary keys will ALWAYS be utf8 decoded)
decode(bytes, false)
// { foo: [ 1, [ 97 ], { bar: [ 98, 97, 122 ] }, [ 42 ] ] }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-bencode,
  title = "@thi.ng/bencode",
  author = "Karsten Schmidt",
  note = "https://thi.ng/bencode",
  year = 2016
}
```

## License

&copy; 2016 - 2025 Karsten Schmidt // Apache License 2.0
