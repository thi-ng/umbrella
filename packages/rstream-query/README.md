# @thi.ng/rstream-query

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream-query.svg)](https://www.npmjs.com/package/@thi.ng/rstream-query)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

@thi.ng/rstream based [triple
store](https://en.wikipedia.org/wiki/Triplestore) & reactive query
engine with high re-use ratio of sub-query results. Inserted
facts/triples are broadcast to multiple indexing streams and query
subscriptions attached to them. This enables push-based, auto-updating
query results, which are only changing if upstream transformations &
filters have been triggered.

Unlike with traditional RDF triple stores, any JS data types can be used
as subject, predicate or object (though support for such must be
explicitly enabled).

### Status

This project is currently in pre-ALPHA and intended as a continuation of
the Clojure based [thi.ng/fabric](http://thi.ng/fabric) project, this
time built on the streaming primitives provided by
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream).

## Installation

```
yarn add @thi.ng/rstream-query
```

## Usage examples

```typescript
import * as rstream-query from "@thi.ng/rstream-query";


```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
