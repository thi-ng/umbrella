<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/validate-schema](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-validate-schema.svg?f200c4eb)

[![npm version](https://img.shields.io/npm/v/@thi.ng/validate-schema.svg)](https://www.npmjs.com/package/@thi.ng/validate-schema)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/validate-schema.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]

> This is one of 216 standalone projects. LLM-free, human-made and
> cared for software, maintained as part of the
> [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem and
> anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Limitations](#limitations)
  - [Linked external schemas](#linked-external-schemas)
  - [Annotation output format](#annotation-output-format)
  - [String format presets](#string-format-presets)
  - [Unsupported](#unsupported)
- [Extensions](#extensions)
  - [Value coercions](#value-coercions)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

JSON schema validation layer for [@thi.ng/validate](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/validate).

## Limitations

### Linked external schemas

Linked external schemas are NOT loaded automatically and must be pre-supplied
via config.

### Annotation output format

The result and collection of error messages and default values differs from
format options defined. Also see code examples below.

The result format is:

```ts
{
    // true if successful
    valid: boolean;
    // value given to validateSchema(), possibly augmented if coercions are used
    value: any;
    // list of error reports
    errors: { path: (number | string)[]; msg: string}[],
    // list of default values
    defaults: { path: (number | string)[]; value: any}[],
}
```

The choice of using arrays (and not JSON pointers) for value paths was made for
performance reasons and for direct application with
[@thi.ng/paths](https://thi.ng/paths) (i.e. functions `getIn()`, `setIn()`,
etc.)

### String format presets

Only the following `format` presets are supported for validating string values:

- `date`
- `date-time`
- `email`
- `time`
- `uri`
- `uuid`

### Unsupported

- no support for `$vocabulary` handling
- no support for `unevaluatedItems` / `unevaluatedProperties`

TBC

## Extensions

### Value coercions

Each schema can optionally define a `coerce` function (or registered function
ID) which is used to attempt to coerce the original value into a type/format
expected by the schema prior to validation. If coercion succeeds, that result
value will be used for validation instead and also be recorded in
[`ValidationResult.value`](https://docs.thi.ng/umbrella/validate-schema/interfaces/ValidationResult.html#value).

By default only the coercions defined in
[`DEFAULT_COERCIONS`](https://docs.thi.ng/umbrella/validate-schema/variables/DEFAULT_COERCIONS.html)
are available, but custom ones can be provided via an optional arg given to
[`validateSchema()`](https://docs.thi.ng/umbrella/validate-schema/functions/validateSchema.html).
Also see
[`JSONSchema.coerce`](https://docs.thi.ng/umbrella/validate-schema/interfaces/JSONSchema.html#coerce)
and
[`ValidateSchemaCtx.coerce`](https://docs.thi.ng/umbrella/validate-schema/interfaces/ValidateSchemaCtx.html#coerce).

Default coercions:

- `bits`: Coerces base-2 (binary) string value to 32bit umsigned int
- `csv`: Coerces comma-separated string to array of strings
- `float`: Coerces string value to JS number.
- `hex`: Coerces base-16 (hexadecimal) string value to 32bit umsigned int
- `int`: Coerces string value to 32bit signed int
- `json`: Parses string value as JSON
- `octal`: Coerces base-8 (octal) string value to 32bit umsigned int
- `split`: Higher-order coercion to split a string value with given delimiter into
  a string array. Usage example: `["split", ";"]`
- `splitRegExp`: Higher-order coercion to split a string value with given
  delimiter regexp into a string array. The regexp will be assigned the global
  flag. Usage example: `["split", "\\s+"]`.
- `uint`: Coerces string value to 32bit unsigned int

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bvalidate-schema%5D)

## Installation

```bash
yarn add @thi.ng/validate-schema
```

ESM import:

```ts
import * as vs from "@thi.ng/validate-schema";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/validate-schema"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const vs = await import("@thi.ng/validate-schema");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.55 KB

## Dependencies

- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/paths](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/paths)
- [@thi.ng/validate](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/validate)

## API

[Generated API docs](https://docs.thi.ng/umbrella/validate-schema/)

```ts tangle:export/readme-1.ts
import { validateSchema, type JSONSchema } from "@thi.ng/validate-schema";

const schema: JSONSchema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "User Profile",
    type: "object",
    properties: {
        id: { type: "integer", minimum: 1 },
        name: { type: "string", minLength: 2 },
        role: { $ref: "#/$defs/role" },
        contact: { $ref: "#/$defs/contact" },
        tags: { $ref: "#/$defs/tags" },
    },
    required: ["id", "name"],
    additionalProperties: false,
    $defs: {
        role: {
            type: "string",
            enum: ["admin", "editor", "viewer"],
            default: "viewer",
        },
        contact: {
            anyOf: [
                {
                    type: "object",
                    properties: {
                        email: { type: "string", format: "email" },
                    },
                    required: ["email"],
                },
                {
                    type: "object",
                    properties: {
                        phone: { type: "string" },
                    },
                    required: ["phone"],
                },
            ],
        },
        tags: {
            type: "array",
            items: { type: "string" },
            maxItems: 3,
        },
    },
};

console.log(
    validateSchema(
        {
            id: 1,
            name: "Alice",
            role: "admin",
            contact: {
                phone: "alice@example.com",
            },
            tags: ["blueteam", "remote"],
        },
        schema
    )
);
// {
//   valid: true,
//   value: {
//     id: 1,
//     name: "Alice",
//     role: "admin",
//     contact: { phone: "alice@example.com" },
//     tags: [ "blueteam", "remote" ],
//   },
//   errors: [],
//   defaults: [
//     { path: [ "role" ], value: "viewer" }
//   ],
// }

console.log(
    validateSchema(
        {
            id: 0,
            name: "Bob",
            role: "user",
            tags: ["far", "too", "many", "tags"],
        },
        schema
    )
);
// {
//   valid: false,
//   value: {
//     id: 0,
//     name: "Bob",
//     role: "user",
//     tags: [ "far", "too", "many", "tags" ],
//   },
//   errors: [
//     { path: [ "id" ], msg: "expected value >= 1" },
//     { path: [ "role" ], msg: "expected value to be one of: admin, editor, viewer" },
//     { path: [ "tags" ], msg: "expected max. length 3" }
//   ],
//   defaults: [
//     { path: [ "role" ], value: "viewer" }
//   ],
// }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-validate-schema,
  title = "@thi.ng/validate-schema",
  author = "Karsten Schmidt",
  note = "https://thi.ng/validate-schema",
  year = 2026
}
```

## License

&copy; 2026 Karsten Schmidt // Apache License 2.0
