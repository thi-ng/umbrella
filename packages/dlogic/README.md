<!-- This file is generated - DO NOT EDIT! -->

# ![dlogic](https://media.thi.ng/umbrella/banners/thing-dlogic.svg?687b26ef)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dlogic.svg)](https://www.npmjs.com/package/@thi.ng/dlogic)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dlogic.svg)
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

Assorted digital logic gates and ops for boolean values to compose
complex logic in a more functional manner, e.g. for DSL or simulation
purposes. Truth tables and references are provided in the doc strings of
each function.

Also see
[@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary/src/logic.ts)
for binary versions of most of the ops provided by this package.

### Status

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

```text
# with flag only for < v16
node --experimental-repl-await

> const dlogic = await import("@thi.ng/dlogic");
```

Package sizes (gzipped, pre-treeshake): ESM: 393 bytes

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

Karsten Schmidt

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

&copy; 2017 - 2021 Karsten Schmidt // Apache Software License 2.0
