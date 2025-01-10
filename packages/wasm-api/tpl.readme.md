<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

| Quasiflock                                                                                                                                        | Danza                                                                                                                                            | S-TRACE                                                                                                                                             | Voxelscape                                                                                                                                                           |
|---------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <a href="https://www.fxhash.xyz/generative/6671"><img src="https://github.com/thi-ng/umbrella/raw/develop/assets/fxhash/quasiflock-240.jpg"/></a> | <a href="https://mastodon.thi.ng/@toxi/tagged/DANZA"><img src="https://github.com/thi-ng/umbrella/raw/develop/assets/fxhash/danza-240.jpg"/></a> | <a href="https://mastodon.thi.ng/@toxi/tagged/STRACE"><img src="https://github.com/thi-ng/umbrella/raw/develop/assets/fxhash/s-trace-240.jpg"/></a> | <a href="https://twitter.com/search?q=from%3A%40toxi+voxel+ziglang"><img src="https://github.com/thi-ng/umbrella/raw/develop/assets/fxhash/voxelscape-240.jpg"/></a> |

(Screenshots of selected projects made with Zig & TypeScript using the interop features provided by this package. Images link to respective project info)

This package form the core of a larger WASM toolkit which includes a polyglot
bindings generator and a growing number of API modules to interop with different
browser APIs. This core package provides the following:

1. A small
[`WasmBridge`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html)
class as generic interop basis and much reduced boilerplate for hybrid
JS/WebAssembly applications.
2. Child WASM API modules with dependency graph resolution & initialization
3. A minimal core API for debug output, string/pointer/typedarray accessors for
8/16/32/64 bit (u)ints and 32/64 bit floats. Additionally, a number of support
modules for [DOM
manipulation](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom/),
[scheduled function
execution](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-schedule/),
WebGL, WebGPU, WebAudio etc. is being actively worked on.
4. Different types of memory-mapped (UTF-8) string abstractions (slice or pointer based)
5. Shared (opt-in) memory allocation mechanism, also accessible from JS/TS side
6. Include files for
   [Zig](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api/zig),
   and
   [C/C++](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api/include)
   defining glue code for the TypeScript [core
   API](https://docs.thi.ng/umbrella/wasm-api/interfaces/CoreAPI.html) defined
   by this package
7. [Zig build files](#using-the-zig-build-system) to simplify using hybrid
   TS/Zig packages with the built-in build system

## Polyglot bindings generator

The toolkit includes an extensible [code
generator](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-bindgen/)
for shared datatypes and (currently) supports Zig & TypeScript and C11. For TS
fully type checked and memory-mapped (mostly zero-copy) accessors of WASM-side
data are generated. In principle, all languages with a WASM target are
supported, however currently only bindings for the languages mentioned are
included. The codegen also includes a [CLI
frontend/utility](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-bindgen/README.md#cli-generator).

## Custom API modules

The
[`WasmBridge`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html)
can be extented via custom defined API modules. Such child modules will consist
of a collection of JS/TS functions & variables, their related counterparts
(import definitions) for the WASM target and (optionally) some shared data types
([bindings for which can be generated via
thi.ng/wasm-api-bindgen](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-bindgen)).

On the JS side, custom API extensions can be easily integrated and exposed via
the [`IWasmAPI`
interface](https://docs.thi.ng/umbrella/wasm-api/interfaces/IWasmAPI.html) and
their module descriptors via
[`WasmModuleSpec`](https://docs.thi.ng/umbrella/wasm-api/interfaces/WasmModuleSpec.html).
The following example provides a brief overview:

```ts
import { WasmBridge, type IWasmAPI, type WasmModuleSpec } from "@thi.ng/wasm-api";
import { WasmDomModule, type WasmDom, type WasmDomExports } from "@thi.ng/wasm-api-dom";

export const CustomModule: WasmModuleSpec = {
	// Unique API module identifier to group WASM imports, must match ID used
	// by the native code (see further below).
	id: "custom",
	// Optional array of API modules this module depends on. This is used to
	// infer the full dependency graph and correct initialization order.
	// Note: Each of the wasm-api support packages includes a module spec...
	depes: [WasmDomModule],
	// Factory function to pre-instantiate the API module. Full initialization
	// only happens at a later point via WasmBridge.instantiate() or
	// WasmBridge.init() and each module's own init() method...
	factory: () => new CustomAPI(),
};

// Optional declarations for JS-side functions which can be used from the WASM side.
// Using an interface for this is useful to establish a contract.
export interface CustomImports extends WebAssembly.ModuleImports {
	/**
	 * Writes `num` random float32 numbers from given address
	 */
	fillRandom(addr: number, num: number): void;
}

// Optional (but likely used) interface declarations of functions exposed
// by the WASM binary and callable from the JS side (i.e. the opposite of the above)
//
// Note: If your module has dependencies on other modules you should declare
// your exports as extension of these other module's exports for better
// downstream developer experience
export interface CustomWasmExports extends WasmDomExports {
	// ...
}

// Actual custom API extension implentation
export class CustomAPI implements IWasmAPI<CustomWasmExports> {
	parent!: WasmBridge;
	dom!: WasmDom;

	/**
	 * Actual module initialization, called from the main WasmBridge which
	 * initializes all modules in dependency order...
	 */
	async init(parent: WasmBridge) {
		this.parent = parent;
		this.parent.logger.debug("initializing custom API");
		// Store a direct reference to the DOM module for future ref
		// (just shown as example, we're not actually using this module here...)
		this.dom = <WasmDom>this.parent.modules[WasmDomModule.id];

		// any other tasks you might need to do...

		return true;
	}

	/**
	 * Returns object of functions/constants to import as externals into the
	 * WASM module during instantiation. These imports are merged into a
	 * larger imports object alongside the bridge's core API...
	 *
	 * Each module's imports will be grouped by its declared module ID, which
	 * also needs to be used to declare extern functions on the WASM side.
	 */
	getImports(): CustomImports {
		return {
			fillRandom: (addr: number, num: number) => {
				addr >>>= 2;
				while(num-- > 0) this.parent.f32[addr++] = Math.random();
			}
		};
	}
}

// now we can supply this custom API when creating the main WASM bridge:
export const bridge = new WasmBridge([CustomModule]);
```

In Zig (or any other language of your choice) we can then utilize this custom
API like so (Please also see [example projects](#usage-examples) & other code
snippets in this readme):

Bindings file / lib:

```zig
//! custom.zig - extern definitions of custom JS API

/// JS external to fill a slice w/ random values
/// Note: Each API module uses a separate import object to avoid naming clashes
/// Here we declare an external binding belonging to the "custom" import group
///
/// The bridge core API uses "wasmapi" as reserved import group name
extern "custom" fn fillRandom(addr: [*]f32, num: usize) void;

/// Syntax sugar for `fillRandom()`
pub fn fillRandomSlice(slice: []f32) void {
	fillRandom(slice.ptr, slice.len);
}
```

Main Zig file:

```zig
// Import JS core API
const wasm = @import("wasm-api");
const custom = @import("custom.zig");

export fn test_randomVec4() void {
	var foo = [4]f32{ 1, 2, 3, 4 };

	// print original
	wasm.printF32Array(foo[0..]);

	// populate foo with random numbers
	custom.fillRandomSlice(foo[0..]);

	// print result
	wasm.printF32Array(foo[0..]);
}
```

## String handling

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

Furthermore, the package provides these string wrapper types:

- [`WasmStringPtr`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmStringPtr.html)
- [`WasmStringSlice`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmStringSlice.html)

Finally, see more information in the
[@thi.ng/wasm-api-bindgen](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-bindgen/README.md#string-handling)
package readme.

## Memory allocations

If explicitly enabled on the WASM side, the `WasmBridge` includes support for
malloc/free-style allocations (within the linear WASM memory) from the JS side.

The actual allocator is implementation specific and suitable generic mechanisms
are defined for both the included Zig & C bindings. Please see for further
reference:

- [`/zig/lib.zig`](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig#L34-L68):
  comments about WASM-side allocator handling in Zig
- [`/include/wasmapi.h`](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/include/wasmapi.h#L18-L28):
  comments about WASM-side allocator handling in C/C++
- [`WasmBridge.allocate()`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html#allocate):
  allocating memory from JS side
- [`WasmBridge.free()`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html#free):
  freeing previously allocated memory from JS side

Note: The provided Zig library supports the idiomatic (Zig) pattern of working
with multiple allocators in different parts of the application and supports
dynamic assignments/swapping of the exposed allocator. See comments in source
file and
[tests](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api/test)
for more details...

```ts
// (see sections further below for bridge initialization...)

try {
	// allocate 256 bytes of memory for passing a string to WASM side
	// the function returns a tuple of `[address, len]`
	const [addr, len] = bridge.allocate(256);

	// write zero terminated string to reserved memory (max. `len` bytes)
	// function returns number of bytes written (excl. sentinel)
	const num = bridge.setString("hello WASM world!", addr, len, true);

	// call WASM function doing something w/ the string
	bridge.exports.doSomethingWithString(addr, num);

	// cleanup
	bridge.free([addr, len]);
} catch(e) {
	// deal with allocation error
	// ...
}
```

### API module auto-initialization

The supplied child APIs
([wasm-api-dom](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-dom),
[wasm-api-schedule](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-schedule)
etc.) use an auto-intialization hook related to the above `WASM_ALLOCATOR`
mechanism: If that allocator is available, the WASM side of these modules will
auto initialize and thus reduce boilerplate. However, if no such central
allocator is defined and/or a custom allocator should be used, then these API
modules will have to be initialized manually.

## Object indices & handles

Since only numeric values can be directly passed between the WASM module and the
JS host, any JS native objects the WASM side might want to be working with must
be managed manually in JS. For this purpose the [`ObjectIndex`
class](https://docs.thi.ng/umbrella/wasm-api/classes/ObjectIndex.html) can be
used by API modules to handle the indexing of different types of JS
objects/values and their ID generation (incl. recycling of IDs, using
[@thi.ng/idgen](https://github.com/thi-ng/umbrella/tree/develop/packages/idgen)).
Using this approach, only the numeric IDs (handles) will then need to be
exchanged with the WASM module...

```ts
import { ObjectIndex } from "@thi.ng/wasm-api";
import { ConsoleLogger } from "@thi.ng/logger";

// create index (see API docs for options)
const canvases = new ObjectIndex<HTMLCanvasElement>({ name: "canvas" });

// index item and assign new ID
canvases.add(<HTMLCanvasElement>document.createElement("canvas"));
// 0

// look up item by ID
canvases.get(0);
// <canvas ...>

// by default, items to be indexed are not checked for equality
// but we can use the below to ensure double indexing is avoided...
// (supports custom predicates to check for equality)
canvases.addUnique(canvases.get(0));
// 0 (returned already known ID)

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

The supplied Zig core library also includes a
[`ManagedIndex`](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/managed-index.zig)
for similar resource management on the Zig side of the application. For example,
in the
[@thi.ng/wasm-api-dom](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/)
&
[@thi.ng/wasm-api-schedule](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-schedule/)
packages this is used to manage Zig-side event listeners.

## Using the Zig build system

This package provides utilities to simplify using hybrid TS/Zig WASM API modules
which are distributed as NPM packages. Using these utils, a build file for Zig's
built-in build system is as simple as:

### Zig v0.13 or newer

**IMPORTANT:** Due to recent syntax & build system changes in Zig
[v0.12.0](https://ziglang.org/download/0.12.0/release-notes.html) &
[v0.13.0](https://ziglang.org/download/0.13.0/release-notes.html), older Zig
versions are not actively supported anymore (however, [build files for older
versions are still
included](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig))

```zig
const std = @import("std");

pub fn build(b: *std.Build) void {
	// obtain a standard std.Build.Step.Compile, pre-configured w/ given options
	// see source comments in imported build.zig for further details...
	var lib = @import("node_modules/@thi.ng/wasm-api/zig/build.zig").wasmLib(b, .{
		// Declare extra WASM API modules to use
		// Each can also declare dependencies to other modules
		// (`wasm-api` and `wasm-api-bindgen` are made available everywhere)
		.modules = &.{
			.{ .name = "wasm-api-dom", .path = "@thi.ng/wasm-api-dom/zig/lib.zig" },
			.{ .name = "wasm-api-schedule", .path = "@thi.ng/wasm-api-schedule/zig/lib.zig" },
		},
		// (optional) optimization mode override
		// if commented out, we can pass CLI args to choose mode (default: .Debug)
		.optimize = .ReleaseSmall,
	});
	// optionally, add further custom configuration
	// ...

	// finally trigger build & install
	b.installArtifact(lib);
}
```

### Example projects

All bundled example projects (see [list below](#usage-examples)) are being built
via this script. **More details/options in the commented source code:**

- [`/zig/build.zig`](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/build.zig)

## Naming & structural conventions

To avoid guesswork about the internals of any of the supplied WASM API modules,
please also consult the information in
[#368](https://github.com/thi-ng/umbrella/issues/368).

{{meta.status}}

{{repo.supportPackages}}

### Third party modules

- [@genart-api/wasm](https://github.com/thi-ng/genart-api/tree/main/packages/wasm) — WASM/Zig bindings for [GenArtAPI](https://thi.ng/genart-api)

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

## Basic usage example

```ts
import { WasmBridge, WasmExports } from "@thi.ng/wasm-api";
import { readFileSync } "node:fs";

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

Requires [Zig](https://ziglang.org) (v0.13.x) to be installed:

```zig tangle:export/hello.zig
//! Example Zig application (hello.zig)

/// import externals
/// see build command for configuration
const js = @import("wasm-api");

export fn start() void {
    js.printStr("hello world!");
}
```

The WASM binary can be built using the following command (or for more complex
scenarios add the supplied .zig file(s) to your `build.zig` and/or source
folder):

```bash
# compile WASM binary (zig v0.13)
zig build-exe \
    -fno-entry -fstrip -OReleaseSmall -target wasm32-freestanding \
    --name hello -rdynamic --import-symbols \
    --dep wasm-api \
    -Mroot=hello.zig \
    -Mwasm-api=node_modules/@thi.ng/wasm-api/zig/lib.zig

# disassemble WASM
wasm-dis -o hello.wast hello.wasm
```

The resulting WASM:

```wasm
(module
 (type $0 (func (param i32 i32)))
 (type $1 (func))
 (type $2 (func (param i32) (result i32)))
 (import "wasmapi" "_printStr" (func $fimport$0 (param i32 i32)))
 (global $global$0 (mut i32) (i32.const 1048576))
 (memory $0 17)
 (data $0 (i32.const 1048576) "hello world!\00")
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

### C version

Requires [Emscripten](https://emscripten.org/) to be installed:

```c tangle:export/hello.c
#include <wasmapi.h>

void WASMAPI_KEEP start() {
	wasm_printStrZ("hello world!");
}
```

Building the WASM module:

```bash
emcc -Os -Inode_modules/@thi.ng/wasm-api/include \
  -sERROR_ON_UNDEFINED_SYMBOLS=0 --no-entry \
  -o hello.wasm hello.c
```

<!-- include ../../assets/tpl/footer.md -->
