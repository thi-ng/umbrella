<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/shader-ast-optimize](https://media.thi.ng/umbrella/banners-20230807/thing-shader-ast-optimize.svg?287287ef)

[![npm version](https://img.shields.io/npm/v/@thi.ng/shader-ast-optimize.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-optimize)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-optimize.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [defOptimized()](#defoptimized)
  - [Tree optimizations](#tree-optimizations)
    - [Constant folding](#constant-folding)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Shader AST code optimization passes/strategies. This is a support package for [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast).

### defOptimized()

The function
[`defOptimize()`](https://docs.thi.ng/umbrella/shader-ast-optimize/functions/defOptimized.html)
can be used as direct replacement for [thi.ng/shader-ast]()'s
[`defMain()`](https://docs.thi.ng/umbrella/shader-ast/functions/defMain.html) to
define automatically optimized shader `main()` functions.

### Tree optimizations

Currently, only the following operations are supported/considered:

#### Constant folding

- scalar math operators (incl. some vector versions)
- scalar math built-in functions (incl. some vector versions)
- scalar comparisons
- single component vector swizzling
- literal hoisting

(See tests for some more examples, non-exhaustive...)

**Note:** The static optimizer throws an error if it detects a division-by-zero...

```ts tangle:export/readme1.ts
import {
  add, defn, float, mul, neg, ret, scope, vec2, $x, $y
} from "@thi.ng/shader-ast";
import { targetGLSL } from "@thi.ng/shader-ast-glsl";
import { constantFolding } from "@thi.ng/shader-ast-optimize";

// function def
const foo = defn("float", "foo", ["float"], (x) => [
  ret(mul(x, add(neg(float(10)), 42)))
]);

const bar = vec2(100, 200);

// program def
const prog = scope([
  foo,
  foo(add(float(1), float(2))),
  foo(add($x(bar), $y(bar)))
], true);

// GLSL codegen
const glsl = targetGLSL();

// unoptimized AST as GLSL (see section above)
console.log(glsl(prog));
// #version 300 es
// float foo(in float _s0) {
// return (_s0 * ((-10.0) + 42.0));
// }
// foo((1.0 + 2.0));
// foo((vec2(100.0, 200.0).x + vec2(100.0, 200.0).y));

// with constant folding
console.log(glsl(constantFolding(prog)))
// #version 300 es
// float foo(in float _s0) {
// return (_s0 * 32.0);
// }
// foo(3.0);
// foo(300.0);

const expr = mul(float(4), $x(vec2(2)))

console.log(glsl(expr))
// (4.0 * vec2(2.0).x)

// optimize single expression
console.log(glsl(constantFolding(expr)))
// 8.0
```

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bshader-ast-optimize%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/shader-ast-optimize
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/shader-ast-optimize"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const shaderAstOptimize = await import("@thi.ng/shader-ast-optimize");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.24 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                            | Description                                              | Live demo                                            | Source                                                                            |
|:----------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|:-----------------------------------------------------|:----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-evo.jpg" width="240"/> | Evolutionary shader generation using genetic programming | [Demo](https://demo.thi.ng/umbrella/shader-ast-evo/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-evo) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/shader-ast-optimize/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-shader-ast-optimize,
  title = "@thi.ng/shader-ast-optimize",
  author = "Karsten Schmidt",
  note = "https://thi.ng/shader-ast-optimize",
  year = 2019
}
```

## License

&copy; 2019 - 2024 Karsten Schmidt // Apache License 2.0
