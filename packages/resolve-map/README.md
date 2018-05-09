# @thi.ng/resolve-map

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/resolve-map.svg)](https://www.npmjs.com/package/@thi.ng/resolve-map)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

DAG resolution of vanilla objects & arrays with internally linked
values.

It's common practice to use nested JS objects for configuration
purposes. Frequently some values in the object are copies or derivatives
of other values, which can lead to mistakes during refactoring and / or
duplication of effort.

To avoid these issues, this library provides the ability to define
single sources of truth, create references (links) to these values and a
provide a resolution mechanism to recursively expand their real values
and / or compute derived values. Both absolute & relative references are
supported.

## API

### `resolveMap(obj)`

Visits all key-value pairs in depth-first order for given object or
array, expands any reference values, mutates the original object and
returns it. Cyclic references are not allowed or checked for and if
present will cause a stack overflow error. However, refs pointing to
other refs are recursively resolved (again, provided there are no
cycles).

Reference values are special strings representing lookup paths of other
values in the object and are prefixed with `@` for relative refs or
`@/` for absolute refs and both using `/` as path separator (Note:
trailing slashes are NOT allowed!). Relative refs are resolved from
currently visited object and support "../" prefixes to access any parent
levels. Absolute refs are always resolved from the root level (the
original object passed to this function).

```ts
resolveMap({a: 1, b: {c: "@d", d: "@/a"} })
// { a: 1, b: { c: 1, d: 1 } }
```

If a value is a function, it is called with a single arg `resolve`, a
function which accepts a path (**without `@` prefix**) to look up other
values. The return value of the user provided function is used as final
value for that key. This mechanism can be used to compute derived values
of other values stored anywhere in the root object. **Function values
will always be called only once.** Therefore, in order to associate a
function as value to a key, it needs to be wrapped with an additional
function, as shown for the `e` key in the example below. Similarly, if
an actual string value should happen to start with `@`, it needs to be
wrapped in a function (see `f` key below).

```ts
// `a` is derived from 1st array element in `b.d`
// `b.c` is looked up from `b.d[0]`
// `b.d[1]` is derived from calling `e(2)`
// `e` is a wrapped function
res = resolveMap({
  a: (resolve) => resolve("b/c") * 100,
  b: { c: "@d/0", d: [2, (resolve) => resolve("../../e")(2) ] },
  e: () => (x) => x * 10,
  f: () => "@foo",
})
// { a: 200, b: { c: 2, d: [ 2, 20 ] }, e: [Function], f: "@foo" }

res.e(2);
// 20
```

## Installation

```
yarn add @thi.ng/resolve-map
```

## Usage examples

```typescript
import { resolveMap } from "@thi.ng/resolve-map";

resolveMap({
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
        fontsize: (resolve) => `${resolve("/main/fontsizes/0")}px`,
    },
    buttonPrimary: {
        bg: "@/colors/selected",
        label: "@/button/label",
        // resolve with relative path inside fn
        fontsize: (resolve) => `${resolve("../main/fontsizes/2")}px`,
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

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
