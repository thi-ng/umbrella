<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/webgl-msdf

[![npm version](https://img.shields.io/npm/v/@thi.ng/webgl-msdf.svg)](https://www.npmjs.com/package/@thi.ng/webgl-msdf)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/webgl-msdf.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Multi-channel SDF font rendering & basic text layout for WebGL. This is a support package for [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl).

This package provides [multi-channel SDF font
rendering](https://github.com/Chlumsky/msdfgen) capabilities for
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl),
incl. optional support for basic text alignment, vertex colors (e.g. for
multi-color text), and shader options to draw outlines for each
character. Furthermore, the key GLSL functions are provided as shader
snippets to embed this functionality in custom shaders without having to
resort to copy & paste.

There're different versions of MSDF font generators. The format
supported by this module is based on [Don
McCurdy's](https://msdf-bmfont.donmccurdy.com/).

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/webgl-msdf
```

Package sizes (gzipped): ESM: 1.5KB / CJS: 1.5KB / UMD: 1.6KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/master/packages/vector-pools)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### webgl-msdf <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/webgl-msdf.jpg)

[Live demo](https://demo.thi.ng/umbrella/webgl-msdf/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-msdf)

## API

[Generated API docs](https://docs.thi.ng/umbrella/webgl-msdf/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2019 - 2020 Karsten Schmidt // Apache Software License 2.0
