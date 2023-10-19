<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

**IMPORTANT: This README is currently somewhat out-of-date and does not yet
cover new important features introduced with version 2.2.0 onwards, please
consult API docs (and/or source code) to view newly added functions and their
usage...**

This package provides a higher-order function `defQuery()`, which takes a
number of options to configure query behavior and returns an actual query
function. This returned function can then be used for pattern matching of
objects and arrays of objects.

{{meta.status}}

### Planned features

Some of the below features are already partially addressed by other
thi.ng/umbrella packages, but would benefit from a more unified approach.

- [ ] optional queries (OR queries)
- [ ] result projection
- [ ] result aggregation/grouping

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

```ts tangle:export/readme.ts
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

```ts tangle:export/readme.ts
import { defQuery } from "@thi.ng/oquery";

// create query w/ custom options
// (options explained further below...)
const q = defQuery({ partial: true });

console.log(q(DB, null, "knows", "bob"));
// {
//   alice: { knows: [ 'bob' ] },
//   charlie: { knows: [ 'bob' ] },
//   dori: { knows: [ 'bob' ] }
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

```ts tangle:export/readme.ts
// Who does Alice know?
q(DB, "alice", "knows", null)
// { alice: { knows: [ 'bob', 'charlie', 'dori' ] } }
```

(2) If the subject is a predicate, then any top-level keys matching the given
predicate will be matched (again using same rules as above for the other query
terms).

```ts tangle:export/readme.ts
// Anyone with initial "A" knows Charlie?
q(DB, (s) => s[0] === "a", "knows", "charlie")
// { alice: { knows: [ 'charlie' ] } }
```

(3) Instead of a root object (like `DB`), an array of objects can be queried. In
this case, only predicate-object patterns are used (**no subject terms**, aka
array indices in this case).

```ts tangle:export/readme.ts
type Person = { id: string; knows: string[] };

const DBALT: Person[] = [
  { id: "alice", knows: ["bob", "charlie"] },
  { id: "bob", knows: ["alice"] },
  { id: "charlie", knows: ["alice","bob","dori"] },
];

defQuery<Person[]>()(DBALT, "knows", "alice")
// [
//   { id: 'bob', knows: [ 'alice' ] },
//   { id: 'charlie', knows: [ 'alice', 'bob', 'dori' ] }
// ]
```

### Querying objects

The following example is using the `DB` object defined [further
above](#query-patterns)...

```ts tangle:export/readme2.ts
import { defQuery } from "@thi.ng/oquery";

// using partial result objects option for brevity here
const q = defQuery({ partial: true });

// find all subjects with `type = "person"` relationship
q(DB, null, "type", "person");
// { alice: { type: 'person' }, bob: { type: 'person' } }

// everyone w/ given min age
q(DB, null, "age", (age) => age >= 33)
// { alice: { age: 33 } }

// select only subjects with A/B initials
q(DB, (id) => id >= "a" && id < "c", null, null)
// {
//   alice: { age: 33, knows: [ 'bob', 'charlie', 'dori' ], type: 'person' },
//   bob: { age: 32, knows: [ 'alice' ], type: 'person', spouse: 'alice' }
// }
```

Union vs. intersection queries:

```ts tangle:export/readme2.ts
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

<!-- include ../../assets/tpl/footer.md -->
