# @thi.ng/webgl-msdf

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/webgl-msdf.svg)](https://www.npmjs.com/package/@thi.ng/webgl-msdf)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/webgl-msdf.svg)
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

This package provides [multi-channel SDF font
rendering](https://github.com/Chlumsky/msdfgen) capabilities for
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/webgl),
incl. optional support for basic text alignment, vertex colors (e.g. for
multi-color text), and shader options to draw outlines for each
character. Furthermore, the key GLSL functions are provided as shader
snippets to embed this functionality in custom shaders without having to
resort to copy & paste.

There're different versions of MSDF font generators. The format
supported by this module is based on [Don
McCurdy's](https://msdf-bmfont.donmccurdy.com/).

## Installation

```bash
yarn add @thi.ng/webgl-msdf
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/master/packages/vector-pools)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/webgl)

## Usage examples

See the bundled [webgl-msdf example](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/webgl-msdf) for reference...

```ts
import * as msdf from "@thi.ng/webgl-msdf";
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
