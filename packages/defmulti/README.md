# @thi.ng/defmulti

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/defmulti.svg)](https://www.npmjs.com/package/@thi.ng/defmulti)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Dynamically extensible [multiple
dispatch](https://en.wikipedia.org/wiki/Multiple_dispatch) via user
supplied dispatch function, with minimal overhead. Provides generics for
type checking up to 8 args, but generally works with any number of
arguments. Why "only" 8?

> "If you have a procedure with ten parameters, you probably missed some."
>
> -- Alan Perlis

## Installation

```bash
yarn add @thi.ng/defmulti
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)

## Usage examples

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

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
