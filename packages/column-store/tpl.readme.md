<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

```ts tangle:export/readme-1.ts
import {
	Table,
	FLAG_BITMAP,
	FLAG_INDEXED,
	FLAG_UNIQUE,
} from "@thi.ng/column-store";

const table = new Table({
	// ID column stores 8bit ints (typed array)
	id: { type: "u8" },
	// Type column stores indexed strings
	type: { type: "str", flags: FLAG_INDEXED },
	// Tags column stores array of strings (max. 10) with set-semantics
	// and bitmap optimized for query acceleration
	tags: {
		type: "str",
		// min/max number of values per row (default is: [1,1])
		cardinality: [0, 10],
		// flag to define column behavior (flags explained above)
		flags: FLAG_INDEXED | FLAG_UNIQUE | FLAG_BITMAP,
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
