# @thi.ng/equiv

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/equiv.svg)](https://www.npmjs.com/package/@thi.ng/equiv)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Deep equivalence checking for any data types. Supports:

- JS primitives
- arrays
- plain objects
- ES6 Sets / Maps
- Date
- RegExp
- types with `.equiv()` implementations

This feature was previously part of the
[@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
package.

## Installation

```
yarn add @thi.ng/equiv
```

## Usage examples

```typescript
import { equiv } from "@thi.ng/equiv";

equiv({a: {b: [1, 2]}}, {a: {b: [1, 2]}});
// true
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
