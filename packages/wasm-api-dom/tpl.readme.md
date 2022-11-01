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
- Canvas element creation (with HDPI support, see
  [@thi.ng/adapt-dpi](https://github.com/thi-ng/umbrella/blob/develop/packages/adapt-dpi))
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

### Module initialization

Before the Zig WASM API module can be used, it must be initialized with a
standard `std.mem.Allocator`. The currently recommended pattern looks something
like this:

```zig
const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// allocator, also exposed & used by JS-side WasmBridge & DOM module
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/events.zig
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
pub const WASM_ALLOCATOR = gpa.allocator();

/// Since various initialization functions can return errors
/// we're bundling them all in a single fn, which is then called by start()
/// and so only needs one code site for error handling
fn init() !void {
    // the DOM API module must always be intialized first!
    try dom.init(WASM_ALLOCATOR);
    // ...
}

/// Main entry point
export fn start() void {
    init() catch |e| @panic(@errorName(e));
}
```

### ID handles

Since DOM related resources created on the JS side cannot be returned to the
WASM module directly, the bridge API caches those on the host side and [uses
managed ID (integer)
handles](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/README.md#object-indices--handles)
to exchange them. These IDs can then be used in subsequent API calls to refer to
certain DOM elements, listeners etc.

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

### Attribute creation & accessors

Attributes can be provided as part of the `CreateElementOpts` and/or accessed imperatively:

```zig
// creating & configuring an <input type="range"> element
_ = dom.createElement(&.{
    .tag = "input",
    .parent = toolbar,
    .attribs = &.{
        dom.Attrib.string("type", "range"),
        dom.Attrib.number("min", 0),
        dom.Attrib.number("max", 100),
        dom.Attrib.number("step", 10),
        dom.Attrib.number("value", 20),
    },
});
```

The following accessors are provided (see
[/zig/lib.zig](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/lib.zig)
for documentation):

- `getStringAttrib()` / `setStringAttrib()`
- `getNumericAttrib()` / `setNumericAttrib()`
- `getBooleanAttrib()` / `setBooleanAttrib()`

### Event listeners

Once a DOM element has been created, event listeners can be attached to it. All
listeners take two arguments: an `Event` struct and an optional opaque pointer
for passing arbitrary user context.

A more advanced version of the following click counter button component (written
in Zig) can be seen in action in the
[zig-counter](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-counter)
example project.

```zig
const wasm = @import("wasmapi");
const dom = @import("wasmdom");

/// Simple click counter component
const Counter = struct {
    listener: dom.EventListener,
    elementID: i32,
    listenerID: u16,
    clicks: usize,
    step: usize,

    const Self = @This();

    /// Initialize internal state & DOM element w/ listener
    pub fn init(self: *Self, parent: i32, step: usize) !void {
        self.clicks = 0;
        self.step = step;
        // create DOM button element
        self.elementID = dom.createElement(&.{
            .tag = "button",
            .class = "db w5 ma2 tc",
            .text = "click me!",
            .parent = parent,
        });
        // define & add click event listener w/ user context arg
        self.listener = .{ .callback = onClick, .ctx = self };
        self.listenerID = try dom.addListener(self.elementID, "click", &self.listener);
    }

    fn update(self: *const Self) void {
        // format new button label
        var buf: [32]u8 = undefined;
        var label = std.fmt.bufPrint(&buf, "clicks: {d:0>4}", .{self.clicks}) catch return;
        // update DOM element
        dom.setInnerText(self.elementID, label);
    }

    /// event listener & state update
    fn onClick(_: *const dom.Event, raw: ?*anyopaque) void {
        // safely cast raw pointer
        if (wasm.ptrCast(*Self, raw)) |self| {
            self.clicks += self.step;
            self.update();
        }
    }
};
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
