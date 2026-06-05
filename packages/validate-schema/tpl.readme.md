<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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
	valid: boolean;
	errors: { path: (number | string)[]; msg: string}[],
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
						email: { type: "string", format: "email" }
					},
					required: ["email"],
				},
				{
					type: "object",
					properties: {
						phone: { type: "string" }
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
//   errors: [],
//   defaults: [
//     { path: ["role"], value: "viewer" }
//   ],
// }

console.log(
	validateSchema(
		{
			id: 0,
			name: "Bob",
			role: "user",
			tags: ["far", "too", "many", "tags", "here"],
		},
		schema
	)
);
// {
//   valid: false,
//   errors: [
//     { path: ["id"], msg: "expected value >= 1" },
//     { path: ["role"], msg: "expected value to be one of: admin, editor, viewer" },
//     { path: ["tags"], msg: "expected max. length 3" }
//   ],
//   defaults: [
//     { path: ["role"], value: "viewer" }
//   ],
// }
```

<!-- include ../../assets/tpl/footer.md -->
