# @thi.ng/atom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/atom.svg)](https://www.npmjs.com/package/@thi.ng/atom)

## About

Clojure inspired mutable wrappers for (usually) immutable values, with support
for watches, cursors (direct access to nested values), undo/redo history.

## Installation

```
yarn add @thi.ng/atom
```

## Usage examples

A complete minimal webapp example is in the [/examples/todo-list](https://github.com/thi-ng/umbrella/tree/master/examples/todo-list) directory.

[Live demo here](http://demo.thi.ng/umbrella/hiccup-dom/todo-list/)

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
main = new atom.Atom({ a: { b: { c: 23 }, d: { e: 42 } }, f: 66 });

// cursor to `c` value
cursor = new atom.Cursor(main, "a.b.c");
// or
cursor = new atom.Cursor(main, ["a","b","c"]);

// alternatively provide path implicitly via lookup & update functions
// both fns will be called with cursor's parent state
// this allows the cursor implementation to work with any data structure
// as long as the updater DOES NOT mutate in place
cursor = new atom.Cursor(
    main,
    (s) => s.a.b.c,
    (s, x) => ({...s, a: {...s.a, b: {...s.a.b, c: x}}})
);

// add watch just as with Atom
cursor.addWatch("foo", console.log);

cursor.deref()
// 23

cursor.swap(x => x + 1);
// foo 23 24

main.deref()
// { a: 24, b: 42 }
```

### Undo history

```typescript
// the History can be used with & behaves like an Atom or Cursor
// but creates snapshots of current state before applying new state
// by default history has length of 100 steps, but is configurable
db = new atom.History(new atom.Atom({a: 1}))
db.deref()
// {a: 1}

db.reset({a: 2, b: 3})
db.reset({b: 4})

db.undo()
// {a: 2, b: 3}

db.undo()
// {a: 1}

db.undo()
// undefined (no more undo possible)
db.canUndo()
// false

db.redo()
// {a: 2, b: 3}

db.redo()
// {b: 4}

db.redo()
// undefined (no more redo possible)

db.canRedo()
// false
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
