<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/webgl-shadertoy

[![npm version](https://img.shields.io/npm/v/@thi.ng/webgl-shadertoy.svg)](https://www.npmjs.com/package/@thi.ng/webgl-shadertoy)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/webgl-shadertoy.svg)
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
- [Authors](#authors)
- [License](#license)

## About

Basic WebGL scaffolding for running interactive fragment shaders via [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast). This is a support package for [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl).

### Status

**ALPHA** - bleeding edge / work-in-progress

### Related packages

- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast) - DSL to define shader code in TypeScript and cross-compile to GLSL, JS and other targets
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-stdlib) - Function collection for modular GPGPU / shader programming with [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl) - WebGL & GLSL abstraction layer

## Installation

```bash
yarn add @thi.ng/webgl-shadertoy
```

Package sizes (gzipped): ESM: 0.7KB / CJS: 0.7KB / UMD: 0.8KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast)
- [@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-glsl)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### shader-ast-evo <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/shader-ast-evo.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-evo/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-evo)

### webgl-shadertoy <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/webgl-shadertoy/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-shadertoy)

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

Karsten Schmidt

## License

&copy; 2019 - 2020 Karsten Schmidt // Apache Software License 2.0
