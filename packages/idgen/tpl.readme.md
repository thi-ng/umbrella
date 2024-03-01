<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Previously generated IDs that have been discarded are stored in a
memory-efficient implicit list of free IDs and will be re-used. The
overall range of IDs can be specified/limited at construction time and
is based on a given bit width. The largest range currently supported is
32 bits, less if versioning is enabled (configurable).

If versioning is used, the produced IDs are *composite* values, i.e. the
lowest bits contain the actual ID (e.g for indexing purposes) and other
bits contain the version information.

![composite ID](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/idgen/composite-id.png)

Both parts can be extracted via the generator's `.id()` and `.version()`
methods. Each time a valid versioned ID is being discarded via
`.free(id)`, its version is being increased and, depending on use case
and usage frequency, will eventually overflow back to 0. Once an ID's
version has been updated, the old version is considered invalid. IDs can
be checked for validity via `.has(id)` (in constant time).

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

### ID generator with 16 bit range and no versioning

```ts
import { idgen } from "@thi.ng/idgen";

const ids = idgen(16, 0);

ids.next();
// 0

ids.next();
// 1

ids.next(2);
// 2

// discard ID 0
ids.free(0);
// true

ids.has(0);
// false

// reuse
ids.next()
// 0

ids.has(0);
// true

ids.next()
// 3
```

### ID generator w/ 24 bit range & 8 bit version range

```ts
import { idgen } from "@thi.ng/idgen";

// the 8bit version range is being deduced automatically (32-24 = 8),
// but can also be overwritten
const ids = idgen(24);

const a = ids.next();
// 0

ids.free(a);
// true

const b = ids.next();
// 16777216

// b is the re-used new version of a
ids.id(b);
// 0

ids.version(b)
// 1

ids.has(b);
// true

// a is invalid at this point
// (even though a's .id() part is the same as b's)
ids.has(a);
// false
```

### IDGen is iterable

```ts
import { idgen } from "@thi.ng/idgen";

const ids = ig.idgen(8);

ids.next();
// 0
ids.next();
// 1
ids.next();
// 2
ids.next();
// 3

ids.free(2);
// true

// only currently used IDs are returned
// NO ordering guarantee!
[...ids]
// [ 3, 1, 0 ]

ids.next();
// 258

[...ids]
// [3, 258, 1, 0]
```

<!-- include ../../assets/tpl/footer.md -->
