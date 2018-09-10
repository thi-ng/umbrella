# @thi.ng/hdom-canvas

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hdom-canvas.svg)](https://www.npmjs.com/package/@thi.ng/hdom-canvas)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Declarative canvas scenegraph & visualization for
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom).

### Status

ALPHA - in active development, possibly breaking changes ahead...

## Installation

```bash
yarn add @thi.ng/hdom-canvas
```

## Dependencies

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Please see the [hdom-canvas-clock]() example for reference.

```ts
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";

start(() => {
    const t = Date.now() * 0.001;
    return [canvas, { width: 100, height: 100 },
        ["circle", { fill: "red", stroke: "black" }, [50, 50], 25 + 25 * Math.sin(t)]
    ];
});
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
