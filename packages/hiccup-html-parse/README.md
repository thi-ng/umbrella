<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/hiccup-html-parse](https://media.thi.ng/umbrella/banners-20230807/thing-hiccup-html-parse.svg?5dca863b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-html-parse.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-html-parse)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-html-parse.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Basic usage](#basic-usage)
  - [Parsing & transformation options](#parsing--transformation-options)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Benchmarks](#benchmarks)
- [Authors](#authors)
- [License](#license)

## About

Well-formed HTML parsing and customizable transformation to nested JS arrays in [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) format.

Note: This parser is intended to work with wellformed HTML and will likely fail
for any "quirky" (aka malformed/dodgy) markup...

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

| Option           | Description                                         | Default |
|------------------|-----------------------------------------------------|---------|
| `ignoreElements` | Array of element names to ignore                    | []      |
| `ignoreAttribs`  | Array of attribute names to ignore                  | []      |
| `dataAttribs`    | Keep data attribs                                   | true    |
| `comments`       | Keep `<!-- ... -->` comments                        | false   |
| `doctype`        | Keep `<!doctype ...>` element                       | false   |
| `whitespace`     | Keep whitespace-only text bodies                    | false   |
| `collapse`       | Collapse whitespace<sup>(1)</sup>                   | true    |
| `unescape`       | Replace named & numeric HTML entities<sup>(1)</sup> | true    |
| `tx`             | Element transform/filter function                   |         |
| `txBody`         | Plain text transform/filter function                |         |

- (1) - Not in CData content sections like inside `<script>` or `<style>` elements

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

Package sizes (brotli'd, pre-treeshake): ESM: 1.18 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/parse](https://github.com/thi-ng/umbrella/tree/develop/packages/parse)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                           | Description                                                                                             | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mastodon-feed.jpg" width="240"/> | Mastodon API feed reader with support for different media types, fullscreen media modal, HTML rewriting | [Demo](https://demo.thi.ng/umbrella/mastodon-feed/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mastodon-feed) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-html-parse/)

TODO

## Benchmarks

Results from the
[benchmark](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-html-parse/bench/index.ts)
parsing the HTML of the [thi.ng](https://thi.ng) website (MBA M1 2021, 16GB RAM,
Node.js v20.5.1):

```text
benchmarking: thi.ng html (87.97 KB)
        warmup... 1951.76ms (100 runs)
        total: 19375.49ms, runs: 1000 (@ 1 calls/iter)
        mean: 19.38ms, median: 19.26ms, range: [18.12..28.45]
        q1: 18.75ms, q3: 19.68ms
        sd: 4.66%
```

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

&copy; 2023 - 2024 Karsten Schmidt // Apache License 2.0
