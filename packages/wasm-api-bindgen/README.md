<!-- This file is generated - DO NOT EDIT! -->

# ![wasm-api-bindgen](https://media.thi.ng/umbrella/banners-20220914/thing-wasm-api-bindgen.svg?4570122f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api-bindgen.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api-bindgen)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api-bindgen.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Data bindings & code generators](#data-bindings--code-generators)
  - [Supported data types](#supported-data-types)
  - [Struct/union field types](#structunion-field-types)
    - [Primitives](#primitives)
    - [Type variations](#type-variations)
  - [String handling](#string-handling)
    - [Strings as zero-terminated pointers](#strings-as-zero-terminated-pointers)
    - [Strings as slices](#strings-as-slices)
  - [Opaque pointers](#opaque-pointers)
  - [Slice emulation](#slice-emulation)
  - [Padding](#padding)
- [JSON schema for type definitions](#json-schema-for-type-definitions)
- [CLI generator](#cli-generator)
- [Example usage](#example-usage)
  - [Type definitions](#type-definitions)
  - [Generated TypeScript source code](#generated-typescript-source-code)
  - [Generated Zig source code](#generated-zig-source-code)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Polyglot bindings code generators for hybrid JS & WebAssembly projects. This is a support package for [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api).

Without any additional help, current data exchange between a WebAssembly module
and the JS/TS host application is restricted to simple numeric values. Not even
strings can be directly passed between the two worlds. For even the most basic
non-Hello-World style applications this is very cumbersome and insufficient.

## Data bindings & code generators

The package provides an extensible code generation framework to simplify the
bilateral design & exchange of data structures shared between the WASM & JS host
env. Currently, code generators for the following languages are supplied:

- TypeScript
- Zig
- C11

These code generators derive their outputs from a single source of truth, a user
provided JSON file of shared type definitions and optional additional
configuration, e.g. to configure string behavior and/or provide custom user code
to inject into the generated source code. Please see the
[@thi.ng/wasm-api-dom](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/)
support package for a more thorough realworld example...

### Supported data types

Currently, the code generators support top level types: enums, function pointers, structs and
unions. See API docs for supported options & further details:

- [`Enum`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/Enum.html)
- [`EnumValue`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/EnumValue.html) (individual enum value spec)
- [`Field`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/Field.html) (individual spec for values contained in structs/unions)
- [`FuncPointer`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/FuncPointer.html)
- [`Struct`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/Struct.html)
- [`Union`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/Union.html)
- [`TopLevelType`](https://docs.thi.ng/umbrella/wasm-api-bindgen/interfaces/TopLevelType.html)

### Struct/union field types

Struct field types can be any of the supported WASM primitives or other user
defined types in the same JSON spec. In all cases, each field's base type can be
customized via the `tag`, `len`, `const` and `sentinel` options.

#### Primitives

- `i8`, `i16`, `i32`, `i64`, `u8`, `u16`, `u32`, `u64`
- `f32`, `f64`

The following types are always available too, but are treated specially in some
or all languages (explained in more detail further below):

- `opaque` - pointer to opaque data (e.g. `void*` in C or `*anyopaque` in Zig)
- `string` - configurable string abstraction (see dedicated section in this readme)

#### Type variations

| Base type | Tag     | Length | Const | Equiv Zig type signature | Description                                      |
|-----------|---------|--------|-------|--------------------------|--------------------------------------------------|
| `Foo`     |         |        |       | `Foo`                    | A single `Foo`                                   |
| `Foo`     | `array` | N      |       | `[N]Foo`                 | Array of N `Foo`                                 |
| `Foo`     | `slice` |        |       | `[]Foo`                  | Slice of `Foo`<sup>(1)</sup>                     |
| `Foo`     | `slice` |        | true  | `[]const Foo`            | Slice of readonly `Foo`<sup>(1)</sup>            |
| `Foo`     | `ptr`   |        |       | `*Foo`                   | Pointer to a single `Foo`                        |
| `Foo`     | `ptr`   |        | true  | `*const Foo`             | Pointer to a single readonly `Foo`               |
| `Foo`     | `ptr`   | N      |       | `*[N]Foo`                | Pointer to N `Foo`                               |
| `Foo`     | `ptr`   | 0      |       | `[*]Foo`                 | Pointer to multiple `Foo`<sup>(2)</sup>          |
| `Foo`     | `ptr`   | 0      | true  | `[*]const Foo`           | Pointer to multiple readonly `Foo`<sup>(2)</sup> |
| `f32`     | `vec`   | N      |       | `@Vector(N, f32)`        | Vector of N `f32`<sup>(3)</sup>                  |

- <sup>(1)</sup> all slices are emulated (see section below)
- <sup>(2)</sup> type or semantics not fully supported by all languages, i.e. no
  support in TypeScript, no diff to single-item pointers in C
- <sup>(3)</sup> numeric types only, SIMD compatible (if enabled in WASM target)

### String handling

Most low-level languages deal with strings very differently and alas there's no
general standard. Some have UTF-8/16 support, others don't. In some languages
(incl. C & Zig), strings are stored (by default) as zero terminated char
sequence, in others they aren't... It's outside the scope of this package to
provide an allround out-of-the-box solution. The `WasmBridge` runtime API
provides read & write accessors to obtain JS strings from UTF-8 encoded WASM
memory. See
[`getString()`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html#getString)
and
[`setString()`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html#setString)
for details.

The code generators check a global `stringType` option to interpret the built-in
`string` type of a struct field in different ways:

- `ptr` (default): Considers a string as C-style `char*` pointer
  (zero-terminated, but without any explicit length)
- `slice`: Considers strings as Zig-style slices (i.e. pointer + length)

Regardless of implementation choice (and in opposite fashion to all other
types), the default for strings is `const` aka readonly... If mutable strings
are required, set `const` field option to `false`.

#### Strings as zero-terminated pointers

This is the default behavior/implementation for `string`:

See
[C/C++](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api/include)
and
[Zig](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api/zig/types.zig)
types for definitions of `StringPtr` and `ConstStringPtr` et al...

| Base type | Tag     | Length | Const | Equiv Zig type signature | Description                         |
|-----------|---------|--------|-------|--------------------------|-------------------------------------|
| `string`  |         |        |       | `ConstStringPtr`         | Single readonly string              |
| `string`  |         |        | false | `StringPtr`              | Single mutable string               |
| `string`  | `array` | N      |       | `[N]ConstStringPtr`      | Array of N readonly strings         |
| `string`  | `array` | N      | false | `[N]StringPtr`           | Array of N mutable strings          |
| `string`  | `slice` |        |       | `ConstStringPtrSlice`    | Slice of readonly strings           |
| `string`  | `slice` |        | false | `StringPtrSlice`         | Slice of mutable strings            |
| `string`  | `ptr`   |        |       | `*ConstStringPtr`        | Pointer to a single readonly string |
| `string`  | `ptr`   |        | false | `*StringPtr`             | Pointer to a single mutable string  |
| `string`  | `ptr`   | N      |       | `*[N]ConstStringPtr`     | Pointer to N readonly strings       |
| `string`  | `ptr`   | N      | false | `*[N]StringPtr`          | Pointer to N mutable strings        |

#### Strings as slices

If the global `stringType` option is set to `slice`, i.e. instead of a simple
pointer, strings are now stored using [emulated slices](#slice-emulation).

| Base type | Tag     | Length | Const | Equiv Zig type signature | Description                         |
|-----------|---------|--------|-------|--------------------------|-------------------------------------|
| `string`  |         |        |       | `ConstString`            | Single readonly string              |
| `string`  |         |        | false | `String`                 | Single mutable string               |
| `string`  | `array` | N      |       | `[N]ConstString`         | Array of N readonly strings         |
| `string`  | `array` | N      | false | `[N]String`              | Array of N mutable strings          |
| `string`  | `slice` |        |       | `ConstStringSlice`       | Slice of readonly strings           |
| `string`  | `slice` |        | false | `StringSlice`            | Slice of mutable strings            |
| `string`  | `ptr`   |        |       | `*ConstString`           | Pointer to a single readonly string |
| `string`  | `ptr`   |        | false | `*String`                | Pointer to a single mutable string  |
| `string`  | `ptr`   | N      |       | `*[N]ConstString`        | Pointer to N readonly strings       |
| `string`  | `ptr`   | N      | false | `*[N]String`             | Pointer to N mutable strings        |

### Opaque pointers

Opaque pointers are type erased pointers and only partially supported on the JS
side, i.e. the pointer's target address can be retrieved, but nothing else.

TODO insert table

### Slice emulation

In many languages a "slice" is a typed view of a memory region: A coupling of a
pointer to a start item and a given length (number of items). Of the languages
currently targeted by this package, only Zig has native support for this
concept, however forbids using slices in so-called `extern struct`s (which are
the struct type used for interop and required for guaranteed memory layouts).

Therefore, all slices used here will be emulated using simple auto-generated
wrapper structs, like:

```c
// C
typedef struct { char* ptr; size_t len; } String;
```

```zig
// Zig
pub const String = extern struct { ptr: [*:0]u8, len: usize };
```

The TypeScript codegen will emit slices as JS arrays and doesn't support
manipulation of a slice itself at current.

### Padding

Should there ever be a need for manual padding inside a struct or union
definition, the following field spec can be used: `{ pad: N }`, where N is the
number of bytes to use for the empty space... Names for these special purpose
fields will be autogenerated and all other field options are ignored.

## JSON schema for type definitions

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

## CLI generator

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

## Example usage

The following example defines 1x enum, 2x structs and 1x union. Shown here are
the JSON type definitions and the resulting source codes:

**⬇︎ CLICK TO EXPAND EACH CODE BLOCK ⬇︎**

### Type definitions

<details><summary>readme-types.json</summary>

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

### Generated TypeScript source code

<details><summary>generated.ts</summary>

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

### Generated Zig source code

<details><summary>generated.zig</summary>

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

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api-bindgen%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/wasm-api-bindgen
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/wasm-api-bindgen"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const wasmApiBindgen = await import("@thi.ng/wasm-api-bindgen");
```

Package sizes (gzipped, pre-treeshake): ESM: 6.29 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/args](https://github.com/thi-ng/umbrella/tree/develop/packages/args)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api)

## API

[Generated API docs](https://docs.thi.ng/umbrella/wasm-api-bindgen/)

TODO

Please also see further examples in the [@thi.ng/wasm-api main
readme](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api) and
the various (commented) example projects linked above.

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-wasm-api-bindgen,
  title = "@thi.ng/wasm-api-bindgen",
  author = "Karsten Schmidt",
  note = "https://thi.ng/wasm-api-bindgen",
  year = 2022
}
```

## License

&copy; 2022 Karsten Schmidt // Apache Software License 2.0
