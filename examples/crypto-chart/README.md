# crypto-chart

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/crypto-chart.png)

[Live demo](https://s3.amazonaws.com/demo.thi.ng/umbrella/crypto-chart/index.html)

Price data provided by [cryptocompare.com](https://min-api.cryptocompare.com/).

This example demonstrates how to use
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
&
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
constructs to create a basic crypto-currency candle chart with multiple
moving averages plots. Unlike most other examples in this repo, there's
no additional state handling used (e.g. via
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)
constructs) and the entire app largely relies on various stream
combinators & transformers. Furthermore, this approach only triggers UI
updates / diffs when there were any relevant upstream value changes.

The diagram below shows a schematic of the dataflow graph used:

![dataflow](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/crypto-dflow.png)

## Building

Please refer to the [example build
instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions)
on the wiki.

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
