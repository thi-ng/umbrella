# @thi.ng/webgl

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/webgl.svg)](https://www.npmjs.com/package/@thi.ng/webgl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/webgl.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Features](#features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Support packages](#support-packages)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Declarative WebGL 1.0 / 2.0 abstraction layer, partially ported &
updated from Clojure/ClojureScript versions of
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
    - also supported by bundled shader presets
- Texture wrapper & declarative config
- FBO support with multiple attachments & render buffers
- GPGPU job utilities
- Geometry & texture generators
- WebGL extension helpers
- WebGL canvas creation / setup

Status: Alpha / WIP

## Installation

```bash
yarn add @thi.ng/webgl
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/master/packages/associative)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/master/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast)
- [@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-glsl)
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-stdlib)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/master/packages/vector-pools)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Support packages

- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-stdlib) (also see readme for reference)
- [@thi.ng/webgl-msdf](https://github.com/thi-ng/umbrella/tree/master/packages/webgl-msdf)

## Usage examples

Several examples are included in the [/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
folder of this repo...

- [2D SDF](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-sdf2d)
- [Raymarching](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-raymarch)
- [Simplex noise](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-noise)
- [Textured tunnel](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-tunnel)
- [Cubemap](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-cubemap)
- [Grid instancing](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-grid)
- [GPGPU basics](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-gpgpu-basics)
- [MSDF font rendering](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-msdf)
- [SSAO deferred rendering](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-ssao)

## Authors

- Karsten Schmidt

## License

&copy; 2014 - 2019 Karsten Schmidt // Apache Software License 2.0
