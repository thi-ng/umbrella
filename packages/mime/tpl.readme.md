# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

All MIME type mappings based on [mime-db](https://github.com/jshttp/mime-db)
(2021-03-26). For filesize reasons no vendor MIME types (aka `*/vnd.*`) are
included. Most of them are fairly obscure anyway, so likely not problematic.

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

To simplify lookup and support a fallback type, the package also has `preferredType()` function:

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

## Conversion from mime-db

1. Download the [latest version of mime-db's JSON
   index](https://raw.githubusercontent.com/jshttp/mime-db/master/db.json) and
   save it to `tools/mime-db.json`
2. Run the following command to build an up-to-date index (assumes the umbrella
   repo has been pre-built already). Output will always be to stdout.

```bash
# from the thi.ng/umbrella repo root
cd packages/mime
yarn tool:convert
```

3. Copy the output and paste it into `src/generated.ts`

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
