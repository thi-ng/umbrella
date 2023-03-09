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
[`downloadCanvas()`](https://docs.thi.ng/umbrella/dl-asset/functions/downloadCanvas.html):

```ts
import { downloadCanvas } from "@thi.ng/dl-asset";

// download as PNG (default)
downloadCanvas(canvas, "file-name-without-ext");

// download as JPG or WebP with given quality
downloadCanvas(canvas, "file-name-without-ext", "jpeg", 0.9);

downloadCanvas(canvas, "file-name-without-ext", "webp", 0.9);
```

<!-- include ../../assets/tpl/footer.md -->
