<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/shader-ast-glsl

[![npm version](https://img.shields.io/npm/v/@thi.ng/shader-ast-glsl.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-glsl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-glsl.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

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
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast).
Currently supports GLSL ES 1.00 (WebGL) & GLSL ES 3.00 (WebGL 2).

This package is also used for shader assembly by
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl).

### Status

**STABLE** - used in production

### Related packages

- [@thi.ng/shader-ast-js](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-js) - Customizable JS code generator, compiler & runtime for [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib) - Function collection for modular GPGPU / shader programming with [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl) - WebGL & GLSL abstraction layer

## Installation

```bash
yarn add @thi.ng/shader-ast-glsl
```

Package sizes (gzipped): ESM: 1.3KB / CJS: 1.3KB / UMD: 1.4KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

### shader-ast-canvas2d <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-01.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-canvas2d/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-canvas2d)

### shader-ast-noise <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/shader-ast-noise/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-noise)

### shader-ast-raymarch <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-raymarch.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-raymarch/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-raymarch)

### shader-ast-sdf2 <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/shader-ast-sdf2/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-sdf2)

### shader-ast-tunnel <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/shader-ast-tunnel/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-tunnel)

### soa-ecs <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png)

[Live demo](https://demo.thi.ng/umbrella/soa-ecs/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs)

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

Karsten Schmidt

## License

&copy; 2019 - 2020 Karsten Schmidt // Apache Software License 2.0
