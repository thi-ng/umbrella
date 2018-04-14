# @thi.ng/rstream-gestures

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream-gestures.svg)](https://www.npmjs.com/package/@thi.ng/rstream-gestures)

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

```typescript
import * as rsg from "@thi.ng/rstream-gestures";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
