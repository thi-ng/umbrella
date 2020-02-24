<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/download](https://media.thi.ng/umbrella/banners/thing-download.svg?1582555625)

[![npm version](https://img.shields.io/npm/v/@thi.ng/download.svg)](https://www.npmjs.com/package/@thi.ng/download)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/download.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Local asset download for web apps, mime type presets.

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/download
```

Package sizes (gzipped): ESM: 0.5KB / CJS: 0.6KB / UMD: 0.7KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)

## API

[Generated API docs](https://docs.thi.ng/umbrella/download/)

```ts
import { download, MIME_TEXT } from "@thi.ng/download";

const src = "Hellö wörld!";

// mime type derived from file extension (.txt)
download("hello.txt", src, {
    utf8: true,
    expire: 1000
});

// with explicit mime type
download("hello.txt", src, {
    mime: MIME_TXT,
    utf8: true,
    expire: 1000
});
```

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
