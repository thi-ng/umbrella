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
import { WasmBridge } from "@thi.ng/wasm-api";
import { readFileSync } from "fs";

// WASM exports from our dummy module (below)
interface App {
	memory: WebAssembly.Memory;
	start: () => void;
}

(async () => {
	const bridge = new WasmBridge();
	// instantiate WASM module using imports provided by the bridge
	const wasm = await WebAssembly.instantiate(
		readFileSync("hello.wasm"),
		bridge.getImports()
	);
	// cast WASM exports to our defined interface
	const app: App = <any>wasm.instance.exports;
	// init bindings & child APIs (if any)
	await bridge.init(app.memory);

	// call WASM function
	app.start();
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

The WASM binary can be built via:

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
 (data (i32.const 65536) "hello world!\00\00\00\00\00\00\01\00\0c\00\00\00")
 (export "memory" (memory $0))
 (export "start" (func $0))
 (func $0
  (call $fimport$0
   (i32.const 65552)
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
