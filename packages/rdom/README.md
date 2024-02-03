<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/rdom](https://media.thi.ng/umbrella/banners-20230807/thing-rdom.svg?2193a58e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rdom.svg)](https://www.npmjs.com/package/@thi.ng/rdom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rdom.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [From hdom to rdom: Reactive UIs without virtual DOMs](#from-hdom-to-rdom-reactive-uis-without-virtual-doms)
  - [Targetted, isolated updates](#targetted-isolated-updates)
  - [Async updates & life cycle methods](#async-updates--life-cycle-methods)
  - [@thi.ng/atom integration](#thingatom-integration)
- [DOM creation & mutation](#dom-creation--mutation)
- [Control structures](#control-structures)
  - [Event handlers for reactive streams](#event-handlers-for-reactive-streams)
- [Status](#status)
- [Support packages](#support-packages)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
  - [Lists](#lists)
- [Authors](#authors)
- [License](#license)

## About

Lightweight, reactive, VDOM-less UI/DOM components with async lifecycle and [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) compatible.

### From hdom to rdom: Reactive UIs without virtual DOMs

In many ways this package is the direct successor of
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom),
which for several years was my preferred way of building UIs. _hdom_ eschewed
using a virtual DOM to represent and maintain a dynamic tree of (UI) components
and instead only required a previous and current component tree in
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
format (aka nested, plain JS arrays w/ optional support for embedded other JS
data types, like ES6 iterables, [@thi.ng/api
interfaces](https://github.com/thi-ng/umbrella/tree/develop/packages/api), etc.)
to perform its UI updates. Yet, whilst hiccup trees are plain, simple, user
defined data structures, which can be very easily composed without any
libraries, _hdom_ itself was still heavily influenced by the general vDOM
approach and therefore a centralized update cycle and computing differences
between the trees were necessary ~~evils~~ core tasks. In short, _hdom_ allowed
the illusion of declarative components with reactive state updates, but had to
use a complex and recursive diff to realize those updates.

**In contrast, _@thi.ng/rdom_ directly supports embedding reactive
values/components in the hiccup tree and compiles them in such a way that their
value changes directly target underlying DOM nodes without having to resort to
any other intermediate processing (no diffing, vDOM updates etc.).
_@thi.ng/rdom_ is entirely vDOM-free. It supports declarative component
definitions via
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup),
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream),
ES6 classes, direct DOM manipulation (incl. provided helpers) and/or any mixture
of these approaches.**

### Targetted, isolated updates

If a reactive value is used for an element attribute, a value change will
trigger an update of only that attribute (there's special handling for event
listeners, CSS classes, data attributes and `style` attribs). If a reactive
value is used as (text) body of an element (or an element/component itself),
only that body/subtree in the target DOM will be impacted/updated directly...

The package provides an interface
[`IComponent`](https://docs.thi.ng/umbrella/rdom/interfaces/IComponent.html)
(with a super simple life cycle API), a base component class
[`Component`](https://docs.thi.ng/umbrella/rdom/classes/Component.html) for
stubbing and a number of fundamental control constructs & component-wrappers for
composing more complex components and to reduce boilerplate for various
situations. Whilst targetting a standard JS DOM by default, each component can
decide for itself what kind of target data structure (apart from a browser DOM)
it manages. _rdom_ components themselves have **no mandatory** knowledge of a
browser DOM. As an example, similar to
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas),
the
[@thi.ng/rdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-canvas)
wrapper provides a component which subscribes to a stream of hiccup-based scene
descriptions (trees) and then translates each scene-value into HTML Canvas API
draw calls.

### Async updates & life cycle methods

Since there's no central coordination in _rdom_ (neither explicitly nor
implicitly), each component can (and does) update whenever its state value has
changed. Likewise, components are free to directly manipulate the DOM through
other means, as hinted at earlier.

The [`IComponent`](https://docs.thi.ng/umbrella/rdom/interfaces/icomponent.html)
interface is at the heart of _rdom_. It defines three lifecycle methods to:
`.mount()`, `.unmount()` and `.update()` a component. The first two are always
`async` to allow for more complex component initialization procedures (e.g.
preloaders, WASM init, other async ops...). Several of the higher-order
controller components/constructs too demand `async` functions for the same
reasons.

Because _rdom_ itself relies for most reactive features, stream composition and
reactive value transformations on other packages, i.e.
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
and
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers),
please consult the docs for these packages to learn more about the available
constructs and patterns. Most of _rdom_ only deals with either subscribing to
reactive values and/or wrapping/transforming existing subscriptions, either
explicitly using the provided control components (e.g.
[`$sub()`](https://docs.thi.ng/umbrella/rdom/functions/_sub.html)) or using
[`$compile()`](https://docs.thi.ng/umbrella/rdom/functions/_compile.html) to
auto-wrap such values embedded in an hiccup tree.

### @thi.ng/atom integration

For the sake of deduplication of functionality and to keep the number of
dependencies to a minimum, direct
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)
integration has been removed in favor of using relevant
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
constructs, which can be used as lightweight adapters, i.e.:

- [`fromAtom()`](https://docs.thi.ng/umbrella/rstream/functions/fromAtom.html)
- [`fromObject()`](https://docs.thi.ng/umbrella/rstream/functions/fromObject.html)
- [`fromView()`](https://docs.thi.ng/umbrella/rstream/functions/fromView.html)

## DOM creation & mutation

The package provides many functions to simplify the creation of individual or
entire trees of DOM elements and to manipulate them at a later time. The single
most important function of the package is
[$compile](https://docs.thi.ng/umbrella/rdom/functions/_compile.html). It acts
as a facade for many of these other functions and creates an actual DOM from a
given hiccup component tree. It also automatically wraps any reactive values
contained therein.

**All of these functions are also usable, even if you don't intend to use any
other package features!**

- [$addChild](https://docs.thi.ng/umbrella/rdom/functions/_addChild.html)
- [$attribs](https://docs.thi.ng/umbrella/rdom/functions/_attribs.html)
- [$clear](https://docs.thi.ng/umbrella/rdom/functions/_clear.html)
- [$comment](https://docs.thi.ng/umbrella/rdom/functions/_comment.html)
- [$el](https://docs.thi.ng/umbrella/rdom/functions/_el.html)
- [$html](https://docs.thi.ng/umbrella/rdom/functions/_html.html)
- [$moveTo](https://docs.thi.ng/umbrella/rdom/functions/_moveTo.html)
- [$remove](https://docs.thi.ng/umbrella/rdom/functions/_remove.html)
- [$style](https://docs.thi.ng/umbrella/rdom/functions/_style.html)
- [$text](https://docs.thi.ng/umbrella/rdom/functions/_text.html)
- [$tree](https://docs.thi.ng/umbrella/rdom/functions/_tree.html)

## Control structures

For more advanced usage, rdom provides a range of control structures (container
components) to simplify the handling of reactive states and reduce boilerplate
for the implementation of common UI structures (e.g. item lists of any kind).

The following links lead to the documentation of these wrappers, incl. small
code examples:

- [$klist](https://docs.thi.ng/umbrella/rdom/functions/_klist.html)
- [$list](https://docs.thi.ng/umbrella/rdom/functions/_list.html)
- [$lazy](https://docs.thi.ng/umbrella/rdom/functions/_lazy.html)
- [$object](https://docs.thi.ng/umbrella/rdom/functions/_object-1.html)
- [$promise](https://docs.thi.ng/umbrella/rdom/functions/_promise-1.html)
- [$refresh](https://docs.thi.ng/umbrella/rdom/functions/_refresh.html)
- [$replace](https://docs.thi.ng/umbrella/rdom/functions/_replace.html)
- [$sub](https://docs.thi.ng/umbrella/rdom/functions/_sub-1.html)
- [$subObject](https://docs.thi.ng/umbrella/rdom/functions/_subObject.html)
- [$switch](https://docs.thi.ng/umbrella/rdom/functions/_switch.html)
- [$wrapEl](https://docs.thi.ng/umbrella/rdom/functions/_wrapEl.html)
- [$wrapHtml](https://docs.thi.ng/umbrella/rdom/functions/_wrapHtml.html)
- [$wrapText](https://docs.thi.ng/umbrella/rdom/functions/_wrapText.html)

### Event handlers for reactive streams

Reactive rdom component are based on
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
subscriptions. In order to create a feedback loop between those reactive state
values and their subscribed UI components, input event handlers need to feed any
user changes back to those reactive state(s). To reduce boilerplate for these
tasks, the following higher order input event handlers are provided:

- [$input](https://docs.thi.ng/umbrella/rdom/functions/_input.html)
- [$inputCheckbox](https://docs.thi.ng/umbrella/rdom/functions/_inputCheckbox.html)
- [$inputFile](https://docs.thi.ng/umbrella/rdom/functions/_inputFile.html)
- [$inputFiles](https://docs.thi.ng/umbrella/rdom/functions/_inputFiles.html)
- [$inputNum](https://docs.thi.ng/umbrella/rdom/functions/_inputNum.html)
- [$inputTrigger](https://docs.thi.ng/umbrella/rdom/functions/_inputTrigger.html)

```ts
import { $compile, $input } from "@thi.ng/rdom";
import { reactive, trace } from "@thi.ng/rstream";

// reactive value/state w/ transformation
const name = reactive("").map((x) => x.toUpperCase());

// reactive text field for `name`
$compile(["input", {
    type: "text",
    // any value changes are fed back into `name`, which in return
    // triggers an update of this (and any other) subscription
    oninput: $input(name),
    value: name
}]).mount(document.body);

// addtional subscription for debug console output
name.subscribe(trace("name:"));
```

Click counter:

```ts
import { $compile, $inputTrigger } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { count, scan } from "@thi.ng/transducers";

// reactive value/stream setup
const clicks = reactive(true);

// button component with reactive label showing click count
$compile([
    "button",
    // $inputTrigger merely emits `true` onto the given reactive stream
    { onclick: $inputTrigger(clicks) },
    "clicks: ",
    // using transducers to transform click stream into a counter
    clicks.transform(scan(count(-1))),
]).mount(document.body);
```

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brdom%5D+in%3Atitle)

## Support packages

- [@thi.ng/rdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-canvas) - [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) component wrapper for [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) and declarative canvas drawing
- [@thi.ng/rdom-components](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-components) - Collection of unstyled, customizable components for [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)
- [@thi.ng/rdom-forms](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-forms) - Data-driven declarative & extensible HTML form generation

## Related packages

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) - HTML/SVG/XML serialization of nested data structures, iterables & closures
- [@thi.ng/hiccup-html](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html) - 100+ type-checked HTML5 element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) related infrastructure
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & related tooling
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers) - Lightweight transducer implementations for ES6 / TypeScript

## Installation

```bash
yarn add @thi.ng/rdom
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rdom"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const rdom = await import("@thi.ng/rdom");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.99 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/prefixes](https://github.com/thi-ng/umbrella/tree/develop/packages/prefixes)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                 | Description                                                                                             | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/big-font.png" width="240"/>            | Large ASCII font text generator using @thi.ng/rdom                                                      | [Demo](https://demo.thi.ng/umbrella/big-font/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/big-font)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/blurhash.jpg" width="240"/>            | Interactive & reactive image blurhash generator                                                         | [Demo](https://demo.thi.ng/umbrella/blurhash/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/blurhash)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/canvas-recorder.png" width="240"/>     | Self-modifying, animated typographic grid with emergent complex patterns                                | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/canvas-recorder)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-themes.png" width="240"/>        | Probabilistic color theme generator                                                                     | [Demo](https://demo.thi.ng/umbrella/color-themes/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-themes)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>     | Color palette generation via dominant color extraction from uploaded images                             | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ellipse-proximity.png" width="240"/>   | Interactive visualization of closest points on ellipses                                                 | [Demo](https://demo.thi.ng/umbrella/ellipse-proximity/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ellipse-proximity)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fiber-basics.png" width="240"/>        | Fiber-based cooperative multitasking basics                                                             | [Demo](https://demo.thi.ng/umbrella/fiber-basics/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fiber-basics)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/layout-gridgen.png" width="240"/>      | Randomized space-filling, nested grid layout generator                                                  | [Demo](https://demo.thi.ng/umbrella/layout-gridgen/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/layout-gridgen)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/lispy-repl.png" width="240"/>          | Browser REPL for a Lispy S-expression based mini language                                               | [Demo](https://demo.thi.ng/umbrella/lispy-repl/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/lispy-repl)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mastodon-feed.jpg" width="240"/>       | Mastodon API feed reader with support for different media types, fullscreen media modal, HTML rewriting | [Demo](https://demo.thi.ng/umbrella/mastodon-feed/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mastodon-feed)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/meta-css-basics.png" width="240"/>     | Basic thi.ng/meta-css usage & testbed                                                                   | [Demo](https://demo.thi.ng/umbrella/meta-css-basics/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/meta-css-basics)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>    | Parser grammar livecoding editor/playground & codegen                                                   | [Demo](https://demo.thi.ng/umbrella/parse-playground/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-colormatrix.jpg" width="240"/>   | Matrix-based image color adjustments                                                                    | [Demo](https://demo.thi.ng/umbrella/pixel-colormatrix/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-colormatrix)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-gradients.jpg" width="240"/>     | Randomized 4-point 2D color gradient image generator                                                    | [Demo](https://demo.thi.ng/umbrella/pixel-gradients/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-gradients)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>       | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel                                        | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-waveform.jpg" width="240"/>      | RGB waveform image analysis                                                                             | [Demo](https://demo.thi.ng/umbrella/pixel-waveform/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-waveform)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pointfree-geom.jpg" width="240"/>      | Live coding playground for 2D geometry generation using @thi.ng/pointfree-lang                          | [Demo](https://demo.thi.ng/umbrella/pointfree-geom/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pointfree-geom)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-subdiv.jpg" width="240"/>         | Animated, iterative polygon subdivisions & visualization                                                | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-subdiv)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/procedural-text.jpg" width="240"/>     | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation                | [Demo](https://demo.thi.ng/umbrella/procedural-text/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/procedural-text)     |
|                                                                                                                            | Demonstates various rdom usage patterns                                                                 | [Demo](https://demo.thi.ng/umbrella/rdom-basics/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-basics)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-delayed-update.jpg" width="240"/> | Dynamically loaded images w/ preloader state                                                            | [Demo](https://demo.thi.ng/umbrella/rdom-delayed-update/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-delayed-update) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-dnd.png" width="240"/>            | rdom drag & drop example                                                                                | [Demo](https://demo.thi.ng/umbrella/rdom-dnd/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-dnd)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-formgen.jpg" width="240"/>        | Basic usage of the declarative rdom-forms generator                                                     | [Demo](https://demo.thi.ng/umbrella/rdom-formgen/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-formgen)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-key-sequences.jpg" width="240"/>  | rstream & transducer-based FSM for converting key event sequences into high-level commands              | [Demo](https://demo.thi.ng/umbrella/rdom-key-sequences/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-key-sequences)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lazy-load.png" width="240"/>      | Lazy loading components via @thi.ng/rdom                                                                | [Demo](https://demo.thi.ng/umbrella/rdom-lazy-load/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lazy-load)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lissajous.png" width="240"/>      | rdom & hiccup-canvas interop test                                                                       | [Demo](https://demo.thi.ng/umbrella/rdom-lissajous/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lissajous)      |
|                                                                                                                            | Full umbrella repo doc string search w/ paginated results                                               | [Demo](https://demo.thi.ng/umbrella/rdom-search-docs/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-search-docs)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-svg-nodes.png" width="240"/>      | rdom powered SVG graph with draggable nodes                                                             | [Demo](https://demo.thi.ng/umbrella/rdom-svg-nodes/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-svg-nodes)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/related-images.jpg" width="240"/>      | Responsive image gallery with tag-based Jaccard similarity ranking                                      | [Demo](https://demo.thi.ng/umbrella/related-images/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/related-images)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/render-audio.png" width="240"/>        | Generative audio synth offline renderer and WAV file export                                             | [Demo](https://demo.thi.ng/umbrella/render-audio/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/render-audio)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-sync.png" width="240"/>        | Minimal rstream sync() example using rdom                                                               | [Demo](https://demo.thi.ng/umbrella/rstream-sync/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-sync)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-system-bus.png" width="240"/>  | Declarative component-based system with central rstream-based pubsub event bus                          | [Demo](https://demo.thi.ng/umbrella/rstream-system-bus/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-system-bus)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/stacked-layout.png" width="240"/>      | Responsive & reactively computed stacked column layout                                                  | [Demo](https://demo.thi.ng/umbrella/stacked-layout/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/stacked-layout)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-resample.png" width="240"/>        | SVG path parsing & dynamic resampling                                                                   | [Demo](https://demo.thi.ng/umbrella/svg-resample/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-resample)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>        | Multi-layer vectorization & dithering of bitmap images                                                  | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/> | rdom & WebGL-based image channel editor                                                                 | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-channel-mixer) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rdom/)

TODO

Currently, documentation only exists in the form of small examples and various
doc strings (incomplete). I'm working to alleviate this situation ASAP... In
that respect, PRs are welcome as well!

### Basic usage

```ts
import { $compile } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { cycle, map } from "@thi.ng/transducers";

// reactive value
const bg = reactive("gray");

// color options (infinite iterable)
const colors = cycle(["magenta", "yellow", "cyan"]);

// event handler
const nextColor = () => bg.next(<string>colors.next().value);

// define component tree in hiccup syntax, compile & mount component.
// each time `bg` value changes, only subscribed bits will be updated
// i.e. title, the button's `style.background` and its label

// Note: instead of direct hiccup syntax, you could also use the
// element functions provided by https://thi.ng/hiccup-html
$compile([
    "div",
    {},
    // transformed color as title (aka derived view)
    ["h1", {}, bg.map((col) => `Hello, ${col}!`)],
    [
        // tag with Emmet-style ID & classes
        "button#foo.w4.pa3.bn",
        {
            // reactive CSS background property
            style: { background: bg },
            onclick: nextColor,
        },
        // reactive button label
        bg,
    ],
]).mount(document.body);
```

### Lists

See [`$list`](https://docs.thi.ng/umbrella/rdom/functions/_list.html) and
[`$klist`](https://docs.thi.ng/umbrella/rdom/functions/_klist.html) docs for
further information...

```ts
import { $klist } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";

const items = reactive([
    { id: "a", val: 1 },
    { id: "b", val: 2 },
    { id: "c", val: 3 },
]);

$klist(
    // reactive data source (any rstream subscribable)
    items,
    // outer list element & attribs
    "ul",
    { class: "list red" },
    // list item component constructor
    (x) => ["li", {}, x.id, ` (${x.val})`],
    // key function (includes)
    (x) => `${x.id}-${x.val}`
).mount(document.body);

// update list:
// - item a will be removed
// - item b is unchanged
// - item d will be newly inserted
// - item c will be updated (due to new value)
setTimeout(
    () => {
        items.next([
            { id: "b", val: 2 },
            { id: "d", val: 4 },
            { id: "c", val: 30 },
        ]);
    },
    1000
);
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rdom,
  title = "@thi.ng/rdom",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rdom",
  year = 2020
}
```

## License

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
