<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/hiccup-html-parse](https://media.thi.ng/umbrella/banners-20230807/thing-hiccup-html-parse.svg?5dca863b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-html-parse.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-html-parse)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-html-parse.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
  - [Basic usage](#basic-usage)
  - [Parsing & transformation options](#parsing--transformation-options)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

HTML parsing and transformation to nested JS arrays in hiccup format. This is a support package for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup).

### Basic usage

```ts tangle:export/readme.ts
import { parseHtml } from "@thi.ng/hiccup-html-parse";

const src = `<!doctype html>
<html lang="en">
<head>
    <script lang="javascript">
console.log("</"+"script>");
    </script>
    <style>
body { margin: 0; }
    </style>
</head>
<body>
    <div id="foo" bool data-xyz="123" empty=''>
    <a href="#bar">baz <b>bold</b></a><br/>
    </div>
</body>
</html>`;

const result = parseHtml(src);

console.log(result.type);
// "success"

console.log(result.result);

// [
//   ["html", { lang: "en" },
//     ["head", {},
//       ["script", { lang: "javascript" }, "console.log(\"</\"+\"script>\");" ],
//       ["style", {}, "body { margin: 0; }"] ],
//     ["body", {},
//       ["div", { id: "foo", bool: true, "data-xyz": "123" },
//         ["a", { href: "#bar" },
//           "baz ",
//           ["b", {}, "bold"]],
//         ["br", {}]]]]
// ]
```

### Parsing & transformation options

Parser behavior & results can be customized via supplied options and user
transformation functions:

| Option           | Description                          | Default |
|------------------|--------------------------------------|---------|
| `ignoreElements` | Array of element names to ignore     | []      |
| `ignoreAttribs`  | Array of attribute names to ignore   | []      |
| `doctype`        | Keep `<!doctype ...>` element        | false   |
| `whitespace`     | Keep whitespace-only text bodies     | false   |
| `dataAttribs`    | Keep data attribs                    | true    |
| `tx`             | Element transform/filter function    |         |
| `txBody`         | Plain text transform/filter function |         |

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhiccup-html-parse%5D+in%3Atitle)

## Related packages

- [@thi.ng/hiccup-html](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html) - 100+ type-checked HTML5 element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) related infrastructure
- [@thi.ng/hiccup-markdown](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-markdown) - Markdown parser & serializer from/to Hiccup format
- [@thi.ng/zipper](https://github.com/thi-ng/umbrella/tree/develop/packages/zipper) - Functional tree editing, manipulation & navigation

## Installation

```bash
yarn add @thi.ng/hiccup-html-parse
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/hiccup-html-parse"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const hiccupHtmlParse = await import("@thi.ng/hiccup-html-parse");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.03 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/parse](https://github.com/thi-ng/umbrella/tree/develop/packages/parse)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                           | Description                                                                                             | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mastodon-feed.jpg" width="240"/> | Mastodon API feed reader with support for different media types, fullscreen media modal, HTML rewriting | [Demo](https://demo.thi.ng/umbrella/mastodon-feed/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mastodon-feed) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-html-parse/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hiccup-html-parse,
  title = "@thi.ng/hiccup-html-parse",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hiccup-html-parse",
  year = 2023
}
```

## License

&copy; 2023 Karsten Schmidt // Apache License 2.0
