<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/associative](https://thi.ng/associative) package.

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

TODO

## Basic usage example

```ts tangle:export/readme.ts
import { defBidirIndex, encodeObject, decodeObject } from "@thi.ng/bidir-index";

const index = defBidirIndex<string>();

// given object keys are auto-indexed, array initialized with given default
console.log(
  encodeObject(index, { r: 1, g: 2, b: 3, a: 4 }, 0)
);
// [1, 2, 3, 4]

// use custom default and without updating index
console.log(
  encodeObject(index, { b: 3, r: 1, g: 2 }, -1, false)
);
// [1, 2, 3, -1] (missing key `a` mapped to given default value)

// decode with defaults/fallback
console.log(
  decodeObject(index, [255, 128, 64], { a: 1 })
);
// { r: 255, g: 128, b: 64, a: 1 }

// add more keys to index (already known ones will be skipped)
// returns array of mapped IDs for given keys
index.addAll(["r", "g", "b", "a", "foo"]);
// [0, 1, 2, 3, 4]

// decoding will skip nullish values
console.log(
  decodeObject(index, [null, null, null, null, "bar"])
);
// { foo: "bar" }
```

<!-- include ../../assets/tpl/footer.md -->
