<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/checks](https://media.thi.ng/umbrella/banners-20230807/thing-checks.svg?567a74c6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/checks.svg)](https://www.npmjs.com/package/@thi.ng/checks)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/checks.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 199 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Collection of 70+ type, feature & value checks.

- [`exists`](https://docs.thi.ng/umbrella/checks/functions/exists.html)
- [`existsAndNotNull`](https://docs.thi.ng/umbrella/checks/functions/existsAndNotNull.html)
- [`hasBigInt`](https://docs.thi.ng/umbrella/checks/functions/hasBigInt.html)
- [`hasCrypto`](https://docs.thi.ng/umbrella/checks/functions/hasCrypto.html)
- [`hasMaxLength`](https://docs.thi.ng/umbrella/checks/functions/hasMaxLength.html)
- [`hasMinLength`](https://docs.thi.ng/umbrella/checks/functions/hasMinLength.html)
- [`hasPerformance`](https://docs.thi.ng/umbrella/checks/functions/hasPerformance.html)
- [`hasWASM`](https://docs.thi.ng/umbrella/checks/functions/hasWASM.html)
- [`hasWebGL`](https://docs.thi.ng/umbrella/checks/functions/hasWebGL.html)
- [`hasWebSocket`](https://docs.thi.ng/umbrella/checks/functions/hasWebSocket.html)
- [`implementsFunction`](https://docs.thi.ng/umbrella/checks/functions/implementsFunction.html)
- [`isASCII`](https://docs.thi.ng/umbrella/checks/functions/isASCII.html)
- [`isAlpha`](https://docs.thi.ng/umbrella/checks/functions/isAlpha.html)
- [`isAlphaNum`](https://docs.thi.ng/umbrella/checks/functions/isAlphaNum.html)
- [`isArray`](https://docs.thi.ng/umbrella/checks/functions/isArray.html)
- [`isArrayBufferLike`](https://docs.thi.ng/umbrella/checks/functions/isArrayBufferLike.html)
- [`isArrayBufferView`](https://docs.thi.ng/umbrella/checks/functions/isArrayBufferView.html)
- [`isArrayLike`](https://docs.thi.ng/umbrella/checks/functions/isArrayLike.html)
- [`isAsyncIterable`](https://docs.thi.ng/umbrella/checks/functions/isAsyncIterable.html)
- [`isBigInt`](https://docs.thi.ng/umbrella/checks/functions/isBigInt.html)
- [`isBlob`](https://docs.thi.ng/umbrella/checks/functions/isBlob.html)
- [`isBoolean`](https://docs.thi.ng/umbrella/checks/functions/isBoolean.html)
- [`isChrome`](https://docs.thi.ng/umbrella/checks/functions/isChrome.html)
- [`isDataURL`](https://docs.thi.ng/umbrella/checks/functions/isDataURL.html)
- [`isDate`](https://docs.thi.ng/umbrella/checks/functions/isDate.html)
- [`isEven`](https://docs.thi.ng/umbrella/checks/functions/isEven.html)
- [`isFalse`](https://docs.thi.ng/umbrella/checks/functions/isFalse.html)
- [`isFile`](https://docs.thi.ng/umbrella/checks/functions/isFile.html)
- [`isFirefox`](https://docs.thi.ng/umbrella/checks/functions/isFirefox.html)
- [`isFloatString`](https://docs.thi.ng/umbrella/checks/functions/isFloatString.html)
- [`isFunction`](https://docs.thi.ng/umbrella/checks/functions/isFunction.html)
- [`isGenerator`](https://docs.thi.ng/umbrella/checks/functions/isGenerator.html)
- [`isHex`](https://docs.thi.ng/umbrella/checks/functions/isHex.html)
- [`isHexColor`](https://docs.thi.ng/umbrella/checks/functions/isHexColor.html)
- [`isIE`](https://docs.thi.ng/umbrella/checks/functions/isIE.html)
- [`isIllegalKey`](https://docs.thi.ng/umbrella/checks/functions/isIllegalKey.html)
- [`isInRange`](https://docs.thi.ng/umbrella/checks/functions/isInRange.html)
- [`isInt32`](https://docs.thi.ng/umbrella/checks/functions/isInt32.html)
- [`isIntString`](https://docs.thi.ng/umbrella/checks/functions/isIntString.html)
- [`isIterable`](https://docs.thi.ng/umbrella/checks/functions/isIterable.html)
- [`isMap`](https://docs.thi.ng/umbrella/checks/functions/isMap.html)
- [`isMobile`](https://docs.thi.ng/umbrella/checks/functions/isMobile.html)
- [`isNaN`](https://docs.thi.ng/umbrella/checks/functions/isNaN.html)
- [`isNegative`](https://docs.thi.ng/umbrella/checks/functions/isNegative.html)
- [`isNil`](https://docs.thi.ng/umbrella/checks/functions/isNil.html)
- [`isNode`](https://docs.thi.ng/umbrella/checks/functions/isNode.html)
- [`isNotStringAndIterable`](https://docs.thi.ng/umbrella/checks/functions/isNotStringAndIterable.html)
- [`isNull`](https://docs.thi.ng/umbrella/checks/functions/isNull.html)
- [`isNumber`](https://docs.thi.ng/umbrella/checks/functions/isNumber.html)
- [`isNumeric`](https://docs.thi.ng/umbrella/checks/functions/isNumeric.html)
- [`isNumericFloat`](https://docs.thi.ng/umbrella/checks/functions/isNumericFloat.html)
- [`isNumericInt`](https://docs.thi.ng/umbrella/checks/functions/isNumericInt.html)
- [`isObject`](https://docs.thi.ng/umbrella/checks/functions/isObject.html)
- [`isOdd`](https://docs.thi.ng/umbrella/checks/functions/isOdd.html)
- [`isPlainObject`](https://docs.thi.ng/umbrella/checks/functions/isPlainObject.html)
- [`isPositive`](https://docs.thi.ng/umbrella/checks/functions/isPositive.html)
- [`isPrimitive`](https://docs.thi.ng/umbrella/checks/functions/isPrimitive.html)
- [`isPrintableASCII`](https://docs.thi.ng/umbrella/checks/functions/isPrintableASCII.html)
- [`isPromise`](https://docs.thi.ng/umbrella/checks/functions/isPromise.html)
- [`isPromiseLike`](https://docs.thi.ng/umbrella/checks/functions/isPromiseLike.html)
- [`isProtoPath`](https://docs.thi.ng/umbrella/checks/functions/isProtoPath.html)
- [`isRegExp`](https://docs.thi.ng/umbrella/checks/functions/isRegExp.html)
- [`isSafari`](https://docs.thi.ng/umbrella/checks/functions/isSafari.html)
- [`isSet`](https://docs.thi.ng/umbrella/checks/functions/isSet.html)
- [`isString`](https://docs.thi.ng/umbrella/checks/functions/isString.html)
- [`isSymbol`](https://docs.thi.ng/umbrella/checks/functions/isSymbol.html)
- [`isTouchEvent`](https://docs.thi.ng/umbrella/checks/functions/isTouchEvent.html)
- [`isTransferable`](https://docs.thi.ng/umbrella/checks/functions/isTransferable.html)
- [`isTrue`](https://docs.thi.ng/umbrella/checks/functions/isTrue.html)
- [`isTypedArray`](https://docs.thi.ng/umbrella/checks/functions/isTypedArray.html)
- [`isUUID`](https://docs.thi.ng/umbrella/checks/functions/isUUID.html)
- [`isUUIDv4`](https://docs.thi.ng/umbrella/checks/functions/isUUIDv4.html)
- [`isUint32`](https://docs.thi.ng/umbrella/checks/functions/isUint32.html)
- [`isUndefined`](https://docs.thi.ng/umbrella/checks/functions/isUndefined.html)
- [`isZero`](https://docs.thi.ng/umbrella/checks/functions/isZero.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bchecks%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/checks
```

ESM import:

```ts
import * as ch from "@thi.ng/checks";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/checks"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ch = await import("@thi.ng/checks");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.65 KB

## Dependencies

- [tslib](https://www.typescriptlang.org/)

## API

[Generated API docs](https://docs.thi.ng/umbrella/checks/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [Gavin Cannizzaro](https://github.com/gavinpc-mindgrub)
- [Jay Zawrotny](https://github.com/eccentric-j)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-checks,
  title = "@thi.ng/checks",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/checks",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
