<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/validate](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-validate.svg?9ff0fc13)

[![npm version](https://img.shields.io/npm/v/@thi.ng/validate.svg)](https://www.npmjs.com/package/@thi.ng/validate)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/validate.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 215 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
  - [Built-in validators](#built-in-validators)
  - [Combinators](#combinators)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Functional, composable, fully extensible, predicate-based value validation with customizable error messages.

Based on ideas from older `thi.ng/validate-x` Clojure/ClojureScript library...

Basic usage:

```ts
import * as v from "@thi.ng/validate";

// build validation function to check if a value is...
const check = v.validator(
  // a plain object
  v.isObject(),
  // and its keys are matching given validation criteria:
  v.hasKeysOf({
    // number in [0,1000] range
    id: [v.isNumber(), v.isInRange(1, 1000)],
    // optional title string (i.e. nullish values allowed)
    title: v.optional(v.isString()),
    // enum type
    type: v.isEnum(["file", "url", "record"])
  })
);

try {

  check({ id: 123, title: "abc", type: "file" });
  // true

  // validation will fail:
  check({ id: 999, type: "foo" });

} catch(e) {
  console.warn(e);
}

// validation error: required value to be one of: file, url, record (key: type)
```

### Built-in validators

- [`hasKeysOf()`](https://docs.thi.ng/umbrella/validate/functions/hasKeysOf.html)
- [`hasRequiredKeys()`](https://docs.thi.ng/umbrella/validate/functions/hasRequiredKeys.html)
- [`isArray()`](https://docs.thi.ng/umbrella/validate/functions/isArray.html)
- [`isArrayOf()`](https://docs.thi.ng/umbrella/validate/functions/isArrayOf.html)
- [`isBoolean()`](https://docs.thi.ng/umbrella/validate/functions/isBoolean.html)
- [`isDate()`](https://docs.thi.ng/umbrella/validate/functions/isDate.html)
- [`isEnum()`](https://docs.thi.ng/umbrella/validate/functions/isEnum.html)
- [`isInRange()`](https://docs.thi.ng/umbrella/validate/functions/isInRange.html)
- [`isLength()`](https://docs.thi.ng/umbrella/validate/functions/isLength.html)
- [`isMaxLength()`](https://docs.thi.ng/umbrella/validate/functions/isMaxLength.html)
- [`isMinLength()`](https://docs.thi.ng/umbrella/validate/functions/isMinLength.html)
- [`isMinMaxLength()`](https://docs.thi.ng/umbrella/validate/functions/isMinMaxLength.html)
- [`isNegative()`](https://docs.thi.ng/umbrella/validate/functions/isNegative.html)
- [`isNonNegative()`](https://docs.thi.ng/umbrella/validate/functions/isNonNegative.html)
- [`isNonPositive()`](https://docs.thi.ng/umbrella/validate/functions/isNonPositive.html)
- [`isNullish()`](https://docs.thi.ng/umbrella/validate/functions/isNullish.html)
- [`isNumber()`](https://docs.thi.ng/umbrella/validate/functions/isNumber.html)
- [`isObject()`](https://docs.thi.ng/umbrella/validate/functions/isObject.html)
- [`isObjectOf()`](https://docs.thi.ng/umbrella/validate/functions/isObjectOf.html)
- [`isPositive()`](https://docs.thi.ng/umbrella/validate/functions/isPositive.html)
- [`isRegExp()`](https://docs.thi.ng/umbrella/validate/functions/isRegExp.html)
- [`isString()`](https://docs.thi.ng/umbrella/validate/functions/isString.html)
- [`isTypedArray()`](https://docs.thi.ng/umbrella/validate/functions/isTypedArray.html)
- [`isU8Array()`](https://docs.thi.ng/umbrella/validate/functions/isU8Array.html)
- [`isUndefined()`](https://docs.thi.ng/umbrella/validate/functions/isUndefined.html)
- [`matchesRegexp()`](https://docs.thi.ng/umbrella/validate/functions/matchesRegexp.html)

### Combinators

- [`every()`](https://docs.thi.ng/umbrella/validate/functions/every.html)
- [`not()`](https://docs.thi.ng/umbrella/validate/functions/not.html)
- [`optional()`](https://docs.thi.ng/umbrella/validate/functions/optional.html)
- [`some()`](https://docs.thi.ng/umbrella/validate/functions/some.html)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bvalidate%5D)

## Installation

```bash
yarn add @thi.ng/validate
```

ESM import:

```ts
import * as val from "@thi.ng/validate";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/validate"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const val = await import("@thi.ng/validate");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.19 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/validate/)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-validate,
  title = "@thi.ng/validate",
  author = "Karsten Schmidt",
  note = "https://thi.ng/validate",
  year = 2026
}
```

## License

&copy; 2026 Karsten Schmidt // Apache License 2.0
