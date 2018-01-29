# @thi.ng/atom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/atom.svg)](https://www.npmjs.com/package/@thi.ng/atom)

## About

Clojure inspired mutable wrappers for (usually) immutable values, with support for watches.

TODO

## Installation

```
yarn add @thi.ng/atom
```

## Usage examples

### Atom

```typescript
import * as atom from "@thi.ng/atom";

const a = new atom.Atom(23);

// obtain value via deref()
a.deref();
// 23

// add watch to observe value changes
a.addWatch("foo", (id, prev, curr) => console.log(`${id}: ${prev} -> ${curr}`));
// true

a.swap((val)=> val + 1);
// foo: 23 -> 24

a.reset(42);
// foo: 24 -> 42
```

### Cursor

```typescript
// main state
main = new atom.Atom({a: 23, b: 42});

// cursor to `a` value
// requires both a lookup & update function to given value
// both fns will be called with cursor's parent state
// the updater MUST NOT mutate in place
cursor = new atom.Cursor(main, (state) => state.a, (state, x) => ({...state, a: x}));

// add watch just as with Atom
cursor.addWatch("foo", console.log);

cursor.deref()
// 23

cursor.swap(x => x + 1);
// foo 23 24

main.deref()
// { a: 24, b: 42 }
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
