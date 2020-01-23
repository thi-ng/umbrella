<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/webgl

[![npm version](https://img.shields.io/npm/v/@thi.ng/webgl.svg)](https://www.npmjs.com/package/@thi.ng/webgl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/webgl.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Features](#features)
  - [Status](#status)
  - [Support packages](#support-packages)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

WebGL & GLSL abstraction layer.

Largely declarative WebGL 1.0 / 2.0 abstraction layer, partially ported
& updated from Clojure/ClojureScript versions of
[thi.ng/geom](http://thi.ng/geom).

### Features

- Extensive set of WebGL related types & interfaces
- Declarative shader definition
    - option to fully define shaders in TypeScript and transpile to GLSL (via
      [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast))
    - attribute, varying, uniform & output type declarations via a simple config object
    - GLSL code generation of data type declarations
    - automatic support for GLSL ES 1.0 & 3.0
    - optional layout attrib layout support for GLES 3 (WebGL2)
    - automatic & typed uniform setters
    - pre-declared desired GL draw state flags / settings
    - customizable shader presets
- Declarative geometry, attribute & index buffer specs
- Declarative instancing (always available in WebGL2, or via ANGLE ext in WebGL1)
- Texture wrapper, declarative config
- Comprehensive texture format info (channels, strides, renderable, filterable etc.)
- FBO support with multiple attachments & render buffers
- Multi-pass shader pipeline (e.g. for GPGPU tasks)
- Pixel reading from main color buffer and textures
- Geometry & texture generators
- WebGL extension helpers & semi-automatic extension enabling
- WebGL canvas creation / setup

### Status

**BETA** - possibly breaking changes forthcoming

### Support packages

- [@thi.ng/webgl-msdf](https://github.com/thi-ng/umbrella/tree/master/packages/webgl-msdf) - Multi-channel SDF font rendering & basic text layout for WebGL
- [@thi.ng/webgl-shadertoy](https://github.com/thi-ng/umbrella/tree/master/packages/webgl-shadertoy) - Basic WebGL scaffolding for running interactive fragment shaders via [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast)

### Related packages

- [@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/master/packages/ecs) - Entity Component System based around typed arrays & sparse sets
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/master/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation
- [@thi.ng/imgui](https://github.com/thi-ng/umbrella/tree/master/packages/imgui) - Immediate mode GUI with flexible state handling & data only shape output
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices) - Matrix & quaternion operations for 2D/3D geometry processing
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast) - DSL to define shader code in TypeScript and cross-compile to GLSL, JS and other targets
- [@thi.ng/soa](https://github.com/thi-ng/umbrella/tree/master/packages/soa) - SOA & AOS memory mapped structured views with optional & extensible serialization
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/master/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors

## Installation

```bash
yarn add @thi.ng/webgl
```

Package sizes (gzipped): ESM: 11.0KB / CJS: 11.1KB / UMD: 10.9KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/master/packages/associative)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/master/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/master/packages/pixel)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast)
- [@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-glsl)
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-stdlib)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/master/packages/vector-pools)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### shader-ast-evo <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/shader-ast-evo.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-evo/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-evo)

### shader-ast-noise <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/shader-ast-noise/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-noise)

### shader-ast-raymarch <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/shader-ast/shader-ast-raymarch.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-raymarch/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-raymarch)

### shader-ast-sdf2 <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/shader-ast-sdf2/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-sdf2)

### shader-ast-tunnel <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/shader-ast-tunnel/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-tunnel)

### soa-ecs <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/soa-ecs-100k.png)

[Live demo](https://demo.thi.ng/umbrella/soa-ecs/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/soa-ecs)

### webgl-cube <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/webgl-cube/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-cube)

### webgl-cubemap <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/webgl-cubemap/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-cubemap)

### webgl-grid <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/webgl-grid.jpg)

[Live demo](https://demo.thi.ng/umbrella/webgl-grid/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-grid)

### webgl-msdf <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/webgl-msdf.jpg)

[Live demo](https://demo.thi.ng/umbrella/webgl-msdf/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-msdf)

### webgl-multipass <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/webgl-multipass/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-multipass)

### webgl-shadertoy <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/webgl-shadertoy/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-shadertoy)

### webgl-ssao <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/webgl-ssao.jpg)

[Live demo](https://demo.thi.ng/umbrella/webgl-ssao/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-ssao)

## API

[Generated API docs](https://docs.thi.ng/umbrella/webgl/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2014 - 2020 Karsten Schmidt // Apache Software License 2.0
