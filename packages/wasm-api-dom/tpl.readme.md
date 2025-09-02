<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides a small TypeScript core API
and related [Ziglang](https://ziglang.org) bindings for UI & DOM
creation/manipulation via WebAssembly.

Current key features for the Zig (WASM) side:

- Fully declarative or imperative DOM tree creation & manipulation
- ID handle management for WASM created DOM elements & listeners
- Canvas element creation (with HDPI support, see
  [@thi.ng/adapt-dpi](https://github.com/thi-ng/umbrella/blob/develop/packages/adapt-dpi))
- Attribute setters/getters (string, numeric, boolean)
- `.innerHTML` & `.innerText` setters
- Event handlers, event types (see generated types in
  [api.zig](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/api.zig)
  for details):
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

Before the Zig WASM API module can be used, it must be initialized
(automatically or manually) with a standard `std.mem.Allocator`. The current
recommended pattern looks something like this:

```zig
const std = @import("std");
const wasm = @import("wasm-api");
const dom = @import("wasm-api-dom");

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
    // all WASM API modules auto-initialize themselves if the root source
    // file exposes a `WASM_ALLOCATOR`, otherwise you'll have to initialize manually:
    // try dom.init(customAllocator);

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

These are exposed in the Zig module as `window`, `head`, `body` constants to
help avoiding magic numbers in userland code.

### DOM tree creation

Single DOM elements and entire element trees (incl. event handler setup and
custom attributes) can be created via the `createElement()` function.

Attribute definitions need to be wrapped using `dom.attribs()` and child
elements via `dom.children()`, as shown here:

```zig
const wasm = @import("wasm-api");
const dom = @import("wasm-api-dom");

// snippet taken from the zig-todo-list example project

const handle = dom.createElement(&.{
    // element name
    .tag = "div",
    // CSS classes
    .class = "flex flex-column mb3",
    // nested child elements
    .children = dom.children(&.{
        .{ .tag = "h3", .text = "Add new task" },
        .{
            .tag = "input",
            // element's ID attribute
            .id = "newtask",
            // attribute & event listener definitions
            .attribs = dom.attribs(&.{
                dom.types.Attrib.string("placeholder", "What needs to be done?"),
                dom.types.Attrib.flag("autofocus", true),
                // event listener setup:
                // last arg is optional opaque pointer to arbitrary user state/context
                dom.types.Attrib.event("keydown", onKeydown, &STATE),
                dom.types.Attrib.event("input", onInput, null),
            }),
        },
        .{
            .tag = "button",
            // Element .innerText content
            .text = "Add Task",
            .attribs = dom.attribs(&.{
                dom.types.Attrib.event("click", onAddTask, null),
            }),
        },
    }),
});

fn onInput(e: *const dom.types.Event, _: ?*anyopaque) callconv(.C) void {
    wasm.printStr(e.body.input.getValue());
}
```

The
[CreateElementOpts](https://docs.thi.ng/umbrella/wasm-api-dom/interfaces/CreateElementOpts.html)
struct has some additional options and more are planned. All WIP!

#### HTML canvas support

A separate function (`createCanvas()`) with [similar
options](https://docs.thi.ng/umbrella/wasm-api-dom/interfaces/CreateCanvasOpts.html)
exist for `<canvas>` elements.

Also see the
[thi.ng/wasm-api-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-canvas)
sibling package for working with canvases...

### Attribute creation & accessors

As already shown above, attributes can be provided as part of the
`CreateElementOpts` and/or accessed imperatively:

Zig example:

```zig
// creating & configuring an <input type="range"> element
_ = dom.createElement(&.{
    .tag = "input",
    .parent = dom.body,
    // optional attrib declarations
    .attribs = dom.attribs(&.{
        // string attrib
        dom.types.Attrib.string("type", "range"),
        // numeric attribs
        dom.types.Attrib.number("min", 0),
        dom.types.Attrib.number("max", 100),
        dom.types.Attrib.number("step", 10),
        dom.types.Attrib.number("value", 20),
        // boolean attrib (only will be created if true)
        dom.types.Attrib.flag("disabled", true),
    }),
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

A more advanced version of the following click counter button component can be
seen in action in the
[zig-counter](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-counter)
example project. Also check other supplied Zig examples for more realworld
[usage examples](#usage-examples).

**IMPORTANT: In Zig v0.12+ all event handlers must explicitly specify
`callconv(.C)`** [See docs for more
reference](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/FuncPointer.html).

```zig
const wasm = @import("wasm-api");
const dom = @import("wasm-api-dom");

/// Simple click counter component
const Counter = struct {
    elementID: i32,
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
            // Tachyons CSS class names
            .class = "db w5 ma2 pa2 tc bn",
            .text = "click me!",
            .parent = parent,
            .attribs = dom.attribs(&.{
                // define & add click event listener w/ user context arg
                dom.types.Attrib.event("click", onClick, self),
            }),
        });
    }

    fn update(self: *const Self) void {
        // format new button label
        var buf: [32]u8 = undefined;
        var label = std.fmt.bufPrintZ(&buf, "clicks: {d:0>4}", .{self.clicks}) catch return;
        // update DOM element
        dom.setInnerText(self.elementID, label);
    }

    /// event listener & state update
    fn onClick(_: *const dom.types.Event, raw: ?*anyopaque) callconv(.C) void {
        // safely cast raw pointer
        if (wasm.ptrCast(*Self, raw)) |self| {
            self.clicks += self.step;
            self.update();
        }
    }
};
```

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

For now, please see the [package
docs](https://docs.thi.ng/umbrella/wasm-api-dom/), source code comments
([TS](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/src/)
&
[Zig](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/zig/))
and the various comments in the above linked example projects for further
reference and usage patterns! Thank you!

<!-- include ../../assets/tpl/footer.md -->
