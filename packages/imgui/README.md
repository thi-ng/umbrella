# @thi.ng/imgui

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/imgui.svg)](https://www.npmjs.com/package/@thi.ng/imgui)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/imgui.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Available components / widgets](#available-components--widgets)
    - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Customizable immediate mode GUI implementation, primarily for
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-canvas)
and
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl),
however with no dependency on either.

### Available components / widgets

- Push button
- Dropdown
- Radio button group
- Slider (horizontal / vertical)
- Slider groups (horizontal / vertical)
- Text input (single line, filtered input)
- Text label
- Toggle button
- XY pad

All components are skinnable (via global theme) & support tooltips.

### Status

WIP

## Installation

```bash
yarn add @thi.ng/imgui
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/master/packages/geom)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

WIP demo GUI showcasing all available components:

[Live demo](http://demo.thi.ng/umbrella/imgui/) | [Source
code](https://github.com/thi-ng/umbrella/tree/feature/imgui/examples/imgui/)

```ts
import * as imgui from "@thi.ng/imgui";
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
