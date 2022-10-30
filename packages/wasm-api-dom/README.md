<!-- This file is generated - DO NOT EDIT! -->

# ![wasm-api-dom](https://media.thi.ng/umbrella/banners-20220914/thing-wasm-api-dom.svg?2d6e3998)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api-dom.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api-dom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api-dom.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [ID handles](#id-handles)
  - [DOM tree creation](#dom-tree-creation)
  - [Event listeners](#event-listeners)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
  - [Maintainer](#maintainer)
  - [Contributors](#contributors)
- [License](#license)

## About

Browser DOM bridge API for hybrid TypeScript & Zig applications. This is a support package for [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api).

This package provides a minimal, but already quite usable TypeScript core API
and related [Ziglang](https://ziglang.org) bindings for UI & DOM
creation/manipulation via WebAssembly.

Current key features for the Zig (WASM) side:

- ID handle management for WASM created DOM elements & listeners
- Declarative & imperative DOM tree creation
- Canvas element creation (with HDPI support, see [@thi.ng/adapt-dpi]())
- Attribute setters/getters (string, numeric, boolean)
- `.innerHTML` & `.innerText` setters
- Event handlers, event types (see generated types in [api.zig](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/api.zig) for details):
	- drag 'n drop (WIP)
	- focus
	- input
    - key
    - mouse
    - pointer
    - scroll
    - touch
    - wheel
- Fullscreen API wrapper
- (Browser) window info queries

### ID handles

Since DOM related resources created on the JS side cannot be returned to the
WASM module directly, the bridge API caches those on the host side and uses
managed ID (integer) handles to exchange them. These IDs can then be used in
subsequent API calls to refer to certain DOM elements, listeners etc.

For element & event related functionality the following IDs are reserved:

- `-1` the browser `window` itself
- `0` `document.head`
- `1` `document.body`

All are exposed in the Zig module as `window`, `head`, `body` constants to help
avoiding magic numbers in userland code.

### DOM tree creation

Single DOM elements and entire element trees can be created via the
`createElement()` function:

```zig
const dom = @import("wasmdom");

const handle = dom.createElement(&.{
	// element tag
	.tag = "div",
	// CSS classes
	.class = "bg-red white",
	// parent element ID (here `document.body`)
	.parent = dom.body,
	// optional child element specs
	.children = &.{
		.{
			.tag = "h1",
			// text content for this element
			.text = "OMG, it works!",
			// nested childen
			.children = &.{
				.{
					.tag = "span",
					.text = "(recursive DOM creation FTW!)",
					.class = "bg-yellow black",
				},
			},
		},
	},
});
```

The
[CreateElementOpts](https://docs.thi.ng/umbrella/wasm-api-dom/interfaces/CreateElementOpts.html)
struct has some additional options and more are planned. All WIP!

### Event listeners

Once a DOM element has been created, event listeners can be attached to it. All
listeners take two arguments: an `Event` struct and an optional opaque pointer
for passing arbitrary user context.

This small Zig example defines a click counter button component:

```zig
const wasm = @import("wasmapi");
const dom = @import("wasmdom");

/// Simple click counter component
const Counter = struct {
	/// element ID
    el: i32,
	/// listener ID
    listener: u16,
	/// click counter
    clicks: usize,

    const Self = @This();

	/// Create & setup DOM element w/ listener
    pub fn init(self: *Self, parent: i32) !void {
        self.clicks = 0;
		// create DOM button element
        self.el = dom.createElement(&.{
            .tag = "button",
            .text = "click me!",
            .parent = parent,
        });
		// add click event listener w/ user context arg
        self.listener = try dom.addListener(self.el, "click", &.{
            .callback = onClick,
            .ctx = self,
        });
    }

	/// Event listener & state update
    fn onClick(_: *const dom.Event, raw: ?*anyopaque) void {
		// safely cast raw pointer
        if (wasm.ptrCast(*Self, raw)) |self| {
            self.clicks += 1;
			// format new button label
            var buf: [16]u8 = undefined;
            var label = std.fmt.bufPrint(&buf, "clicks: {d}", .{self.clicks}) catch return;
			// update DOM element
            dom.setInnerText(self.el, label);
        }
    }
};

var counter: Counter = undefined;

export fn start() void {
	// instantiate counter
	counter.init(dom.body) catch |e| @panic(@errorName(e));
}
```

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api-dom%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/wasm-api-dom
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/wasm-api-dom"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const wasmApiDom = await import("@thi.ng/wasm-api-dom");
```

Package sizes (gzipped, pre-treeshake): ESM: 3.88 KB

## Dependencies

- [@thi.ng/adapt-dpi](https://github.com/thi-ng/umbrella/tree/develop/packages/adapt-dpi)
- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                        | Description                                 | Live demo                                        | Source                                                                        |
|:------------------------------------------------------------------------------------------------------------------|:--------------------------------------------|:-------------------------------------------------|:------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-canvas.png" width="240"/> | Zig-based DOM creation & canvas drawing app | [Demo](https://demo.thi.ng/umbrella/zig-canvas/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-canvas) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/wasm-api-dom/)

For now, please see the [package
docs](https://docs.thi.ng/umbrella/wasm-api-dom/), source code comments
([TS](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/src/)
&
[Zig](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/zig/))
and the various comments in the [zig-canvas example
project](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-canvas)
for further reference and usage patterns! Thank you!

## Authors

### Maintainer

- Karsten Schmidt ([@postspectacular](https://github.com/postspectacular))

### Contributors

- Marcus Wågberg ([@MarcusWagberg](https://github.com/MarcusWagberg))

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-wasm-api-dom,
  title = "@thi.ng/wasm-api-dom",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/wasm-api-dom",
  year = 2022
}
```

## License

&copy; 2022 Karsten Schmidt // Apache Software License 2.0
