# @thi.ng/hdom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hdom.svg)](https://www.npmjs.com/package/@thi.ng/hdom)

**As of 2018-03-03 this package is now called @thi.ng/hdom, formerly @thi.ng/hiccup-dom**

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
- Static components can be distributed as JSON (or [dynamically compose components, based on JSON data](https://github.com/thi-ng/umbrella/tree/master/examples/json-components))
- Supports SVG, arbitrary elements, attributes, events
- CSS conversion from JS objects
- Suitable for server side rendering (by passing the same data structure to @thi.ng/hiccup's `serialize()`)
- Fairly fast (see benchmark example below)
- Only ~10KB minified

```typescript
import * as hiccup from "@thi.ng/hiccup";
import * as hdom from "@thi.ng/hdom";

// stateless component w/ params
const greeter = (name) => ["h1.title", "hello ", name];

// component w/ local state
const counter = (i = 0) => {
    return () => ["button", { onclick: () => (i++) }, `clicks: ${i}`];
};

const app = () => {
    // root component is just a static array
    // instantiate counters w/ different start offsets
    return ["div#app", [greeter, "world"], counter(), counter(100)];
};

// start update loop (browser only, see diagram below)
hdom.start(document.body, app());

// alternatively apply DOM tree only once
// (stateful components won't update though)
hdom.createDOM(document.body, hdom.normalizeTree(app()));

// alternatively browser or server side HTML serialization
// (note: does not emit attributes w/ functions as values, i.e. the button "onclick" attribs)
console.log(hiccup.serialize(app()));
// <div id="app"><h1 class="title">hello world</h1><button>clicks: 0</button><button>clicks: 100</button></div>
```

[Live demo](http://demo.thi.ng/umbrella/hdom-basics/) | [standalone example](https://github.com/thi-ng/umbrella/tree/master/examples/hdom-basics)

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

## Status

This project is currently still in BETA. The overall "API" is stable, but there's still further work planned on optimization and generalization beyond the standard browser DOM use cases. Furthermore, the project has been used for several projects in production since 2016.

## Installation

```
yarn add @thi.ng/hdom
```

**New since 2018-03-15: You can now create a preconfigured app skeleton
using @thi.ng/atom, @thi.ng/hdom & @thi.ng/router using the
[create-hdom-app](https://github.com/thi-ng/create-hdom-app) project generator:**

```
yarn create hdom-app my-app

cd my-app
yarn install
yarn start
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

### Dataflow graph SVG components

This is a preview of the upcoming [@thi.ng/estuary](https://github.com/thi-ng/umbrella/tree/feature/estuary/packages/estuary) package:

[Source](https://github.com/thi-ng/umbrella/tree/feature/estuary/packages/estuary) | [Live demo](http://demo.thi.ng/umbrella/estuary/)

### Todo list

A fully documented todo list app with undo / redo feature is here:

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/todo-list) | [Live demo](http://demo.thi.ng/umbrella/todo-list/)

### Cellular automata

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/cellular-automata) | [Live demo](http://demo.thi.ng/umbrella/cellular-automata/)

### SVG particles

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/svg-particles) | [Live demo](http://demo.thi.ng/umbrella/svg-particles/)

### JSON based components

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/json-components) | [Live demo](http://demo.thi.ng/umbrella/json-components/)

### Basic usage patterns

The code below is also available as standalone project in: [/examples/dashboard](https://github.com/thi-ng/umbrella/tree/master/examples/dashboard)

[Live demo here](http://demo.thi.ng/umbrella/dashboard/)

```typescript
import { start } from "@thi.ng/hdom";

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
window.addEventListener("load", () => start("app", app));
```

### @thi.ng/rstream integration

TODO example forthcoming...

### Benchmark

A stress test benchmark is here: [/examples/benchmark](https://github.com/thi-ng/umbrella/tree/master/examples/hdom-benchmark)

[Live demo here](http://demo.thi.ng/umbrella/hdom-benchmark/)

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
