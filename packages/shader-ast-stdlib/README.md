# @thi.ng/shader-ast-stdlib

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast-stdlib.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-stdlib)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-stdlib.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
    - [Basic Lambert shader](#basic-lambert-shader)
    - [Generated vertex shader](#generated-vertex-shader)
    - [Generated fragment shader](#generated-fragment-shader)
- [API](#api)
    - [Color](#color)
    - [Fog](#fog)
    - [Lighting](#lighting)
    - [Math](#math)
    - [Matrix operations](#matrix-operations)
    - [Noise / randomness](#noise--randomness)
    - [Raymarching](#raymarching)
    - [Screen coordinates](#screen-coordinates)
    - [Texture lookups](#texture-lookups)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

A growing collection of useful functions & higher order constructs for
GPU / shader programming, acting as optional standard library for
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast)
based workflows.

These functions can be imported like normal TS/JS functions and (in TS)
are fully type checked.

Some of the functions have been ported from GLSL:

- Signed Distance Field primitives and operations are based on work by
Inigo Quilezles (iq).
- Hash functions (PRNGs) by Dave Hoskins
- Noise functions by Ashima Arts / Stefan Gustavson
- Various functions from thi.ng/shadergraph, thi.ng/vectors,
  thi.ng/matrices, thi.ng/color

Reference:

- http://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
- http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
- https://www.shadertoy.com/view/4djSRW
- https://github.com/ashima/webgl-noise

## Installation

```bash
yarn add @thi.ng/shader-ast-stdlib
```

## Dependencies

- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast)

## Usage examples

There're are several `shader-ast` & `webgl` examples in the
[/examples](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples)
folder of this repo, for example...

(Non-exhaustive list)

- [Canvas2D shader](https://demo.thi.ng/umbrella/shader-ast-canvas2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-canvas2d)
- [2D SDF](https://demo.thi.ng/umbrella/shader-ast-sdf2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-sdf2d)
- [Raymarching](https://demo.thi.ng/umbrella/shader-ast-raymarch/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-raymarch)
- [Textured tunnel](https://demo.thi.ng/umbrella/shader-ast-tunnel/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-tunnel)

### Basic Lambert shader

Below is a brief demonstration of a fully defined shader pair,
implementing basic diffuse lighting:

```ts
import { assign, defMain, vec4 } from "@thi.ng/shader-ast";
import { diffuseLighting, halfLambert, transformMVP } from "@thi.ng/shader-ast-stdlib";
import { shader } from "@thi.ng/webgl";

// obtain WebGL/WebGL2 context
// the generated shader code will automatically target the right GLSL version
const gl = ...

// transpile & instantiate fully working shader
const myShader = shader(gl, {
    // vertex shader fn
    // given args are symbolic uniforms, attribs, varyings & GL builtin vars
    vs: (gl, unis, ins, outs) => [
        defMain(() => [
            assign(outs.vnormal, ins.normal),
            assign(gl.gl_Position, transformMVP(ins.position, unis.model, unis.view, unis.proj)),
        ])
    ],
    // fragment shader fn
    // here `ins` are "varying" & `outs` are output variables
    fs: (gl, unis, ins, outs) => [
        defMain(() => [
            assign(
                outs.fragCol,
                vec4(
                    diffuseLighting(
                        halfLambert(normalize(ins.vnormal), unis.lightDir),
                        unis.diffuseCol,
                        unis.lightCol,
                        unis.ambientCol
                    ),
                    1
                )
            )
        ])
    ],
    // attribs w/ optional location info
    attribs: {
        position: ["vec3", 0],
        normal: ["vec3", 1]
    },
    varying: {
        vnormal: "vec3"
    },
    // uniforms with optional default values / functions
    uniforms: {
        model: "mat4",
        view: "mat4",
        proj: "mat4",
        lightDir: ["vec3", [0, 1, 0]],
        lightCol: ["vec3", [1, 1, 1]],
        diffuseCol: ["vec3", [0.8, 0, 0]],
        ambientCol: ["vec3", [0.1, 0.1, 0.1]]
    }
});
```

### Generated vertex shader

The `#define`s are auto-injected by default, but can be disabled /
customized / replaced...

```glsl
#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp int;
precision highp float;
#else
precision mediump int;
precision mediump float;
#endif
#ifndef PI
#define PI 3.141592653589793
#endif
#ifndef TAU
#define TAU 6.283185307179586
#endif
#ifndef HALF_PI
#define HALF_PI 1.570796326794896
#endif

uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;
uniform mat4 normalMat;
uniform vec3 lightDir;
uniform vec3 lightCol;
uniform vec3 diffuseCol;
uniform vec3 ambientCol;
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
out vec3 vnormal;
void main() {
vnormal = normal;
gl_Position = ((proj * (view * model)) * vec4(position, 1.0));
}
```

### Generated fragment shader

The `fragColor` output variable is auto-created by
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl)
if no other output vars are defined. For WebGL v1 this is defined as an
alias for `gl_FragColor`...

```glsl
#version 300 es

/* (omitting #define's for bevity, same as in VS) */

uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;
uniform mat4 normalMat;
uniform vec3 lightDir;
uniform vec3 lightCol;
uniform vec3 diffuseCol;
uniform vec3 ambientCol;
in vec3 vnormal;
layout(location=0) out vec4 fragColor;
void main() {
fragColor = vec4((((lightCol * ((dot(normalize(vnormal), lightDir) * 0.5) + 0.5)) * diffuseCol) + ambientCol), 1.0);
}
```

## API

TODO. For now, please see doc strings in source for details...

### Color

### Fog

### Lighting

### Math

### Matrix operations

### Noise / randomness

### Raymarching

### Screen coordinates

### Texture lookups

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
