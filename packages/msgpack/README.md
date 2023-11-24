<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/msgpack](https://media.thi.ng/umbrella/banners-20230807/thing-msgpack.svg?fa18b6a1)

[![npm version](https://img.shields.io/npm/v/@thi.ng/msgpack.svg)](https://www.npmjs.com/package/@thi.ng/msgpack)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/msgpack.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Small & fast msgpack serialization & deserialization.

This implementation is a full rewrite & refactor of
[@ygoe/msgpack.js](https://github.com/ygoe/msgpack.js), based on this
[specification](https://github.com/msgpack/msgpack/blob/8aa09e2a6a9180a49fc62ecfefe149f063cc5e4b/spec.md).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmsgpack%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/msgpack
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/msgpack"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const msgpack = await import("@thi.ng/msgpack");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.56 KB

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## API

[Generated API docs](https://docs.thi.ng/umbrella/msgpack/)

```ts tangle:export/readme.ts
import { deserialize, serialize } from "@thi.ng/msgpack";
import { equiv } from "@thi.ng/equiv";

const obj = {
    small_i8: -0x0f,
    i8: -0x80,
    small_u8: 0xff,
    i16: -0x8000,
    u16: 0xfedc,
    i32: -0x8000_0000,
    u32: 0xffff_ffff,
    utf8_array: ["👋 Hello", "msgpack!", "🔥🤌"],
    now: new Date()
};

// encode to byte array
const bytes = serialize(obj);
console.log(bytes);

// comparison with JSON
const json = JSON.stringify(obj);
const ratio = bytes.length / json.length;
console.log(`msgpack: ${bytes.length}, json: ${json.length}, ratio: ${ratio.toFixed(2)}`);

// roundtrip
const obj2 = deserialize(bytes);

// check equality
console.log(equiv(obj, obj2));
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-msgpack,
  title = "@thi.ng/msgpack",
  author = "Karsten Schmidt",
  note = "https://thi.ng/msgpack",
  year = 2023
}
```

## License

&copy; 2023 Karsten Schmidt // Apache License 2.0
