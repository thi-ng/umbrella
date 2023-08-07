<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/wasm-api-schedule](https://media.thi.ng/umbrella/banners-20230807/thing-wasm-api-schedule.svg?9ad94e26)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api-schedule.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api-schedule)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api-schedule.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Delayed & scheduled function execution (via setTimeout() etc.) for hybrid WASM apps. This is a support package for [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api).

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

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api-schedule%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/wasm-api-schedule
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/wasm-api-schedule"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const wasmApiSchedule = await import("@thi.ng/wasm-api-schedule");
```

Package sizes (brotli'd, pre-treeshake): ESM: 397 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                           | Description                                                        | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-counter.png" width="240"/>   | Simple Zig/WASM click counter DOM component                        | [Demo](https://demo.thi.ng/umbrella/zig-counter/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-counter)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-todo-list.png" width="240"/> | Zig-based To-Do list, DOM creation, local storage task persistence | [Demo](https://demo.thi.ng/umbrella/zig-todo-list/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-todo-list) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/wasm-api-schedule/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-wasm-api-schedule,
  title = "@thi.ng/wasm-api-schedule",
  author = "Karsten Schmidt",
  note = "https://thi.ng/wasm-api-schedule",
  year = 2022
}
```

## License

&copy; 2022 - 2023 Karsten Schmidt // Apache License 2.0
