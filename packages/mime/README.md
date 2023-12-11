<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/mime](https://media.thi.ng/umbrella/banners-20230807/thing-mime.svg?81076c66)

[![npm version](https://img.shields.io/npm/v/@thi.ng/mime.svg)](https://www.npmjs.com/package/@thi.ng/mime)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/mime.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Conversion from mime-db](#conversion-from-mime-db)
- [Authors](#authors)
- [License](#license)

## About

650+ file extension to MIME type mappings, based on mime-db.

All MIME type mappings based on [mime-db](https://github.com/jshttp/mime-db)
(2022-04-07). For filesize reasons only [a small selected
number](https://github.com/thi-ng/umbrella/blob/develop/packages/mime/tools/convert.ts#L7)
of vendor MIME types (aka `*/vnd.*`) are included. Most of the omitted ones are
fairly obscure anyway, so likely not problematic...

Additionally, this package defines several MIME types not included in the
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

Package sizes (brotli'd, pre-treeshake): ESM: 4.55 KB

## Dependencies

None

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                 | Description                                                                 | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/adaptive-threshold.png" width="240"/>  | Interactive image processing (adaptive threshold)                           | [Demo](https://demo.thi.ng/umbrella/adaptive-threshold/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/adaptive-threshold)  |
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

To simplify lookup and support a fallback type, the package also has
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

Since v0.3.0 reverse lookups are possible too, using `preferredExtension()`
(also supports fallback):

```ts
preferredExtension("image/svg+xml");
// "svg"

preferredExtension("image/foo");
// "bin" (default fallback)

preferredExtension("image/foo", "dat");
// "dat" (custom fallback)
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
cd packages/mime
yarn tool:convert
```

Additional configuration options are available in the `tools/convert.ts` script.

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

&copy; 2020 - 2023 Karsten Schmidt // Apache License 2.0
