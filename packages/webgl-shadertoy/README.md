# @thi.ng/webgl-shadertoy

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/webgl-shadertoy.svg)](https://www.npmjs.com/package/@thi.ng/webgl-shadertoy)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/webgl-shadertoy.svg)
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

Basic WebGL scaffolding for running interactive fragment shaders defined
via
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast).

## Installation

```bash
yarn add @thi.ng/webgl-shadertoy
```

## Dependencies

- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl)

## Usage examples

```ts
import { glCanvas } from "@thi.ng/webgl";
import { shaderToy } from "@thi.ng/webgl-shadertoy";
import { assign, div, mul, ret, vec4 } from "@thi.ng/shader-ast";

const canvas = glCanvas({
    width: 600,
    height: 600,
    parent: document.body,
    version: 2
});

const toy = shaderToy({
    canvas: canvas.canvas
    gl: canvas.gl,
    main: (gl, unis) => [
        assign(unis.mouse, div(unis.mouse, unis.res)),
        ret(vec4(mul(mouse, div(gl.gl_FragCoord, res)), 0, 1))
    ]
});

toy.start();
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
