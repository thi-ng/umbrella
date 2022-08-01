<!-- This file is generated - DO NOT EDIT! -->

# ![wasm-api](https://media.thi.ng/umbrella/banners/thing-wasm-api.svg?00b02dbd)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Modular, extensible API bridge and generic glue code between JS & WebAssembly.

This package provides a small, generic and modular
[`WasmBridge`](https://docs.thi.ng/umbrella/wasm-api/classes/WasmBridge.html)
class as interop basis for hybrid JS/WebAssembly applications. At the moment
only a basic core API is provided (i.e. for debug output, string & pointer
handling), but in the future we aim to also supply support modules for DOM
manipulation, WebGL, WebGPU, WebAudio etc.

In general, all languages with a WebAssembly target are supported, however
currently only bindings for [Zig](https://ziglang.org) are included.

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api%5D+in%3Atitle)

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

Package sizes (gzipped, pre-treeshake): ESM: 1.08 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)

## API

[Generated API docs](https://docs.thi.ng/umbrella/wasm-api/)

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
