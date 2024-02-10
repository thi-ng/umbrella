<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/hdom](https://media.thi.ng/umbrella/banners-20230807/thing-hdom.svg?5a0cd007)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hdom.svg)](https://www.npmjs.com/package/@thi.ng/hdom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hdom.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

**Update 12/2022: This package is considered completed and no longer being
updated with new features. Please consider using
[@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)
instead...**

- [About](#about)
- [Status](#status)
- [Support packages](#support-packages)
- [Related packages](#related-packages)
  - [Blog posts](#blog-posts)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
  - [Minimal example #1: Local state, RAF update](#minimal-example-1-local-state-raf-update)
  - [Minimal example #2: Reactive, push-based state & update](#minimal-example-2-reactive-push-based-state--update)
  - [Minimal example #3: Immutable app state & interceptors](#minimal-example-3-immutable-app-state--interceptors)
  - [Minimal example #4: Canvas scene tree / branch-local behavior](#minimal-example-4-canvas-scene-tree--branch-local-behavior)
- [API](#api)
  - [The hdom data flow](#the-hdom-data-flow)
  - [Nested arrays](#nested-arrays)
  - [Attribute objects](#attribute-objects)
  - [Pure functions and/or closures](#pure-functions-andor-closures)
  - [Iterators](#iterators)
  - [Interface support](#interface-support)
  - [Component objects with life cycle methods](#component-objects-with-life-cycle-methods)
  - [Event & state handling options](#event--state-handling-options)
  - [Event listener options](#event-listener-options)
  - [Reusable components](#reusable-components)
  - [Usage details](#usage-details)
  - [start()](#start)
    - [Selective updates](#selective-updates)
  - [renderOnce()](#renderonce)
  - [HDOMOpts config options](#hdomopts-config-options)
  - [HDOMImplementation interface](#hdomimplementation-interface)
  - [normalizeTree()](#normalizetree)
  - [diffTree()](#difftree)
  - [createTree()](#createtree)
  - [hydrateTree()](#hydratetree)
- [User context](#user-context)
  - [`value` attribute handling](#value-attribute-handling)
  - [Behavior control attributes](#behavior-control-attributes)
    - [\_\_impl](#__impl)
    - [\_\_diff](#__diff)
    - [\_\_normalize](#__normalize)
    - [\_\_release](#__release)
    - [\_\_serialize](#__serialize)
    - [\_\_skip](#__skip)
  - [Benchmarks](#benchmarks)
- [Authors](#authors)
- [License](#license)

## About

Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors.

Lightweight UI component tree definition syntax, DOM creation and
differential updates using only vanilla JS data structures (arrays,
iterators, closures, attribute objects or objects with life cycle
functions, closures). By default targets the browser's native DOM, but
supports other arbitrary target implementations in a branch-local
manner, e.g. to [define scene graphs for a canvas
element](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas)
as part of the normal UI tree.

Benefits:

- Use the full expressiveness of ES6 / TypeScript to define user interfaces
- No enforced opinion about state handling, very flexible
- Clean, functional component composition & reuse, optionally w/ lazy
  evaluation
- No source pre-processing, transpiling or string interpolation
- Less verbose than HTML / JSX, resulting in smaller file sizes
- Supports arbitrary elements (incl. SVG), attributes and events in
  uniform, S-expression based syntax
- Supports branch-local custom update behaviors & arbitrary (e.g.
  non-DOM) target data structures to which tree diffs are applied to
- Component life cycle methods & behavior control attributes
- Suitable for server-side rendering and then "hydrating" listeners and
  components with life cycle methods on the client side
- Can use JSON for static components (or component templates)
- Optional dynamic user context injection (an arbitrary object/value
  passed to all component functions embedded in the tree)
- Default implementation supports CSS conversion from JS objects for
  `style` attribs (also see:
  [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css))
- Auto-expansion of embedded values / types which implement the [`IToHiccup`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/hiccup.ts) or
  [`IDeref`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/deref.ts)
  interfaces (e.g. [atoms, cursors, derived views](https://github.com/thi-ng/umbrella/tree/develop/packages/atom), [streams](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) etc.)
- Fast (see [benchmark examples](#benchmarks) below)
- Only ~6.2KB gzipped

## Status

**COMPLETED** - no further development planned

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhdom%5D+in%3Atitle)

## Support packages

- [@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas) - [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) component wrapper for declarative canvas scenegraphs
- [@thi.ng/hdom-components](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-components) - Raw, skinnable UI & SVG components for [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
- [@thi.ng/hdom-mock](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-mock) - Mock base implementation for [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) API

## Related packages

- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) - Lightweight, reactive, VDOM-less UI/DOM components with async lifecycle and [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) compatible

### Blog posts

- [How to UI in 2018](https://medium.com/@thi.ng/how-to-ui-in-2018-ac2ae02acdf3)
- [Of umbrellas, transducers, reactive streams & mushrooms (Pt.1)](https://medium.com/@thi.ng/of-umbrellas-transducers-reactive-streams-mushrooms-pt-1-a8717ce3a170)

## Installation

```bash
yarn add @thi.ng/hdom
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/hdom"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const hdom = await import("@thi.ng/hdom");
```

You can use the
[create-hdom-app](https://github.com/thi-ng/create-hdom-app) project
generator to create one of several pre-configured app skeletons using
features from @thi.ng/atom, @thi.ng/hdom, @thi.ng/interceptors &
@thi.ng/router. Presets using @thi.ng/rstream for reactive state
handling will be added in the future.

```bash
yarn create hdom-app my-app

cd my-app
yarn install
yarn start
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.49 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/diff](https://github.com/thi-ng/umbrella/tree/develop/packages/diff)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/prefixes](https://github.com/thi-ng/umbrella/tree/develop/packages/prefixes)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                           | Description                                                                      | Live demo                                                   | Source                                                                                   |
|:-------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
|                                                                                                                                      | Minimal demo using interceptors with an async side effect                        | [Demo](https://demo.thi.ng/umbrella/async-effect/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/async-effect)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/cellular-automata.png" width="240"/>             | 2D transducer based cellular automata                                            | [Demo](https://demo.thi.ng/umbrella/cellular-automata/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/cellular-automata)     |
|                                                                                                                                      | BMI calculator in a devcards format                                              | [Demo](https://demo.thi.ng/umbrella/devcards/)              | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/devcards)              |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-benchmark2.png" width="240"/>               | hdom update performance benchmark w/ config options                              | [Demo](https://demo.thi.ng/umbrella/hdom-benchmark2/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-benchmark2)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-clock.png" width="240"/>             | Realtime analog clock demo                                                       | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-clock/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-clock)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/>         | 2D Bezier curve-guided particle system                                           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export             | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)    |
|                                                                                                                                      | Custom dropdown UI component for hdom                                            | [Demo](https://demo.thi.ng/umbrella/hdom-dropdown/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-dropdown)         |
|                                                                                                                                      | Custom dropdown UI component w/ fuzzy search                                     | [Demo](https://demo.thi.ng/umbrella/hdom-dropdown-fuzzy/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-dropdown-fuzzy)   |
|                                                                                                                                      | Using custom hdom context for dynamic UI theming                                 | [Demo](https://demo.thi.ng/umbrella/hdom-dyn-context/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-dyn-context)      |
|                                                                                                                                      | Using hdom in an Elm-like manner                                                 | [Demo](https://demo.thi.ng/umbrella/hdom-elm/)              | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-elm)              |
|                                                                                                                                      | Higher-order component for rendering HTML strings                                | [Demo](https://demo.thi.ng/umbrella/hdom-inner-html/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-inner-html)       |
|                                                                                                                                      | Isolated, component-local DOM updates                                            | [Demo](https://demo.thi.ng/umbrella/hdom-local-render/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-local-render)     |
|                                                                                                                                      | UI component w/ local state stored in hdom context                               | [Demo](https://demo.thi.ng/umbrella/hdom-localstate/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-localstate)       |
|                                                                                                                                      | Skipping UI updates for selected component(s)                                    | [Demo](https://demo.thi.ng/umbrella/hdom-skip/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-skip)             |
|                                                                                                                                      | Skipping UI updates for nested component(s)                                      | [Demo](https://demo.thi.ng/umbrella/hdom-skip-nested/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-skip-nested)      |
|                                                                                                                                      | Example for themed components proposal                                           | [Demo](https://demo.thi.ng/umbrella/hdom-theme/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-theme)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-toggle.png" width="240"/>                   | Customizable slide toggle component demo                                         | [Demo](https://demo.thi.ng/umbrella/hdom-toggle/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-toggle)           |
|                                                                                                                                      | Hiccup / hdom DOM hydration example                                              | [Demo](https://demo.thi.ng/umbrella/hydrate-basics/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hydrate-basics)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>                        | Canvas based Immediate Mode GUI components                                       | [Demo](https://demo.thi.ng/umbrella/imgui/)                 | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)                 |
|                                                                                                                                      | Event handling w/ interceptors and side effects                                  | [Demo](https://demo.thi.ng/umbrella/interceptor-basics2/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/interceptor-basics2)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png" width="240"/>                      | Animated sine plasma effect visualized using contour lines                       | [Demo](https://demo.thi.ng/umbrella/iso-plasma/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/json-components.jpg" width="240"/>               | Transforming JSON into UI components                                             | [Demo](https://demo.thi.ng/umbrella/json-components/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/json-components)       |
|                                                                                                                                      | Basic SPA example with atom-based UI router                                      | [Demo](https://demo.thi.ng/umbrella/login-form/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/login-form)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-synth.png" width="240"/>                    | Unison wavetable synth with waveform editor                                      | [Demo](https://demo.thi.ng/umbrella/ramp-synth/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ramp-synth)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/router-basics.jpg" width="240"/>                 | Complete mini SPA app w/ router & async content loading                          | [Demo](https://demo.thi.ng/umbrella/router-basics/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/router-basics)         |
|                                                                                                                                      | Minimal rstream dataflow graph                                                   | [Demo](https://demo.thi.ng/umbrella/rstream-dataflow/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-dataflow)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-event-loop.png" width="240"/>            | Minimal demo of using rstream constructs to form an interceptor-style event loop | [Demo](https://demo.thi.ng/umbrella/rstream-event-loop/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-event-loop)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-grid.jpg" width="240"/>                  | Interactive grid generator, SVG generation & export, undo/redo support           | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-grid)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-spreadsheet.png" width="240"/>           | rstream based spreadsheet w/ S-expression formula DSL                            | [Demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-spreadsheet)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>                    | 2D scenegraph & shape picking                                                    | [Demo](https://demo.thi.ng/umbrella/scenegraph/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/>              | 2D scenegraph & image map based geometry manipulation                            | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/>                  | Entity Component System w/ 100k 3D particles                                     | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)               | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs)               |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-barchart.png" width="240"/>                  | Simplistic SVG bar chart component                                               | [Demo](https://demo.thi.ng/umbrella/svg-barchart/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-barchart)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-waveform.jpg" width="240"/>                  | Additive waveform synthesis & SVG visualization with undo/redo                   | [Demo](https://demo.thi.ng/umbrella/svg-waveform/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-waveform)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/talk-slides.png" width="240"/>                   | hdom based slide deck viewer & slides from my ClojureX 2018 keynote              | [Demo](http://media.thi.ng/2018/talks/clojurex/index.html)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/talk-slides)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/todo-list.png" width="240"/>                     | Obligatory to-do list example with undo/redo                                     | [Demo](https://demo.thi.ng/umbrella/todo-list/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/todo-list)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/triple-query.png" width="240"/>                  | Triple store query results & sortable table                                      | [Demo](https://demo.thi.ng/umbrella/triple-query/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/triple-query)          |

### Minimal example #1: Local state, RAF update

[Live demo](https://demo.thi.ng/umbrella/hdom-basics/) |
[standalone example](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-basics)

```ts
import { start, renderOnce } from "@thi.ng/hdom";

// stateless component w/ params
// the first arg is an auto-injected context object
// (not used here, see dedicated section in readme further below)
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

// start RAF update & diff loop
start(app(), { root: document.body });

// alternatively create DOM tree only once
renderOnce(app(), { root: document.body });
```

Alternatively, use the same component for browser or server side HTML
serialization (Note: does not emit attributes w/ functions as values,
e.g. a button's `onclick` attrib).

```ts
import { serialize } from "@thi.ng/hiccup";

console.log(serialize(app()));
// <div id="app"><h1 class="title">hello world</h1><button>clicks: 0</button><button>clicks: 100</button></div>
```

### Minimal example #2: Reactive, push-based state & update

This example uses
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
for reactive state values and the
[@thi.ng/transducers-hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-hdom)
support library to perform push-based DOM updates (instead of regular
diffing via RAF).

[Live demo](https://demo.thi.ng/umbrella/transducers-hdom/) |
[standalone example](https://github.com/thi-ng/umbrella/tree/develop/examples/transducers-hdom)

```ts
import { fromInterval, stream, sync } from "@thi.ng/rstream";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map, scan, count } from "@thi.ng/transducers";

// root component function
const app = ({ ticks, clicks }) =>
    ["div",
        `${ticks} ticks & `,
        ["a",
            { href: "#", onclick: () => clickStream.next(0)},
            `${clicks} clicks`]
    ];

// transformed stream to count clicks
const clickStream = stream().transform(scan(count(-1)));
// seed
clickStream.next(0);

// stream combinator
// waits until all inputs have produced at least one value,
// then updates whenever either input has changed
sync({
    // streams to combine & synchronize
    src: {
        ticks: fromInterval(1000),
        clicks: clickStream,
    },
}).transform(
    // transform tuple into hdom component
    map(app),
    // apply hdom tree to real DOM
    updateDOM({ root: document.body })
);
```

### Minimal example #3: Immutable app state & interceptors

This example uses
[@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/develop/packages/interceptors)
for state & event handling and to skip DOM updates completely if not
needed.

[Live demo](http://demo.thi.ng/umbrella/interceptor-basics/) |
[Source code](https://github.com/thi-ng/umbrella/tree/develop/examples/interceptor-basics)

[Live demo](http://demo.thi.ng/umbrella/interceptor-basics2/) |
[Source code](https://github.com/thi-ng/umbrella/tree/develop/examples/interceptor-basics2) (extended version)

```ts
import { Atom } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom";
import { choices } from "@thi.ng/transducers";
import * as icep from "@thi.ng/interceptors";

// infinite iterator of random color choices
const colors = choices(["cyan", "yellow", "magenta", "chartreuse"]);

// central app state (initially empty)
const state = new Atom({});

// event bus & event handlers / interceptors
// each handler produces a number of effects (incl. state updates)
// see @thi.ng/interceptors for more details
const bus = new icep.EventBus(state, {
    // initializes app state
    "init": () => ({
        [icep.FX_STATE]: { clicks: 0, color: "grey" }
    }),
    // composed event handler
    // increments `clicks` state value and
    // delegates to another event
    "inc-counter": [
        icep.valueUpdater("clicks", (x: number) => x + 1),
        icep.dispatchNow(["randomize-color"])
    ],
    // sets `colors` state value to a new random choice
    "randomize-color": icep.valueUpdater(
        "color", () => colors.next().value
    )
});

// start hdom update loop
start(
    // this root component function will be executed via RAF.
    // it first processes events and then only returns an updated
    // component if there was a state update...
    // DOM update will be skipped if the function returned null
    ({ bus, state }) => bus.processQueue() ?
        ["button",
            {
                style: {
                    padding: "1rem",
                    background: state.value.color
                },
                onclick: () => bus.dispatch(["inc-counter"])
            },
            `clicks: ${state.value.clicks}`] :
        null,
    // hdom options, here including an arbitrary user context object
    // passed to all components
    { ctx: { state, bus } }
);

// kick off
bus.dispatch(["init"]);
```

### Minimal example #4: Canvas scene tree / branch-local behavior

This example uses the
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas)
component to support the inclusion of (virtual / non-DOM targets) shape
elements as part of the normal HTML component tree. A description of the
actual mechanism can be found further below and in the hdom-canvas
readme. In short, all canvas child elements will be translated into
canvas API draw calls.

Related examples:

- [Clock](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-clock)
- [Functional doodling](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-draw)
- [Shape & SVG conversion](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)

```ts
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";

start(() =>
    ["div",
        ["h1", "Hello hdom"],
        // the hdom-canvas component injects a custom branch-local
        // implementation of the `HDOMImplementation` interface
        // so that one can define virtual child elements representing
        // shapes which will not become DOM nodes, but are translated
        // into canvas API draw calls
        [canvas, { width: 300, height: 300 },
            ["g", { stroke: "none", translate: [50, 50] },
                ["circle", { fill: "red" },
                    [0, 0], 25 + 25 * Math.sin(Date.now() * 0.001)],
                ["text", { fill: "#fff", align: "center", baseline: "middle" },
                    [0, 0], "Hello"]
            ]
        ]
    ]
);
```

## API

[Generated API docs](https://docs.thi.ng/umbrella/hdom/)

### The hdom data flow

The usual hdom update process is as follows: First the user app creates
an up-to-date UI component tree, which is then passed to hdom, will be
normalized (expanded into a canonical format) and then used to
recursively compute the minimal edit set of the difference to the
previous DOM tree.

**Important**:

- hdom uses a RAF render loop only by default, but is in absolutely no
  way tied to this (see
  [@thi.ng/transducers-hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-hdom)
  for a possible alternative)
- hdom uses the browser DOM only by default, but supports custom target
  implementations, which can modify other target data structures. These
  custom implementations can be triggered on branch-local basis in the
  tree
- hdom NEVER tracks the real DOM, only its own trees (previous & current)
- hdom can be used **without** diffing, i.e. for compact, one-off DOM
  creation (see [`renderOnce()`](#renderonce))

![hdom dataflow](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom/hdom-dataflow.png)

The syntax is inspired by Clojure's
[Hiccup](https://github.com/weavejester/hiccup) and
[Reagent](http://reagent-project.github.io/) projects, which themselves
were influenced by [prior art by Phil
Wadler](http://homepages.inf.ed.ac.uk/wadler/papers/next700/next700.pdf)
at Edinburgh University, who pioneered this approach in Lisp back in
1999. hdom offers several additional features to these established
approaches.

hdom components are usually nested, vanilla ES6 data structures without
any custom syntax, organized in an S-expression-like manner. This makes
them very amenable to being constructed inline, composed, transformed or
instrumented using the many ES6 language options available.

### Nested arrays

No matter what the initial supported input format was, all components /
elements will eventually be transformed into a tree of nested arrays.
See [`normalizeTree()`](#normalizetree) further down for details.

The first element of each array is used as tag and if the 2nd
element is a plain object, it will be used to define arbitrary
attributes and event listeners for that element. All further elements
are considered children of the current element.

Emmet-style tags with ID and/or classes are supported.

```ts
["section#foo.bar.baz",
    ["h3", { class: "title" }, "Hello world!"]]
```

Equivalent HTML:

```html
<section id="foo" class="bar baz">
    <h3 class="title">Hello World!</h3>
</section>
```

### Attribute objects

Attributes objects are optional, but if present always given as the 2nd
element in an element array and are used to define arbitrary attributes,
CSS properties and event listeners. The latter always have to be
prefixed with `on` and their values always must be functions
(naturally). CSS props are assigned to the `style` attribute, but given
as JS object.

```ts
["a", {
    href: "#",
    onclick: (e) => (e.preventDefault(), alert("hi")),
    style: {
        background: "#000",
        color: "#fff",
        padding: "1rem",
        margin: "0.25rem"
    }
}, "Say Hi"]
```

```html
<!-- event handler not shown -->
<a href="#" style="background:#000;color:#fff;padding:1rem;margin:0.25rem;">Say Hi</a>
```

With the exception of event listeners (which are always functions),
others attribute values can be functions too and if so will be called
with the entire attributes object as sole argument and their return
value used as actual attribute value. Same goes for CSS property
function values (which receive the entire `style` object). In both
cases, this supports the creation of derived values based on other
attribs:

```ts
const btAttribs = {
    // event handlers are always standard listener functions
    onclick: (e)=> alert(e.target.id),
    // these fns receive the entire attribs object
    class: (attr) => `bt bt-${attr.id}`,
    href: (attr) => `#${attr.id}`,
};

// reuse attribs object for different elements
["div",
    ["a#foo", btAttribs, "Foo"],
    ["button#bar", btAttribs, "Bar"]]
```

```html
<div>
    <a id="foo" class="bt bt-foo" href="#foo">Foo</a>
    <button id="bar" class="bt bt-bar" href="#bar">Bar</button>
</div>
```

### Pure functions and/or closures

```ts
// inline definition
["ul#users", ["alice", "bob", "charlie"].map((x) => ["li", x])]

// reusable component
const unorderedList = (_, attribs, ...items) =>
    ["ul", attribs, ...items.map((x)=> ["li", x])];

[unorderedList, { id: "users"}, "alice", "bob", "charlie"]
```

```html
<ul id="users">
    <li>alice</li>
    <li>bob</li>
    <li>charlie</li>
</ul>
```

Functions used in the "tag" (head) position of an element array are
treated as delayed execution mechanism and will only be called and
recursively expanded during tree normalization with the remaining array
elements passed as arguments. These component functions also receive an
arbitrary [user context object](#user-context) (not used for these
examples here) as additional first argument.

```ts
const iconButton = (_, icon, onclick, label) =>
    ["a.bt", { onclick }, ["i", {class: `fas fa-${icon}`}], label];

const alignButton = (_, type) =>
    [iconButton, `align-${type}`, () => alert(type), type];

["div",
    { style: { padding: "1rem" } },
    [alignButton, "left"],
    [alignButton, "center"],
    [alignButton, "right"]]
```

```html
<!-- event handlers not shown -->
<div style="padding:1rem;">
    <a class="bt"><i class="fas fa-align-left"></i>left</a>
    <a class="bt"><i class="fas fa-align-center"></i>center</a>
    <a class="bt"><i class="fas fa-align-right"></i>right</a>
</div>
```

Functions in other positions of an element array are also supported but
only receive the optional user context object as attribute.

```ts
const now = () => new Date().toLocaleString();

["footer", "Current date: ", now]
```

```html
<footer>Current date: 9/22/2018, 1:46:41 PM</footer>
```

### Iterators

ES6 iterables are supported out of the box and their use is encouraged
to avoid the unnecessary allocation of temporary objects caused by
chained application of `Array.map()` to transform raw state values into
components. However, since iterators can only be consumed once, please
see [this issue
comment](https://github.com/thi-ng/umbrella/issues/42#issuecomment-420094339)
for potential pitfalls.

The
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
package provides 130+ functions to create, compose and work with
iterator based pipelines. These are very powerful & handy for component
construction as well!

```ts
import { map, range } from "@thi.ng/transducers";

// map() returns an iterator
["ul", map((i) => ["li", i + 1], range(3))]
```

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

### Interface support

Any type implementing one of the
[`IToHiccup`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/hiccup.ts)
or
[`IDeref`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/deref.ts)
or interfaces will be auto-expanded during tree normalization.

This currently includes the following types from other packages in this
repo, but also any user defined custom types:

- [atoms, cursors, derived
  views](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)
- [streams](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

```ts
class Foo {
    constructor(val) {
        this.value = val;
    }

    deref() {
        return ["div.deref", this.value];
    }
}

// unlike `deref()`, the `toHiccup()` method
// receives current user context as argument
// (see section further below)
class Bar {
    constructor(val) {
        this.value = val;
    }

    toHiccup(ctx) {
        return ["div.hiccup", ctx && ctx.foo, this.value];
    }
}

// to demonstrate usage of the user context we're using
// @thi.ng/hiccup's serialize() function here, which too
// supports user context handling, but produces an HTML string
serialize(
    ["div", new Foo(23), new Bar(42)],
    // global user context with theming rules
    // here only use tachyons css classes, but could be anything...
    {
        foo: { class: "bg-lightest-blue navy pa2 ma0" }
    }
);
```

```html
<div>
    <div class="deref">23</div>
    <!-- note: classes from ctx have been merged in here -->
    <div class="bg-lightest-blue navy pa2 ma0 hiccup">42</div>
</div>
```

### Component objects with life cycle methods

Most components can be succinctly expressed via the options discussed so
far, though for some use cases we need to get a handle on the actual
underlying DOM element and can only fully initialize the component once
it's been mounted etc. For those cases components can be specified as
classes or plain objects implementing the following interface:

```ts
interface ILifecycle {
    /**
     * Component init method. Called with the actual DOM element,
     * hdom user context and any other args when the component is
     * first used, but **after** `render()` has been called once
     * already AND all of the components children have been realized.
     * Therefore, if any children have their own `init` lifecycle
     * method, these hooks will be executed before that of the parent.
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
     * called from `diffTree`, `createDOM` or `hydrateDOM()` in a later
     * phase of processing.
     *
     * `render` should ALWAYS return an array or another function,
     * else the component's `init` or `release` fns will NOT be able
     * to be called later. E.g. If the return value of `render`
     * evaluates as a string or number, the return value should be
     * wrapped as `["span", "foo"]`. If no `init` or `release` are
     * used, this requirement is relaxed.
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
removed / replaced (basically, if it's not present in the new tree
anymore). **The `release` implementation should NOT manually call
`release()` on any children, since that's already been handled by hdom's
`diffTree()`.**

Any remaining arguments are sourced from the component call site as
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
);

// usage scenario #2: dynamic component
// in this example, the root component itself is given as function,
// which is evaluated each frame.
// since `canvas()` is a higher order component it would produce
// a new instance with each call. therefore the canvas instance(s)
// need to be created beforehand...
const app = () => {
    // pre-instantiate canvases
    const c1 = canvas();
    const c2 = canvas();
    // return actual root component function
    return () =>
        ["div",
            // use canvas instances
            [c1, { width: 100, height: 100 }, "Hello world"],
            [c2, { width: 100, height: 100 }, "Goodbye world", "blue"]
        ];
};

start(app());
```

### Event & state handling options

Since this package is purely dealing with the translation of component
trees, any form of state / event handling or routing required by a full
app is out of scope. These features are provided by the following
packages and can be used in a mix & match manner. Since hdom components
are just plain functions/arrays, **any** solution can be used in
general.

- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)
- [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/develop/packages/interceptors)
- [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/develop/packages/router)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/rstream-gestures](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-gestures)
- [@thi.ng/rstream-graph](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-graph)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/transducers-hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-hdom)

### Event listener options

As noted further above, event listeners for an element/component are
specified as part of the attribute object and are always using the `on`
prefix for their attribute name (e.g. `onclick`). The value of these
attributes is usually just the listener function. However, if custom
listener options are required (e.g. passive or non-capturing events),
the listener need to be specified as an tuple of `[listeners, options]`,
like so:

```ts
["canvas", {
    width: 500,
    height: 500,
    // touchstart event listener
    ontouchstart: [
        // actual listener function
        (e) => ...,
        // listener options (see standard addEventListener() for ref)
        { passive: true }
    ]
}]
```

The listener options can be either a boolean or an object with these
keys:

- `capture`
- `passive`
- `once`

[MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters)

### Reusable components

A currently small (but growing) number of reusable components are
provided by these packages:

- [@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas)
- [@thi.ng/hdom-components](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-components)
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg)

### Usage details

Even though the overall approach should be obvious from the various
examples in this document, it's still recommended to also study the
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
reference to learn more about other possible syntax options to define
components. Both projects started in early 2016 and have somewhat
evolved independently, however should be considered complementary.

### start()

Params:

- `tree: any`
- `opts?: Partial<HDOMOpts>`
- `impl?: HDOMImplementation`

Main user function. For most use cases, this function should be the only
one required in user code. It takes an hiccup tree (array, function or
component object w/ life cycle methods) and an optional object of [DOM
update
options](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom/src/api.ts#L44)
(also see section below), as well as an optional `HDOMImplementation`.
If the latter is not given, the `DEFAULT_IMPL` will be used, which
targets the browser DOM. Unless you want to create your own custom
implementation, this should never be changed.

Starts RAF update loop, in each iteration first normalizing given tree,
then computing diff to previous frame's tree and applying any changes to
the real DOM. The `ctx` option can be used for passing arbitrary config
data or state down into the hiccup component tree. Any embedded
component function in the tree will receive this context object as first
argument, as will life cycle methods in component objects. See [context
description](#user-context) further below.

#### Selective updates

No updates will be applied if the current hiccup tree normalizes to
`undefined` or `null`, e.g. a root component function returning no
value. This way a given root component function can do some state
handling of its own and implement fail-fast checks and determine that no
DOM updates are necessary, saving effort re-creating a new hiccup tree
and request skipping DOM updates via this convention. In this case, the
previous DOM tree is kept around until the root function returns a valid
tree again, which then is diffed and applied against the previous tree
kept, as usual. Any number of frames may be skipped this way. This
pattern is often used when working with the [@thi.ng/interceptors
`EventBus`](https://github.com/thi-ng/umbrella/tree/develop/packages/interceptors/src/event-bus.ts).

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

### renderOnce()

One-off hdom tree conversion & target / DOM application. Takes same args
as `start()`, but performs no diffing and only creates or hydrates
target (DOM) once. The given tree is first normalized and no further
action will be taken, if the normalized result is `null` or `undefined`.

### HDOMOpts config options

Config options object passed to hdom's `start()`, `renderOnce()` or
[@thi.ng/transducers-hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-hdom)'s
`updateDOM()`:

- `root`: Root element or ID (default: "app")
- `ctx`: Arbitrary user context object, passed to all component
  functions embedded in the tree (see below)
- `autoDerefKeys`: Attempts to auto-expand/deref the given keys in the
  user supplied context object (`ctx` option) prior to *each* tree
  normalization. All of these values should implement the thi.ng/api
  `IDeref` interface (e.g. atoms, cursors, views, rstreams etc.). This
  feature can be used to define dynamic contexts linked to the main app
  state.
- `keys`: If true (default), each elements will receive an
  auto-generated `key` attribute (unless one already exists).
- `span`: If true (default), all text content will be wrapped in
  `<span>` elements. Spans will never be created inside `<button>`,
  `<option>`, `<textarea>` or `<text>` elements.
- `hydrate`: If true (default false), the first frame will only be used
  to inject event listeners, using the `hydrateDOM()` function.
  **Important:** Enabling this option assumes that an equivalent DOM
  (minus event listeners) already exists (e.g. generated via SSR /
  hiccup's `serialize()`) when hdom's `start()` function is called. Any
  other discrepancies between the pre-existing DOM and the hdom trees
  will cause undefined behavior.

### HDOMImplementation interface

The following functions are the core parts of the `HDOMImplementation`
interface, the abstraction layer used by hdom to support different
targets.

- [interface definition](https://docs.thi.ng/umbrella/hdom/interfaces/HDOMImplementation.html)
- [default implementation](https://github.com/thi-ng/umbrella/blob/develop/packages/hdom/src/default.ts)

### normalizeTree()

Normalizes given hdom tree, expands Emmet-style tags, embedded
iterables, component functions, component objects with life cycle
methods and injects `key` attributes for `diffTree()` to later identify
changes in nesting order. During normalization any embedded component
functions are called with the given (optional) user `ctx` object as
first argument. For further details of the default implementation,
please see `normalizeTree()` in `normalize.ts`.

Implementations MUST check for the presence of the `__impl` control
attribute on each branch. If given, the current implementation MUST
delegate to the `normalizeTree()` method of the specified implementation
and not descent into that branch further itself.

Furthermore, if (and only if) an element has the `__normalize` control
attrib set to `false`, the normalization of that element's children MUST
be skipped. Calling this function is a prerequisite before passing a
component tree to `diffTree()`. Recursively expands given hiccup
component tree into its canonical form:

```ts
["tag", { attribs }, ...body]
```

- resolves Emmet-style tags (e.g. from `div#id.foo.bar`)
- adds missing attribute objects (and `key` attribs)
- merges Emmet-style classes with additional `class` attrib values (if
  given), e.g. `["div.foo", { class: "bar" }]` => `["div", { class: "bar
  foo" }]`
- evaluates embedded functions and replaces them with their result
- calls the `render` life cycle method on component objects and uses
  result
- consumes iterables and normalizes their individual values
- calls `deref()` on elements implementing the `IDeref` interface and
  uses returned results
- calls `toHiccup()` on elements implementing the `IToHiccup` interface
  and uses returned results
- calls `.toString()` on any other non-component value and by default
  wraps it in `["span", x]`. The only exceptions to this are: `button`,
  `option`, `textarea` and SVG `text` elements, for which spans are
  never created.

Additionally, unless the `keys` option is explicitly set to false, an
unique `key` attribute is created for each node in the tree. This
attribute is used by `diffTree` to determine if a changed node can be
patched or will need to be moved, replaced or removed.

In terms of life cycle methods: `render` should ALWAYS return an array
or another function, else the component's `init` or `release` fns will
NOT be able to be called. E.g. If the return value of `render` evaluates
as a string or number, it should be wrapped as `["span", "foo"]` or an
equivalent wrapper node. If no `init` or `release` methods are used,
this requirement is relaxed.

See `normalizeElement` (normalize.ts) for further details about the
canonical element form.

### diffTree()

Takes an `HDOMOpts` options object, an `HDOMImplementation` and two
normalized hiccup trees, `prev` and `curr`. Recursively computes diff
between both trees and applies any necessary changes to reflect `curr`
tree, based on the differences to `prev`, in target (browser DOM when
using the `DEFAULT_IMPL` implementation).

All target modification operations are delegated to the given
implementation. `diffTree()` merely manages which elements or attributes
need to be created, updated or removed and this NEVER involves any form
of tracking of the actual underlying target data structure (e.g. the
real browser DOM). hdom in general and `diffTree()` specifically are
stateless. The only state available is that of the two trees given (prev
/ curr).

Implementations MUST check for the presence of the `__impl` control
attribute on each branch. If given, the current implementation MUST
delegate to the `diffTree()` method of the specified implementation and
not descent into that branch further itself.

Furthermore, if (and only if) an element has the `__diff` control
attribute set to `false`, then:

1. Computing the difference between old & new branch MUST be skipped
2. The implementation MUST recursively call any `release` life cycle
   methods present anywhere in the current `prev` tree (branch). The
   recursive release process itself is implemented by the exported
   `releaseDeep()` function in `diff.ts`. Custom implementations are
   encouraged to reuse this, since that function also takes care of
   handling the `__release` attrib: if the attrib is present and set to
   false, `releaseDeep()` will not descend into the branch any further.
3. Call the current implementation's `replaceChild()` method to replace
   the old element / branch with the new one.

### createTree()

Realizes the given hdom tree in the target below the `parent` node, e.g.
in the case of the browser DOM, creates all required DOM elements
encoded by the given hdom tree. If `parent` is null the result tree
won't be attached to any parent. If `insert` is given, the new elements
will be inserted at given child index.

For any components with `init` life cycle methods, the implementation
MUST call `init` with the created element, the user provided context
(obtained from `opts`) and any other args. `createTree()` returns the
created root element(s) - usually only a single one, but can be an array
of elements, if the provided tree is an iterable of multiple roots. The
default implementation creates text nodes for non-component values.
Returns `parent` if tree is `null` or `undefined`.

Implementations MUST check for the presence of the `__impl` control
attribute on each branch. If given, the current implementation MUST
delegate to the `createTree()` method of the specified implementation
and not descent into that branch further itself.

### hydrateTree()

Takes a target root element and normalized hdom tree, then walks tree
and initializes any event listeners and components with life cycle
`init` methods. Assumes that an equivalent "DOM" (minus listeners)
already exists when this function is called. Any other discrepancies
between the pre-existing DOM and the hdom tree might cause undefined
behavior.

Implementations MUST check for the presence of the `__impl` control
attribute on each branch. If given, the current implementation MUST
delegate to the `hydrateTree()` method of the specified implementation
and not descent into that branch further itself.

## User context

hdom offers support for an arbitrary "context" object passed to
`start()`, which will be automatically injected as argument to **all**
embedded component functions anywhere in the tree. This avoids having to
manually pass down configuration data into each child component and so
can simplify many use cases, e.g. event dispatch, style / theme
information, global state etc.

If the `autoDerefKeys` option is enabled, the given keys in the user
supplied context object will be auto-expand/deref'd prior to *each* tree
normalization. All of these values should implement the thi.ng/api
`IDeref` interface (e.g. atoms, cursors, views, rstreams etc.). This
feature can be used to define dynamic contexts linked to the main app
state, e.g. using derived views provided by
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom),
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
etc.

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
const app = [
    linkList,
    [["handle-login"], "Login"],
    [["external-link", "http://thi.ng"], "thi.ng"],
];

// start hdom update loop with `ctx` given as option
start(app, { ctx });
```

### `value` attribute handling

hdom automatically saves & restores the cursor position when updating
the `value` attribute of an `<input>` element w/ text content or
`<textarea>` element. The latter also means that `textarea` body content
SHOULD be assigned via the `value` attribute, rather than as child/body
content:

```ts
["textarea", { value: "Body content" }]
```

### Behavior control attributes

The following special attributes can be added to elements to control the
branch-local behavior of the hdom implementation:

#### \_\_impl

If present, the element and all of its children will be processed by the
given implementation of the `HDOMImplementation` interface. Currently,
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas)
is the only example of a component using this feature.

#### \_\_diff

If true (default), the element will be fully processed by `diffTree()`.
If false, no diff will be computed and the `replaceChild()` operation
will be called in the currently active hdom target implementation.

#### \_\_normalize

If `false`, the current element's children will not be normalized. Use
this when you're sure that all children are already in canonical format
(incl. `key` attributes). See `normalizeTree()` for details.

#### \_\_release

If `false`, hdom will not attempt to call `release()` lifecycle methods
on this element or any of its children.

#### \_\_serialize

[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
only. If `false`, this element and its children will be omitted from the
serialized output.

#### \_\_skip

If true, the element will not be diffed and simply skipped. This
attribute is only intended for cases when a component / tree branch
should not be updated, but MUST NEVER be enabled when that component is
first included in the tree. Doing so will result in undefined future
behavior.

Note, skipped elements and their children are being normalized, but are
ignored during diffing. Therefore, if this attribute is enabled the
element should either have no children OR the children are the same
(type) as when the attribute is disabled (i.e. when `__skip` is falsy).

Furthermore, once a previously skipped element is re-enabled (i.e. its
`__skip` attrib is now falsy again), the element's entire sub-tree is
re-created, but any lifecycle `init()` methods will not be re-executed.

### Benchmarks

Some stress test benchmarks are here:

- [/examples/hdom-benchmark](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-benchmark)
  | [Live version](https://demo.thi.ng/umbrella/hdom-benchmark/) (naive updates)
- [/examples/hdom-benchmark2](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-benchmark2)
  | [Live version](https://demo.thi.ng/umbrella/hdom-benchmark2/) (w/ selective updates)

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [Kevin Nolan](https://github.com/allforabit)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hdom,
  title = "@thi.ng/hdom",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/hdom",
  year = 2015
}
```

## License

&copy; 2015 - 2024 Karsten Schmidt // Apache License 2.0
