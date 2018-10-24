# @thi.ng/defmulti

[![npm version](https://img.shields.io/npm/v/@thi.ng/defmulti.svg)](https://www.npmjs.com/package/@thi.ng/defmulti)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/defmulti.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Dynamically extensible [multiple
dispatch](https://en.wikipedia.org/wiki/Multiple_dispatch) via user
supplied dispatch function, with minimal overhead and support for
dispatch value inheritance hierarchies (more flexible and independent of
any actual JS type relationships).

## Installation

```bash
yarn add @thi.ng/defmulti
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)

## API

### defmulti

`defmulti` returns a new multi-dispatch function using the provided
dispatcher function. The dispatcher acts as a mapping function, can take
any number of arguments and must produce a dispatch value (string,
number or symbol) used to lookup an implementation. If found, the impl
is called with the same args. If no matching implementation is
available, attempts to dispatch to `DEFAULT` impl. If none is
registered, an error is thrown.

`defmulti` provides generics for type checking up to 8 args (plus the
return type) and the generics will also apply to all implementations. If
more than 8 args are required, `defmulti` will fall back to an untyped
varargs solution.

Implementations for different dispatch values can be added and removed
dynamically by calling `.add(id, fn)` or `.remove(id)` on the returned
function.

#### Dispatch value hierarchies

To avoid code duplication, dispatch values can be associated in
child-parent relationships and implementations only defined for some
ancestors. Iff no implementation exists for a concrete dispatch value,
`defmulti` first attempts to find an implementation for any ancestor
dispatch value before using the `DEFAULT` implementation.

These relationships can be defined via an additional (optional) object
arg to `defmulti` and/or dynamically extended via the `.isa(child,
parent)` call to the multi-function. Relationships can also be queried
via `.parents(id)` and `.ancestors(id)`.

Note: If multiple direct parents are defined for a dispatch value, then
it's currently undefined which implementation will be picked. If this
causes issues to people, parents could be implemented as sorted list
(each parent with weight) instead of Sets, but this will have perf
impact... please open an issue if you run into problems!

```ts
const foo = defmulti((x )=> x);
foo.isa(23, "odd");
foo.isa(42, "even");
foo.isa("odd", "number");
foo.isa("even", "number");

foo.parents(23); // Set { "odd" }
foo.ancestors(23); // Set { "odd", "number" }

foo.parents(1); // undefined
foo.ancestors(1); // Set { }

// add some implementations
foo.add("odd", (x) => `${x} is odd`);
foo.add("number", (x) => `${x} is a number`);

foo(23); // "23 is odd"
foo(42); // "42 is a number"
foo(1);  // error (missing impl & no default)
```

Same example, but with relationships provided as argument to `defmulti`:

```ts
const foo = defmulti((x) => x, {
    23: ["odd"],
    42: ["even"],
    "odd": ["number"],
    "even": ["number"],
});

foo.rels();
// { "23": Set { "odd" },
//   "42": Set { "even" },
//   odd: Set { "number" },
//   even: Set { "number" } }
```

### defmultiN

Returns a multi-dispatch function which delegates to one of the provided
implementations, based on the arity (number of args) when the function
is called. Internally uses `defmulti`, so new arities can be dynamically
added (or removed) at a later time. `defmultiN` also registers a
`DEFAULT` implementation which simply throws an `IllegalArityError` when
invoked.

**Note:** Unlike `defmulti` no argument type checking is supported,
however you can specify the return type for the generated function.

```ts
const foo = defmultiN<string>({
  0: () => "zero",
  1: (x) => `one: ${x}`,
  3: (x, y, z) => `three: ${x}, ${y}, ${z}`
});

foo();
// zero
foo(23);
// one: 23
foo(1, 2, 3);
// three: 1, 2, 3
foo(1, 2);
// Error: illegal arity: 2
```

## Usage examples

```ts
import { defmulti, DEFAULT } from "@thi.ng/defmulti";

const visit = defmulti<any, void>((x) => Object.prototype.toString.call(x));

// register implementations for different dispatch types
// each dispatch value can only be registered once
visit.add("[object Array]", (x) => x.forEach(visit));
visit.add("[object Object]", (x) => { for(let k in x) visit([k, x[k]]); });
// ignore null values
visit.add("[object Null]", (x) => { });
// DEFAULT matches all other dispatch values
visit.add(DEFAULT, (x) => console.log("visit", x.toString()));

// call like normal fn
visit([{a: 1, b: ["foo", "bar", null, 42]}])
// a
// 1
// b
// foo
// bar
// 42
```

See
[/test/index.ts](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti/test/index.ts)
for a variation of this example.


#### Dynamic dispatch: Simple S-expression interpreter

```ts
const exec = defmulti((x) => Array.isArray(x) ? x[0] : typeof x);
exec.add("+", ([_, ...args]) => args.reduce((acc, n) => acc + exec(n), 0));
exec.add("*", ([_, ...args]) => args.reduce((acc, n) => acc * exec(n), 1));
exec.add("number", (x) => x);
exec.add(DEFAULT, (x) => { throw new Error(`invalid expr: ${x}`); });

// 10 * (1 + 2 + 3) + 6
exec(["+", ["*", 10, ["+", 1, 2, 3]], 6]);
// 66
```

#### True multiple arg dispatch

```ts
// interest rate calculator based on account type & balance thresholds
const apr = defmulti(
    ({type, balance}) =>
        `${type}-${balance < 1e4 ? "low" : balance < 5e4 ? "med" : "high"}`
);

apr.add("current-low",  ({ balance }) => balance * 0.005);
apr.add("current-med",  ({ balance }) => balance * 0.01);
apr.add("current-high", ({ balance }) => balance * 0.01);
apr.add("savings-low",  ({ balance }) => balance * 0.01);
apr.add("savings-med",  ({ balance }) => balance * 0.025);
apr.add("savings-high", ({ balance }) => balance * 0.035);
apr.add(DEFAULT, (x) => { throw new Error(`invalid account type: ${x.type}`)});

apr({type: "current", balance: 5000});
// 25
apr({type: "current", balance: 10000});
// 100
apr({type: "savings", balance: 10000});
// 250
apr({type: "isa", balance: 10000});
// Error: invalid account type: isa
```



## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
