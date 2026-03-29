# rstream-dataflow

[Live demo](https://demo.thi.ng/umbrella/rstream-dataflow/)

Please refer to the [example build
instructions](https://codeberg.org/thi.ng/umbrella/wiki/Example-build-instructions)
on the wiki.

## About

![dataflow graph](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/rs-dflow.png)

This example combines the following packages to create & execute the
above dataflow graph in a declarative manner. The diagram generation
itself is part of the example and handled via the @thi.ng/rstream-dot
package.

- [@thi.ng/atom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/atom) - state container
- [@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom) - UI component rendering
- [@thi.ng/paths](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/paths) - nested value accessors
- [@thi.ng/resolve-map](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/resolve-map) - DAG-based object resolution
- [@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream) - reactive stream constructs
- [@thi.ng/rstream-dot](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream-dot) - GraphViz DOT output of graph topology
- [@thi.ng/rstream-gestures](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream-gestures) - unified mouse & single-touch event stream
- [@thi.ng/rstream-graph](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream-graph) - declarative dataflow graph creation
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers) - data transformations (here used for stream transforms)

Please see detailed comments in the source code for further explanations.

## Authors

- Karsten Schmidt

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache Software License 2.0
