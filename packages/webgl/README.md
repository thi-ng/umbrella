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
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Declarative WebGL 1.0 / 2.0 low-level abstraction layer, largely ported
& updated from Clojure/ClojureScript versions of
[thi.ng/geom](http://thi.ng/geom) &
[thi.ng/shadergraph](http://thi.ng/shadergraph).

### Features

- declarative shader spec
    - attribute, varying, uniform & output type declarations via a simple config object
    - GLSL code generation of data type declarations
    - automatic support for GLES 1.0 & 3.0
    - optional layout attrib layout support for GLES 3 (WebGL2)
    - automatic & typed uniform setters
    - pre-declared desired GL draw state flags / settings
    - customizable shader presets
- declarative geometry / attribute buffer specs
- declarative instancing (always in WebGL2, in WebGL1, via ANGLE ext)
- 2D texture wrapper & config
- FBO (needs updating WebGL2)
- RenderBuffer (needs updating for WebGL2)
- Declarative GLSL shader assembly via library of pure function snippets
    - automatic resolution of transitive dependencies

Status: Alpha / WIP

## Installation

```bash
yarn add @thi.ng/webgl
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/master/packages/dgraph)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

TODO

Initial test (phong shading & instancing):

[Live demo](https://demo.thi.ng/umbrella/webgl-basics/) / [Source
code](https://gist.github.com/postspectacular/c38741e0a60899a860a241be663cbc81)

```ts
import * as w from "@thi.ng/webgl";
```

## Authors

- Karsten Schmidt

## License

&copy; 2014 - 2019 Karsten Schmidt // Apache Software License 2.0
