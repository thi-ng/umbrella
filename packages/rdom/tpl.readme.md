# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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
[`IComponent`](https://docs.thi.ng/umbrella/rdom/interfaces/icomponent.html)
(with a super simple life cycle API), a base component class
[`Component`](https://docs.thi.ng/umbrella/rdom/classes/component.html) for stubbing and a
number of fundamental control constructs & component-wrappers for composing more
complex components and to reduce boilerplate for various situations. Whilst
targetting a standard JS DOM by default, each component can decide for itself
what kind of target data structure (apart from a browser DOM) it manages. _rdom_
components themselves have **no mandatory** knowledge of a browser DOM. As an
example, similar to
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas),
the
[@thi.ng/rdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-canvas)
wrapper provides a component which subscribes to a stream of hiccup-based scene
descriptions (trees) and then translates each scene-value into HTML Canvas API
draw calls.

### Async updates, scheduling & life cycle methods

Since there's no central coordination in _rdom_ (neither explicitly nor
implicitly), each component can (and does) update whenever its state value has
changed. Likewise, components are free to directly manipulate the DOM through
other means, as hinted at earlier. Various _rdom_ control constructs are dispatching component updates via a central scheduler. By default this is only a dummy implementation which processes tasks immediately. However, as usual _rdom_ only relies on the [`IScheduler`](https://docs.thi.ng/umbrella/rdom/interfaces/ischeduler.html) interface and so supports other implementations, like [`RAFScheduler`](https://docs.thi.ng/umbrella/rdom/classes/rafscheduler.html).

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
[`$sub()`](https://docs.thi.ng/umbrella/rdom/modules.html#_sub)) or using
[`$compile()`](https://docs.thi.ng/umbrella/rdom/modules.html#$compile) to
auto-wrap such values embedded in an hiccup tree.

${status}

#### HIC SUNT DRACONES

This is still a young project. Even though most of the overall approach,
component lifecycle and API are fairly stable by now (after ~75 commits) and
used in production, so far there's only brief documentation and only few public
examples. This is being worked & improved on...

#### @thi.ng/atom integration

For the sake of deduplication of functionality and to keep the number of
dependencies to a minimum, direct
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)
integration has been removed in favor of using relevant
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
constructs, which can be used as lightweight adapters, i.e.:

- [`fromAtom()`](https://github.com/thi-ng/umbrella/blob/develop/packages/rstream/src/from/atom.ts)
- [`fromView()`](https://github.com/thi-ng/umbrella/blob/develop/packages/rstream/src/from/view.ts)

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

TODO

Currently, documentation only exists in the form of small examples and
various doc strings (incomplete). I'm working to alleviate this
situation ASAP... In that respect, PRs are welcome as well!

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
    ["h1", {}, bg.transform(map((col) => `Hello, ${col}!`))],
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

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
