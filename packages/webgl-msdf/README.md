<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/webgl-msdf](https://media.thi.ng/umbrella/banners-20230807/thing-webgl-msdf.svg?41eeb5f3)

[![npm version](https://img.shields.io/npm/v/@thi.ng/webgl-msdf.svg)](https://www.npmjs.com/package/@thi.ng/webgl-msdf)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/webgl-msdf.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Multi-channel SDF font rendering & basic text layout for WebGL. This is a support package for [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl).

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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwebgl-msdf%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/webgl-msdf
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/webgl-msdf"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const webglMsdf = await import("@thi.ng/webgl-msdf");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.56 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/develop/packages/vector-pools)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                        | Description                                 | Live demo                                        | Source                                                                        |
|:------------------------------------------------------------------------------------------------------------------|:--------------------------------------------|:-------------------------------------------------|:------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-msdf.jpg" width="240"/> | WebGL MSDF text rendering & particle system | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-msdf) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/webgl-msdf/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-webgl-msdf,
  title = "@thi.ng/webgl-msdf",
  author = "Karsten Schmidt",
  note = "https://thi.ng/webgl-msdf",
  year = 2019
}
```

## License

&copy; 2019 - 2024 Karsten Schmidt // Apache License 2.0
