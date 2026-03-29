<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/shader-ast-glsl](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-shader-ast-glsl.svg?96d50dd1)

[![npm version](https://img.shields.io/npm/v/@thi.ng/shader-ast-glsl.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-glsl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-glsl.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic GLSL code generation](#basic-glsl-code-generation)
- [Authors](#authors)
- [License](#license)

## About

GLSL code generator for
[@thi.ng/shader-ast](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/shader-ast).
Currently supports GLSL ES 1.00 (WebGL) & GLSL ES 3.00 (WebGL 2).

This package is also used for shader assembly by
[@thi.ng/webgl](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/webgl).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bshader-ast-glsl%5D)

## Related packages

- [@thi.ng/shader-ast-js](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/shader-ast-js) - Customizable JS codegen, compiler & runtime for [@thi.ng/shader-ast](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/shader-ast)
- [@thi.ng/shader-ast-stdlib](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/shader-ast-stdlib) - Function collection for modular GPGPU / shader programming with [@thi.ng/shader-ast](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/shader-ast)
- [@thi.ng/webgl](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/webgl) - WebGL & GLSL abstraction layer

## Installation

```bash
yarn add @thi.ng/shader-ast-glsl
```

ESM import:

```ts
import * as glsl from "@thi.ng/shader-ast-glsl";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/shader-ast-glsl"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const glsl = await import("@thi.ng/shader-ast-glsl");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.32 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/shader-ast](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/shader-ast)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Six projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                           | Description                                           | Live demo                                                 | Source                                                                                  |
|:-------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------|:----------------------------------------------------------|:----------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/shader-ast/shader-ast-01.jpg" width="240"/>       | 2D canvas shader emulation                            | [Demo](https://demo.thi.ng/umbrella/shader-ast-canvas2d/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-ast-canvas2d) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/shader-ast-noise.jpg" width="240"/>      | HOF shader procedural noise function composition      | [Demo](https://demo.thi.ng/umbrella/shader-ast-noise/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-ast-noise)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/shader-ast/shader-ast-raymarch.jpg" width="240"/> | WebGL & JS canvas2D raymarch shader cross-compilation | [Demo](https://demo.thi.ng/umbrella/shader-ast-raymarch/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-ast-raymarch) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/shader-ast-sdf2d.jpg" width="240"/>      | WebGL & JS canvas 2D SDF                              | [Demo](https://demo.thi.ng/umbrella/shader-ast-sdf2d/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-ast-sdf2d)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/shader-ast-tunnel.jpg" width="240"/>     | WebGL & Canvas2D textured tunnel shader               | [Demo](https://demo.thi.ng/umbrella/shader-ast-tunnel/)   | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-ast-tunnel)   |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/soa-ecs-100k.png" width="240"/>          | Entity Component System w/ 100k 3D particles          | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)             | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/soa-ecs)             |

## API

[Generated API docs](https://docs.thi.ng/umbrella/shader-ast-glsl/)

### Basic GLSL code generation

```ts
import { assign, defMain, output, program, uniform, vec4 } from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";

const glsl = targetGLSL({
    // target WebGL2
    version: GLSLVersion.GLSL_300,
    // emit #version pragma
    versionPragma: true,
    // fragment shader
    type: "fs",
    // custom prelude
    prelude: `
// custom GLSL source string injection, e.g.
#define PI 3.1415926`
});

let color: Vec3Symbol;
let fragColor: Vec4Symbol;

glsl(
    program([
        color = uniform("vec3", "color"),
        fragColor = output("vec4", "fragColor", { loc: 0 }),
        defMain(()=> [
            assign(fragColor, vec4(color, 1))
        ])
    ])
)
```

```glsl
#version 300 es

// custom GLSL source string injection, e.g.
#define PI 3.1415926
uniform vec3 color;
layout(location=0) out vec4 fragColor;
void main() {
fragColor = vec4(color, 1.0);
}
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-shader-ast-glsl,
  title = "@thi.ng/shader-ast-glsl",
  author = "Karsten Schmidt",
  note = "https://thi.ng/shader-ast-glsl",
  year = 2019
}
```

## License

&copy; 2019 - 2026 Karsten Schmidt // Apache License 2.0
