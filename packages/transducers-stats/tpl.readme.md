<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides a set of
[transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
for [technical
(financial)](https://en.wikipedia.org/wiki/Technical_indicator) and
statistical analysis and replaces the older
[@thi.ng/indicators](https://github.com/thi-ng/indicators) package.

The transducers provided here accept an optional input iterable, which
allows them them to be used directly instead of having to wrap their
call in one of the transducer execution functions (i.e. `transduce()`,
`iterator()`). If executed this way, the functions will return a
transforming ES6 iterator (generator) instead of a transducer.

## Supported indicators

- [Bollinger Bands](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/bollinger.ts)
- [Donchian Channel](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/donchian.ts)
- [EMA (Exponential Moving Average)](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/ema.ts)
- [HMA (Hull Moving Average)](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/hma.ts)
- [MACD (Moving Average Convergence/Divergence)](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/macd.ts)
- [Momentum](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/momentum.ts)
- [Moving Maximum](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/moving-maximum.ts)
- [Moving Minimum](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/moving-minimum.ts)
- [ROC (Rate of change)](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/roc.ts)
- [RSI (Relative Strength Index)](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/rsi.ts)
- [SD (Standard Deviation)](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/sd.ts)
- [SMA (Simple Moving Average)](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/sma.ts)
- [Stochastic oscillator](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/stochastic.ts)
- [TRIX (Triple smoothed EMA)](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/trix.ts)
- [WMA (Weighted Moving Average)](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-stats/src/wma.ts)

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

```ts
import * as tx from "@thi.ng/transducers";
import * as stats from "@thi.ng/transducers-stats";

// Simple moving average (SMA) (sliding window size 5)
// if an input is given (as is the case here), then returns
// a transforming iterator instead of transducer
[...stats.sma(5, [1,2,3,4,5,10,11,12,13,14,9,8,7,6,5])]
// [ 3, 4.8, 6.6, 8.4, 10.2, 12, 11.8, 11.2, 10.2, 8.8, 7 ]

// compute multiple stats at once
tx.transduce(
    tx.comp(
        tx.multiplexObj({
            sma: stats.sma(5),
            ema: stats.ema(5),
            wma: stats.wma(5)
        }),
        // ignore first `period-1` values
        // (because MAs require at least `period` inputs to warm up)
        tx.drop(4)
    ),
    tx.push(),
    [1,2,3,4,5,10,11,12,13,14,9,8,7,6,5]
);
// [ { wma: 3.6666666666666665, ema: 3, sma: 3 },
//   { wma: 6, ema: 5.333333333333333, sma: 4.8 },
//   { wma: 8.066666666666666, ema: 7.222222222222221, sma: 6.6 },
//   { wma: 9.866666666666667, ema: 8.814814814814815, sma: 8.4 },
//   { wma: 11.4, ema: 10.209876543209877, sma: 10.2 },
//   { wma: 12.666666666666666, ema: 11.473251028806585, sma: 12 },
//   { wma: 11.666666666666666, ema: 10.64883401920439, sma: 11.8 },
//   { wma: 10.4, ema: 9.76588934613626, sma: 11.2 },
//   { wma: 9, ema: 8.843926230757507, sma: 10.2 },
//   { wma: 7.6, ema: 7.895950820505004, sma: 8.8 },
//   { wma: 6.333333333333333, ema: 6.93063388033667, sma: 7 } ]
```

<!-- include ../../assets/tpl/footer.md -->
