<!-- This file is generated - DO NOT EDIT! -->

# ![shader-ast-js](https://media.thi.ng/umbrella/banners/thing-shader-ast-js.svg?aeb21a95)

[![npm version](https://img.shields.io/npm/v/@thi.ng/shader-ast-js.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-js)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-js.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Unsupported features](#unsupported-features)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Customizable JS codegen, compiler & runtime for [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast).

Due to the lack of native vector operations in JS, this compile target
is much more involved than the
[@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-glsl)
code gen and uses a pluggable backend to perform all math ops. The
default backend delegates all ops to
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
and
[@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices),
which altogether provide ~750 optimized vector/matrix functions.

### Unsupported features

- texture lookups (see [texture tunnel
  demo](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-tunnel)
  for a monkey-patched solution)
- derivatives (`dFdx`, `dFdy`, `fwidth`) - probably never supported in
  this env
- `out` / `inout` function args (see
  [#96](https://github.com/thi-ng/umbrella/issues/96) for discussion)

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Bshader-ast-js%5D)

### Related packages

- [@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-glsl) - Customizable GLSL codegen for [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib) - Function collection for modular GPGPU / shader programming with [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)

## Installation

```bash
yarn add @thi.ng/shader-ast-js
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/shader-ast-js?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/shader-ast-js/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 5.27 KB / CJS: 4.74 KB / UMD: 4.67 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                   | Description                                           | Live demo                                                 | Source                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-01.jpg" width="240"/>       | 2D canvas shader emulation                            | [Demo](https://demo.thi.ng/umbrella/shader-ast-canvas2d/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-canvas2d) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-noise.jpg" width="240"/>      | HOF shader procedural noise function composition      | [Demo](https://demo.thi.ng/umbrella/shader-ast-noise/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-noise)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-raymarch.jpg" width="240"/> | WebGL & JS canvas2D raymarch shader cross-compilation | [Demo](https://demo.thi.ng/umbrella/shader-ast-raymarch/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-raymarch) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-sdf2d.jpg" width="240"/>      | WebGL & JS canvas 2D SDF                              | [Demo](https://demo.thi.ng/umbrella/shader-ast-sdf2d/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-sdf2d)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-tunnel.jpg" width="240"/>     | WebGL & Canvas2D textured tunnel shader               | [Demo](https://demo.thi.ng/umbrella/shader-ast-tunnel/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-tunnel)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/>    | Fork-join worker-based raymarch renderer              | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers)  |

## API

[Generated API docs](https://docs.thi.ng/umbrella/shader-ast-js/)

```ts
// AST node functions from main shader-ast pkg
import {
    mul,
    defn,
    float,
    ret,
    vec3
} from "@thi.ng/shader-ast";

// codegen / compiler
import { targetJS } from "@thi.ng/shader-ast-js";

const js = targetJS();

const hello = defn("vec4", "hello", ["float"], (n) => [
    ret(vec4(mul(vec3(1, 2, 3), n), -1))
]);

js(hello)

const Module = js.compile(hello);
Module.hello(10);
// [10, 20, 30, -1]
```

## Authors

Karsten Schmidt

## License

&copy; 2019 - 2020 Karsten Schmidt // Apache Software License 2.0
