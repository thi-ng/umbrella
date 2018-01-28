# @thi.ng/atom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/atom.svg)](https://www.npmjs.com/package/@thi.ng/atom)

## About

Clojure inspired mutable wrapper for (usually) immutable values, with support for watches.

## Installation

```
yarn add @thi.ng/atom
```

## Usage examples

```typescript
import { Atom } from "@thi.ng/atom";

const a = new Atom(23);

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

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
