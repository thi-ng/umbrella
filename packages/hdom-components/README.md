<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/hdom-components](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-hdom-components.svg?fb3fa9fe)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hdom-components.svg)](https://www.npmjs.com/package/@thi.ng/hdom-components)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hdom-components.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Canvas](#canvas)
  - [Form elements](#form-elements)
  - [Links](#links)
  - [Other](#other)
- [Authors](#authors)
- [License](#license)

## About

Raw, skinnable UI & SVG components for [@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom).

A growing collection of unstyled, re-usable & customizable components
for use with
[@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom)
&
[@thi.ng/hiccup](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup).

**Please see
[ADR-0002](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/adr/0002-component-configuration.md)
and onwards for detailed discussion about the design intentions of these
components**. Feedback welcome!

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bhdom-components%5D)

## Installation

```bash
yarn add @thi.ng/hdom-components
```

ESM import:

```ts
import * as hc from "@thi.ng/hdom-components";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/hdom-components"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 2.04 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/canvas)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)
- [@thi.ng/transducers-stats](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers-stats)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

11 projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                                   | Description                                                            | Live demo                                                 | Source                                                                                         |
|:---------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|:----------------------------------------------------------|:-----------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/canvas-dial.png" width="240"/>                   | Canvas based dial widget                                               | [Demo](https://demo.thi.ng/umbrella/canvas-dial/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/canvas-dial)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/cellular-automata.png" width="240"/>             | 2D transducer based cellular automata                                  | [Demo](https://demo.thi.ng/umbrella/cellular-automata/)   | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/cellular-automata)   |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/crypto-chart.png" width="240"/>                  | Basic crypto-currency candle chart with multiple moving averages plots | [Demo](https://demo.thi.ng/umbrella/crypto-chart/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/crypto-chart)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/hdom-benchmark2.png" width="240"/>               | hdom update performance benchmark w/ config options                    | [Demo](https://demo.thi.ng/umbrella/hdom-benchmark2/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-benchmark2)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export   | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-canvas-shapes)  |
|                                                                                                                                              | Custom dropdown UI component for hdom                                  | [Demo](https://demo.thi.ng/umbrella/hdom-dropdown/)       | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-dropdown)       |
|                                                                                                                                              | Custom dropdown UI component w/ fuzzy search                           | [Demo](https://demo.thi.ng/umbrella/hdom-dropdown-fuzzy/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-dropdown-fuzzy) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/hdom-toggle.png" width="240"/>                   | Customizable slide toggle component demo                               | [Demo](https://demo.thi.ng/umbrella/hdom-toggle/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-toggle)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/mandelbrot.jpg" width="240"/>                    | Worker based, interactive Mandelbrot visualization                     | [Demo](https://demo.thi.ng/umbrella/mandelbrot/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/mandelbrot)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/triple-query.png" width="240"/>                  | Triple store query results & sortable table                            | [Demo](https://demo.thi.ng/umbrella/triple-query/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/triple-query)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-cubemap.jpg" width="240"/>                 | WebGL cube maps with async texture loading                             | [Demo](https://demo.thi.ng/umbrella/webgl-cubemap/)       | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-cubemap)       |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hdom-components/)

### Canvas

- [Canvas types](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/canvas.ts) (WebGL, WebGL2 & Canvas2D)

### Form elements

- [Button](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/button.ts)
- [Button group](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/button-group.ts)
- [Dropdown](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/dropdown.ts)
- [Pager](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/pager.ts)

### Links

- [Link types](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/link.ts)

### Other

- [FPS counter](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/fps-counter.ts)
- [Notification](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/notification.ts)
- [Sparkline](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/sparkline.ts)
- [Title](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-components/src/title.ts)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hdom-components,
  title = "@thi.ng/hdom-components",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hdom-components",
  year = 2018
}
```

## License

&copy; 2018 - 2026 Karsten Schmidt // Apache License 2.0
