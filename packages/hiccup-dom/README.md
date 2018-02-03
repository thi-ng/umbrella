# @thi.ng/hiccup-dom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hiccup-dom.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-dom)

## About

Lightweight reactive DOM components using only vanilla JS data structures
(arrays, objects, closures, iterators), based on
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup).

Benefits:

- Use the full expressiveness of ES6/TypeScript to define, annotate & document components
- Clean, functional component composition and reuse
- No pre-processing / pre-compilation steps
- No string parsing / interpolation steps
- Less verbose than HTML, resulting in smaller file sizes
- Static components can be distributed as JSON (or [dynamically compose components, based on JSON data](../../examples/json-components))
- Supports SVG, arbitrary elements, attributes, events
- CSS conversion from JS objects
- Suitable for server side rendering (by passing the same data structure to @thi.ng/hiccup's `serialize()`)
- Fairly fast (see benchmark example below)
- Only ~10KB minified

```typescript
import { serialize } from "@thi.ng/hiccup";
import { start } from "@thi.ng/hiccup-dom";

// stateless component w/ params
const greeter = (name) => ["h1.title", "hello ", name];

// component w/ local state
const counter = () => {
    let i = 0;
    return () => ["button", { onclick: () => (i++) }, `clicks: ${i}`];
};

const app = () => {
    // instantiation
    const counters = [counter(), counter()];
    // root component is just a static array
    return ["div#app", [greeter, "world"], ...counters];
};

// browser only (see diagram below)
start(document.body, app());

// browser or server side serialization
// (note: does not emit event attributes w/ functions as values)
serialize(app);
// <div id="app"><h1 class="title">hello world</h1><button>clicks: 0</button><button>clicks: 0</button></div>
```

[Live demo](http://demo.thi.ng/umbrella/hiccup-dom/basics/) | [standalone example](../../examples/hdom-basics)

No template engine & no precompilation steps needed, just use the full
expressiveness of ES6/TypeScript to define your DOM tree. The additional
benefit of using TypeScript is that your UI components can become strongly
typed, since they're just normal functions, can use generics, overrides,
varargs etc.

The actual DOM update is based on the minimal edit set of the recursive
difference between the old and new DOM trees (both nested JS arrays).
Components can be defined as static arrays, closures or objects with life cycle
hooks (init, render, release).

![hdom dataflow](../../assets/hdom-dataflow.svg)

The syntax is inspired by Clojure's
[Hiccup](https://github.com/weavejester/hiccup) and
[Reagent](http://reagent-project.github.io/) projects, however the latter is a
wrapper around React, whereas this library is standalone, more lowlevel &
less opinionated.

If you're interested in using this, please also consider the
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom) and
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)
packages to integrate app state handling, event streams & reactive value
subscriptions. More examples are forthcoming...

## Installation

```
yarn add @thi.ng/hiccup-dom
```

## Usage examples

Even though the overall approach should be obvious from the code examples
below, it's recommended to first study the
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)
reference. It's also important to point out, that this project **currently**
has some differences as to how some attribute and iterables are treated and/or
are supported in general. This project also has additional features (e.g. life
cycle hooks), which aren't needed for the static serialization use cases of
hiccup. Both experiments started in early 2016, but have somewhat evolved
independently and require some conceptional synchronization.

### Todo list

A fully documented todo list app with undo / redo feature is here:

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/todo-list) | [Live demo](http://demo.thi.ng/umbrella/hiccup-dom/todo-list/)

### SVG particles

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/svg-particles) | [Live demo](http://demo.thi.ng/umbrella/hiccup-dom/svg-particles/)

### JSON based components

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/json-components) | [Live demo](http://demo.thi.ng/umbrella/hiccup-dom/json-components/)

### Basic usage patterns

The code below is also available as standalone project in: [/examples/dashboard](https://github.com/thi-ng/umbrella/tree/master/examples/dashboard)

[Live demo here](http://demo.thi.ng/umbrella/hiccup-dom/dashboard/)

```typescript
import { start } from "@thi.ng/hiccup-dom";

// static component function to create styled box
const box = (prefix, body) =>
    ["div",
        {
            style: {
                display: "inline-block",
                background: "#ccc",
                width: "30%",
                height: "40px",
                padding: "4px",
                margin: "2px",
                "text-align": "center"
            }
        },
        ["strong", prefix], ["br"], body];

// stateful component function
const counter = (id, from = 0, step = 1) => () => box(id, (from += step).toLocaleString());

// dynamic component function (external state, i.e. date)
const timer = () => box("time", new Date().toLocaleTimeString());

// application root component closure
// initializes stateful components
const app = (() => {
    const users = counter("users");
    const profits = counter("$$$", 1e6, 99);
    return () => ["div", ["h1", "Dashboard"], users, profits, timer];
})();

// start update loop (RAF)
window.addEventListener("load", () => start(document.getElementById("app"), app));
```

### @thi.ng/rstream integration

TODO example forthcoming...

### Benchmark

A stress test benchmark is here: [/examples/benchmark](https://github.com/thi-ng/umbrella/tree/master/examples/hdom-benchmark)

[Live demo here](http://demo.thi.ng/umbrella/hiccup-dom/benchmark/)

Based on [user feedback collected via
Twitter](https://twitter.com/toxi/status/959246871339454464), performance
should be more than acceptable for even quite demanding UIs. In the 192/256
cells configurations this stress test causes approx. 600/800 DOM every single
frame, something very unlikely for a typical web app. In Chrome 64 on a MBP2016
this still runs at a pretty stable 30fps (50 frame SMA).

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
