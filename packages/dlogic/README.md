<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/dlogic](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-dlogic.svg?56a254aa)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dlogic.svg)](https://www.npmjs.com/package/@thi.ng/dlogic)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dlogic.svg)
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
[@thi.ng/binary](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/binary/src/logic.ts)
for binary versions of most of the ops provided by this package.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bdlogic%5D)

## Installation

```bash
yarn add @thi.ng/dlogic
```

ESM import:

```ts
import * as dl from "@thi.ng/dlogic";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/dlogic"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const dl = await import("@thi.ng/dlogic");
```

Package sizes (brotli'd, pre-treeshake): ESM: 376 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

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

&copy; 2017 - 2026 Karsten Schmidt // Apache License 2.0
