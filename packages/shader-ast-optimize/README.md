<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/shader-ast-optimize](https://media.thi.ng/umbrella/banners-20220914/thing-shader-ast-optimize.svg?287287ef)

[![npm version](https://img.shields.io/npm/v/@thi.ng/shader-ast-optimize.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-optimize)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-optimize.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
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

### Tree optimizations

Currently, only the following operations are supported / considered:

#### Constant folding

- scalar math operators
- scalar math built-in functions
- single component vector swizzling
- literal hoisting

```ts
import { $x, $y, add, defn, float, mul, neg, ret } from "@thi.ng/shader-ast";
import { targetGLSL } from "@thi.ng/shader-ast-glsl";
import { constantFolding } from "@thi.ng/shader-ast-optimize";

const foo = defn("float", "foo", ["float"], (x) => [
  ret(mul(x, add(neg(float(10)), float(42))))
]);

const bar = vec2(100, 200);

const prog = scope([
  foo,
  foo(add(float(1), float(2))),
  foo(add($x(bar), $y(bar)))
], true);

const glsl = targetGLSL();

// unoptimized AST as GLSL (see section above)
glsl(prog);

// float foo(in float _sym0) {
//   return (_sym0 * (-10.0 + 42.0));
// };
// foo((1.0 + 2.0));
// foo((vec2(100.0, 200.0).x + vec2(100.0, 200.0).y));

// same tree after constant folding optimizations
glsl(constantFolding(prog))

// float foo(in float _sym0) {
//   return (_sym0 * 32.0);
// };
// foo(3.0);
// foo(300.0);

const expr = mul(float(4), $x(vec2(2)))

glsl(expr)
// (4.0 * vec2(2.0).x)

glsl(constantFolding(expr))
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

Package sizes (brotli'd, pre-treeshake): ESM: 928 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

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

&copy; 2019 - 2022 Karsten Schmidt // Apache License 2.0
