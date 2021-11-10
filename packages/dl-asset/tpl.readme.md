# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

### Basic usage

```ts
import { download } from "@thi.ng/dl-asset";

const src = "Hellö wörld!";

// mime type derived from file extension (.txt)
download("hello.txt", src, {
    utf8: true,
    expire: 1000
});

// with explicit MIME type string
download("hello.txt", src, {
    mime: "text/plain",
    utf8: true,
    expire: 1000
});
```

...or using MIME type preset from
[@thi.ng/mime](https://github.com/thi-ng/umbrella/tree/develop/packages/mime).

```ts
import { preferredType } from "@thi.ng/mime";

downloadWithMime("hello.txt", src, {
    // here mandatory to provide MIME type
    mime: preferredType("txt"), // text/plain
    utf8: true,
    expire: 1000
});
```

### Simplified canvas downloads

Since v2.1.0, HTML canvas downloads can be simplified using
[`downloadCanvas()`](https://docs.thi.ng/umbrella/dl-asset/modules.html#downloadCanvas):

```ts
import { downloadCanvas } from "@thi.ng/dl-asset";

// download as PNG (default)
downloadCanvas(canvas, "file-name-without-ext");

// download as JPG or WebP with given quality
downloadCanvas(canvas, "file-name-without-ext", "jpeg", 0.9);

downloadCanvas(canvas, "file-name-without-ext", "webp", 0.9);
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
