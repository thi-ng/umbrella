# @thi.ng/hiccup-dom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hiccup-dom.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-dom)

## About

Lightweight reactive DOM components using only vanilla JS data structures
(arrays, objects, closures, iterators), based on
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup).
Supports arbitrary attributes, events, CSS conversion from JS objects, SVG and
server side rendering (by passing the same data structure to @thi.ng/hiccup's
`serialize()`). Only ~10KB minified.

```typescript
import { start } from "@thi.ng/hiccup-dom";

// stateless component w/ params
const greeter = (name) => ["h1.title", "hello ", name];

// component w/ local state
const counter = () => {
    let i = 0;
    return () => ["button", { "on-click": () => (i++) }, `clicks: ${i}`];
};

const app = () => {
    // instantiation
    const counters = [counter(), counter()];
    // root component is just a static array
    return ["div#app", [greeter, "world"], ...counters];
};

start(document.body, app());
```
[Live demo](http://demo.thi.ng/umbrella/hiccup-dom/basics/)

No template engine & no precompilation steps needed, just use the full
expressiveness of ES6 to define your DOM tree.

The actual DOM update is based on the minimal edit set of the recursive
difference between the old and new DOM trees (both nested JS arrays).
Components can be defined as static arrays, closures or objects with life cycle
hooks (init, render, release).

The approach is inspired by Clojure's
[Hiccup](https://github.com/weavejester/hiccup) and
[Reagent](http://reagent-project.github.io/) projects, however the latter is a
wrapper around React, whereas this library is standalone, more lowlevel &
less opinionated.

If you're interested in using this, please also consider the
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream) packages to integrate app
state handling, event streams & reactive value subscriptions. Examples
forthcoming...

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

A fully documented todo list app with undo / redo feature is here: [/examples/todo-list](https://github.com/thi-ng/umbrella/tree/master/examples/todo-list)

[Live demo here](http://demo.thi.ng/umbrella/hiccup-dom/todo-list/)

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

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
