<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

The package provides a WASM bridge API and abstraction for scheduling function
calls via:

- **once**: `setTimeout()` / `clearTimeout()`
- **interval**: `setInterval()` / `clearInterval()`
- **immediate**: `setImmediate()` / `clearImmediate()`

These different types of delayed execution are unified into the single
`schedule()` function and the `TimerType` enum. Scheduled callbacks can be
cancelled via `cancel()`...

Zig example:

```zig
const wasm = @import("wasm-api");
const schedule = @import("wasm-api-schedule");

// ...

// the WASM API modules auto-initialize themselves if the root source
// file exposes a `WASM_ALLOCATOR`, otherwise you'll have to initialize manually:
try schedule.init(customAllocator);

// user callback function
fn exampleCallback(raw: ?*anyopaque) void {
    if (wasm.ptrCast(*u32, raw)) |state| {
        // do something ...
    }
}

// arbitrary user state
var state: u32 = 0xdecafbad;

// schedule a single/one-off callback 500ms in the future
const listenerID = try schedule.schedule(
    .once,
    500,
    exampleCallback,
    &state,
);

// ...or maybe cancel it again
schedule.cancel(listenerID);
```

Also see the
[zig-counter](https://github.com/thi-ng/umbrella/blob/develop/examples/zig-counter/)
and
[zig-todo-list](https://github.com/thi-ng/umbrella/blob/develop/examples/zig-todo-list/)
example projects for more advanced usage...

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

TODO

<!-- include ../../assets/tpl/footer.md -->
