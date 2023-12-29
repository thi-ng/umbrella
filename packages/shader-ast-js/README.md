<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/shader-ast-js](https://media.thi.ng/umbrella/banners-20230807/thing-shader-ast-js.svg?6e5a768b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/shader-ast-js.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-js)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-js.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bshader-ast-js%5D+in%3Atitle)

## Related packages

- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel) - Typedarray integer & float pixel buffers w/ customizable formats, blitting, drawing, convolution
- [@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-glsl) - Customizable GLSL codegen for [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib) - Function collection for modular GPGPU / shader programming with [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)

## Installation

```bash
yarn add @thi.ng/shader-ast-js
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/shader-ast-js"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const shaderAstJs = await import("@thi.ng/shader-ast-js");
```

Package sizes (brotli'd, pre-treeshake): ESM: 6.47 KB

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

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                   | Description                                                       | Live demo                                                 | Source                                                                                 |
|:-----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ascii-raymarch.jpg" width="240"/>        | ASCII art raymarching with thi.ng/shader-ast & thi.ng/text-canvas | [Demo](https://demo.thi.ng/umbrella/ascii-raymarch/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ascii-raymarch)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-01.jpg" width="240"/>       | 2D canvas shader emulation                                        | [Demo](https://demo.thi.ng/umbrella/shader-ast-canvas2d/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-canvas2d) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-noise.jpg" width="240"/>      | HOF shader procedural noise function composition                  | [Demo](https://demo.thi.ng/umbrella/shader-ast-noise/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-noise)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-raymarch.jpg" width="240"/> | WebGL & JS canvas2D raymarch shader cross-compilation             | [Demo](https://demo.thi.ng/umbrella/shader-ast-raymarch/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-raymarch) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-sdf2d.jpg" width="240"/>      | WebGL & JS canvas 2D SDF                                          | [Demo](https://demo.thi.ng/umbrella/shader-ast-sdf2d/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-sdf2d)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-tunnel.jpg" width="240"/>     | WebGL & Canvas2D textured tunnel shader                           | [Demo](https://demo.thi.ng/umbrella/shader-ast-tunnel/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-tunnel)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/>    | Fork-join worker-based raymarch renderer (JS/CPU only)            | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers)  |

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

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-shader-ast-js,
  title = "@thi.ng/shader-ast-js",
  author = "Karsten Schmidt",
  note = "https://thi.ng/shader-ast-js",
  year = 2019
}
```

## License

&copy; 2019 - 2023 Karsten Schmidt // Apache License 2.0
