# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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

${status}

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

For now, please see the [package
docs](https://docs.thi.ng/umbrella/wasm-api-dom/), source code comments
([TS](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/src/)
&
[Zig](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/zig/))
and the various comments in the [zig-canvas example
project](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-canvas)
for further reference and usage patterns! Thank you!

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
