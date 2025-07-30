<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/webgl](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-webgl.svg?484c1a5a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/webgl.svg)](https://www.npmjs.com/package/@thi.ng/webgl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/webgl.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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
      [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast))
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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwebgl%5D+in%3Atitle)

## Support packages

- [@thi.ng/webgl-msdf](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl-msdf) - Multi-channel SDF font rendering & basic text layout for WebGL
- [@thi.ng/webgl-shadertoy](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl-shadertoy) - Basic WebGL scaffolding for running interactive fragment shaders via [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)

## Related packages

- [@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/develop/packages/ecs) - Entity Component System based around typed arrays & sparse sets
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation
- [@thi.ng/imgui](https://github.com/thi-ng/umbrella/tree/develop/packages/imgui) - Immediate mode GUI with flexible state handling & data only shape output
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices) - Matrix & quaternion operations for 2D/3D geometry processing
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast) - DSL to define shader code in TypeScript and cross-compile to GLSL, JS and other targets
- [@thi.ng/soa](https://github.com/thi-ng/umbrella/tree/develop/packages/soa) - SOA & AOS memory mapped structured views with optional & extensible serialization
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations, support for memory mapping/layouts
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/develop/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors
- [@thi.ng/wasm-api-webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api-webgl) - WebGL bridge API for hybrid TypeScript & WASM (Zig) applications

## Installation

```bash
yarn add @thi.ng/webgl
```

ESM import:

```ts
import * as gl from "@thi.ng/webgl";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/webgl"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 11.67 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/canvas)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices)
- [@thi.ng/memoize](https://github.com/thi-ng/umbrella/tree/develop/packages/memoize)
- [@thi.ng/object-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/object-utils)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)
- [@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-glsl)
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/develop/packages/vector-pools)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

23 projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                    | Description                                                                   | Live demo                                                    | Source                                                                                    |
|:------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|:-------------------------------------------------------------|:------------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-webgl-attrib-pool.jpg" width="240"/> | Augmenting thi.ng/geom shapes for WebGL, using instancing & attribute buffers | [Demo](https://demo.thi.ng/umbrella/geom-webgl-attrib-pool/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-webgl-attrib-pool) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-webgl-basics.jpg" width="240"/>      | Converting thi.ng/geom shape types for WebGL                                  | [Demo](https://demo.thi.ng/umbrella/geom-webgl-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-webgl-basics)      |
|                                                                                                                               | GPU-based data reduction using thi.ng/shader-ast & WebGL multi-pass pipeline  | [Demo](https://demo.thi.ng/umbrella/gpgpu-reduce/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gpgpu-reduce)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-easings.png" width="240"/>     | Shader-AST meta-programming techniques for animated function plots            | [Demo](https://demo.thi.ng/umbrella/shader-ast-easings/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-easings)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-evo.jpg" width="240"/>         | Evolutionary shader generation using genetic programming                      | [Demo](https://demo.thi.ng/umbrella/shader-ast-evo/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-evo)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-noise.jpg" width="240"/>       | HOF shader procedural noise function composition                              | [Demo](https://demo.thi.ng/umbrella/shader-ast-noise/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-noise)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-raymarch.jpg" width="240"/>  | WebGL & JS canvas2D raymarch shader cross-compilation                         | [Demo](https://demo.thi.ng/umbrella/shader-ast-raymarch/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-raymarch)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-sdf2d.jpg" width="240"/>       | WebGL & JS canvas 2D SDF                                                      | [Demo](https://demo.thi.ng/umbrella/shader-ast-sdf2d/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-sdf2d)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-tunnel.jpg" width="240"/>      | WebGL & Canvas2D textured tunnel shader                                       | [Demo](https://demo.thi.ng/umbrella/shader-ast-tunnel/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-tunnel)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-graph.jpg" width="240"/>           | Minimal shader graph developed during livestream #2                           | [Demo](https://demo.thi.ng/umbrella/shader-graph/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-graph)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/soa-ecs-100k.png" width="240"/>           | Entity Component System w/ 100k 3D particles                                  | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)                | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/soa-ecs)                |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/>    | rdom & WebGL-based image channel editor                                       | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-channel-mixer)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cube.png" width="240"/>             | WebGL multi-colored cube mesh                                                 | [Demo](https://demo.thi.ng/umbrella/webgl-cube/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cube)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cubemap.jpg" width="240"/>          | WebGL cube maps with async texture loading                                    | [Demo](https://demo.thi.ng/umbrella/webgl-cubemap/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cubemap)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-float-fbo.jpg" width="240"/>        | Drawing to floating point offscreen / multi-pass shader pipeline              | [Demo](https://demo.thi.ng/umbrella/webgl-float-fbo/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-float-fbo)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-game-of-life.png" width="240"/>     | Game of Life implemented as WebGL2 multi-pass shader pipeline                 | [Demo](https://demo.thi.ng/umbrella/webgl-game-of-life/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-game-of-life)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-grid.jpg" width="240"/>             | WebGL instancing, animated grid                                               | [Demo](https://demo.thi.ng/umbrella/webgl-grid/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-grid)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-msdf.jpg" width="240"/>             | WebGL MSDF text rendering & particle system                                   | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-msdf)             |
|                                                                                                                               | Minimal multi-pass / GPGPU example                                            | [Demo](https://demo.thi.ng/umbrella/webgl-multipass/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-multipass)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-shadertoy.jpg" width="240"/>        | Shadertoy-like WebGL setup                                                    | [Demo](https://demo.thi.ng/umbrella/webgl-shadertoy/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-shadertoy)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-ssao.jpg" width="240"/>             | WebGL screenspace ambient occlusion                                           | [Demo](https://demo.thi.ng/umbrella/webgl-ssao/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-ssao)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-texture-paint.jpg" width="240"/>    | Interactively drawing to & reading from a WebGL offscreen render texture      | [Demo](https://demo.thi.ng/umbrella/webgl-texture-paint/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-texture-paint)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-webgl.avif" width="240"/>             | Basic Zig/WebAssembly WebGL demo                                              | [Demo](https://demo.thi.ng/umbrella/zig-webgl/)              | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-webgl)              |

## API

[Generated API docs](https://docs.thi.ng/umbrella/webgl/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [@nkint](https://github.com/nkint)
- [@stwind](https://github.com/stwind)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-webgl,
  title = "@thi.ng/webgl",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/webgl",
  year = 2014
}
```

## License

&copy; 2014 - 2025 Karsten Schmidt // Apache License 2.0
