<!-- This file is generated - DO NOT EDIT! -->

# ![oquery](https://media.thi.ng/umbrella/banners/thing-oquery.svg?e3388565)

[![npm version](https://img.shields.io/npm/v/@thi.ng/oquery.svg)](https://www.npmjs.com/package/@thi.ng/oquery)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/oquery.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Datalog-inspired, optimized pattern/predicate query engine for JS objects.

Currently, there're 125 possible query approaches, which can be
collapsed into 27 unique query implementations. Each query is based on
RDF-style
[Subject-Predicate-Object](https://www.w3.org/TR/rdf11-primer/#section-triple)
patterns (only without requiring query terms to be URIs), with each term
one of:

- `null` - wildcard, any non-null value in that position will be
  selected
- Predicate function - called with all possible terms in that position
- Literal value - for subjects and predicates, this can only be a string
  or number. For "object" position any value type is allowed
- Array or `Set` - multiple choices (literals) for given query term

See basic query examples below...

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Boquery%5D)

### Related packages

- [@thi.ng/rstream-query](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-query) - [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) based triple store & reactive query engine

## Installation

```bash
yarn add @thi.ng/oquery
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/oquery?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/oquery/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 847 bytes / CJS: 904 bytes / UMD: 964 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)

## API

[Generated API docs](https://docs.thi.ng/umbrella/oquery/)

TODO - Please see extensive tests for now...

```ts
import { defQuery } from "@thi.ng/oquery";

// object to query
const DB = {
    alice: {
        age: 33,
        knows: ["bob", "charlie", "dori"],
        type: "person",
    },
    bob: {
        age: 32,
        knows: ["alice"],
        type: "person",
        spouse: "alice",
    },
    charlie: {
        parent: "alice",
        knows: ["alice", "bob", "dori"],
    },
};

// init w/ default opts
// (uses @thi.ng/equiv for equality checks)
const query = defQuery();

// find all subjects with `type = "person"` relationship
query(DB, null, "type", "person");
// { alice: { type: 'person' }, bob: { type: 'person' } }

// find all who know bob or charlie
query(DB, null, "knows", ["bob", "charlie"])
// { alice: { knows: [ 'bob', 'charlie' ] }, charlie: { knows: [ 'bob' ] } }

// everyone w/ given min age
query(DB, null, "age", (age) => age >= 33)
// { alice: { age: 33 } }

// select only subjects with A/B initials
query(DB, (id) => id > "a" && id < "c", null, null)
// {
//   alice: { age: 33, knows: [ 'bob', 'charlie', 'dori' ], type: 'person' },
//   bob: { age: 32, knows: [ 'alice' ], type: 'person', spouse: 'alice' }
// }
```

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
