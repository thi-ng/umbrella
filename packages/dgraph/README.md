# @thi.ng/dgraph

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/dgraph.svg)](https://www.npmjs.com/package/@thi.ng/dgraph)

## About

Type-agnostic directed acyclic graph (DAG), using
[@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/master/packages/associative)
maps & sets as backend.

### Features

- cycle detection
- accessors for direct & transitive dependencies / dependents
- topological sorting
- iterable

## Installation

```bash
yarn add @thi.ng/dgraph
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/master/packages/associative)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/iterators](https://github.com/thi-ng/umbrella/tree/master/packages/iterators)

## Usage examples

```ts
import { DGraph } from "@thi.ng/dgraph";

g = new DGraph();
g.addDependency([1, 2], [10, 20]);
g.addDependency([3, 4], [30, 40]);
g.addDependency([1, 2], [3, 4]);

g.sort()
// [[30, 40], [3, 4], [10, 20], [1, 2]]
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
