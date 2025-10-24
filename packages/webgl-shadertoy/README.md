<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/webgl-shadertoy](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-webgl-shadertoy.svg?a1a6131e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/webgl-shadertoy.svg)](https://www.npmjs.com/package/@thi.ng/webgl-shadertoy)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/webgl-shadertoy.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Basic WebGL scaffolding for running interactive fragment shaders via [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast). This is a support package for [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwebgl-shadertoy%5D+in%3Atitle)

## Related packages

- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast) - DSL to define shader code in TypeScript and cross-compile to GLSL, JS and other targets
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib) - Function collection for modular GPGPU / shader programming with [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl) - WebGL & GLSL abstraction layer

## Installation

```bash
yarn add @thi.ng/webgl-shadertoy
```

ESM import:

```ts
import * as ws from "@thi.ng/webgl-shadertoy";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/webgl-shadertoy"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 818 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
- [@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-glsl)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Three projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                | Description                                                        | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-easings.png" width="240"/> | Shader-AST meta-programming techniques for animated function plots | [Demo](https://demo.thi.ng/umbrella/shader-ast-easings/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-easings) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-evo.jpg" width="240"/>     | Evolutionary shader generation using genetic programming           | [Demo](https://demo.thi.ng/umbrella/shader-ast-evo/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-evo)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-shadertoy.jpg" width="240"/>    | Shadertoy-like WebGL setup                                         | [Demo](https://demo.thi.ng/umbrella/webgl-shadertoy/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-shadertoy)    |

## API

[Generated API docs](https://docs.thi.ng/umbrella/webgl-shadertoy/)

```ts
import {
    $xy, add, distance, eq, float, FloatSym, fract,
    int, min, mix, mul, neg, ret, sin, sym,
    Vec2Sym, Vec2Term, vec3, Vec3Sym, vec4
} from "@thi.ng/shader-ast";
import { aspectCorrectedUV, fit1101 } from "@thi.ng/shader-ast-stdlib";
import { glCanvas } from "@thi.ng/webgl";
import { MainImageFn, shaderToy } from "@thi.ng/webgl-shadertoy";

const mainImage: MainImageFn = (gl, unis) => {
    // predeclare local vars / symbols
    let uv: Vec2Sym;
    let mp: Vec2Sym;
    let d1: FloatSym;
    let d2: FloatSym;
    let col: Vec3Sym;

    // Inline function to create ring pattern with center at `p`
    const rings = (p: Vec2Term, speed = 0.25, freq = 50) =>
        sin(mul(add(distance(uv, p), fract(mul(unis.time, speed))), freq));

    return [
        // let's work in [-1..+1] range (based on vertical resolution)
        (uv = sym(aspectCorrectedUV($xy(gl.gl_FragCoord), unis.resolution))),
        (mp = sym(aspectCorrectedUV(unis.mouse, unis.resolution))),
        // compute ring colors
        (d1 = sym(rings(mp))),
        (d2 = sym(rings(neg(mp)))),
        // combine rings and multiply with target color based on
        // mouse button state
        (col = sym(
            mul(
                vec3(fit1101(min(d1, d2))),
                mix(
                    vec3(1),
                    vec3(d1, 0, d2),
                    float(eq(unis.mouseButtons, int(1)))
                )
            )
        )),
        // return as vec4 (mandatory)
        ret(vec4(col, 1))
    ];
};

// create WebGL canvas
const canvas = glCanvas({
    width: window.innerWidth,
    height: window.innerHeight,
    parent: document.body,
    version: 1
});

// init shader toy with canvas & shader fn
const toy = shaderToy({
    canvas: canvas.canvas,
    gl: canvas.gl,
    main: mainImage
});

toy.start();
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-webgl-shadertoy,
  title = "@thi.ng/webgl-shadertoy",
  author = "Karsten Schmidt",
  note = "https://thi.ng/webgl-shadertoy",
  year = 2019
}
```

## License

&copy; 2019 - 2025 Karsten Schmidt // Apache License 2.0
