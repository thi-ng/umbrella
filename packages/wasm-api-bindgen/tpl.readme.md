# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Without any additional help, current data exchange between a WebAssembly module
and the JS/TS host application is restricted to simple numeric values. Not even
strings can be directly passed between the two worlds. For even the most basic
non-Hello-World style applications this is very cumbersome and insufficient.

### Data bindings & code generators

The package provides an extensible code generation framework to simplify the
bilateral design & exchange of data structures shared between the WASM & JS host
env. Currently, code generators for TypeScript, Zig and C11 are supplied.

All supplied code generators derive their outputs from a single source of truth,
a JSON file of shared type definitions and optional additional configuration,
e.g. to configure string behavior and/or provide custom user code to inject into
the generated source code. Please see the
[@thi.ng/wasm-api-dom](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/)
support package for a more thorough realworld example...

#### CLI generator

The package includes a [small CLI
wrapper](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-bindgen/src/cli.ts)
to invoke the code generator(s) from JSON type definitions and to write the
generated source code(s) to different files:

```text
$ npx @thi.ng/wasm-api

 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ @thi.ng/wasm-api-bindgen 0.1.0
 █ █ █ █ █ █ █ █ █ │ Multi-language data bindings code generator
                 █ │
               █ █ │

usage: wasm-api-bindgen [OPTS] JSON-INPUT-FILE(S) ...
       wasm-api-bindgen --help

Flags:

-d, --debug                     enable debug output & functions
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
wasm-api-bindgen \
  --config config.json \
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
[`global`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/CodeGenOpts.html),
[`c`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/C11Opts.html) and
[`ts`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/TSOpts.html) and
[`zig`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/ZigOpts.html) config
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

Currently, the code generator supports enums, function pointers, structs and unions. See API docs for
supported options & further details:

- [`Enum`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/Enum.html)
- [`EnumValue`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/EnumValue.html) (individual enum value spec)
- [`Field`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/Field.html) (individual spec for values contained in structs/unions)
- [`FuncPointer`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/FuncPointer.html)
- [`Struct`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/Struct.html)
- [`Union`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/Union.html)
- [`TopLevelType`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/TopLevelType.html)

#### JSON schema for type definitions

The package provides a detailed schema to aid the authoring of type definitions
(and provide inline documentation) via editors with JSON schema integration. The
schema is distributed as part of the package and located in
[`/schema/wasm-api-types.json`](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-bindgen/schema/wasm-api-types.json).

For VSCode, you can [add this snippet to your workspace
settings](https://code.visualstudio.com/Docs/languages/json#_mapping-to-a-schema-in-the-workspace)
to apply the schema to any `typedefs.json` files:

```json
"json.schemas": [
	{
		"fileMatch": ["**/typedefs.json"],
		"url": "./node_modules/@thi.ng/wasm-api-bindgen/schema/wasm-api-types.json"
	}
]
```

#### Example usage

The following example defines 1x enum, 2x structs and 1x union. Shown here are
the JSON type definitions and the resulting source codes:

**⬇︎ CLICK TO EXPAND EACH CODE BLOCK ⬇︎**

<details><summary>readme-types.json (Type definitions)</summary>

```json tangle:export/readme-types.json
[
	{
		"name": "EventType",
		"type": "enum",
		"tag": "u8",
		"doc": "Supported event types",
		"values": [
			{ "name": "mouse", "value": 1, "doc": "Any kind of mouse event" },
			{ "name": "key", "doc": "Key down/up event" },
			"misc"
		]
	},
	{
		"name": "MouseEvent",
		"type": "struct",
		"tag": "extern",
		"doc": "Example struct",
		"fields": [
			{ "name": "type", "type": "EventType" },
			{ "name": "pos", "type": "u16", "tag": "array", "len": 2 }
		]
	},
	{
		"name": "KeyEvent",
		"type": "struct",
		"tag": "extern",
		"doc": "Example struct",
		"fields": [
			{ "name": "type", "type": "EventType" },
			{ "name": "key", "type": "string", "doc": "Name of key which triggered event" },
			{ "name": "modifiers", "type": "u8", "doc": "Bitmask of active modifier keys" }
		]
	},
	{
		"name": "Event",
		"type": "union",
		"tag": "extern",
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
 * Generated by @thi.ng/wasm-api-bindgen at 2022-11-23T16:55:22.188Z
 * DO NOT EDIT!
 */

// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

/**
 * Supported event types
 */
export enum EventType {
	/**
	 * Any kind of mouse event
	 */
	MOUSE = 1,
	/**
	 * Key down/up event
	 */
	KEY,
	MISC,
}

/**
 * Example struct
 */
export interface MouseEvent extends WasmTypeBase {
	type: EventType;
	/**
	 * WASM type: [2]u16
	 */
	pos: Uint16Array;
}

export const $MouseEvent: WasmTypeConstructor<MouseEvent> = (mem) => ({
	get align() {
		return 2;
	},
	get size() {
		return 6;
	},
	instance: (base) => {
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 6);
			},
			get type(): EventType {
				return mem.u8[base];
			},
			set type(x: EventType) {
				mem.u8[base] = x;
			},
			get pos(): Uint16Array {
				const addr = (base + 2) >>> 1;
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
	/**
	 * Name of key which triggered event
	 */
	key: WasmStringPtr;
	/**
	 * Bitmask of active modifier keys
	 *
	 * WASM type: u8
	 */
	modifiers: number;
}

export const $KeyEvent: WasmTypeConstructor<KeyEvent> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 12;
	},
	instance: (base) => {
		let $key: WasmStringPtr | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 12);
			},
			get type(): EventType {
				return mem.u8[base];
			},
			set type(x: EventType) {
				mem.u8[base] = x;
			},
			get key(): WasmStringPtr {
				return $key || ($key = new WasmStringPtr(mem, (base + 4), true));
			},
			get modifiers(): number {
				return mem.u8[(base + 8)];
			},
			set modifiers(x: number) {
				mem.u8[(base + 8)] = x;
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
		return 12;
	},
	instance: (base) => {
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 12);
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
//! Generated by @thi.ng/wasm-api-bindgen at 2022-11-23T16:55:22.190Z
//! DO NOT EDIT!

const std = @import("std");
const wasm = @import("wasmapi");

/// Supported event types
pub const EventType = enum(u8) {
    /// Any kind of mouse event
    mouse = 1,
    /// Key down/up event
    key,
    misc,
};

/// Example struct
pub const MouseEvent = extern struct {
    type: EventType,
    pos: [2]u16,
};

/// Example struct
pub const KeyEvent = extern struct {
    type: EventType,
    /// Name of key which triggered event
    key: wasm.ConstStringPtr,
    /// Bitmask of active modifier keys
    modifiers: u8,
};

pub const Event = extern union {
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
// bridge initialization omitted here (see other examples)
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
// ...or
event.mouse.pos.set([1, 2]);

// buffer overflow protection
event.mouse.pos.set([1, 2, 3]);
// Uncaught RangeError: offset is out of bounds

event.mouse.type === EventType.MOUSE
// true
```

**IMPORTANT:** Field setters are currently only supported for single values,
incl. enums, strings, structs, unions. The latter two will always be copied by
value (mem copy). Currently, array, multi-pointers and slices do not provide
write access (from the JS side)...

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

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
