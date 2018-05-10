# @thi.ng/defmulti

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/defmulti.svg)](https://www.npmjs.com/package/@thi.ng/defmulti)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Dynamically extensible [multiple
dispatch](https://en.wikipedia.org/wiki/Multiple_dispatch) via user
supplied dispatch function, with minimal overhead.

## Installation

```
yarn add @thi.ng/defmulti
```

## Usage examples

`defmulti` returns a new multi-dispatch function using the provided
dispatcher function. The dispatcher can take any number of arguments and
must produce a dispatch value (string, number or symbol) used to lookup
an implementation. If found, the impl is called with the same args. If
no matching implementation is available, attempts to dispatch to
`DEFAULT` impl. If none is registered, an error is thrown.

Implementations for different dispatch values can be added and removed
dynamically by calling `.add(id, fn)` or `.remove(id)` on the returned
function.

```typescript
import { defmulti, DEFAULT } from "@thi.ng/defmulti";

const visit = defmulti((x) => Object.prototype.toString.call(x));

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
```

### Dynamic dispatch: Simple S-expression interpreter

```ts
const exec = defmulti((x)=> Array.isArray(x) ? x[0] : typeof x);
exec.add("+", ([_, ...args]) => args.reduce((acc, n) => acc + exec(n), 0));
exec.add("*", ([_, ...args]) => args.reduce((acc, n) => acc * exec(n), 1));
exec.add("number", (x) => x);
exec.add(DEFAULT, (x) => { throw new Error(`invalid expr: ${x}`); });

// 10 * (1 + 2 + 3) + 6
exec(["+", ["*", 10, ["+", 1, 2, 3]], 6]);
// 66
```

### True multiple arg dispatch

```ts
// interest rate calculator based on account type & balance thresholds
const apr = defmulti(
    ({type, balance}) => `${type}-${balance < 1e4 ? "low" : balance < 5e4 ? "med" : "high"}`
);

apr.add("current-low",  ({balance}) => balance * 0.005);
apr.add("current-med",  ({balance}) => balance * 0.01);
apr.add("current-high", ({balance}) => balance * 0.01);
apr.add("savings-low",  ({balance}) => balance * 0.01);
apr.add("savings-med",  ({balance}) => balance * 0.025);
apr.add("savings-high", ({balance}) => balance * 0.035);
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
