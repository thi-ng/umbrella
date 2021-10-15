# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

A growing collection (currently ~170) of useful functions & higher order
constructs (incl. meta programming approaches) for GPU / shader programming,
acting as optional standard library for
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
based workflows.

These functions can be imported like normal TS/JS functions and (in TS) are
fully type checked.

Some of the functions have been ported from GLSL:

- Signed Distance Field primitives and operations are based on work by
Inigo Quilezles (iq), HG_SDF (Mercury).
- Hash functions (PRNGs) by Dave Hoskins
- Noise functions by Ashima Arts / Stefan Gustavson
- Various other functions ported from thi.ng/shadergraph, thi.ng/vectors,
  thi.ng/matrices, thi.ng/color, thi.ng/dsp

Reference:

- http://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
- http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
- http://mercury.sexy/hg_sdf/
- https://www.shadertoy.com/view/4djSRW
- https://github.com/ashima/webgl-noise

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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
    // here `ins` are vertex attribs and `outs` are "varying"
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
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl)
if no other output vars are defined. For WebGL v1 this is defined as an
alias for `gl_FragColor`...

```glsl
#version 300 es

/* (omitting #define's for brevity, same as in VS) */

uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;
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

### Using higher order functions

Several of the functions included here are defined as higher-order
functions, providing powerful functional compositional features not
usually seen in shader code and not easily achievable via the usual
string templating approach used by most other GLSL libraries.

For example, the
[`additive()`](https://docs.thi.ng/umbrella/shader-ast-stdlib/modules.html#additive)
HOF takes a single-arg scalar function and a number of octaves. It returns a new
function which computes the summed value of `fn` over the given number octaves,
with a user defined phase shift & decay factor (per octave). This can be used
for additive wave synthesis, multi-octave noise or any other similar use
cases...

Due to the way user defined AST functions keep track of their own call
graph, the anonymous function returned by `additive` does not need to be
pre-declared in any way and also ensures all of its own function
dependencies are resolved and emitted in the correct topological order
during later code generation.

Below is the main shader code of the [Simplex noise
example](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-noise).

```ts
import { add, defn, float, ret, sym, vec2, vec3, vec4 } from "@thi.ng/shader-ast";
import { additive, aspectCorrectedUV, fit1101, snoise2 } from "@thi.ng/shader-ast-stdlib";

const mainImage = defn(
    "vec4",
    "mainImage",
    ["vec2", "vec2", "float"],
    (frag, res, time) => {
        let uv;
        let noise;
        return [
            // compute UV coords and assign to `uv`
            uv = sym(aspectCorrectedUV(frag, res)),
            // dynamically create a multi-octave version of `snoise2`
            // computed over 4 octaves w/ given phase shift and decay
            // factor (both per octave)
            noise = sym(
                additive("vec2", snoise2, 4)(add(uv, time), vec2(2), float(0.5))
            ),
            // `noise` is in [-1..1] interval, use fit1101 to fit to [0..1]
            ret(vec4(vec3(fit1101(noise)), 1))
        ];
    }
);
```

Run the above-linked example and view the console to see the full
generated shader code. Also check out the raymarching demo which uses
several other HOFs from this library to drastically simplify user code.

## API

TODO. For now, please see doc strings in source for details...

### Color

[/src/color](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/color/)

- `toLinear`
- `toSRGB`
- `luminanceRGB`
- `decodeRGBE`

### Porter-Duff alpha blending

Use the `porterDuff` higher order function to define new blend modes.
See
[@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff)
for reference.

12 standard PD operators for `vec4` RGBA colors:

- `blendSrcOver`
- `blendDestOver`
- `blendSrcIn`
- `blendDestIn`
- `blendSrcOut`
- `blendDestOut`
- `blendSrcAtop`
- `blendDestAtop`
- `blendXor`
- `blendPlus`

### Fog

[/src/fog](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/fog/)

- `fogLinear`
- `fogExp`
- `fogExp2`

### Lighting

[/src/light](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/light/)

- `lambert`
- `halfLambert`
- `diffuseLighting`
- `trilight`

### Math

[/src/math](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/math/)

- `additive`
- `cartesian2` / `cartesian3`
- `clamp01` / `clamp11`
- `cross2` / `crossC2`
- `distChebyshev2` / `distChebyshev3` / `distChebyshev4`
- `distManhattan2` / `distManhattan3` / `distManhattan4`
- `fit01` / `fit11` / `fit1101` / `fit0111`
- `magSq2` / `magSq3` / `magSq4`
- `maxComp2` / `maxComp3` / `maxComp4`
- `minComp2` / `minComp3` / `minComp4`
- `perpendicularCCW` / `perpendicularCW`
- `orthogonal3`
- `polar2` / `polar3`
- `sincos` / `cossin`

### Oscillators

[/src/math](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/math/osc.ts)

- `sinOsc` / `sawOsc` / `triOsc` / `rectOsc`

### Matrix operations

[/src/matrix](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/matrix/)

- `lookat`
- `transformMVP`
- `surfaceNormal`
- `rotation2`
- `rotationX3` / `rotationY3` / `rotationZ3`
- `rotationX4` / `rotationY4` / `rotationZ4`

### Noise / randomness

[/src/noise](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/noise/)

- `hash2` / `hash3`
- `hash11` / `hash12` / `hash13`
- `hash21` / `hash22` / `hash23`
- `hash31` / `hash32` / `hash33`
- `hash41` / `hash42` / `hash43` / `hash44`
- `permute` / `permute3` / `permute4`
- `snoise2`
- `voronoise2`
- `worley2` / `worleyDist` / `worleyDistManhattan`

### Raymarching

[/src/raymarch](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/raymarch/)

- `raymarchAO`
- `raymarchDir`
- `raymarchNormal`
- `raymarchScene`
- `rayPointAt`

### Screen coordinates

[/src/screen](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/screen/)

- `aspectCorrectedUV`

### Signed Distance Fields

[/src/sdf](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/sdf/)

#### Primitives

- `sdfBox2`
- `sdfBox3`
- `sdfCircle`
- `sdfCylinder`
- `sdfLine2`
- `sdfLine3`
- `sdfPlane2`
- `sdfPlane3`
- `sdfSphere`
- `sdfTorus`
- `sdfTriangle2`

#### Polyhedra

- `sdfDodecahedron` / `sdfDodecahedronSmooth`
- `sdfIcosahedron` / `sdfIcosahedronSmooth`
- `sdfOctahedron` / `sdfOctahedronSmooth`
- `sdfTruncatedOctahedron` / `sdfTruncatedOctahedronSmooth`
- `sdfTruncatedIcosahedron` / `sdfTruncatedIcosahedronSmooth`

#### Operators / combinators

- `sdfAnnular`
- `sdfIntersect`
- `sdfMirror2`
- `sdfRepeat2`
- `sdfRepeatPolar2`
- `sdfRepeat3`
- `sdfRound`
- `sdfSubtract`
- `sdfSmoothIntersect` / `sdfSmoothIntersectAll`
- `sdfSmoothSubtract` / `sdfSmoothSubtractAll`
- `sdfSmoothUnion` / `sdfSmoothUnionAll`
- `sdfUnion`

### Texture lookups

[/src/tex](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/tex/)

- `indexToCoord` / `coordToIndex`
- `indexToUV` / `uvToIndex`
- `readIndex1` / `readIndex2` / `readIndex3` / `readIndex4`

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
