# @thi.ng/imgui

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/imgui.svg)](https://www.npmjs.com/package/@thi.ng/imgui)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/imgui.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Current features](#current-features)
    - [Available components / widgets](#available-components--widgets)
    - [State handling](#state-handling)
    - [Layout support](#layout-support)
    - [Key controls](#key-controls)
    - [Current limitations](#current-limitations)
    - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png)

Currently still somewhat bare-bones, but already usable & customizable [immediate
mode GUI](https://github.com/ocornut/imgui#references) implementation,
primarily for
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-canvas)
and
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl),
however with no direct dependency on either and only outputting data structures.

IMGUI components are largely ephemeral and expressed as simple
functions, producing a visual representation of a user state value.
IMGUIs are reconstructed from scratch each frame and don't exist
otherwise (apart from some rudimentary input state & config). If a
component's function isn't called again, it won't exist in the next
frame shown to the user. Components only return a new value if an user
interaction produced a change. Additionally, each component produces a
number of shapes & text labels, all of which are collected internally
and are, from the user's POV, a mere side effect. At the end of the
update cycle IMGUI produces a tree of
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-canvas)
compatible elements, which can be easily converted into other formats
(incl. SVG).

*Note: The WebGL conversion still in the early stages and not yet
published, pending ongoing development in other packages...*

### Current features

- No direct user state mutation (unlike most other IMGUI impls)
- Flexible & nestable grid layout with support for cell-spans
- Theme stack for scoped theme switches / overrides
- Stack for scoped disabled GUI elements & to create modals
- Hashing & caching of component local state & draws shapes / resources
- Hover-based mouse cursor overrides
- Hover tooltips
- Re-usable hover & activation behaviors (for creating new components)
- Fully keyboard controllable & Tab-focus switching / highlighting
- All built-in components based on
  [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/master/packages/geom)
  shape primitives

### Available components / widgets

The above screenshot shows most of the currently available components:

- Push button (horizontal / vertical)
- Icon button (w/ opt text label)
- 2x dial types & dial groups (h / v)
- Dropdown
- Radial menu
- Radio button group (h / v)
- Slider  & slider groups (h / v)
- Text input (single line, filtered input)
- Text label
- Toggle button
- XY pad

All components are:

- Skinnable (via theme)
- Keyboard controllable (incl. focus switching)
- Support tooltips

### State handling

All built-in components only return a result value if the component was
interacted with and would result in a state change (i.e. a slider has
been dragged or button pressed). So, unlike the traditional IMGUI
pattern (esp. in languages with pointer support), none of the components
here directly manipulate user state and this task is left entirely to
the user. This results in somewhat *slightly* more verbose code, but
offers complete freedom WRT how user state is & can be organized. Also,
things like undo / redo become easier to handle this way.

```ts
// example state (see @thi.ng/atom)
const STATE = new History(new Atom({ foo: true }));

...
// get atom snapshot
const curr = STATE.deref();

// toggle component will only return result if user clicked it
let res = toggle(gui, layout, "foo", curr.foo, false, curr.foo ? "ON" : "OFF");
// conditional immutable update (w/ automatic undo snapshot)
res !== undefined && STATE.resetIn("foo", res);
```

### Layout support

Most component functions exist in two versions: Using a layout manager
or not (`Raw` suffix, e.g. `buttonRaw`). The latter versions are more
"low-level" & verbose to use, but offer complete layout freedom and are
re-used by other component types.

Currently, this package features only a single grid layout type, but
components are not hard-coded to require it, and those which do need a
layout manager only expect a `ILayout` or `IGridLayout` interface,
allowing for custom implementations. Furthermore / alternatively, we
also define a simple [`LayoutBox`
interface](https://github.com/thi-ng/umbrella/tree/master/packages/imgui/src/api.ts),
which can be passed instead and too is what `ILayout` implementations
are expected to produce when allocating space for a component.

The `GridLayout` class supports infinite nesting and column/row-based
space allocation, based on an initial configuration and supporting
multiple column/row spans.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-layout.png)

The code producing this structure:

```ts
// create a single column layout @ position 10,10 / 200px wide
// the last values are row height and cell spacing
const layout = gridLayout(10, 10, 200, 1, 16, 4);

// get next layout box (1st row)
// usually you don't need to call .next() manually, but merely pass
// the layout instance to a component...
layout.next();
// { x: 10, y: 10, w: 200, h: 16, cw: 200, ch: 16, gap: 4 }

// 2nd row
layout.next();
// { x: 10, y: 30, w: 200, h: 16, cw: 200, ch: 16, gap: 4 }

// create nested 2-column layout (3rd row)
const twoCols = layout.nest(2);

twoCols.next();
// { x: 10, y: 50, w: 98, h: 16, cw: 98, ch: 16, gap: 4 }

twoCols.next();
// { x: 112, y: 50, w: 98, h: 16, cw: 98, ch: 16, gap: 4 }

// now nest 3-columns in the 1st column of twoCols
// (i.e. now each column is 1/6th of the main layout's width)
const inner = twoCols.nest(3);

// allocate with col/rowspan, here 1 column x 4 rows
inner.next([1, 4])
// { x: 10, y: 70, w: 30, h: 76, cw: 30, ch: 16, gap: 4 }
inner.next([1, 4])
// { x: 44, y: 70, w: 30, h: 76, cw: 30, ch: 16, gap: 4 }
inner.next([1, 4])
// { x: 78, y: 70, w: 30, h: 76, cw: 30, ch: 16, gap: 4 }

// back to twoCols (2nd column)
twoCols.next([1, 2]);
// { x: 112, y: 70, w: 98, h: 36, cw: 98, ch: 16, gap: 4 }
```

### Key controls

The entire UI is fully keyboard controllable, built-in behaviors:

| Keys                        | Scope            | Description                   |
|-----------------------------|------------------|-------------------------------|
| `Tab` / `Shift+Tab`         | Global           | Switch focus                  |
| `Enter` / `Space`           | Global           | Activate focused button       |
| `Up` / `Down` or drag mouse | Slider, Dial, XY | Adjust value                  |
| `Shift+Up/Down`             | Slider, Dial, XY | Adjust value (5x step)        |
| `Left/Right`                | Radial menu      | Navigate menu CW/CCW          |
| `Left/Right`                | Textfield        | Move cursor to prev/next word |
| `Left/Right`                | XY               | Adjust X value                |
| `Alt+Left/Right`            | Textfield        | Move cursor to prev/next word |

More complex behaviors can be achieved in user land. E.g. in the
[demo](https://github.com/thi-ng/umbrella/tree/master/examples/imgui/),
holding down `Alt` whilst adjusting a slider or dial group will set all
values uniformly...

### Current limitations

Some of the most obvious missing features:

- [ ] variable width font support (currently monospace only)
- [ ] more granular theme options
- [ ] theme-aware layouting (font size, padding etc.)
- [ ] image / texture support (Tex ID abstraction)
- [ ] windows / element containers
- [ ] menu / tree components
- [ ] scrolling / clipping
- [ ] drag & drop

### Status

WIP - Alpha. *hic sunt dracones etc.*

## Installation

```bash
yarn add @thi.ng/imgui
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/master/packages/geom)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Documented WIP demo GUI with undo/redo, on-demand updates and showcasing
all available components (see above screenshot):

[Live demo](http://demo.thi.ng/umbrella/imgui/) | [Source
code](https://github.com/thi-ng/umbrella/tree/master/examples/imgui/)

```ts
import * as imgui from "@thi.ng/imgui";
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
