# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

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

#### Floating point values

This implementation has optional (non-standard) support for floating point
values. If these are not desired (e.g. for compatibility reasons), all numeric
values MUST be pre-rounded to integers. The encoder only chooses the custom
float encoding iff a number has a fractional part. Floats are encoded similarly
to standard ints (i.e. as text), but using `f` as prefix. Furthermore, only
floats with an absolute value in the semi-open `[1e-6,1e21)` interval can be
encoded. Float values requiring exponential notation will throw an error during
encoding.

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
