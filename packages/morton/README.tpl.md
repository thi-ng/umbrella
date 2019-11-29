# ${pkg.name}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

[Z-order-curve](https://en.wikipedia.org/wiki/Z-order_curve) / Morton
encoding & decoding for 1D, 2D, 3D.

References:

- [Decoding Morton Codes](https://fgiesen.wordpress.com/2009/12/13/decoding-morton-codes/)
- [Morton encoding/decoding through bit interleaving](https://www.forceflow.be/2013/10/07/morton-encodingdecoding-through-bit-interleaving-implementations/)
- [github.com/JaneliaSciComp/Morton.jl](https://github.com/JaneliaSciComp/Morton.jl/blob/master/src/Morton.jl)
- [Z-Order Indexing for Multifaceted Queries in Amazon DynamoDB](https://aws.amazon.com/blogs/database/z-order-indexing-for-multifaceted-queries-in-amazon-dynamodb-part-1/)

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

```bash
yarn add ${pkg.name}
```

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

```ts
import * as m from "@thi.ng/morton";

m.mux2(23, 42);
// 2461

m.demux2(2461)
// [ 23, 42 ]

m.muxScaled2(0.25, 0.75)
// 2594876074

m.demuxScaled2(m.muxScaled2(0.25, 0.75))
// [ 0.2500038147554742, 0.7499961852445258 ]
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
