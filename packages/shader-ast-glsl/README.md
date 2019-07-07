# @thi.ng/shader-ast-glsl

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast-glsl.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-glsl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-glsl.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

GLSL code generator for
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast).
Currently supports GLSL ES 1.00 (WebGL) & GLSL ES 3.00 (WebGL 2).

This package is also used for shader assembly by
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/webgl).

## Installation

```bash
yarn add @thi.ng/shader-ast-glsl
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast)

## Usage examples

There're are several `shader-ast` & `webgl` examples in the
[/examples](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples)
folder of this repo, for example...

(Possibly non-exhaustive list, live demo links in readme's)

- [2D SDF](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-sdf2d)
- [Raymarching](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-raymarch)
- [Simplex noise](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-noise)
- [Textured tunnel](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-tunnel)
- [Cubemap](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/webgl-cubemap)
- [GPGPU basics](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/webgl-gpgpu-basics)
- [MSDF font rendering](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/webgl-msdf)
- [SSAO deferred rendering](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/webgl-ssao)

Basic GLSL code generation:

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
    prelude: `// custom GLSL source string injection, e.g.
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

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
