<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/mime](https://media.thi.ng/umbrella/banners-20230807/thing-mime.svg?81076c66)

[![npm version](https://img.shields.io/npm/v/@thi.ng/mime.svg)](https://www.npmjs.com/package/@thi.ng/mime)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/mime.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Determining MIME type from file extension](#determining-mime-type-from-file-extension)
  - [Determining file extension from MIME type](#determining-file-extension-from-mime-type)
  - [Checking if MIME type is compressible](#checking-if-mime-type-is-compressible)
- [Conversion from mime-db](#conversion-from-mime-db)
- [Authors](#authors)
- [License](#license)

## About

650+ file extension to MIME type mappings, based on mime-db.

All MIME type mappings are based on [mime-db](https://github.com/jshttp/mime-db)
(2023-02-17). For filesize reasons only [a small selected
number](https://github.com/thi-ng/umbrella/blob/develop/packages/mime/tools/convert.ts#L7)
of [vendor MIME types](https://www.rfc-editor.org/rfc/rfc4288#section-3.2) (aka
`*/vnd.*`) are included. Most of the omitted ones are fairly obscure anyway, so
likely not problematic...

Additionally, this package defines some MIME types not included in the
original DB, as well as some preference overrides.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmime%5D+in%3Atitle)

## Related packages

- [@thi.ng/dl-asset](https://github.com/thi-ng/umbrella/tree/develop/packages/dl-asset) - Canvas, video recording & file asset download helpers for web apps

## Installation

```bash
yarn add @thi.ng/mime
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/mime"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const mime = await import("@thi.ng/mime");
```

Package sizes (brotli'd, pre-treeshake): ESM: 4.78 KB

## Dependencies

None

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                 | Description                                                                 | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/adaptive-threshold.png" width="240"/>  | Interactive image processing (adaptive threshold)                           | [Demo](https://demo.thi.ng/umbrella/adaptive-threshold/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/adaptive-threshold)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/blurhash.jpg" width="240"/>            | Interactive & reactive image blurhash generator                             | [Demo](https://demo.thi.ng/umbrella/blurhash/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/blurhash)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>     | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>       | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel            | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-waveform.jpg" width="240"/>      | RGB waveform image analysis                                                 | [Demo](https://demo.thi.ng/umbrella/pixel-waveform/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-waveform)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-formgen.jpg" width="240"/>        | Basic usage of the declarative rdom-forms generator                         | [Demo](https://demo.thi.ng/umbrella/rdom-formgen/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-formgen)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>        | Multi-layer vectorization & dithering of bitmap images                      | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/> | rdom & WebGL-based image channel editor                                     | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-channel-mixer) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/mime/)

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

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-mime,
  title = "@thi.ng/mime",
  author = "Karsten Schmidt",
  note = "https://thi.ng/mime",
  year = 2020
}
```

## License

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
