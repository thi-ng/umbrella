<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

## Column storage

### Column types

Currently, only numeric or string values are supported, though we plan to extend
this to other JSON-serializable types. For better memory utilization, numeric
data can (and should) be stored in typed arrays.

Note: `BigInt`s are still unsupported, but planned.

| **Column type** | **Description**     |
|-----------------|---------------------|
| `num`           | JS numbers          |
| `str`           | JS strings (UTF-16) |
| `u8`            | 8bit unsigned int   |
| `i8`            | 8bit signed int     |
| `u16`           | 16bit unsigned int  |
| `i16`           | 16bit signed int    |
| `u32`           | 32bit unsigned int  |
| `i32`           | 32bit signed int    |
| `f32`           | 32bit float         |
| `f64`           | 64bit float         |

### Custom column types

The system already supports custom column type implementations via the
[`IColumn`](https://docs.thi.ng/umbrella/column-store/interfaces/IColumn.html)
interface. When using custom column types, supply your own column factory
function via
[`TableOpts.columnFactory`](https://docs.thi.ng/umbrella/column-store/interfaces/TableOpts.html#columnfactory).
In this factory function use your custom
[`ColumnSpec.flags`](https://docs.thi.ng/umbrella/column-store/interfaces/ColumnSpec.html#flags)
to choose a suitable implementation, or if not applicable, then delegate to the
[default
factory](https://docs.thi.ng/umbrella/column-store/functions/defaultColumnFactory.html)
as fallback.

### Cardinality

Columns can store zero, one or tuples of multiple values per row. Acceptable
min/max ranges can be defined via the [`cardinality`](https://docs.thi.ng/umbrella/column-store/interfaces/ColumnSpec.html#cardinality) key of the column spec. The
following presets are provided:

| **Preset**  | **Value**        | **Description**                             |
|-------------|------------------|---------------------------------------------|
| `REQUIRED`  | `[1, 1]`         | Required single value (default)             |
| `OPTIONAL`  | `[0, 1]`         | Optional single value (present or not)      |
| `ONE_PLUS`  | `[1, (2**32)-1]` | One or more values (always expects tuples)  |
| `ZERO_PLUS` | `[0, (2**32)-1]` | Zero or more values (always expects tuples) |

### Flags

(Almost) independent from chosen column type, the following flags can be
combined to customize the storage & indexing behavior.

#### FLAG_BITMAP

The column will construct & maintain additional bitfields for each unique value
stored in the column. These bitfields record which values are stored in which
rows and are utilized by the [query engine](#query-engine) to massively
accelerate complex searches.

#### FLAG_ENUM

Recommended for string data with a relatively small (though not necessarily
fixed) set of possible values. Instead of storing strings directly, each string
value will be indexed and only numeric IDs will be stored (essentially like an
enum).

#### FLAG_UNIQUE

Only applicable for tuple-based columns to enforce Set-like semantics (per row),
i.e. values of each tuple will be deduplicated (e.g. for tagging).

## Query engine

The query engine is highly extensible and can be used for executing arbitrarily
complex queries.

The system allows predefining queries, which are then only evaluated and produce
up-to-date results via the standard JS iterable mechanism (i.e. queries
implement `[Symbol.iterator]`).

```ts
// predefine query
const query = table.query().or("name", ["alice", "bob"]);

// actually (re)execute query
for(let result of query) { ... }

// ..or using slice operator
const results = [...query];
```

TODO see code examples below

### Built-in operators

The query engine works by applying a number of [query
terms](https://docs.thi.ng/umbrella/column-store/interfaces/QueryTerm.html) in
series, with each step intersecting its results with the results of the previous
step(s), thereby narrowing down the result set.

By default, individual query terms operate on a single column, but can also can
also apply to multiple. Terms are supplied either as array given to the
[`Query`](https://docs.thi.ng/umbrella/column-store/classes/Query.html)
constructor, via the fluent API of the `Query` class and/or via
[`.addTerm()`](https://docs.thi.ng/umbrella/column-store/classes/Query.html#addterm).

#### OR

Optionally optimized via [`FLAG_BITMAP`](#flag_bitmap) presence on column. One
or more values can be provided.

```ts
query.or("column-name", "option");

query.or("column-name", ["option1", "option2",...]);
```

#### AND

Optionally optimized via [`FLAG_BITMAP`](#flag_bitmap) presence on column. One
or more values can be provided.

```ts
query.and("column-name", "option");

query.and("column-name", ["option1", "option2",...]);
```


#### Negation

Optionally optimized via [`FLAG_BITMAP`](#flag_bitmap) presence on column.
Negation is available via `nand` & `nor`. For negation of single values either
can be used, otherwise the behavior is:

- [`nand`](https://docs.thi.ng/umbrella/column-store/classes/Query.html#nand):
  select rows same as [`and`](#and), then negate results
- [`nor`](https://docs.thi.ng/umbrella/column-store/classes/Query.html#nor):
  select rows same as [`or`](#or), then negate results

#### Predicate-based matchers

- [`matchColumn`](https://docs.thi.ng/umbrella/column-store/classes/Query.html#matchcolumn):
  apply predicate to column value
- [`matchRow`](https://docs.thi.ng/umbrella/column-store/classes/Query.html#matchrow):
  apply predicate to full row
- [`matchPartialRow`](https://docs.thi.ng/umbrella/column-store/classes/Query.html#matchpartialrow):
  apply predicate to partial row (only selected columns)

### Custom operators

Custom query operators can be registered via
[`registerQueryOp()`](https://docs.thi.ng/umbrella/column-store/functions/registerQueryOp.html).

### Result aggregation

TODO

### Query ranges

TODO

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

### Basic usage

```ts tangle:export/readme-1.ts
import {
	Table,
	FLAG_BITMAP,
	FLAG_ENUM,
	FLAG_UNIQUE,
} from "@thi.ng/column-store";

const table = new Table({
	// ID column stores 8bit ints (typed array)
	id: { type: "u8" },
	// Type column stores indexed strings
	type: { type: "str", flags: FLAG_ENUM },
	// Tags column stores array of strings (max. 10) with set-semantics
	// and bitmap optimized for query acceleration
	tags: {
		type: "str",
		// min/max number of values per row (default is: [1,1])
		cardinality: [0, 10],
		// flag to define column behavior (flags explained above)
		flags: FLAG_ENUM | FLAG_UNIQUE | FLAG_BITMAP,
		// default value(s) assigned if missing when row is added
		default: ["unsorted"],
	},
});

// add data/rows
table.addRows([
	{ id: 100, type: "img", tags: ["a", "a", "c", "b"] },
	{ id: 101, type: "video", tags: ["a", "d", "b"] },
	{ id: 102, type: "img" },
	{ id: 103, type: "video" },
	{ id: 104, type: "img", tags: ["b", "c", "d"] },
]);

// pre-define a query, here to select images which have an `unsorted` tag...
// the fluent API shown is merely syntax sugar for creating/appending query terms.
// queries can have an arbitrary number of terms (which are executed in series)
const unsortedImages = table.query().where("type", "img").and("tags", "unsorted");

// queries are iterables and only execute when the iterator is consumed
console.log([...unsortedImages]);
// [ { id: 102, type: "img", tags: [ "unsorted" ] } ]

// select items with `a` OR `b` tags, intersect with those which have `c` AND `d` tags
const complexTagQuery = table.query().or("tags", ["a", "b"]).and("tags", ["c", "d"]);
console.log([...complexTagQuery]);
// [ { id: 104, type: "img", tags: [ "b", "c", "d" ] } ]

// query using custom predicates
console.log([...table.query().matchColumn("id", (id) => id > 102)]);
// [
//    { id: 103, type: "img", tags: [ "unsorted" ] },
//    { id: 104, type: "img", tags: [ "b", "c", "d" ] }
// ]

// serialize table to JSON
console.log(JSON.stringify(table, null, "\t"));
```

Serialized table (can be loaded again via `Table.load()`):

```json
{
	"schema": {
		"id": { "cardinality": [1, 1], "flags": 0, "default": 0, "type": "u8" },
		"type": { "cardinality": [1, 1], "flags": 1, "default": "", "type": "str" },
		"tags": { "cardinality": [0, 10], "flags": 7, "default": ["unsorted"], "type": "str" }
	},
	"columns": {
		"id": {
			"values": [100, 101, 102, 103, 104]
		},
		"type": {
			"dict": {
				"index": ["img", "video"],
				"next": 2
			},
			"values": [0, 1, 0, 1, 0]
		},
		"tags": {
			"dict": {
				"index": ["a", "c", "b", "d", "unsorted"],
				"next": 5
			},
			"values": [[0, 1, 2], [0, 3, 2], [4], [4], [2, 1, 3]]
		}
	},
	"length": 5
}
```

<!-- include ../../assets/tpl/footer.md -->
