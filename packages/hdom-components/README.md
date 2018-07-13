# @thi.ng/hdom-components

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hdom-components.svg)](https://www.npmjs.com/package/@thi.ng/hdom-components)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

**As of 2018-03-03 this package is now called @thi.ng/hdom-components,
formerly @thi.ng/hiccup-dom-components**

## About

A growing collection of unstyled, re-usable & customizable components
for use with
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
&
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup).

**Please see the
[ADR-0002](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-components/adr/0002-component-configuration.md)
for detailed discussion about the design intentions of these
components**. Feedback welcome!

## Status

ALPHA

## Installation

```bash
yarn add @thi.ng/hdom-components
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/iterators](https://github.com/thi-ng/umbrella/tree/master/packages/iterators)

## Usage examples

```ts
import * as hdc from "@thi.ng/hdom-components";
```

### Canvas

- [Canvas types](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-components/src/canvas.ts) (WebGL, WebGL2 & Canvas2D)

### Form elements

- [Button](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-components/src/button.ts)
- [Button group](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-components/src/button-group.ts)
- [Dropdown](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-components/src/dropdown.ts)
- [Pager](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-components/src/pager.ts)

### Links

- [Link types](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-components/src/link.ts)

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
