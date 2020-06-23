<!-- This file is generated - DO NOT EDIT! -->

# ![hiccup-html](https://media.thi.ng/umbrella/banners/thing-hiccup-html.svg?cec1e8d8)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-html.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-html)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-html.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Supported elements](#supported-elements)
    - [Sections](#sections)
    - [Text content](#text-content)
    - [Forms / inputs](#forms---inputs)
    - [Media](#media)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Type-checked HTML5 element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) related infrastructure.

The following type-checked factory functions are provided _so far_. All
functions take zero or more args with the first one an element specific
attribute object (see
[api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/api.ts#L116)
for common base).

### Supported elements

#### Sections

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/sections.ts)

`address`, `article`, `aside`, `footer`, `header`, `hgroup`, `main`,
`nav`, `section`

#### Text content

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/blocks.ts)

`anchor`, `blockquote`, `div`, `figure`, `figcaption`, `hr`, `para`,
`pre`, `span`

#### Forms / inputs

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/input.ts)

`inputCheck`, `inputNumber`, `inputPass`, `inputRadio`, `inputRange`,
`inputText`, `label`, `option`, `optGroup`, `select`

#### Media

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/media.ts)

`img`

### Status

**ALPHA** - bleeding edge / work-in-progress

The current aim is not necessarily to have wrappers for *each* possible
HTML5 element, but certainly to support the most commonly used ones. PRs
welcome!

### Related packages

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)

## Installation

```bash
yarn add @thi.ng/hiccup-html
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/hiccup-html?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/hiccup-html/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 440 bytes / CJS: 576 bytes / UMD: 630 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-html/)

```ts
import { $compile } from "@thi.ng/hdom2020";
import { div, label, option, select } from "@thi.ng/hiccup-html";

const choices = [
    ["#f00", "Red"],
    ["#ff0", "Yellow"],
    ["#0f0", "Green"],
    ["#0ff", "Cyan"],
    ["#00f", "Blue"],
    ["#f0f", "Magenta"],
];

$compile(
    div(
        null,
        label({ for: "colors" }, "Fave color: "),
        select(
            {
                id: "colors",
                onchange: (e) => alert((<HTMLSelectElement>e.target).value),
            },
            option(null, "Please choose..."),
            ...choices.map((x) => option({ value: x[0] }, x[1]))
        )
    )
).mount(document.body);
```

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
