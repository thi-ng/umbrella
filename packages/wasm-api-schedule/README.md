<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/wasm-api-schedule](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-wasm-api-schedule.svg?a0090c2a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api-schedule.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api-schedule)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api-schedule.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 205 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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
- **immediate**: `setImmediate()` / `clearImmediate()`<sup>(1)</sup>
- **raf**: `requestAnimationFrame()` / `cancelAnimationFrame()`<sup>(1)</sup>

<sup>(1)</sup> Fallback provided in case the JS host env has no native support

These different types of delayed execution are unified into the single
`schedule()` function and the `ScheduleType` enum. Scheduled callbacks can be
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
fn exampleCallback(raw: ?*anyopaque) callconv(.C) void {
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

**IMPORTANT: In Zig v0.12+ all event handlers must explicitly specify
`callconv(.C)`** [See docs for more
reference](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/FuncPointer.html).

Also see the
[zig-counter](https://github.com/thi-ng/umbrella/blob/develop/examples/zig-counter/)
and
[zig-todo-list](https://github.com/thi-ng/umbrella/blob/develop/examples/zig-todo-list/)
example projects for more advanced usage...

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api-schedule%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/wasm-api-schedule
```

ESM import:

```ts
import * as was from "@thi.ng/wasm-api-schedule";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/wasm-api-schedule"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 561 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Three projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                           | Description                                                        | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-counter.png" width="240"/>   | Simple Zig/WASM click counter DOM component                        | [Demo](https://demo.thi.ng/umbrella/zig-counter/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-counter)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-todo-list.png" width="240"/> | Zig-based To-Do list, DOM creation, local storage task persistence | [Demo](https://demo.thi.ng/umbrella/zig-todo-list/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-todo-list) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-webgl.avif" width="240"/>    | Basic Zig/WebAssembly WebGL demo                                   | [Demo](https://demo.thi.ng/umbrella/zig-webgl/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-webgl)     |

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

&copy; 2022 - 2025 Karsten Schmidt // Apache License 2.0
