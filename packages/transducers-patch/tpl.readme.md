<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

The `patchArray` and `patchObj` reducers can be used in any
reducer/transducer scenario and are useful for any form of declarative
state update. By default all edits are performed non-destructively, but
`pushArray` also supports in place editing (mutation).

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

<!-- include ../../assets/tpl/footer.md -->
