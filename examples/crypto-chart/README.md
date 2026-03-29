# crypto-chart

![screenshot](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/crypto-chart.png)

[Live demo](https://s3.amazonaws.com/demo.thi.ng/umbrella/crypto-chart/index.html)

Price data provided by [cryptocompare.com](https://min-api.cryptocompare.com/).

This example demonstrates how to use
[@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream)
&
[@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)
constructs to create a basic crypto-currency candle chart with multiple
moving averages plots. Unlike most other examples in this repo, there's
no additional state handling used (e.g. via
[@thi.ng/atom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/atom)
constructs) and the entire app largely relies on various stream
combinators & transformers. Furthermore, this approach only triggers UI
updates / diffs when there were any relevant upstream value changes.

The diagram below shows a schematic of the dataflow graph used:

![dataflow](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/crypto-dflow.png)

## Building

Please refer to the [example build
instructions](https://codeberg.org/thi.ng/umbrella/wiki/Example-build-instructions)
on the wiki.

## Authors

- Karsten Schmidt

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache Software License 2.0
