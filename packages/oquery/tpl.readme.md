# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

${authors}

## License

&copy; ${copyright} // ${license}
