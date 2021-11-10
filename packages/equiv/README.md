<!-- This file is generated - DO NOT EDIT! -->

# ![equiv](https://media.thi.ng/umbrella/banners/thing-equiv.svg?bfa4408e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/equiv.svg)](https://www.npmjs.com/package/@thi.ng/equiv)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/equiv.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Implement IEquiv interface](#implement-iequiv-interface)
- [Authors](#authors)
- [License](#license)

## About

Extensible deep value equivalence checking for any data types.

Supports:

- JS primitives
- Arrays
- Plain objects
- ES6 Sets / Maps
- Date
- RegExp
- Types with
  [IEquiv](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/api/equiv.ts)
  implementation

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bequiv%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/equiv
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/equiv"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const equiv = await import("@thi.ng/equiv");
```

Package sizes (gzipped, pre-treeshake): ESM: 488 bytes

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/equiv/)

```ts
import { equiv } from "@thi.ng/equiv";

equiv(
    { a: { b: [1, 2] } },
    { a: { b: [1, 2] } }
);
// true
```

### Implement IEquiv interface

This is useful & required for custom types to take part in `equiv`
checks, by default only plain objects & array are traversed deeply.

Furthermore, by implementing this interface we can better control which
internal values / criteria are required to establish equivalence. In
this example we exclude the `meta` property and only check for same type
& `children` equality.

```ts
import { IEquiv } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";

class Node implements IEquiv {

    meta: any;
    children: any[];

    constructor(children: any[], meta?: any) {
        this.children = children;
        this.meta = meta;
    }

    equiv(o: any) {
        return o instanceof Node && equiv(this.children, o.children);
    }
}

equiv(new Node([1,2,3], "foo"), new Node([1,2,3], "bar"));
// true
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-equiv,
  title = "@thi.ng/equiv",
  author = "Karsten Schmidt",
  note = "https://thi.ng/equiv",
  year = 2016
}
```

## License

&copy; 2016 - 2021 Karsten Schmidt // Apache Software License 2.0
