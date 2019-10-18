# @thi.ng/simd

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/simd.svg)](https://www.npmjs.com/package/@thi.ng/simd)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/simd.svg)
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

WASM based SIMD vector operations for batch processing, written in
[AssemblyScript](https://docs.assemblyscript.org/).

## Installation

```bash
yarn add @thi.ng/simd
```

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)

## Usage examples

```ts
import { init } from "@thi.ng/simd";

(async () => {
    const simd = await init("simd.wasm", new WebAssembly.Memory({ initial: 1 })); })();
    const f32 = new Float32Array(simd.memory.buffer);
    // input data: 3x vec4
    f32.set([
        1, 2, 3, 4,
        10, 20, 30, 40,
        40, 30, 20, 10
    ]);

    // compute dot products
    simd.dot4(
        48, // output addr / pointer (bytes)
        0,  // vector A addr (bytes)
        16, // vector B addr (bytes)
        2,  // number of vectors to process
        1,  // output stride (floats)
        0,  // A stride (floats)
        4   // B stride (floats)
    );
    // by using 0 as stride for A, all dot products are using [1,2,3,4] for A

    // result for dot(a0, b0)
    f32[48 >> 2];
    // 300

    // result for dot(a0, b1)
    f32[(48 >> 2) + 1];
    // 200
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
