# @thi.ng/hdom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hdom.svg)](https://www.npmjs.com/package/@thi.ng/hdom)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Minimal example #1: Local state, RAF update](#minimal-example-1-local-state-raf-update)
    - [Minimal example #2 (reactive state & transducer update)](#minimal-example-2-reactive-state--transducer-update)
- [Example projects](#example-projects)
    - [Realtime crypto candle chart](#realtime-crypto-candle-chart)
    - [Git commit log table](#git-commit-log-table)
    - [Interactive SVG grid generator](#interactive-svg-grid-generator)
    - [Interactive additive waveform visualization & SVG visualization](#interactive-additive-waveform-visualization--svg-visualization)
    - [Dataflow graph SVG components](#dataflow-graph-svg-components)
    - [Canvas based radial dial input widget](#canvas-based-radial-dial-input-widget)
    - [SPA with router and event bus](#spa-with-router-and-event-bus)
    - [Multiple apps with & without shared state](#multiple-apps-with--without-shared-state)
    - [Interceptor based event handling](#interceptor-based-event-handling)
    - [Todo list (w/ undo/redo)](#todo-list-w-undoredo)
    - [SVG particles](#svg-particles)
    - [Component tree translation](#component-tree-translation)
    - [Event & state handling options](#event--state-handling-options)
    - [Reusable components](#reusable-components)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)
    - [User context injection](#user-context-injection)
    - [Component objects & life cycle methods](#component-objects--life-cycle-methods)
    - [Benchmark](#benchmark)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Lightweight reactive DOM components & VDOM-ish implementation using only
vanilla JS data structures (arrays, objects with life cycle functions,
closures, iterators), based on
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup).
hdom is *very* flexible and supports many different workflows and means
to perform DOM updates...

- Use the full expressiveness of ES6 / TypeScript to define, annotate &
  document components
- Clean, functional component composition and reuse
- No pre-processing / pre-compilation steps
- [Supports
  SVG](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-svg),
  arbitrary elements, attributes, events
- Suitable for server side rendering (by passing the same data structure
  to @thi.ng/hiccup's `serialize()`) and then "hydrating" listeners and
  components with life cycle methods
- Less verbose than HTML / JSX, resulting in smaller file sizes
- Static components can be distributed as JSON (or [transform JSON
  into components](https://github.com/thi-ng/umbrella/tree/master/examples/json-components))
- Optional user context injection (an arbitrary object passed to all
  component functions)
- CSS conversion from JS objects for `style` attribs (for full
  hiccup-based CSS-in-JS generation also see:
  [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-css))
- Auto-deref of embedded value wrappers which implement the
  [`IDeref`](https://github.com/thi-ng/umbrella/tree/master/packages/api/api)
  interface (e.g. atoms, cursors, derived views, streams etc.)
- Fairly fast (see benchmark example below)
- Only ~5KB gzipped

In addition to the descriptions in this file, [further information and
examples are available in the
wiki](https://github.com/thi-ng/umbrella/wiki/hdom-recipes).

Also see the [work-in-progress
ADRs](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-components/adr/)
for component configuration.

### Minimal example #1: Local state, RAF update

```ts
import * as hdom from "@thi.ng/hdom";

// stateless component w/ params
// the first arg is an auto-injected context object
// (not used here, see `hdom-context-basics` example for details)
const greeter = (_, name) => ["h1.title", "hello ", name];

// component w/ local state
const counter = (i = 0) => {
    return () => ["button", { onclick: () => (i++) }, `clicks: ${i}`];
};

const app = () => {
    // initialization steps
    // ...
    // root component is just a static array
    return ["div#app", [greeter, "world"], counter(), counter(100)];
};

// start update loop (browser only, see diagram below)
hdom.start(app(), { root: document.body });

// alternatively apply DOM tree only once
// (stateful components won't update though)
hdom.createDOM(document.body, hdom.normalizeTree(app()));
```

[Live demo](https://demo.thi.ng/umbrella/hdom-basics/) |
[standalone example](https://github.com/thi-ng/umbrella/tree/master/examples/hdom-basics)

Alternatively, use the same component function for browser or server
side HTML serialization (Note: does not emit attributes w/ functions as
values, e.g. a button's `onclick` attrib).

```ts
import { serialize } from "@thi.ng/hiccup";

console.log(serialize(app()));
// <div id="app"><h1 class="title">hello world</h1><button>clicks: 0</button><button>clicks: 100</button></div>
```

### Minimal example #2 (reactive state & transducer update)

This example uses the
[@thi.ng/transducers-hdom](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-hdom)
support library to perform reactive DOM updates (instead of regular
diffing via RAF).

```ts
import * as rs from "@thi.ng/rstream/stream";
import * as tx from "@thi.ng/rstream/transducers";
import { updateDOM } from "@thi.ng/rstream/transducers-hdom";

// root component function
const app = ({ ticks, clicks }) =>
    ["div",
        `${ticks} ticks & `,
        ["a",
            { href: "#", onclick: () => clickStream.next(0)},
            `${clicks} clicks`]
    ];

// click stream (click counter)
const clickStream = rs.stream().transform(tx.scan(tx.count(-1)));

// stream combinator
// waits until all inputs have produced at least one value,
// then updates whenever any input has changed
rs.sync({
    // streams to synchronize
    src: {
        ticks: rs.fromInterval(1000),
        clicks: clickStream,
    },
}).transform(
    // transform tuple into hdom component
    tx.map(app),
    // apply hdom tree to real DOM
    updateDOM({ root: document.body })
);

// kick off
clickStream.next(0);
```

[Live demo](https://demo.thi.ng/umbrella/transducers-hdom/) |
[standalone example](https://github.com/thi-ng/umbrella/tree/master/examples/transducers-hdom)

## Example projects

Most of the 25
[examples](https://github.com/thi-ng/umbrella/tree/master/examples)
included in this repo are using this package in one way or another.
Please check them out to learn more. Each is heavily commented, incl.
best practice notes.

Non-exhaustive list:

### Realtime crypto candle chart

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/crypto-chart.png)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/crypto-chart) |
[Live version](https://demo.thi.ng/umbrella/crypto-chart/)

### Git commit log table

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/commit-table-ssr.png)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/commit-table-ssr) |
[Live version](https://demo.thi.ng/umbrella/commit-table-ssr/)

### Interactive SVG grid generator

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/rstream-grid.png)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-grid) |
[Live version](https://demo.thi.ng/umbrella/rstream-grid/)

### Interactive additive waveform visualization & SVG visualization

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/svg-waveform.png)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/svg-waveform) |
[Live version](https://demo.thi.ng/umbrella/svg-waveform/)

### Dataflow graph SVG components

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/estuary.jpg)

This is a preview of the WIP
[@thi.ng/estuary](https://github.com/thi-ng/umbrella/tree/feature/estuary/packages/estuary)
package:

[Source](https://github.com/thi-ng/umbrella/tree/feature/estuary/packages/estuary)
| [Live version](https://demo.thi.ng/umbrella/estuary/)

### Canvas based radial dial input widget

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/screenshots/canvas-dial.png)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/canvas-dial) |
[Live version](https://demo.thi.ng/umbrella/canvas-dial/)

### SPA with router and event bus

Based on the `create-hdom-app` project scaffolding, this is one of the
more advanced demos, combining functionality of several other @thi.ng
packages.

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/router-basics)
| [Live version](https://demo.thi.ng/umbrella/router-basics/)

### Multiple apps with & without shared state

Devcards style BMI calculator(s) with basic SVG viz.

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/devcards)
| [Live version](https://demo.thi.ng/umbrella/devcards/)

### Interceptor based event handling

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/interceptor-basics)
| [Live version](https://demo.thi.ng/umbrella/interceptor-basics/)

### Todo list (w/ undo/redo)

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/todo-list)
| [Live version](https://demo.thi.ng/umbrella/todo-list/)

### SVG particles

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/svg-particles)
| [Live version](https://demo.thi.ng/umbrella/svg-particles/)

### Component tree translation

The actual DOM update is based on the minimal edit set of the recursive
difference between the old and new DOM trees (both expressed as nested
JS arrays). Components can be defined as static arrays, closures or
objects with [life cycle methods](#lifecycle-methods) (init, render,
release).

**Note: hdom uses a RAF render loop only by default, but is absolutely
no way tied to this.**

![hdom dataflow](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/hdom-dataflow.png)

The syntax is inspired by Clojure's
[Hiccup](https://github.com/weavejester/hiccup) and
[Reagent](http://reagent-project.github.io/) projects, however the
latter is a wrapper around React, whereas this library is standalone,
more low-level & less opinionated.

### Event & state handling options

Since this package is purely dealing with the translation of DOM trees,
any form of state / event handling or routing required by a full app is
out of scope. These features are provided by the following packages and
can be used in a mix & match manner:

- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
- [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/master/packages/interceptors)
- [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/master/packages/router)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

### Reusable components

A currently small (but growing) number of reusable components are
provided by these packages:

- [@thi.ng/hdom-components](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-components)
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-svg)

## Status

The overall "API" is stable, but there's further work planned on
generalizing the approach beyond standard browser DOM use cases. The
project has been used for several projects in production since 2016.

## Installation

```bash
yarn add @thi.ng/hdom
```

Use the customizable
[create-hdom-app](https://github.com/thi-ng/create-hdom-app) project
generator to create a pre-configured app skeleton using @thi.ng/atom,
@thi.ng/hdom, @thi.ng/interceptors & @thi.ng/router:

```bash
yarn create hdom-app my-app

cd my-app
yarn install
yarn start
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/diff](https://github.com/thi-ng/umbrella/tree/master/packages/diff)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)

## Usage

Even though the overall approach should be obvious from the code
examples in this document, it's recommended to first study the
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)
reference to learn about the basics of the approach and syntax used.
Both projects started in early 2016, have somewhat evolved
independently, however should be considered complementary.

#### `start(tree: any, opts?: Partial<HDOMOpts>): () => any`

Main user function of this package. For most use cases, this function
should be the only one required in user code. It takes an hiccup tree
(array, function or component object w/ life cycle methods) and an
optional object of [DOM update
options](https://github.com/thi-ng/umbrella/tree/master/packages/hdom/src/api.ts#L19)
(also see below). Starts RAF update loop, in each iteration first
normalizing given tree, then computing diff to previous frame's tree and
applying any changes to the real DOM. The `ctx` option can be used for
passing arbitrary config data or state down into the hiccup component
tree. Any embedded component function in the tree will receive this
context object as first argument, as will life cycle methods in
component objects. See [context description](#user-context) further
below.

**Selective updates**: No updates will be applied if the given hiccup
tree is `undefined` or `null` or a root component function returns no
value. This way a given root component function can do some state
handling of its own and implement fail-fast checks to determine no DOM
updates are necessary, saving effort re-creating a new hiccup tree and
request skipping DOM updates via this function. In this case, the
previous DOM tree is kept around until the root function returns a tree
again, which then is diffed and applied against the previous tree kept
as usual. Any number of frames may be skipped this way.

**Important:** Unless the `hydrate` option is enabled, the parent
element given is assumed to have NO children at the time when `start()`
is called. Since hdom does NOT track the real DOM, the resulting changes
will result in potentially undefined behavior if the parent element
wasn't empty. Likewise, if `hydrate` is enabled, it is assumed that an
equivalent DOM (minus listeners) already exists (i.e. generated via SSR)
when `start()` is called. Any other discrepancies between the
pre-existing DOM and the hdom trees will cause undefined behavior.

`start` returns a function, which when called, immediately cancels the
update loop.

#### `HDOMOpts` config options

Config options object passed to hdom's `start()` or
[@thi.ng/transducers-hdom](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-hdom)'s
`updateDOM()`:

```ts
interface HDOMOpts {
    /**
     * Root element or ID (default: "app").
     */
    root?: Element | string;
    /**
     * Arbitrary user context object, passed to all component functions
     * embedded in the tree.
     */
    ctx?: any;
    /**
     * If true (default), all text content will be wrapped in `<span>`
     * elements. Spans will never be created inside <option>, <textarea>
     * or <text> elements.
     */
    span?: boolean;
    /**
     * If true (default false), the first frame will only be used to
     * inject event listeners, using the `hydrateDOM()` function.
     *
     * *Important:* Enabling this option assumes that an equivalent DOM
     * (minus event listeners) already exists (e.g. generated via SSR /
     * hiccup's `serialize()`) when hdom's `start()` function is called.
     * Any other discrepancies between the pre-existing DOM and the hdom
     * trees will cause undefined behavior.
     */
    hydrate?: boolean;
    /**
     * If true (default), the hdom component tree will be first
     * normalized before diffing (using `normalizeTree()`). Unless you
     * know what you're doing, it's best to leave this enabled.
     */
    normalize?: boolean;
}
```

#### `normalizeTree(tree: any, ctx?: any): any`

Calling this function is a prerequisite before passing a component tree
to `diffElement`. Recursively expands given hiccup component tree into
its canonical form by:

- resolving Emmet-style tags (e.g. from `div#id.foo.bar`)
- evaluating embedded functions and replacing them with their result
- calling `render` life cycle method on component objects and using
  result
- consuming iterables and normalizing results
- calling `deref()` on elements implementing `IDeref` interface and
  using returned result
- calling `.toString()` on any other non-component value `x` and by
  default wrapping it in `["span", x]`. The only exceptions to this are:
  `option`, `textarea` and SVG `text` elements, for which spans are
  always skipped.

Additionally, unless `keys` is set to false, an unique `key` attribute
is created for each node in the tree. This attribute is used by
`diffElement` to determine if a changed node can be patched or will need
to be replaced/removed. The `key` values are defined by the `path` array
arg.

For normal usage only the first 2 args should be specified and the rest
kept at their defaults.

#### `diffElement(parent: Element, prev: any, curr: any): void`

Takes a DOM root element and two hiccup trees, `prev` and `curr`.
Recursively computes diff between both trees and applies any necessary
changes to reflect `curr` tree in real DOM.

For newly added components, calls `init` with created DOM element (plus
user provided context and any other args) for any components with `init`
life cycle method. Likewise, calls `release` on components with
`release` method when the DOM element is removed.

**Important:** The actual DOM element/subtree given is assumed to
exactly represent the state of the `prev` tree. Since this function does
NOT track the real DOM at all, the resulting changes will result in
potentially undefined behavior if there're discrepancies.

#### `createDOM(parent: Element, tag: any, insert?: number): any`

Creates an actual DOM tree from given hiccup component and `parent`
element. Calls `init` with created element (user provided context and
other args) for any components with `init` life cycle method. Returns
created root element(s) - usually only a single one, but can be an array
of elements, if the provided tree is an iterable. Creates DOM text nodes
for non-component values. Returns `parent` if tree is `null` or
`undefined`.

#### `hydrateDOM(parent: Element, tag: any)`

Takes a DOM root element and normalized hdom tree, then walks tree and
initializes any event listeners and components with lifecycle init
methods. Assumes that an equivalent DOM (minus listeners) already exists
(e.g. generated via SSR) when called. Any other discrepancies between
the pre-existing DOM and the hdom tree will cause undefined behavior.

### User context injection

Since v3.0.0 hdom offers support for an arbitrary "context" object
passed to `start()`, and then automatically injected as argument to
**all** embedded component functions anywhere in the tree. This avoids
having to manually pass down configuration data into each sub-component
and so can simplify certain use cases, e.g. event dispatch, style /
theme information, global state etc.

```ts
import { start } from "@thi.ng/hdom";
import { Event, EventBus } from "@thi.ng/interceptors";

// (optional) type aliases to better illustrate demo context structure
type AppContext = {
    bus: EventBus,
    ui: { link: string, list: string }
};

type LinkSpec = [Event, any];

// user defined context object
// should include whatever config is required by your components
const ctx: AppContext = {
    // event processor from @thi.ng/interceptors
    bus: new EventBus(),
    // component styling (using Tachyons CSS)
    ui: {
        link: "fw7 blue link dim pointer",
        list: "list center tc"
    }
};

// link component with `onclick` handler, which dispatches `evt`
// on EventBus obtained from context
// `ctx` arg is automatically provided when component is called
const eventLink = (ctx: AppContext, evt: Event, ...body: any[]) =>
    ["a",
        {
            class: ctx.ui.link,
            onclick: () => ctx.bus.dispatch(evt),
        },
        ...body];


// list component wrapper for links
const linkList = (ctx: AppContext, ...links: LinkSpec[]) =>
    ["ul", { class: ctx.ui.list },
        links.map((l) => ["li", [eventLink, ...l]])];

// root component
// i.e. creates list of of provided dummy event link specs
const root = [
    linkList,
    [["handle-login"], "Login"],
    [["external-link", "http://thi.ng"], "thi.ng"],
];

// start hdom update loop
start(root, { ctx });
```

### Component objects & life cycle methods

Most components can be succinctly expressed via vanilla JS functions,
though for some use cases we need to get a handle on the actual
underlying DOM element and can only fully initialize the component once
it's been mounted etc. For those cases components can be specified as
classes or plain objects implementing the following interface:

```ts
interface ILifecycle {
    /**
     * Component init method. Called with the actual DOM element,
     * hdom user context and any other args when the component is
     * first used, but **after** `render()` has been called once already.
     */
    init?(el: Element, ctx: any, ...args: any[]);

    /**
     * Returns the hdom tree of this component.
     * Note: Always will be called first (prior to `init`/`release`)
     * to obtain the actual component definition used for diffing.
     * Therefore might have to include checks if any local state
     * has already been initialized via `init`. This is the only
     * mandatory method which MUST be implemented.
     *
     * `render` is executed before `init` because `normalizeTree()`
     * must obtain the component's hdom tree first before it can
     * determine if an `init` is necessary. `init` itself will be
     * called from `diffElement` (or `createDOM`) in a later
     * phase of processing.
     */
    render(ctx: any, ...args: any[]): any;

    /**
     * Called when the underlying DOM of this component is removed
     * (or replaced). Intended for cleanup tasks.
     */
    release?(ctx: any, ...args: any[]);
}
```

When the component is first used the order of execution is: `render` ->
`init`. The `release` method is only called when the component has been
removed / replaced (basically if it's not present in the new tree
anymore). `release` should NOT manually call `release` on any children,
since that's already handled by `diffElement()`.

The rest `...args` provided are sourced from the component call site as
this simple example demonstrates:

```ts
// wrap in closure to allow multiple instances
const canvas = () => {
    return {
        init: (el, ctx, { width, height }, msg, color = "red") => {
            const c = el.getContext("2d");
            c.fillStyle = color;
            c.fillRect(0, 0, width, height);
            c.fillStyle = "white";
            c.textAlign = "center";
            c.fillText(msg, width / 2, height / 2);
        },
        render: (ctx, attribs) => ["canvas", attribs],
    };
};

// usage scenario #1: static component
// inline initialization is okay here...
start(
    [canvas(), { width: 100, height: 100 }, "Hello world"],
    { root: document.body }
);


// usage scenario #2: dynamic component
// in this example, the root component itself is given as function, which
// is evaluated each frame
// since `canvas()` is a higher order component it too produces a new instance
// with each call. therefore the canvas instance(s) need to be created beforehand
const app = () => {
    // pre-instantiate canvases
    let c1 = canvas();
    let c2 = canvas();
    // return root component function
    return () => ["div",
        // some dynamic other content
        ["p", new Date().toString()],
        // use canvas instances
        [c1, { width: 100, height: 100 }, "Hello world"],
        [c2, { width: 100, height: 100 }, "Goodbye world", "blue"]
    ];
};

start(app(), { root: document.body });
```

### Benchmark

A stress test benchmark is here:
[/examples/benchmark](https://github.com/thi-ng/umbrella/tree/master/examples/hdom-benchmark)

[Live version](https://demo.thi.ng/umbrella/hdom-benchmark/)

Based on [user feedback collected via
Twitter](https://twitter.com/toxi/status/959246871339454464),
performance should be more than acceptable for even quite demanding UIs.
In the 192 / 256 cells configurations **this stress test causes approx.
600 / 800 DOM every single frame**, very unlikely for a typical web app.
In Chrome 68 on a MBP2016 this still runs at a stable 60fps (192 cells)
/ 37fps (256 cells). Both FPS readings based the 50 frame
[SMA](https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average).

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
