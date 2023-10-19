<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

In addition to the actual converters/encoders, the package also provides the
plain character strings for each base and variations.

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

```ts
import { BASE85, defBase } from "@thi.ng/base-n";

BASE85.encodeBigInt(2n ** 128n - 1);
// '=r54lj&NUUO~Hi%c2ym0'

BASE85.decodeBigInt("=r54lj&NUUO~Hi%c2ym0").toString(16);
// 'ffffffffffffffffffffffffffffffff'

// define a custom base impl
const ternary = defBase("012");

ternary.encode(12345678)
// '212020020002100'

ternary.decode("212020020002100");
// 12345678
```

<!-- include ../../assets/tpl/footer.md -->
