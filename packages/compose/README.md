# @thi.ng/compose

[![npm version](https://img.shields.io/npm/v/@thi.ng/compose.svg)](https://www.npmjs.com/package/@thi.ng/compose)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/compose.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

-   [About](#about)
-   [Installation](#installation)
-   [Dependencies](#dependencies)
-   [Usage examples](#usage-examples)
-   [Authors](#authors)
-   [License](#license)

<!-- /TOC -->

## About

Functional composition helpers:

-   [comp()](https://github.com/thi-ng/umbrella/tree/master/packages/compose/src/comp.ts)
-   [compL()](https://github.com/thi-ng/umbrella/tree/master/packages/compose/src/comp.ts#L52)
-   [juxt()](https://github.com/thi-ng/umbrella/tree/master/packages/compose/src/juxt.ts)
-   [partial()](https://github.com/thi-ng/umbrella/tree/master/packages/compose/src/partial.ts)
-   [threadFirst()](https://github.com/thi-ng/umbrella/tree/master/packages/compose/src/thread-first.ts)
-   [threadLast()](https://github.com/thi-ng/umbrella/tree/master/packages/compose/src/thread-last.ts)
-   [trampoline()](https://github.com/thi-ng/umbrella/tree/master/packages/compose/src/trampoline.ts)

## Installation

```bash
yarn add @thi.ng/compose
```

## Dependencies

-   [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
-   [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)

## Usage examples

```ts
import { comp, compL, juxt } from "@thi.ng/compose";
```

## Authors

-   Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
