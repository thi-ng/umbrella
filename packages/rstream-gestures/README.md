# @thi.ng/rstream-gestures

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream-gestures.svg)](https://www.npmjs.com/package/@thi.ng/rstream-gestures)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Unified mouse, mouse wheel & single-touch event stream abstraction.
Stream emits tuples of:

```
[type, {pos, click?, delta?, zoom}]
```

The `click` and `delta` values are only present if `type ==
GestureType.DRAG`. Both (and `pos` too) are 2-element arrays of `[x,y]`
coordinates.

The `zoom` value is always present, but is only updated with wheel
events. The value will be constrained to `minZoom` ... `maxZoom`
interval (provided via options object).

## Installation

```
yarn add @thi.ng/rstream-gestures
```

## Usage examples

A small, fully commented project can be found in the `/examples` folder:

[Source](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-dataflow) |
[Live version](http://demo.thi.ng/umbrella/rstream-dataflow)

```typescript
import { gestureStream } from "@thi.ng/rstream-gestures";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
