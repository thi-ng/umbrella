<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/resolve-map](https://media.thi.ng/umbrella/banners-20230807/thing-resolve-map.svg?8522d906)

[![npm version](https://img.shields.io/npm/v/@thi.ng/resolve-map.svg)](https://www.npmjs.com/package/@thi.ng/resolve-map)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/resolve-map.svg)
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
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
  - [Statistical analysis](#statistical-analysis)
  - [Theme configuration](#theme-configuration)
- [API](#api)
  - [`resolve(obj)`](#resolveobj)
    - [Protecting values](#protecting-values)
- [Authors](#authors)
- [License](#license)

## About

DAG resolution of vanilla objects & arrays with internally linked values.

This is useful for expressing complex configurations with
derived values or computing interrelated values without having to
specify the order of computations.

It's common practice to use nested JS objects for configuration
purposes. Frequently some values in the object are copies or derivatives
of other values, which can lead to mistakes during refactoring and / or
duplication of effort.

To avoid these issues, this library provides the ability to define
single sources of truth, create references (links) to these values and
provide a resolution mechanism to recursively expand their real values
and / or compute derived values. Both absolute & relative references are
supported.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bresolve-map%5D+in%3Atitle)

## Related packages

- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph) - Type-agnostic directed acyclic graph (DAG) & graph operations
- [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-graph) - Declarative dataflow graph construction for [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Installation

```bash
yarn add @thi.ng/resolve-map
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/resolve-map"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const resolveMap = await import("@thi.ng/resolve-map");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.01 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                              | Description                                                            | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/commit-table-ssr.png" width="240"/> | Filterable commit log UI w/ minimal server to provide commit history   | [Demo](https://demo.thi.ng/umbrella/commit-table-ssr/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/commit-table-ssr) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/crypto-chart.png" width="240"/>     | Basic crypto-currency candle chart with multiple moving averages plots | [Demo](https://demo.thi.ng/umbrella/crypto-chart/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/crypto-chart)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>     | Multi-layer vectorization & dithering of bitmap images                 | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)     |

### Statistical analysis

In this example we construct a graph to compute a number of statistical
properties for some numeric input array. The graph is a plain object of
possibly dependent functions, which can be specified in any order. Each
function uses ES6 object destructuring to look up and execute other
computations in the graph. Each computation is only executed once.

```ts
import { resolve } from "@thi.ng/resolve-map";
import * as tx from "@thi.ng/transducers";

// define object of interrelated computations to be executed later
// the `src` key used by most functions is still missing here and
// will be injected later as well
const stats = {
    // sequence average
    mean: ({ src }) => tx.mean(src),
    // sequence range
    range: ({ min, max }) => max - min,
    // computes sequence min val
    min: ({ src }) => tx.min(src),
    // computes sequence max val
    max: ({ src }) => tx.max(src),
    // sorted copy
    sorted: ({ src }) => [...src].sort((a, b) => a - b),
    // standard deviation
    sd: ({ src, mean })=>
        Math.sqrt(
            tx.transduce(tx.map((x) => Math.pow(x - mean, 2)), tx.add(), src) /
            (src.length - 1)),
    // compute 10th - 90th percentiles
    percentiles: ({ sorted }) => {
        return tx.transduce(
            tx.map((x) => sorted[Math.floor(x / 100 * sorted.length)]),
            tx.push(),
            tx.range(10, 100, 5)
        );
    }
};

// inject some source data to analyze

// Note: we wrap the data as function to avoid `resolve`
// attempting to resolve each array item as well. this is
// purely for performance reasons and would also work without
// wrapping.

// Note 2: If the `stats` graph is meant to be re-usable in
// the future you MUST use the spread operator to create a
// shallow copy, because `resolve` mutates the given object
resolve({...stats, src: () => [ 1, 6, 7, 2, 4, 11, -3 ]})
// {
//     mean: 4,
//     range: 14,
//     min: -3,
//     max: 11,
//     sorted: [ -3, 1, 2, 4, 6, 7, 11 ],
//     sd: 4.546060565661952,
//     percentiles: [ -3, 1, 2, 2, 4, 6, 6, 7, 11 ],
//     src: [ 1, 6, 7, 2, 4, 11, -3 ]
// }
```

### Theme configuration

```ts
import { resolve } from "@thi.ng/resolve-map";

resolve({
    colors: {
        bg: "white",
        text: "black",
        selected: "red",
    },
    main: {
        fontsizes: [12, 16, 20]
    },
    button: {
        bg: "@/colors/text",
        label: "@/colors/bg",
        // resolve with abs path inside fn
        fontsize: ($) => `${$("/main/fontsizes/0")}px`,
    },
    buttonPrimary: {
        bg: "@/colors/selected",
        label: "@/button/label",
        // resolve with relative path inside fn
        fontsize: ($) => `${$("../main/fontsizes/2")}px`,
    }
});
// {
//     colors: {
//         bg: "white",
//         text: "black",
//         selected: "red"
//     },
//     main: {
//         fontsizes: [ 12, 16, 20 ]
//     },
//     button: {
//         "bg": "black",
//         "label": "white",
//         "fontsize": "12px"
//     },
//     buttonPrimary: {
//         bg: "red",
//         label: "black",
//         fontsize: "20px"
//     }
// }
```

## API

[Generated API docs](https://docs.thi.ng/umbrella/resolve-map/)

### `resolve(obj)`

Visits all key-value pairs or array items in depth-first order, expands any
reference values, mutates the original object and returns it. Cyclic references
are not allowed and will throw an error. However, refs pointing to other refs
are recursively resolved (again, provided there are no cycles).

Reference values are special strings representing lookup paths of other values
in the object and are prefixed with given `prefix` string (default: `@`) for
relative refs or `@/` for absolute refs and both using `/` as path separator
(Note: trailing slashes are NOT allowed!). Relative refs are resolved from the
currently visited object and support "../" prefixes to access any parent levels.
Absolute refs are always resolved from the root level (the original object
passed to this function).

```ts
// `c` references sibling `d`
// `d` references top-level `a`
resolve({ a: 1, b: { c: "@d", d: "@/a"} })
// { a: 1, b: { c: 1, d: 1 } }

// same with custom lookup prefix
resolve({ a: 1, b: { c: ">>>d", d: ">>>/a"} }, { prefix: ">>>" })
// { a: 1, b: { c: 1, d: 1 } }
```

Any function values are called using two possible conventions:

1. If the user function uses ES6 object destructuring for its first
   argument, the given object keys are resolved prior to calling the
   function and the resolved values provided as first argument (object)
   and a general `resolve` function as second argument.
2. If no de-structure form is found in the function's arguments, the
   function is only called with `resolve` as argument.

**Important:** ES6 destructuring can *only* be used for ES6 compile
targets and *will fail when transpiling to ES5*. If you're not sure, use
the 2nd (legacy) form. Also, since ES6 var names can't contain special
characters, destructured keys can ALWAYS only be looked up as siblings
of the currently processed key.

The `resolve` function provided as arg to the user function accepts a path
(**without `@` (or custom) prefix**) to look up any other values in the root
object.

```ts
// `c` uses ES6 destructuring form to look up `a` & `b` values
// `d` uses provided resolve fn arg `$` to look up `c`
resolve({ a: 1, b: 2, c: ({ a, b }) => a + b, d: ($) => $("c") })
// { a: 1, b: 2, c: 3, d: 3 }

// last item references item @ index = 2
resolve([1, 2, ($) => $("0") + $("1"), "@2"])
// [1, 2, 3, 3]
```

The return value of the user provided function is used as final value
for that key in the object. This mechanism can be used to compute
derived values of other values stored anywhere in the root object.
**Function values will always be called only once.** Therefore, in order
to associate a function as final value to a key, it MUST be wrapped with
an additional function, as shown for the `e` key in the example below.
Similarly, if an actual string value should happen to start with `@`, it
needs to be wrapped in a function (see `f` key below).

```ts
// `a` is derived from 1st array element in `b.d`
// `b.c` is looked up from `b.d[0]`
// `b.d[1]` is derived from calling `e(2)`
// `e` is a wrapped function
// `f` is wrapped to ignore `@` prefix
res = resolve({
  a: ($) => $("b/c") * 100,
  b: { c: "@d/0", d: [2, ($) => $("../../e")(2) ] },
  e: () => (x) => x * 10,
  f: () => "@foo",
})
// { a: 200, b: { c: 2, d: [ 2, 20 ] }, e: [Function], f: "@foo" }

res.e(2);
// 20
```

#### Protecting values

Values can be protected from further resolution attempts by wrapping them via
[`resolved()`](https://docs.thi.ng/umbrella/resolve-map/functions/resolved.html).
By default, these wrapped values are only used during the resolution phase and
the final result object/array will only contain the original, unwrapped values.
Unwrapped values will also be supplied to any lookup functions, no
[`.deref()`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html) necessary
there.

```ts
resolve({ a: 42, b: ({a}) => resolved(a) });
// { a: 42, b: 42 }

const res = resolve({ a: 42, b: ({a}) => resolved(a) }, { unwrap: false });
// { a: 42, b: Resolved { _value: 42 } }

// obtain b's value via .deref()
res.b.deref()
// 42
```

Since v7.1.0 a new `onlyFnRefs` option has been added which changes the
resolution behavior to **not** consider string values for resolution at all
anymore and instead requires the use of function values to trigger resolution.

```ts
// default behavior
resolve({ a: "@c", b: ({a}) => a, c: 42 })
// { a: 42, b: 42, c: 42 }

// with option enabled
resolve({ a: "@c", b: ({a}) => a, c: 42 }, { onlyFnRefs: true })
// { a: '@c', b: '@c', c: 42 }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-resolve-map,
  title = "@thi.ng/resolve-map",
  author = "Karsten Schmidt",
  note = "https://thi.ng/resolve-map",
  year = 2018
}
```

## License

&copy; 2018 - 2024 Karsten Schmidt // Apache License 2.0
