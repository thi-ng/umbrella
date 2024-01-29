<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/dlogic](https://media.thi.ng/umbrella/banners-20230807/thing-dlogic.svg?9d5fe6c8)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dlogic.svg)](https://www.npmjs.com/package/@thi.ng/dlogic)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dlogic.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Assorted digital logic gates and ops for boolean values to compose
complex logic in a more functional manner, e.g. for DSL or simulation
purposes. Truth tables and references are provided in the doc strings of
each function.

Also see
[@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary/src/logic.ts)
for binary versions of most of the ops provided by this package.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdlogic%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/dlogic
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/dlogic"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const dlogic = await import("@thi.ng/dlogic");
```

Package sizes (brotli'd, pre-treeshake): ESM: 376 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## API

[Generated API docs](https://docs.thi.ng/umbrella/dlogic/)

```ts
import { nand } from "@thi.ng/dlogic";

// XOR construction only using NAND gates
const xor = (a: boolean, b: boolean) => {
    const ab = nand(a,b);
    return nand(nand(a, ab), nand(b, ab));
};

xor(false, false)
// false
xor(false, true)
// true
xor(true, false)
// true
xor(true, true)
// false
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-dlogic,
  title = "@thi.ng/dlogic",
  author = "Karsten Schmidt",
  note = "https://thi.ng/dlogic",
  year = 2017
}
```

## License

&copy; 2017 - 2024 Karsten Schmidt // Apache License 2.0
