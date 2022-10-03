<!-- This file is generated - DO NOT EDIT! -->

# ![paths](https://media.thi.ng/umbrella/banners-20220914/thing-paths.svg?a9667d16)

[![npm version](https://img.shields.io/npm/v/@thi.ng/paths.svg)](https://www.npmjs.com/package/@thi.ng/paths)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/paths.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Breaking changes](#breaking-changes)
  - [4.0.0](#400)
    - [Naming convention](#naming-convention)
    - [Type checked accessors](#type-checked-accessors)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Type checked paths](#type-checked-paths)
    - [Optional property handling](#optional-property-handling)
  - [Higher-order accessors](#higher-order-accessors)
  - [First order operators](#first-order-operators)
  - [Deletions](#deletions)
  - [PPP - Prototype pollution potential](#ppp---prototype-pollution-potential)
  - [Structural sharing](#structural-sharing)
  - [Mutable setter](#mutable-setter)
  - [Path checking](#path-checking)
- [Authors](#authors)
- [License](#license)

## About

Immutable, optimized and optionally typed path-based object property / array accessors with structural sharing.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpaths%5D+in%3Atitle)

## Breaking changes

### 4.0.0

#### Naming convention

As part of a larger effort to enforce more consistent naming conventions
across various umbrella packages, all higher-order operators in this
package are now using the `def` prefix: e.g. `getterT()` =>
`defGetter()`, `setterT()` => `defSetter()`.

#### Type checked accessors

**Type checked accessors are now the default and those functions expect
paths provided as tuples**. To continue using string based paths (e.g.
`"a.b.c"`), alternative `Unsafe` versions are provided. E.g. `getIn()`
(type checked) vs. `getInUnsafe()` (unchecked). Higher-order versions
also provide fallbacks (e.g. `getter()` => `defGetterUnsafe()`).

Type checking for paths is currently "only" supported for the first 8
levels of nesting. Deeper paths are supported but only partially checked
and their value type inferred as `any`.

## Related packages

- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom) - Mutable wrappers for nested immutable values with optional undo/redo history and transaction support

## Installation

```bash
yarn add @thi.ng/paths
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/paths"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const paths = await import("@thi.ng/paths");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.20 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                | Description                                                                      | Live demo                                                 | Source                                                                                 |
|:--------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/big-font.png" width="240"/>           | Large ASCII font text generator using @thi.ng/rdom                               | [Demo](https://demo.thi.ng/umbrella/big-font/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/big-font)            |
|                                                                                                                           | Using hdom in an Elm-like manner                                                 | [Demo](https://demo.thi.ng/umbrella/hdom-elm/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-elm)            |
|                                                                                                                           | UI component w/ local state stored in hdom context                               | [Demo](https://demo.thi.ng/umbrella/hdom-localstate/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-localstate)     |
|                                                                                                                           | Example for themed components proposal                                           | [Demo](https://demo.thi.ng/umbrella/hdom-theme/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-theme)          |
|                                                                                                                           | Event handling w/ interceptors and side effects                                  | [Demo](https://demo.thi.ng/umbrella/interceptor-basics2/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/interceptor-basics2) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-event-loop.png" width="240"/> | Minimal demo of using rstream constructs to form an interceptor-style event loop | [Demo](https://demo.thi.ng/umbrella/rstream-event-loop/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-event-loop)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/todo-list.png" width="240"/>          | Obligatory to-do list example with undo/redo                                     | [Demo](https://demo.thi.ng/umbrella/todo-list/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/todo-list)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/triple-query.png" width="240"/>       | Triple store query results & sortable table                                      | [Demo](https://demo.thi.ng/umbrella/triple-query/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/triple-query)        |

## API

[Generated API docs](https://docs.thi.ng/umbrella/paths/)

### Type checked paths

As stated in the [breaking changes](#breaking-changes) section, since
v4.0.0 paths are now type checked by default. These new functions use
Typescript generics to validate a given path against the type structure
of the target state object. Since string paths cannot be checked, only
path tuples are supported. **Type checking & inference supports path
lengths up to 8** (i.e. levels of hierarchy) before reverting back to
`any` for longer/deeper paths (there's no depth limit per se).

Due to missing type information of the not-yet-known state value, using
the typed checked higher-order versions (e.g. `defGetter`, `defSetter`
etc.) is slightly more verbose compared to their immediate use,
first-order versions (e.g. `getIn()`, `setIn()` etc.), where everything
can be inferred directly. However, (re)using the HOF-constructed
accessors *can* be somewhat faster and more convenient... YMMV! More details below.

#### Optional property handling

When accessing data structures with optional properties, not only the
leaf value type targeted by a lookup path is important, but any
intermediate optional properties need to be considered too. Furthermore,
we need to distinguish between read (get) and write (update) use cases
for correct type inference.

For example, given these types:

```ts
type Foo1 = { a: { b: { c?: number; } } };

type Foo2 = { a?: { b: { c: number; } } };
```

For get/read purposes the inferred type for `c` will both be `number |
undefined`. Even though `c` in `Foo2` is not marked as optional, the `a`
property is optional and so attempting to lookup `c` can yield
`undefined`...

For set/update/write purposes, the type for `c` is inferred verbatim.
I.e. if a property is marked as optional, a setter will allow
`undefined` as new value as well.

### Higher-order accessors

The `defGetter()`, `defSetter()` and `defUpdater()` functions compile a
lookup path tuple into an optimized function, operating directly at the
value the path points to in a nested object given later. For getters,
this essentially compiles to:

```ts
defGetter(["a","b","c"]) => (obj) => obj.a.b.c;
```

...with the important difference that the function returns `undefined`
if any intermediate values along the lookup path are undefined (and
doesn't throw an error).

For setters / updaters, the resulting function too accepts a single
object (or array) to operate on and when called, **immutably** replaces
the value at the given path, i.e. it produces a selective deep copy of
obj up until given path. If any intermediate key is not present in the
given object, it creates a plain empty object for that missing key and
descends further along the path.

```ts
// define state structure (see above example)
interface State {
    a: {
        b?: number;
        c: string[];
    }
}

const state: State = { a: { b: 1, c: ["c1", "c2"] } };

// build type checked getter for `b` & `c`
const getB = defGetter<State, "a", "b">(["a", "b"]);
const getFirstC = defGetter<State, "a", "c", 0>(["a", "c", 0]);

const b = getB(state); // b inferred as `number | undefined`
const c1 = getFirstC(state); // c1 inferred as `string`
```

Paths can also be defined as dot-separated strings, however cannot be
type checked and MUST use the `Unsafe` version of each operation:

```ts
s = defSetterUnsafe("a.b.c");

s({ a: { b: { c: 23 } } }, 24)
// { a: { b: { c: 24 } } }

s({ x: 23 }, 24)
// { x: 23, a: { b: { c: 24 } } }

s(null, 24)
// { a: { b: { c: 24 } } }
```

Nested value updaters follow a similar pattern, but also take a user
supplied function to apply to the existing value (incl. any other
arguments passed):

```ts
type State = { a?: { b?: number; } };

const inc = defUpdater<State, "a", "b">(
    ["a","b"],
    // x inferred as number | undefined
    (x) => x !== undefined ? x + 1 : 1
);

inc({ a: { b: 10 } });
// { a: { b: 11 } }
inc({});
// { a: { b: 1 } }

// with additional arguments
add = defUpdater("a.b", (x, n) => x + n);

add({a: {b: 10}}, 13);
// { a: { b: 23 } }
```

### First order operators

In addition to these higher-order functions, the module also provides
immediate-use wrappers: `getIn()`, `setIn()`, `updateIn()` and
`deleteIn()`. These functions are using `defGetter` / `defSetter` internally, so come with the same contracts/disclaimers...

```ts
const state = { a: { b: { c: 23 } } };

const cPath = <const>["a", "b", "c"];

getIn(state, cPath)
// 23

setIn(state, cPath, 24)
// { a: { b: { c: 24 } } }

// apply given function to path value
// Note: New `c` is 24, since above `setIn()` didn't mutate orig
updateIn(state, cPath, (x) => x + 1)
// { a: { b: { c: 24 } } }

// immutably remove path key
deleteIn(state, cPath)
// { a: { b: {} } }
```

### Deletions

Since `deleteIn` immutably removes a key from the given state object, it
also returns a new type from which the key has been explicitly removed.
Those return types come in the form of `Without{1-8}<...>` interfaces.

```ts
// again using `state` from above example
// remove nested key `a.c`
const state2 = deleteIn(state, ["a","b","c"]);

// compile error: "Property `c` does not exist`
state2.a.b.c;
```

### PPP - Prototype pollution potential

Mainly a potential concern for the non-typechecked versions - currently,
none of the setter/update/mutation functions explicitly disallow
updating an object's `__proto__` property. However, the package provides
the `isProtoPath()` and `disallowProtoPath()` helpers which can & should be
used in conjunction with the setters in situations where it's advisable
to do so.

```ts
setIn({}, disallowProtoPath("__proto__.foo", true));
// Uncaught Error: unsafe path: '__proto__.foo'
```

### Structural sharing

Only keys in the path will be updated, all other keys present in the
given object retain their original/identical values to provide efficient
structural sharing / re-use. This is the same *behavior* as in Clojure's
immutable maps or those provided by ImmutableJS (albeit those
implementation are completely different - they're using trees, we're
using the ES6 spread op (for objects, `slice()` for arrays) and dynamic
functional composition to produce the setter/updater).

```ts
const s = defSetterUnsafe("a.b.c");

// original
const a = { x: { y: { z: 1 } }, u: { v: 2 } };
// updated version
const b = s(a, 3);
// { x: { y: { z: 1 } }, u: { v: 2 }, a: { b: { c: 3 } } }

// verify anything under keys `x` & `u` is still identical
a.x === b.x // true
a.x.y === b.x.y // true
a.u === b.u; // true
```

### Mutable setter

`defMutator()`/`defMutatorUnsafe()` are the mutable alternatives to
`defSetter()`/`defSetterUnsafe()`. Each returns a function, which when
called, mutates given object / array at given path location and bails if
any intermediate path values are non-indexable (only the very last path
element can be missing in the actual target object structure). If
successful, returns original (mutated) object, else `undefined`. This
function too provides optimized versions for path lengths <= 4.

As with `setIn`, `mutIn` is the immediate use mutator, i.e. the same as:
`defMutator(path)(state, val)`.

```ts
mutIn({ a: { b: [10, 20] } }, ["a", "b", 1], 23);
// or
mutInUnsafe({ a: { b: [10, 20] } }, "a.b.1", 23);
// { a: { b: [ 10, 23 ] } }

// no-op (because of missing path structure in target object)
mutInUnsafe({}, "a.b.c", 23);
// undefined
```

### Path checking

The `exists()` function takes an arbitrary object and lookup path
(string or tuple). Descends into object along path and returns true if
the full path exists (even if final leaf value is `null` or
`undefined`). Checks are performed using `hasOwnProperty()`.

```ts
exists({ a: { b: { c: [null] } } }, "a.b.c.0");
// true

exists({ a: { b: { c: [null] } } }, "a.b.c.1");
// false
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-paths,
  title = "@thi.ng/paths",
  author = "Karsten Schmidt",
  note = "https://thi.ng/paths",
  year = 2016
}
```

## License

&copy; 2016 - 2022 Karsten Schmidt // Apache Software License 2.0
