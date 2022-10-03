<!-- This file is generated - DO NOT EDIT! -->

# ![logger](https://media.thi.ng/umbrella/banners-20220914/thing-logger.svg?fe782804)

[![npm version](https://img.shields.io/npm/v/@thi.ng/logger.svg)](https://www.npmjs.com/package/@thi.ng/logger)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/logger.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Types & basis infrastructure for arbitrary logging (w/ default impls).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Blogger%5D+in%3Atitle)

## Related packages

- [@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-log) - Structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Installation

```bash
yarn add @thi.ng/logger
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/logger"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const logger = await import("@thi.ng/logger");
```

Package sizes (gzipped, pre-treeshake): ESM: 529 bytes

## Dependencies

None

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                             | Description                                                      | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-float-fbo.jpg" width="240"/> | Drawing to floating point offscreen / multi-pass shader pipeline | [Demo](https://demo.thi.ng/umbrella/webgl-float-fbo/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-float-fbo) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-canvas.png" width="240"/>      | Zig-based DOM creation & canvas drawing app                      | [Demo](https://demo.thi.ng/umbrella/zig-canvas/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-canvas)      |

## API

[Generated API docs](https://docs.thi.ng/umbrella/logger/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-logger,
  title = "@thi.ng/logger",
  author = "Karsten Schmidt",
  note = "https://thi.ng/logger",
  year = 2016
}
```

## License

&copy; 2016 - 2022 Karsten Schmidt // Apache Software License 2.0
