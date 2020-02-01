# ${pkg.name}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

The `patchArray` and `patchObj` reducers can be used in any
reducer/transducer scenario and are useful for any form of declarative
state update. By default all edits are performed non-destructively, but
`pushArray` also supports in place editing (mutation).

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

```bash
yarn add ${pkg.name}
```

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

TODO

```ts
import { Patch, patchArray, patchObj } from "@thi.ng/transducers-patch";
import { reduce, reductions } from "@thi.ng/transducers";

patchArray(
    // pass false to perform in-place edits (else immutable updates)
    false,
    // orig array to edit
    [1, 2, 3],
    // edits
    [
        // set idx #0 to 42
        [Patch.SET, 0, 42],
        // update idx #1 (here: times 10)
        [Patch.UPDATE, 1, (x, n) => x * n, 10],
        // insert values @ idx #2
        [Patch.INSERT, 2, [10, 11]],
        // delete (remove) idx #3
        [Patch.DELETE, 3]
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
        [Patch.INSERT, 0, [10, 11]],
        [Patch.UPDATE, 1, (x, n) => x * n, 10],
        [Patch.DELETE, 3],
        [Patch.SET, 2, 200]
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
        [Patch.SET, ["a", "b"], 1],
        [Patch.UPDATE, ["a", "b"], (x, n) => x + n, 10],
        [Patch.DELETE, ["x"]]
    ]
),
// [
//     { x: 23 },
//     { x: 23, a: { b: 1 } },
//     { x: 23, a: { b: 11 } },
//     { a: { b: 11 } }
// ]
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
