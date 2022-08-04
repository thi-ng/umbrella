# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This package provides a small, generic and modular
[`WasmBridge`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html)
class as interop basis for hybrid JS/WebAssembly applications. At the moment
only a basic core API is provided (i.e. for debug output, string & pointer
handling), but in the future we aim to also supply support modules for DOM
manipulation, WebGL, WebGPU, WebAudio etc.

In general, all languages with a WebAssembly target are supported, however
currently only bindings for [Zig](https://ziglang.org) are included.

### Custom API modules

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
	 * Returns object of functions to import as externals into
	 * the WASM module. These imports are merged with the bridge's
	 * core API and hence should use naming prefixes...
	 */
	getImports(): WebAssembly.Imports {
		return {
			/**
			 * Writes 2 random float32 numbers to given address
			 */
			custom_randomVec2: (addr: number) => {
				this.parent.f32.set(
					[Math.random(), Math.random()],
					addr >> 2
				);
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
API like so (Please also see example further below in this readme):

```zig
// Import JS core API
const js = @import("wasmapi");

/// JS external to fill vec2 w/ random values
extern fn custom_randomVec2(addr: usize) void;

export fn test_randomVec2() void {
	var foo = [2]f32{ 0, 0 };

	// print original
	js.printF32Array(foo[0..]);

	// populate foo with random numbers
	custom_randomVec2(@ptrToInt(&foo));

	// print result
	js.printF32Array(foo[0..]);
}
```

### Object indices & handles

Since only numeric values can be exchanged between the WASM module and the JS
host, any JS native objects the WASM side might want to be working with must be
managed in JS. For this purpose the [`ObjectIndex`
class](https://docs.thi.ng/umbrella/wasm-api/classes/ObjectIndex.html) can be
used by API modules to handle ID generation (incl. recycling, using
[@thi.ng/idgen](https://github.com/thi-ng/umbrella/tree/develop/packages/idgen))
& indexing of different types of JS objects/values. Only the numeric IDs will
then need to be exchanged with the WASM module...

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
	await bridge.instantiate(readFileSync("hello.wasm"));

	// call an exported WASM function
	bridge.exports.start();
})();
```

```zig
//! Example Zig application (hello.zig)

/// import externals
/// see build command for configuration
const js = @import("wasmapi");

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
	--pkg-begin wasmapi node_modules/@thi.ng/wasm-api/zig/core.zig --pkg-end \
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
 (import "env" "_printStr" (func $fimport$0 (param i32 i32)))
 (global $global$0 (mut i32) (i32.const 65536))
 (memory $0 2)
 (data (i32.const 65536) "hello world!\00")
 (export "memory" (memory $0))
 (export "start" (func $0))
 (func $0
  (call $fimport$0
   (i32.const 65536)
   (i32.const 12)
  )
 )
)
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
