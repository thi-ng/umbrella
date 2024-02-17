<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

All MIME type mappings are based on [mime-db](https://github.com/jshttp/mime-db)
(2023-02-17). For filesize reasons only [a small selected
number](https://github.com/thi-ng/umbrella/blob/develop/packages/mime/tools/convert.ts#L7)
of [vendor MIME types](https://www.rfc-editor.org/rfc/rfc4288#section-3.2) (aka
`*/vnd.*`) are included. Most of the omitted ones are fairly obscure anyway, so
likely not problematic...

Additionally, this package defines some MIME types not included in the
original DB, as well as some preference overrides.

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

This package exposes a `MIME_TYPES` object which provides
mappings from file extensions to MIME types. For each extension one or
more MIME types are provided, with the default type always in first
position.

```ts
import { MIME_TYPES } from "@thi.ng/mime";

MIME_TYPES.mp3
// [ 'audio/mpeg', 'audio/mp3' ]

MIME_TYPES.jpg
// [ 'image/jpeg' ]

MIME_TYPES.jpeg
// [ 'image/jpeg' ]
```

### Determining MIME type from file extension

To simplify lookup and support a fallback type, the package has
`preferredType()` function:

```ts
import { preferredType } from "@thi.ng/mime";

preferredType("mp3")
// "audio/mpeg"

// unknown file extension w/ default fallback type
preferredType("foo")
// "application/octet-stream"

// unknown file extension w/ given fallback type
preferredType("foo", "text/plain")
// "text/plain"
```

### Determining file extension from MIME type

Reverse lookups are possible too, using `preferredExtension()`
(also supports fallback):

```ts
preferredExtension("image/svg+xml");
// "svg"

preferredExtension("image/foo");
// "bin" (default fallback)

preferredExtension("image/foo", "dat");
// "dat" (custom fallback)
```

### Checking if MIME type is compressible

The original [mime-db](https://github.com/jshttp/mime-db) includes information
if a MIME type is compressible (gzippable). This information can be obtained via
`isCompressible()`. Note: Some of these decisions seem to be questionable/wrong
(e.g. many plain text formats are marked as false), but taken here as
provided...

```ts
isCompressible("text/javascript");
// true

isCompressible(preferredType("mp4"))
// false
```

## Conversion from mime-db

1. Download the [latest version of mime-db's JSON
   index](https://raw.githubusercontent.com/jshttp/mime-db/master/db.json) and
   save it to `[packages/mime/]tools/mime-db.json`
2. Run the following command to build an up-to-date index (assumes the umbrella
   repo has been pre-built already). Output will always be be written to
   `src/generated.ts`.

```bash
# from the thi.ng/umbrella repo root
(cd packages/mime && yarn tool:convert)
```

Additional configuration options are available in the
[`tools/convert.ts`](https://github.com/thi-ng/umbrella/blob/develop/packages/mime/tools/convert.ts)
script.

<!-- include ../../assets/tpl/footer.md -->
