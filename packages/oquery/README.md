<!-- This file is generated - DO NOT EDIT! -->

# ![oquery](https://media.thi.ng/umbrella/banners-20220914/thing-oquery.svg?5410c2aa)

[![npm version](https://img.shields.io/npm/v/@thi.ng/oquery.svg)](https://www.npmjs.com/package/@thi.ng/oquery)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/oquery.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
  - [Planned features](#planned-features)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Intersection vs. union queries](#intersection-vs-union-queries)
  - [Query patterns](#query-patterns)
  - [Querying objects](#querying-objects)
- [Authors](#authors)
- [License](#license)

## About

Datalog-inspired, optimized pattern/predicate query engine for JS objects & arrays.

This package provides a single higher-order function `defQuery()`, which takes a
number of options to configure query behavior and returns an actual query
function. This returned function can then be used for pattern matching of
objects and arrays of objects.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Boquery%5D+in%3Atitle)

### Planned features

Some of the below features are already partially addressed by other
thi.ng/umbrella packages, but would benefit from a more unified approach.

- [ ] query joins (AND queries)
- [ ] optional queries (OR queries)
- [ ] result projection
- [ ] result aggregation/grouping

## Related packages

- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative) - Alternative Map and Set implementations with customizable equality semantics & supporting operations
- [@thi.ng/csv](https://github.com/thi-ng/umbrella/tree/develop/packages/csv) - Customizable, transducer-based CSV parser/object mapper and transformer
- [@thi.ng/egf](https://github.com/thi-ng/umbrella/tree/develop/packages/egf) - Extensible Graph Format
- [@thi.ng/rstream-query](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-query) - [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) based triple store & reactive query engine

## Installation

```bash
yarn add @thi.ng/oquery
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/oquery"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const oquery = await import("@thi.ng/oquery");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.26 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)

## API

[Generated API docs](https://docs.thi.ng/umbrella/oquery/)

Currently, there are 27 unique & optimized query implementations, each based on
RDF-style
[Subject-Predicate-Object](https://www.w3.org/TR/rdf11-primer/#section-triple)
triple patterns (only without any similar restrictions on query terms data
types), with each of the three terms one of:

- **`null`** - wildcard, any non-null (or `undefined`) value in that position
  will be selected
- **Predicate function** - called with all possible terms in that position
- **Literal value** - for subjects and predicates, this can only be a string
  or number. For "object" position any value type is allowed
- **Array or `Set`** - multiple choices (literals) for given query term

### Intersection vs. union queries

By default, arrays or sets in O(bject) position are matched in an
elementwise manner using OR-semantics, i.e. a match succeeds with the first
matched element. Since v0.3.0 intersection queries are supported too, i.e. all
elements of the given array/set must match for the query to succeed (see
examples/differences further below).

The behavior can be chosen via the [`intersect` query
option](https://docs.thi.ng/umbrella/oquery/interfaces/QueryOpts.html#intersect).

### Query patterns

Object queries expect an object of the following structure:

```ts
{ subj1: { pred1: "obj1", pred2: 2, pred3: ["a", "b"] }, ... }
```

A concrete example:

```ts
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
    dori: {
        knows: ["bob"]
    }
};
```

To find all answers for the question: Who knows Bob?

```ts
// create query w/ custom options
// (options explained further below...)
const query = defQuery({ partial: true });

query(DB, null, "knows", "bob");
// {
//   alice: { knows: ["bob"] },
//   charlie: { knows: ["bob"] }
// }
```

For each of the 3 query terms, the following IDs are used:

- `*` = null (wildcard)
- `l` = literal value (or array/set of literals)
- `f` = predicate function

| SPO pattern | Matches...                                                                |
|-------------|---------------------------------------------------------------------------|
| `* * *`     | everything                                                                |
| `* * l`     | all objects with ANY property matching given literal                      |
| `* * f`     | all objects with ANY property matching given predicate                    |
| `* l *`     | objects with a property matching given literal                            |
| `* l l`     | objects with a property AND its value matching given literals             |
| `* l f`     | objects with given property AND its value matching predicate              |
| `* f *`     | objects with properties matching given predicate                          |
| `* f l`     | objects with properties matching given predicate AND their literal values |
| `* f f`     | objects with properties matching given predicate AND their literal values |

Further variations:

(1) If the "subject" term is a literal (or array), then only object(s) for given
key value(s) are matched, using the same logic for the other two terms as in the
table above.

```ts
// Who does Alice know?
query(DB, "alice", "knows", null)
// { alice: { knows: [ 'bob', 'charlie', 'dori' ] } }
```

(2) If the subject is a predicate, then any top-level keys matching the given
predicate will be matched (again using same rules as above for the other query
terms).

```ts
// Anyone with initial "A" knows Charlie?
query(DB, (s) => s[0] === "a", "knows", "charlie")
// { alice: { knows: [ 'charlie' ] } }
```

(3) Instead of a root object (like `DB`), an array of objects can be queried. In
this case, only predicate-object patterns are used (**no subject terms**, aka
array indices in this case).

```ts
const DBALT = [
  { id: "alice", knows: ["bob", "charlie"] },
  { id: "bob", knows: ["alice"] },
  { id: "charlie", knows: ["alice","bob","dori"] },
];

defQuery()(DBALT, "knows", "alice")
// [
//   { id: 'bob', knows: [ 'alice' ] },
//   { id: 'charlie', knows: [ 'alice', 'bob', 'dori' ] }
// ]
```

### Querying objects

The following example is using the `DB` object defined [further
above](#query-patterns)...

```ts
import { defQuery } from "@thi.ng/oquery";

// using partial result objects option for brevity here
const query = defQuery({ partial: true });

// find all subjects with `type = "person"` relationship
query(DB, null, "type", "person");
// { alice: { type: 'person' }, bob: { type: 'person' } }

// everyone w/ given min age
query(DB, null, "age", (age) => age >= 33)
// { alice: { age: 33 } }

// select only subjects with A/B initials
query(DB, (id) => id >= "a" && id < "c", null, null)
// {
//   alice: { age: 33, knows: [ 'bob', 'charlie', 'dori' ], type: 'person' },
//   bob: { age: 32, knows: [ 'alice' ], type: 'person', spouse: 'alice' }
// }
```

Union vs. intersection queries:

```ts
const union = defQuery();

// who knows bob OR charlie?
union(DB, null, "knows", ["bob", "charlie"]);
// {
//   alice: { age: 33, knows: [ 'bob', 'charlie', 'dori' ], type: 'person' },
//   charlie: { parent: 'alice', knows: [ 'alice', 'bob', 'dori' ] },
//   dori: { knows: [ 'bob' ] }
// }

const isec = defQuery({ intersect: true });

// who knows bob AND charlie?
isec(DB, null, "knows", ["bob", "charlie"]);
// {
//   alice: { age: 33, knows: [ 'bob', 'charlie', 'dori' ], type: 'person' }
// }
```

More query examples in [tests](https://github.com/thi-ng/umbrella/blob/develop/packages/oquery/test/index.ts)...

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-oquery,
  title = "@thi.ng/oquery",
  author = "Karsten Schmidt",
  note = "https://thi.ng/oquery",
  year = 2020
}
```

## License

&copy; 2020 - 2022 Karsten Schmidt // Apache Software License 2.0
