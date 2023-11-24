<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This implementation is a full rewrite & refactor of
[@ygoe/msgpack.js](https://github.com/ygoe/msgpack.js), based on this
[specification](https://github.com/msgpack/msgpack/blob/8aa09e2a6a9180a49fc62ecfefe149f063cc5e4b/spec.md).

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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
// Uint8Array(114) [ 137, 168, 115, 109, 97, 108, 108, ... ]

// comparison with JSON
const json = JSON.stringify(obj);
const ratio = bytes.length / json.length;
console.log(`msgpack: ${bytes.length}, json: ${json.length}, ratio: ${ratio.toFixed(2)}`);
// msgpack: 114, json: 178, ratio: 0.64

// roundtrip
const obj2 = deserialize(bytes);

// check equality
console.log(equiv(obj, obj2));
// true
```

<!-- include ../../assets/tpl/footer.md -->
