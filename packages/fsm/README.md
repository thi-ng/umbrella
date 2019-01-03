# @thi.ng/fsm

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/fsm.svg)](https://www.npmjs.com/package/@thi.ng/fsm)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/fsm.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

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

Primitives for building transducer based Finite-State machines and
parsers (not necessarily text based).

See the [minimal markdown parser
example](https://github.com/thi-ng/umbrella/tree/feature/fsm/examples/markdown)
for a concrete use case.

## Status

ALPHA.

## Installation

```bash
yarn add @thi.ng/fsm
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

```ts
import * as fsm from "@thi.ng/fsm";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
