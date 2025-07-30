<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/transducers-patch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-transducers-patch.svg?77daeed3)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transducers-patch.svg)](https://www.npmjs.com/package/@thi.ng/transducers-patch)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers-patch.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Basic usage](#basic-usage)
  - [Stream-based processing](#stream-based-processing)
- [Authors](#authors)
- [License](#license)

## About

Reducers for patch-based, immutable-by-default array & object editing. This is a support package for [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).

The `patchArray` and `patchObj` reducers can be used in any
reducer/transducer scenario and are useful for any form of declarative
state update. By default all edits are performed non-destructively, but
`pushArray` also supports in place editing (mutation).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btransducers-patch%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/transducers-patch
```

ESM import:

```ts
import * as tp from "@thi.ng/transducers-patch";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/transducers-patch"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const tp = await import("@thi.ng/transducers-patch");
```

Package sizes (brotli'd, pre-treeshake): ESM: 497 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/transducers-patch/)

TODO

### Basic usage

```ts
import { patchArray, patchObj } from "@thi.ng/transducers-patch";
import { reduce, reductions } from "@thi.ng/transducers";

// flat array editing
patchArray(
    // pass false to perform in-place edits (else immutable updates)
    false,
    // orig array to edit
    [1, 2, 3],
    // edits
    [
        // set idx #0 to 42
        ["set", 0, 42],
        // update idx #1 (here: times 10)
        ["update", 1, (x, n) => x * n, 10],
        // insert values @ idx #2
        ["insert", 2, [10, 11]],
        // delete (remove) idx #3
        ["delete", 3]
    ]
);
// [ 42, 20, 10, 3 ]

// flat (immutable by default) array editing
reduce(
    // reductions() used here to obtain step-wise edit results
    reductions(patchArray<number>()),
    // original array (wrapped here only for `reductions`)
    [[1, 2, 3]],
    [
        ["insert", 0, [10, 11]],
        ["update", 1, (x, n) => x * n, 10],
        ["delete", 3],
        ["set", 2, 200]
    ]
);
// [
//     [1, 2, 3],
//     [10, 11, 1, 2, 3],
//     [10, 110, 1, 2, 3],
//     [10, 110, 1, 3],
//     [10, 110, 200, 3]
// ]

// nested (always immutable) object editing
// (uses @thi.ng/paths for edits)
reduce(
    reductions(patchObj()),
    [{ x: 23 }],
    [
        ["set", ["a", "b"], 1],
        ["update", ["a", "b"], (x, n) => x + n, 10],
        ["delete", ["x"]]
    ]
),
// [
//     { x: 23 },
//     { x: 23, a: { b: 1 } },
//     { x: 23, a: { b: 11 } },
//     { a: { b: 11 } }
// ]
```

### Stream-based processing

.This example uses constructs from the
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
package.

```ts
import { stream, trace } from "@thi.ng/rstream";

const initialState: any = { x: 23 };

// create transformed stream mapping patch commands to states
// since `patchArray` is only a reducer, we need to wrap it w/ the `scan` transducer
// see: https://docs.thi.ng/umbrella/transducers/functions/scan.html
export const state = stream<PatchObjOp>().transform(
    scan(patchObj(), initialState)
);

// add debug subscription
state.subscribe(trace("state: "));

state.next(["set", "a.b", 1]);
// state: { x: 23, a: { b: 1 } }

state.next(["update", ["a", "b"], (x, n)=> x + n, 10]);
// state: { x: 23, a: { b: 11 } }

state.next(["delete", "x"]);
// state: { a: { b: 11 } }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-transducers-patch,
  title = "@thi.ng/transducers-patch",
  author = "Karsten Schmidt",
  note = "https://thi.ng/transducers-patch",
  year = 2020
}
```

## License

&copy; 2020 - 2025 Karsten Schmidt // Apache License 2.0
