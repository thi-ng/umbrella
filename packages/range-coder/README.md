<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/range-coder](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-range-coder.svg?7fa8d317)

[![npm version](https://img.shields.io/npm/v/@thi.ng/range-coder.svg)](https://www.npmjs.com/package/@thi.ng/range-coder)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/range-coder.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Binary range encoder / decoder, based on [Java implementation
by Joe Halliwell](https://www.winterwell.com/software/compressor.php).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Brange-coder%5D)

## Related packages

- [@thi.ng/bitstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/bitstream) - ES6 iterator based read/write bit streams with support for variable word widths
- [@thi.ng/rle-pack](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rle-pack) - Binary run-length encoding packer w/ flexible repeat bit widths and a naive RLE encoder/decoder for arrays of arbitrary typed values

## Installation

```bash
yarn add @thi.ng/range-coder
```

ESM import:

```ts
import * as rc from "@thi.ng/range-coder";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/range-coder"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const rc = await import("@thi.ng/range-coder");
```

Package sizes (brotli'd, pre-treeshake): ESM: 622 bytes

## Dependencies

- [@thi.ng/bitstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/bitstream)

## API

[Generated API docs](https://docs.thi.ng/umbrella/range-coder/)

```ts
import * as rc "@thi.ng/range-coder";

// prepare dummy data
src = new Uint8Array(1024);
src.set([1,1,1,1,1,2,2,2,2,3,3,3,4,4,5,4,4,3,3,3,2,2,2,2,1,1,1,1,1], 512);

// pack data
packed = rc.encodeBytes(src);

packed.length
// 146

packed.length/src.length
// 0.142578125

// unpack
dest = rc.decodeBytes(packed);
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-range-coder,
  title = "@thi.ng/range-coder",
  author = "Karsten Schmidt",
  note = "https://thi.ng/range-coder",
  year = 2017
}
```

## License

&copy; 2017 - 2026 Karsten Schmidt // Apache License 2.0
