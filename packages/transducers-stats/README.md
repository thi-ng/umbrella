# @thi.ng/transducers-stats

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/transducers-stats.svg)](https://www.npmjs.com/package/@thi.ng/transducers-stats)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Supported indicators](#supported-indicators)
- [Installation](#installation)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

This package provides a set of
[transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
for [technical
(financial)](https://en.wikipedia.org/wiki/Technical_indicator) and
statistical analysis and replaces the older
[@thi.ng/indicators](https://github.com/thi-ng/indicators).

## Supported indicators

- [Bollinger Bands](https://github.com/thi-ng/indicators/blob/master/src/bollinger.ts)
- [Donchian Channel](https://github.com/thi-ng/indicators/blob/master/src/donchian.ts)
- [EMA (Exponential Moving Average)](https://github.com/thi-ng/indicators/blob/master/src/ema.ts)
- [HMA (Hull Moving Average)](https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/hull-moving-average)
- [Momentum](https://github.com/thi-ng/indicators/blob/master/src/momentum.ts)
- [ROC (Rate of change)](https://github.com/thi-ng/indicators/blob/master/src/roc.ts)
- [RSI (Relative Strength Index)](https://github.com/thi-ng/indicators/blob/master/src/rsi.ts)
- [SD (Standard Deviation)](https://github.com/thi-ng/indicators/blob/master/src/sd.ts)
- [SMA (Simple Moving Average)](https://github.com/thi-ng/indicators/blob/master/src/sma.ts)
- [TRIX (Triple smoothed EMA)](https://github.com/thi-ng/indicators/blob/master/src/trix.ts)
- [WMA (Weighted Moving Average)](https://github.com/thi-ng/indicators/blob/master/src/wma.ts)

## Installation

```bash
yarn add @thi.ng/transducers-stats
```

## Usage examples

```ts
import * as stats from "@thi.ng/transducers-stats";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
