<!-- This file is generated - DO NOT EDIT! -->

# ![wasm-api](https://media.thi.ng/umbrella/banners-20220914/thing-wasm-api.svg?be328da7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Data bindings & code generators](#data-bindings--code-generators)
    - [CLI generator](#cli-generator)
    - [Data type definitions](#data-type-definitions)
    - [Example usage](#example-usage)
  - [String handling](#string-handling)
  - [Memory allocations](#memory-allocations)
  - [Custom API modules](#custom-api-modules)
  - [Object indices & handles](#object-indices--handles)
- [Status](#status)
- [Support packages](#support-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Basic usage example](#basic-usage-example)
  - [Zig version](#zig-version)
  - [C11 version](#c11-version)
- [Authors](#authors)
- [License](#license)

## About

Generic, modular, extensible API bridge, polyglot glue code and bindings code generators for hybrid JS & WebAssembly projects.

This package provides a the following:

1. A small, generic and modular
[`WasmBridge`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html)
class as interop basis and much reduced boilerplate for hybrid JS/WebAssembly
applications.
2. A minimal core API for debug output, string/pointer/typedarray accessors for
8/16/32/64 bit (u)ints and 32/64 bit floats, memory allocation (optional).
Additionally, a number of support modules for [DOM
manipulation](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/),
WebGL, WebGPU, WebAudio etc. is being actively worked on.
3. [Include files for C11/C++ and
   Zig](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api/include),
   defining WASM imports of the extern JS [core
   API](https://docs.thi.ng/umbrella/wasm-api/interfaces/CoreAPI.html) defined
   by this package
4. Extensible shared datatype code generators for (currently) C11, TypeScript &
   [Zig](https://ziglang.org). The latter also generates fully type checked
   memory-mapped (zero-copy) accessors of WASM-side data. In general, all
languages with a WebAssembly target are supported, however currently only
bindings for these mentioned langs are included.
5. [CLI frontend/utility](#cli-generator) to invoke the code generator(s)

### Data bindings & code generators

The package provides an extensible codegeneration framework to simplify the
bilateral design & exchange of data structures shared between the WASM & JS host
env. Currently, code generators for TypeScript & Zig are supplied (more are
planned). A CLI wrapper is available too. See the
[@thi.ng/wasm-api-dom](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/)
support package for a more thorough realworld example...

#### CLI generator

The package includes a [small CLI
wrapper](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/src/cli.ts)
to invoke the code generator(s) from JSON type definitions and to write the
generated source code(s) to different files:

```text
$ npx @thi.ng/wasm-api

 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ @thi.ng/wasm-api 0.12.0
 █ █ █ █ █ █ █ █ █ │ Multi-language data bindings code generator
                 █ │
               █ █ │

usage: wasm-api [OPTS] JSON-INPUT-FILE(S) ...
       wasm-api --help

Flags:

-d, --debug                     enable debug output
--dry-run                       enable dry run (don't overwrite files)

Main:

-a FILE, --analytics FILE       output file path for raw codegen analytics
-c FILE, --config FILE          JSON config file with codegen options
-l ID[,..], --lang ID[,..]      [multiple] target language: "c11", "ts", "zig" (default: ["ts","zig"])
-o FILE, --out FILE             [multiple] output file path
-s TYPE, --string TYPE          Force string type implementation: "slice", "ptr"
```

By default, the CLI generates sources for TypeScript and Zig (in this order!).
Order is important, since the output file paths must be given in the same order
as the target languages. It's recommended to be explicit with this. An example
invocation looks like:

```bash
wasm-api \
  --config codegen-opts.json \
  --lang ts -o src/generated.ts \
  --lang zig -o src.zig/generated.zig \
  typedefs.json
```

The structure of the config file is as follows (all optional):

```json
{
	"global": { ... },
	"c11": { ... },
	"ts": { ... },
	"zig": { ... },
}
```

More details about possible
[`global`](https://docs.thi.ng/umbrella/wasm-api/interfaces/CodeGenOpts.html),
[`c`](https://docs.thi.ng/umbrella/wasm-api/interfaces/C11Opts.html) and
[`ts`](https://docs.thi.ng/umbrella/wasm-api/interfaces/TSOpts.html) and
[`zig`](https://docs.thi.ng/umbrella/wasm-api/interfaces/ZigOpts.html) config
options & values.

All code generators have support for custom code prologues & epilogues which can
be specified via the above options. These config options exist for both non-CLI
& CLI usage. For the latter, these custom code sections can also be loaded from
external files by specifying their file paths using `@` as prefix, e.g.

```json
{
	"ts": { "pre": "@tpl/prelude.ts" },
	"zig": { "pre": "@tpl/prelude.zig", "post": "@tpl/epilogue.zig" },
}
```

#### Data type definitions

Currently, the code generator supports enums, structs and unions. See API docs for
further details:

- [`Enum`](https://docs.thi.ng/umbrella/wasm-api/interfaces/Enum.html)
- [`EnumValue`](https://docs.thi.ng/umbrella/wasm-api/interfaces/EnumValue.html)
- [`Field`](https://docs.thi.ng/umbrella/wasm-api/interfaces/Field.html) (individual spec for values contained in structs/unions)
- [`Struct`](https://docs.thi.ng/umbrella/wasm-api/interfaces/Struct.html)
- [`Union`](https://docs.thi.ng/umbrella/wasm-api/interfaces/Union.html)
- [`TopLevelType`](https://docs.thi.ng/umbrella/wasm-api/interfaces/TopLevelType.html)

#### Example usage

The following example defines 1x enum, 2x structs and 1x union. Shown here are
the JSON type definitions and the resulting source codes:

**⬇︎ CLICK TO EXPAND EACH CODE BLOCK ⬇︎**

<details><summary>types.json (Type definitions)</summary>

```json tangle:export/readme-types.json
[
	{
		"name": "EventType",
		"type": "enum",
		"tag": "u8",
		"values": [
			"unknown",
			{ "name": "mouse", "value": 16 },
			{ "name": "key", "value": 32 }
		]
	},
	{
		"name": "MouseEvent",
		"type": "struct",
		"doc": "Example struct",
		"fields": [
			{ "name": "type", "type": "EventType" },
			{ "name": "pos", "type": "u16", "tag": "vec", "len": 2 }
		]
	},
	{
		"name": "KeyEvent",
		"type": "struct",
		"doc": "Example struct",
		"fields": [
			{ "name": "type", "type": "EventType" },
			{ "name": "key", "type": "string" },
			{ "name": "modifiers", "type": "u8", "doc": "Bitmask of modifier keys" }
		]
	},
	{
		"name": "Event",
		"type": "union",
		"fields": [
			{ "name": "mouse", "type": "MouseEvent" },
			{ "name": "key", "type": "KeyEvent" }
		]
	}
]
```
</details>

<details><summary>generated.ts (generated TypeScript source)</summary>

```ts
/**
 * Generated by @thi.ng/wasm-api at 2022-10-26T08:36:16.825Z - DO NOT EDIT!
 */

// @ts-ignore possibly includes unused imports
import { Pointer, WasmStringSlice, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export enum EventType {
	UNKNOWN,
	MOUSE = 16,
	KEY = 32,
}

/**
 * Example struct
 */
export interface MouseEvent extends WasmTypeBase {
	type: EventType;
	pos: Uint16Array;
}

export const $MouseEvent: WasmTypeConstructor<MouseEvent> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 8;
	},
	instance: (base) => {
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 8);
			},
			get type(): EventType {
				return mem.u8[base];
			},
			set type(x: EventType) {
				mem.u8[base] = x;
			},
			get pos(): Uint16Array {
				const addr = (base + 4) >>> 1;
				return mem.u16.subarray(addr, addr + 2);
			},
		};
	}
});

/**
 * Example struct
 */
export interface KeyEvent extends WasmTypeBase {
	type: EventType;
	key: WasmStringSlice;
	/**
	 * Bitmask of modifier keys
	 */
	modifiers: number;
}

export const $KeyEvent: WasmTypeConstructor<KeyEvent> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 16;
	},
	instance: (base) => {
		let $key: WasmStringSlice | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 16);
			},
			get type(): EventType {
				return mem.u8[base];
			},
			set type(x: EventType) {
				mem.u8[base] = x;
			},
			get key(): WasmStringSlice {
				return $key || ($key = new WasmStringSlice(mem, (base + 4), true));
			},
			get modifiers(): number {
				return mem.u8[(base + 12)];
			},
			set modifiers(x: number) {
				mem.u8[(base + 12)] = x;
			},
		};
	}
});

export interface Event extends WasmTypeBase {
	mouse: MouseEvent;
	key: KeyEvent;
}

export const $Event: WasmTypeConstructor<Event> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 16;
	},
	instance: (base) => {
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 16);
			},
			get mouse(): MouseEvent {
				return $MouseEvent(mem).instance(base);
			},
			set mouse(x: MouseEvent) {
				mem.u8.set(x.__bytes, base);
			},
			get key(): KeyEvent {
				return $KeyEvent(mem).instance(base);
			},
			set key(x: KeyEvent) {
				mem.u8.set(x.__bytes, base);
			},
		};
	}
});
```
</details>

<details><summary>generated.zig (generated Zig source)</summary>

```zig
//! Generated by @thi.ng/wasm-api at 2022-10-26T08:36:16.827Z - DO NOT EDIT!

const std = @import("std");

pub const EventType = enum(u8) {
    UNKNOWN,
    MOUSE = 16,
    KEY = 32,
};

/// Example struct
pub const MouseEvent = struct {
    type: EventType,
    pos: @Vector(2, u16),
};

/// Example struct
pub const KeyEvent = struct {
    type: EventType,
    key: []const u8,
    /// Bitmask of modifier keys
    modifiers: u8,
};

pub const Event = union {
    mouse: MouseEvent,
    key: KeyEvent,
};
```
</details>

On the TypeScript/JS side, the memory-mapped wrappers (e.g. `$Event`)
can be used in combination with the `WasmBridge` to obtain fully typed views
(according to the generated types) of the underlying WASM memory. Basic usage is
like:

```ts
import { WasmBridge } from "@thi.ng/wasm-api";
import { $Event, EventType } from "./generated.ts";

const bridge = new WasmBridge();
// bridge initialization omitted here (see other examples below)
// ...

// Create an instance using the bridge's memory views
// and mapping a `Event` union from given address
// (e.g. obtained from an exported WASM function/value)
const event = $Event(bridge).instance(0x10000);

// then use like normal JS object
event.mouse.pos
// Uint16Array(2) [100, 200]

// IMPORTANT: any modifications like this are directly
// applied to the underlying WASM memory...
event.mouse.pos[0] = 300;

event.mouse.type === EventType.MOUSE
// true
```

**IMPORTANT:** Field setters are currently only supported for single values,
incl. enums, strings, structs, unions. The latter 2 will always be copied by
value (mem copy). Arrays or slices of strings do not currently provide write
access...

### String handling

Most low-level languages deal with strings very differently and alas there's no
general standard. Some have UTF-8/16 support, others don't. In some languages
(incl. C & Zig), strings are stored as zero terminated, in others they aren't...
It's outside the scope of this package to provide an allround out-of-the-box
solution. The `WasmBridge` provides read & write accessors to obtain JS strings
from UTF-8 encoded WASM memory. See
[`getString()`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html#getString)
and
[`setString()`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html#setString)
for details.

The code generators too provide a global `stringType` option to
interpret the `string` type of a struct field in different ways:

- `slice` (default): Considers strings as Zig-style slices (i.e. pointer + length)
- `ptr`: Considers strings as C-style raw `*char` pointer (without any length)

Note: If setting this global option to `ptr`, it also has to be repeated for the
TypeScript code generator explicitly.

### Memory allocations

If explicitly enabled on the WASM side, the `WasmBridge` includes support for
malloc/free-style allocations (within the linear WASM memory) from the JS side
(Note: This is a breaking change in v0.10.0, now using a more flexible approach
& reverse logic of earlier alpha versions).

The actual allocator is implementation specific and suitable generic mechanisms
are defined for both the included Zig & C bindings. Please see for further
reference:

- [`/zig/wasmapi.zig`](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/wasmapi.zig#L64):
  comments about WASM-side allocator handling in Zig
- [`/include/wasmapi.h`](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/include/wasmapi.h#L18):
  comments about WASM-side allocator handling in C/C++
- [`WasmBridge.allocate()`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html#allocate):
  allocating memory from JS side
- [`WasmBridge.free()`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html#free):
  freeing previously allocated memory from JS side

Note: The provided Zig mechanism supports the idiomatic (Zig) pattern of working
with multiple allocators in different parts of the application and supports
dynamic assignments/swapping of the exposed allocator. See comments in source
file and
[tests](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api/test)
for more details...

```ts
try {
	// allocate 1KB of memory for passing a string to WASM side
	const addr = bridge.allocate(256);

	// write string to reserved memory
	// max. 256 bytes, zero terminated
	const num = bridge.setString("hello WASM world!", addr, 256, true);

	// call WASM function doing something w/ the string
	bridge.exports.doSomethingWithString(addr, num);

	// cleanup
	bridge.free(addr, 256);
} catch(e) {
	// deal with allocation error
	// ...
}
```

### Custom API modules

The
[`WasmBridge`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html)
can be extented via custom defined API modules. Such API extensions will consist
of a collection of JS/TS functions & variables, their related counterparts
(import definitions) for the WASM target and (optionally) some shared data types
([bindings for which _can_ be generated by this package
too](#data-bindings--code-generators)).

On the JS side, custom API modules can be easily integrated via the [`IWasmAPI`
interface](https://docs.thi.ng/umbrella/wasm-api/interfaces/IWasmAPI.html). The
following example provides a brief overview:

```ts
import { IWasmAPI, WasmBridge } from "@thi.ng/wasm-api";

export class CustomAPI implements IWasmAPI {
	parent!: WasmBridge;

	async init(parent: WasmBridge) {
		this.parent = parent;
		this.parent.logger.debug("initializing custom API");

		// any other tasks you might need to do...

		return true;
	}

	/**
	 * Returns object of functions to import as externals into the
	 * WASM module during instantiation. These imports are merged
	 * into a larger imports object alongside the bridge's core API...
	 */
	getImports(): WebAssembly.Imports {
		return {
			/**
			 * Writes `num` random float32 numbers from given address
			 */
			fillRandom: (addr: number, num: number) => {
				addr >>>= 2;
				while(num-- > 0) this.parent.f32[addr++] = Math.random();
			}
		};
	}
}
```

Now we can supply this custom API when creating the main WASM bridge:

```ts
export const bridge = new WasmBridge({ custom: new CustomAPI() });
```

In Zig (or any other language of your choice) we can then utilize this custom
API like so (Please also see
[tests](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api/test)
& other examples in this readme):

Bindings file / lib:

```zig
//! custom.zig - extern definitions of custom JS API

/// JS external to fill a slice w/ random values
/// Note: Each API module uses a separate import object to avoid naming clashes
/// Here we declare an external binding belonging to the "custom" import group
///
/// The bridge core API uses "wasmapi" as reserved import group name
extern "custom" fn fillRandom(addr: [*]f32, num: usize) void;
```

Main Zig file:

```zig
// Import JS core API
const js = @import("wasmapi");
const custom = @import("custom.zig");

export fn test_randomVec4() void {
	var foo = [4]f32{ 1, 2, 3, 4 };

	// print original
	js.printF32Array(foo[0..]);

	// populate foo with random numbers
	custom.fillRandom(&foo, foo.len);

	// print result
	js.printF32Array(foo[0..]);
}
```

### Object indices & handles

Since only numeric values can be exchanged between the WASM module and the JS
host, any JS native objects the WASM side might want to be working with must be
managed manually in JS. For this purpose the [`ObjectIndex`
class](https://docs.thi.ng/umbrella/wasm-api/classes/ObjectIndex.html) can be
used by API modules to handle ID generation (incl. recycling, using
[@thi.ng/idgen](https://github.com/thi-ng/umbrella/tree/develop/packages/idgen))
and the indexing of different types of JS objects/values. Only the numeric IDs
(handles) will then need to be exchanged with the WASM module...

```ts
import { ObjectIndex } from "@thi.ng/wasm-api";

const canvases = new ObjectIndex<HTMLCanvasElement>({ name: "canvas" });

// index item and assign new ID
canvases.add(document.createElement("canvas"));
// 0

// look up item by ID
canvases.get(0);
// <canvas ...>

// work w/ retrieved item
canvases.get(0).id = "foo";

// check if item for ID exists (O(1))
canvases.has(1)
// false

// by default invalid IDs throw error
canvases.get(1)
// Uncaught Error: Assertion failed: missing canvas for ID: 2

// error can be disabled via 2nd arg
canvases.get(1, false)
// undefined

// find ID using custom predicate (same failure behavior as .get())
canvases.find((x) => x.id == "bar")
// Uncaught Error: Assertion failed: given predicate matched no canvas

canvases.delete(0);
// true
```

Since v0.15.0, the supplied Zig core bindings lib also includes a
[`ManagedIndex`](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/managed-index.zig)
for similar dealings on the Zig side of the application. For example, in the
[@thi.ng/wasm-api-dom](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/)
module this is used to manage Zig event listeners.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api%5D+in%3Atitle)

## Support packages

- [@thi.ng/wasm-api-dom](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom) - Browser DOM bridge API for hybrid TypeScript & Zig applications

## Installation

```bash
yarn add @thi.ng/wasm-api
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/wasm-api"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const wasmApi = await import("@thi.ng/wasm-api");
```

Package sizes (gzipped, pre-treeshake): ESM: 6.84 KB

**IMPORTANT:** The package includes code generators for various languages which
are **not** required for just using the API bridge. Hence, the usual package
size in production will be MUCH smaller than what's stated here!

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/args](https://github.com/thi-ng/umbrella/tree/develop/packages/args)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)
- [@thi.ng/idgen](https://github.com/thi-ng/umbrella/tree/develop/packages/idgen)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                        | Description                                 | Live demo                                        | Source                                                                        |
|:------------------------------------------------------------------------------------------------------------------|:--------------------------------------------|:-------------------------------------------------|:------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-canvas.png" width="240"/> | Zig-based DOM creation & canvas drawing app | [Demo](https://demo.thi.ng/umbrella/zig-canvas/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-canvas) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/wasm-api/)

## Basic usage example

```ts
import { WasmBridge, WasmExports } from "@thi.ng/wasm-api";
import { readFileSync } from "fs";

// WASM exports from our dummy module (below)
interface App extends WasmExports {
	start: () => void;
}

(async () => {
	// new API bridge with defaults
	// (i.e. no child API modules and using console logger)
	const bridge = new WasmBridge<App>();

	// instantiate WASM module using imports provided by the bridge
	// this also initializes any bindings & bridge child APIs (if any)
	// (also accepts a fetch() `Response` as input)
	await bridge.instantiate(readFileSync("hello.wasm"));

	// call an exported WASM function
	bridge.exports.start();
})();
```

### Zig version

Requires [Zig](https://ziglang.org) to be installed:

```zig
//! Example Zig application (hello.zig)

/// import externals
/// see build command for configuration
const js = @import("wasmapi");
const std = @import("std");

// set custom memory allocator (here to disable)
pub const WASM_ALLOCATOR: ?std.mem.Allocator = null;

export fn start() void {
	js.printStr("hello world!");
}
```

The WASM binary can be built using the following command (or for more complex
scenarios add the supplied .zig file(s) to your `build.zig` and/or source
folder):

```bash
# compile WASM binary
zig build-lib \
	--pkg-begin wasmapi node_modules/@thi.ng/wasm-api/zig/wasmapi.zig --pkg-end \
	-target wasm32-freestanding \
	-O ReleaseSmall -dynamic --strip \
	hello.zig

# disassemble WASM
wasm-dis -o hello.wast hello.wasm
```

The resulting WASM:

```wasm
(module
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $none_=>_none (func))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (import "wasmapi" "_printStr" (func $fimport$0 (param i32 i32)))
 (global $global$0 (mut i32) (i32.const 1048576))
 (memory $0 17)
 (data (i32.const 1048576) "hello world!\00")
 (export "memory" (memory $0))
 (export "start" (func $0))
 (export "_wasm_allocate" (func $1))
 (export "_wasm_free" (func $2))
 (func $0
  (call $fimport$0
   (i32.const 1048576)
   (i32.const 12)
  )
 )
 (func $1 (param $0 i32) (result i32)
  (i32.const 0)
 )
 (func $2 (param $0 i32) (param $1 i32)
 )
)
```

### C11 version

Requires [Emscripten](https://emscripten.org/) to be installed:

```c
#include <wasmapi.h>

void WASM_KEEP start() {
	wasm_printStr0("hello world!");
}
```

Building the WASM module:

```bash
emcc -Os -Inode_modules/@thi.ng/wasm-api/include \
  -sERROR_ON_UNDEFINED_SYMBOLS=0 --no-entry \
  -o hello.wasm hello.c
```

Resulting WASM:

```wasm
(module
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (import "wasmapi" "_printStr0" (func $fimport$0 (param i32)))
 (global $global$0 (mut i32) (i32.const 5243936))
 (memory $0 256 256)
 (data (i32.const 1024) "hello world!")
 (table $0 2 2 funcref)
 (elem (i32.const 1) $0)
 (export "memory" (memory $0))
 (export "_wasm_allocate" (func $1))
 (export "_wasm_free" (func $2))
 (export "start" (func $3))
 (export "__indirect_function_table" (table $0))
 (export "_initialize" (func $0))
 (export "__errno_location" (func $7))
 (export "stackSave" (func $4))
 (export "stackRestore" (func $5))
 (export "stackAlloc" (func $6))
 (func $0
  (nop)
 )
 (func $1 (param $0 i32) (result i32)
  (i32.const 0)
 )
 (func $2 (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $3
  (call $fimport$0
   (i32.const 1024)
  )
 )
 (func $4 (result i32)
  (global.get $global$0)
 )
 (func $5 (param $0 i32)
  (global.set $global$0
   (local.get $0)
  )
 )
 (func $6 (param $0 i32) (result i32)
  (global.set $global$0
   (local.tee $0
    (i32.and
     (i32.sub
      (global.get $global$0)
      (local.get $0)
     )
     (i32.const -16)
    )
   )
  )
  (local.get $0)
 )
 (func $7 (result i32)
  (i32.const 1040)
 )
)
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-wasm-api,
  title = "@thi.ng/wasm-api",
  author = "Karsten Schmidt",
  note = "https://thi.ng/wasm-api",
  year = 2022
}
```

## License

&copy; 2022 Karsten Schmidt // Apache Software License 2.0
