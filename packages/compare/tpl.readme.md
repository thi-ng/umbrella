<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

Comparators with optional support for types implementing the [@thi.ng/api
`ICompare`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/compare.ts)
interface.

### Generic comparison

- [`compare()`](https://docs.thi.ng/umbrella/compare/functions/compare.html)

### Additional comparators

- [`compareByKey()`](https://docs.thi.ng/umbrella/compare/functions/compareByKey.html)
- [`compareByKeys2()`](https://docs.thi.ng/umbrella/compare/functions/compareByKeys2.html)
- [`compareByKeys3()`](https://docs.thi.ng/umbrella/compare/functions/compareByKeys3.html)
- [`compareByKeys4()`](https://docs.thi.ng/umbrella/compare/functions/compareByKeys4.html)
- [`compareLengthAsc()`](https://docs.thi.ng/umbrella/compare/functions/compareLengthAsc.html)
- [`compareLengthDesc()`](https://docs.thi.ng/umbrella/compare/functions/compareLengthDesc.html)
- [`compareNumAsc()`](https://docs.thi.ng/umbrella/compare/functions/compareNumAsc.html)
- [`compareNumDesc()`](https://docs.thi.ng/umbrella/compare/functions/compareNumDesc.html)
- [`reverse()`](https://docs.thi.ng/umbrella/compare/functions/reverse.html)

### Operators

- [`numericOp()`](https://docs.thi.ng/umbrella/compare/functions/numericOp.html)
- [`stringOp()`](https://docs.thi.ng/umbrella/compare/functions/stringOp.html)
- [`eq()`](https://docs.thi.ng/umbrella/compare/functions/eq.html)
- [`gt()`](https://docs.thi.ng/umbrella/compare/functions/gt.html)
- [`gte()`](https://docs.thi.ng/umbrella/compare/functions/gte.html)
- [`lt()`](https://docs.thi.ng/umbrella/compare/functions/lt.html)
- [`lte()`](https://docs.thi.ng/umbrella/compare/functions/lte.html)
- [`neq()`](https://docs.thi.ng/umbrella/compare/functions/neq.html)

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

### ICompare support

```ts
import { ICompare } from "@thi.ng/api";
import { compare } from "@thi.ng/compare";

class Foo implements ICompare<Foo> {

    x: number;

    constructor(x: number) {
        this.x = x;
    }

    compare(o: Foo) {
        return compare(this.x, o.x);
    }
}

compare(new Foo(1), new Foo(2));
// -1
```

### Cluster sort w/ multiple sort keys

Key-based object comparison is supported for 1 - 4 keys / dimensions.

```ts tangle:export/readme1.ts
import * as cmp from "@thi.ng/compare";

const src = [
    { id: "charlie", age: 66 },
    { id: "bart", age: 42 },
    { id: "alice", age: 23 },
    { id: "dora", age: 11 },
];

// cluster sort by id -> age (default comparators)
console.log(
	[...src].sort(cmp.compareByKeys2("id", "age"))
);
// [
//   { id: 'alice', age: 23 },
//   { id: 'bart', age: 42 },
//   { id: 'charlie', age: 66 },
//   { id: 'dora', age: 11 }
// ]


// cluster sort by age -> id (default comparators)
console.log(
	[...src].sort(cmp.compareByKeys2("age", "id"))
);
// [
//   { id: 'dora', age: 11 },
//   { id: 'alice', age: 23 },
//   { id: 'bart', age: 42 },
//   { id: 'charlie', age: 66 }
// ]

// cluster sort by age -> id
// (custom comparator for `age` key)
console.log(
	[...src].sort(cmp.compareByKeys2("age", "id", cmp.compareNumDesc))
);
// [
//   { id: 'charlie', age: 66 },
//   { id: 'bart', age: 42 },
//   { id: 'alice', age: 23 },
//   { id: 'dora', age: 11 }
// ]

// using `reverse()` comparator for `id`
console.log(
	[...src].sort(cmp.compareByKeys2("age", "id", cmp.compare, cmp.reverse(cmp.compare)))
);
// [
//   { id: 'dora', age: 11 },
//   { id: 'alice', age: 23 },
//   { id: 'bart', age: 42 },
//   { id: 'charlie', age: 66 }
// ]
```

<!-- include ../../assets/tpl/footer.md -->
