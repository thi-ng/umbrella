<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Reference:

- https://en.wikipedia.org/wiki/Leaky_bucket

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
import { LeakyBucketMap } from "@thi.ng/leaky-bucket";

const buckets = new LeakyBucketMap({
	maxBuckets: 2,
	capacity: 3,
	leakInterval: 1000,
});

buckets.update("a") //true
buckets.update("a") //true
buckets.update("a") //true

// max capacity=3 reached
buckets.update("a"); // false

// another bucket
buckets.update("b"); // true

// max buckets=2 reached
buckets.update("c"); // false

// wait > 1000ms, buckets have leaked...

// bucket A has capacity again
buckets.update("a"); // true

// bucket B has been removed (since emtpy)
buckets.has("b"); // false
```

<!-- include ../../assets/tpl/footer.md -->
