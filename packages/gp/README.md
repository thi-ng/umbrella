<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/gp](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-gp.svg?964bfbe6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/gp.svg)](https://www.npmjs.com/package/@thi.ng/gp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/gp.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
  - [Blog posts](#blog-posts)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Genetic programming helpers & strategies (tree based & multi-expression programming).

This package does not (yet) provide a complete GP framework and is
largely focused on the following operations:

- General GP setup configuration
- Genotype / chromosome / AST generation
- Phenotype / chromosome translation
- Offspring generation
    - Crossover (single-point, uniform)
    - Mutation

Does *not* specifically deal with:

- Population management
- AST evaluation
- Fitness computation

References:

- [Evolutionary failures (blog post)](https://medium.com/@thi.ng/evolutionary-failures-part-1-54522c69be37)
- [Multi Expression Programming (Oltean, Dumitrescu)](https://www.mepx.org/oltean_mep.pdf)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgp%5D)

## Related packages

- [@thi.ng/defmulti](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/defmulti) - Dynamic, extensible multiple dispatch via user supplied dispatch function.
- [@thi.ng/pointfree](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/pointfree) - Pointfree functional composition / Forth style stack execution engine
- [@thi.ng/sexpr](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/sexpr) - Extensible S-Expression parser & runtime infrastructure
- [@thi.ng/shader-ast](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/shader-ast) - DSL to define shader code in TypeScript and cross-compile to GLSL, JS and other targets
- [@thi.ng/zipper](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/zipper) - Functional tree editing, manipulation & navigation

### Blog posts

- [Evolutionary failures (Part 1)](https://medium.com/@thi.ng/evolutionary-failures-part-1-54522c69be37)

## Installation

```bash
yarn add @thi.ng/gp
```

ESM import:

```ts
import * as gp from "@thi.ng/gp";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/gp"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gp = await import("@thi.ng/gp");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.28 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)
- [@thi.ng/random](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/random)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)
- [@thi.ng/zipper](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/zipper)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                                    | Description                                              | Live demo                                            | Source                                                                             |
|:------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|:-----------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/shader-ast-evo.jpg" width="240"/> | Evolutionary shader generation using genetic programming | [Demo](https://demo.thi.ng/umbrella/shader-ast-evo/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-ast-evo) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/gp/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-gp,
  title = "@thi.ng/gp",
  author = "Karsten Schmidt",
  note = "https://thi.ng/gp",
  year = 2019
}
```

## License

&copy; 2019 - 2026 Karsten Schmidt // Apache License 2.0
