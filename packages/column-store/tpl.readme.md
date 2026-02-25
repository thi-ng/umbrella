<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

## Column storage

As the name indicates, data is stored in different columns, where each column
manages its own schema, value validation, backing storage, indexing,
serialization etc.

From a user's POV, columns are not (usually) used directly, but via table, which
acts as facade to the various configured columns. Data items are added as JS
objects to a table, which then pulls out related values, validates them and the
delegates them to the columns.

An example table definition looks like this (explanation of column types in next
section below):

```ts tangle:export/readme-types.ts
import { Table, FLAG_DICT, FLAG_UNIQUE } from "@thi.ng/column-store";

// schema for a single row item
interface Item {
	id: number;
	name: string;
	aliases?: string[];
	latlon: number[] | Float32Array;
	tags: string[];
}

// define a table with the given columns
const table = new Table<Item>({

	// column of single numeric values
	// (default cardinality makes values required)
	id: { type: "num" },

	// column of required string values
	name: { type: "str" },

	// optional tuples of max. 3 string values
	// (if no value is given, the column stores null)
	aliases: { type: "str", cardinality: [0, 3] },

	// required fixed size tuples (aka vectors) of numbers
	latlon: { type: "f32vec", cardinality: [2, 2] },

	// optional tuples of max. 10 strings, with default
	// the given flags (explained further below) are triggering:
	// - dictionary-based encoding
	// - unique values (per tuple)
	tags: {
		type: "str",
		cardinality: [0, 10],
		default: ["todo"],
		flags: FLAG_DICT | FLAG_UNIQUE
	}
});

// add data
table.addRow({
	id: 1,
	name: "karsten",
	aliases: ["toxi"],
	latlon: [47.421, 10.984],
	tags: ["person", "opensource"],
});
```

> [!IMPORTANT]
> Columns can be named freely, with the exception that the `__` name prefix is
> reserved for internal use. For example, `foo` is allowed, but `__foo` is a
> reserved name.

### Column types

The current built-in column types only support numeric or string values, though
support for other JSON-serializable types is planned. For better memory
utilization, numeric data can (and should) be stored in typed array columns.

Some column types support storing multiple values per row as tuples. See
[cardinality section](#cardinality) below for further detail.

Note: Booleans and `BigInt`s are still unsupported, but being worked on...

| **Column type** | **Description**     | **Tuples supported** | **RLE serialization** |
|-----------------|---------------------|----------------------|-----------------------|
| `num`           | JS numbers          | ✅                    | ✅ <sup>(1)</sup>      |
| `str`           | JS strings (UTF-16) | ✅                    | ✅ <sup>(1)</sup>      |
| `u8`            | 8bit unsigned int   | ❌                    | ✅                     |
| `i8`            | 8bit signed int     | ❌                    | ✅                     |
| `u16`           | 16bit unsigned int  | ❌                    | ✅                     |
| `i16`           | 16bit signed int    | ❌                    | ✅                     |
| `u32`           | 32bit unsigned int  | ❌                    | ✅                     |
| `i32`           | 32bit signed int    | ❌                    | ✅                     |
| `f32`           | 32bit float         | ❌                    | ❌                     |
| `f64`           | 64bit float         | ❌                    | ❌                     |

- <sup>(1)</sup> only if max. cardinality is 1, [further information](#flag_rle)

### Vector column types

Columns storing fixed size n-dimensional vectors can be created vis the `vec`
suffix for any of the typedarray based column types, i.e. `u8vec`, `i16vec`,
`f32vec` etc.

The `cardinality` column config (in the form `[min,max]`) is interpreted as follows:

- if `min` is zero, the value is optional, but a `default` value MUST be defined
  for the column. Otherwise the `min` value MUST be the same as `max`.
- `max` defines the actual vector size

Therefore, using a 3D vector as example, the only two possible `cardinality`
configs are: `[0,3]` (with default given) or `[3,3]`.

When [querying](#query-engine) vector columns using the standard
`(n)or`/`(n)and` operators, always the entire vector is matched (by value).

> [!IMPORTANT]
> For performance reasons, rows retrieved from vector columns contain mutable
> data views of the underlying column storage. That means when manipulating data
> in these views, the underlying data in the column would be changed too. To
> avoid index corruption, always edit only copies of this vector data and then
> use `table.updateRow()` to properly update the column storage (incl. any
> internal indexes).

### Serialization options

For `f32`, `f64`, `f32vec` and `f64vec` column types, the optional `prec` column
option can be provided to specify the number of fractional digits used in
the JSON serialization:

```ts tangle:export/readme-serialize-prec.ts
import { Table } from "@thi.ng/column-store";

const table = new Table({
	vec: { type: "f32vec", cardinality: [3, 3], opts: { prec: 2 } }
});

table.addRow({ vec: [1.11111, 22.22222, 333.33333]});

console.log(JSON.stringify(table));
// {
//   "schema":{"vec":{"cardinality":[3,3],"flags":0,"type":"f32vec","opts":{"prec":2}}},
//   "columns":{"vec":{"values":[1.11,22.22,333.33]}},
//   "length":1
// }

```

### Custom column types

The system already supports custom column type implementations via the
[`IColumn`](https://docs.thi.ng/umbrella/column-store/interfaces/IColumn.html)
and
[`ColumnTypeSpec`](https://docs.thi.ng/umbrella/column-store/interfaces/ColumnTypeSpec.html)
interfaces.

Custom column types and their implementations can be registered via
[`registerColumnType()`](https://docs.thi.ng/umbrella/column-store/functions/registerColumnType.html).

### Cardinality

Columns can store zero, one or tuples of multiple values per row. Acceptable
min/max ranges can be defined via the
[`cardinality`](https://docs.thi.ng/umbrella/column-store/interfaces/ColumnSpec.html#cardinality)
key of the column spec. The following presets are provided:

| **Preset**  | **Value**        | **Description**                             |
|-------------|------------------|---------------------------------------------|
| `REQUIRED`  | `[1, 1]`         | Required single value (default)             |
| `OPTIONAL`  | `[0, 1]`         | Optional single value (present or not)      |
| `ONE_PLUS`  | `[1, (2**32)-1]` | One or more values (always expects tuples)  |
| `ZERO_PLUS` | `[0, (2**32)-1]` | Zero or more values (always expects tuples) |

### Default values

Default values can be specified for columns with a minimum cardinality of 1 or
more (aka required values). When a row is added or updated, any `null`ish values
for such columns in the row record will then be replaced with their default
values. If a column with required values has no configured default value, an
error will be thrown when attempting to add/update an incomplete record.

```ts
// example column spec with default value
{
	type: "str",
	cardinality: [1, 1],
	default: "todo",
}
```

**Note:** Typed array backed columns **do no** support optional values and
therefore require either a cardinality of `[1,1]` or `[0,1]` with a default.

### Flags

Generally applicable to all column types, the following numeric flags can be
assigned and combined (into bitmasks) to customize the storage & indexing
behavior.

#### FLAG_BITMAP

(Value: 0x01)

The column will construct & maintain additional bitfields for each unique value
stored in the column. These bitfields record which values are stored in which
rows and are utilized by the [query engine](#query-engine) to massively
accelerate complex searches.

#### FLAG_DICT

(Value: 0x02)

Dictionary encoded storage. Recommended for (non-numeric) data with a relatively
small (though not necessarily fixed) set of possible values. Instead of storing
values directly, only numeric IDs will be stored. The original (de-duplicated)
values are stored in a dictionary alongside the column data.

Note: Not supported by typedarray-backed column types.

#### FLAG_UNIQUE

(Value: 0x04)

Only applicable for tuple-based columns to enforce Set-like semantics (per row),
i.e. values of each tuple will be deduplicated (e.g. for tagging).

Note: Not supported by typedarray-backed column types.

#### FLAG_RLE

(Value: 0x08)

This flag enables [Run-length encoding](https://thi.ng/rle-pack) in the
JSON serialization of a column, potentially leading to dramatic file size
savings, esp. for dictionary-based data.

Two modes of RLE compression are supported, depending on column type:

- Simple RLE merely stores arrays in `[value1, count1, value2, count2...]` form
- Binary RLE uses more advanced bitwise encoding, but is only available for
  typedarray and vector columns

Tuple-based columns do not support RLE and will throw an error at creation time
when trying to use this flag.

#### Custom flags

The lower 16bit of the 32bit `flags` integer are reserved for built-ins and
future extension of this package. However, the upper 16 bits can be freely used
for custom flags, i.e. in conjunction with [custom column
types](#custom-column-types).

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
series, with each step intersecting (aka logical AND) its results with the
results of the previous step(s), thereby narrowing down the result set.

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

#### Row ranges

The
[`rowRange`](https://docs.thi.ng/umbrella/column-store/classes/Query.html#rowrange)
operator selects the given `start` (inclusive) .. `end` (exclusive) range of row
indices.

```ts
// select first ten rows
query.rowRange(0, 10);
```

#### Value ranges

The
[`valueRange`](https://docs.thi.ng/umbrella/column-store/classes/Query.html#valuerange)
operator selects rows based on a given column's `start` .. `end` vaulue range
(both inclusive) of row indices.

```ts
// select rows where ID is in closed [100,109] interval
query.valueRange("id", 100, 109);
```

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
	FLAG_DICT,
	FLAG_UNIQUE,
} from "@thi.ng/column-store";

interface Item {
	id: number;
	type: string;
	tags: string[];
}

const table = new Table<Item>({
	// ID column stores 8bit ints (typed array)
	id: { type: "u8" },
	// Type column stores indexed strings
	type: { type: "str", flags: FLAG_DICT },
	// Tags column stores array of strings (max. 10) with set-semantics
	// and bitmap optimized for query acceleration
	tags: {
		type: "str",
		// min/max number of values per row (default is: [1,1])
		cardinality: [0, 10],
		// flag to define column behavior (flags explained above)
		flags: FLAG_DICT | FLAG_UNIQUE | FLAG_BITMAP,
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
// each query result includes a `__row` ID
console.log([...unsortedImages]);
// [ { id: 102, type: "img", tags: [ "unsorted" ], __row: 2 } ]

// select items with `a` OR `b` tags, intersect with those which have `c` AND `d` tags
const complexTagQuery = table.query().or("tags", ["a", "b"]).and("tags", ["c", "d"]);
console.log([...complexTagQuery]);
// [ { id: 104, type: "img", tags: [ "b", "c", "d" ], __row: 4 } ]

// query using custom predicates
console.log([...table.query().matchColumn("id", (id) => id > 102)]);
// [
//    { id: 103, type: "img", tags: [ "unsorted" ], __row: 3 },
//    { id: 104, type: "img", tags: [ "b", "c", "d" ], __row: 4 }
// ]

// serialize table to JSON
console.log(JSON.stringify(table, null, "\t"));
```

Serialized table (can be loaded again via `Table.load()`):

```json
{
	"schema": {
		"id": { "cardinality": [1, 1], "flags": 0, "type": "u8" },
		"type": { "cardinality": [1, 1], "flags": 1, "type": "str" },
		"tags": { "cardinality": [0, 10], "flags": 7, "type": "str", "default": ["unsorted"] }
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
