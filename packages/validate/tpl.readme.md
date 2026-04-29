<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

<!-- include ../../assets/tpl/footer.md -->
