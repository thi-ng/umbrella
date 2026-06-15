// SPDX-License-Identifier: Apache-2.0
import { isFunction as $isFunction } from "@thi.ng/checks/is-function";
import { isString as $isString } from "@thi.ng/checks/is-string";
import type { CustomError } from "@thi.ng/errors";
import { defError } from "@thi.ng/errors/deferror";
import { defSetter } from "@thi.ng/paths/setter";
import type { Validator } from "@thi.ng/validate";
import {
	hasRequiredKeys,
	isArray,
	isBoolean,
	isEnum,
	isEqual,
	isInClosedInterval,
	isInOpenInterval,
	isInteger,
	isMinMaxLength,
	isMultipleOf,
	isNullish,
	isNumber,
	isObject,
	isString,
	matchesRegexp,
	validator,
} from "@thi.ng/validate/validators";
import type {
	AllOfSchema,
	AltSchema,
	AnyOfSchema,
	ArraySchema,
	CoercionFn,
	ConditionalSchema,
	ConstSchema,
	EnumSchema,
	FormatPreset,
	CoercionHOF,
	JSONSchema,
	NotSchema,
	NumberSchema,
	ObjectSchema,
	SchemaRef,
	StringSchema,
	ValidateSchemaCtx,
	ValidationResult,
} from "./api.js";
import { DEFAULT_COERCIONS } from "./coerce.js";

export const SchemaError = defError(() => `schema error`);

/**
 * Validates value `x` against given schema and options. Returns a
 * {@link ValidationResult} object with validation result, error reports,
 * collected default values and possibly augmented value (if the schema uses
 * value coercions).
 *
 * @remarks
 * Each schema can optionally define a function (or registered ID) which is used
 * to attempt to coerce the original value into a type/format expected by the
 * schema. By default the coercions defined in {@link DEFAULT_COERCIONS} are
 * available, but custom ones can be provided via the `opts` arg given to
 * {@link validateSchema}. Also see {@link JSONSchema.coerce} and
 * {@link ValidateSchemaCtx.coerce}.
 *
 * @example
 * ```ts tangle:../export/validate-schema1.ts
 * import { validateSchema, type JSONSchema } from "@thi.ng/validate-schema";
 *
 * const schema: JSONSchema = {
 *     type: "object",
 *     properties: {
 *         name: { type: "string" },
 *         role: { $ref: "#/$defs/role" },
 *         tags: {
 *             type: "array",
 *             items: { type: "string" },
 *             // non-standard feature:
 *             // coerce string as comma-separated values BEFORE validation
 *             coerce: "csv",
 *         },
 *     },
 *     required: ["name", "role"],
 *     $defs: {
 *         role: { enum: ["artist", "curator", "viewer"] },
 *     },
 * };
 *
 * // example data
 * const alice = { name: "alice", role: "artist", tags: "a,c" };
 *
 * const bob = { name: "bob", tags: ["b"] };
 *
 * // validate against schema, note the updated result value (tags)
 * console.log(validateSchema(alice, schema));
 * // {
 * //   valid: true,
 * //   value: { name: "alice", role: "artist", tags: ["a", "c"] },
 * //   errors: [],
 * //   defaults: [],
 * // }
 *
 * // here validation failed
 * console.log(validateSchema(bob, schema));
 * // {
 * //   valid: false,
 * //   value: { name: "bob", tags: ["b"] },
 * //   errors: [
 * //     { path: [], msg: "expected keys: name, role" }
 * //   ],
 * //   defaults: [],
 * // }
 * ```
 *
 * @param value
 * @param schema
 * @param opts
 */
export const validateSchema = (
	value: any,
	schema: JSONSchema,
	opts?: Partial<Pick<ValidateSchemaCtx, "base" | "coerce" | "registry">>
): ValidationResult => {
	const ctx: ValidateSchemaCtx = {
		base: "",
		registry: {},
		coerce: DEFAULT_COERCIONS,
		path: [],
		errors: [],
		defaults: [],
		root: <any>{},
		value,
		...opts,
	};
	ctx.root = ctx;
	ctx.registry[ctx.base + "#"] = schema;
	return {
		valid: __validateSchema(value, schema, ctx),
		value: ctx.value,
		errors: ctx.errors,
		defaults: ctx.defaults,
	};
};

/** @internal */
const __validateSchema = (
	x: any,
	schema: JSONSchema,
	ctx: ValidateSchemaCtx
): boolean => {
	if ("$id" in schema) {
		ctx = { ...ctx, base: schema.$id! };
	}
	if ("$defs" in schema) {
		ctx = __mergeDefs(ctx, schema.$defs!);
	}
	if ("$ref" in schema) {
		return __schemaRef(x, <SchemaRef>schema, ctx);
	}

	// reset cycle breaker (only disallow direct $ref chains, without any
	// concrete intermediate schemas)
	if (ctx.visited) ctx.visited.length = 0;

	if ("default" in schema) {
		ctx.defaults.push({ path: [...ctx.path], value: schema.default });
	}
	if ("coerce" in schema) {
		const $value = __coerce(x, schema, ctx);
		if ($value == null) return __addError(ctx, "coercion failed");
		ctx.root.value = defSetter(<any>ctx.path)(ctx.root.value, $value);
		x = $value;
	}
	if ("enum" in schema) {
		return __enum(x, <EnumSchema>schema, ctx);
	}
	if ("const" in schema) {
		return __const(x, <ConstSchema>schema, ctx);
	}
	if ("not" in schema) {
		return __not(x, <NotSchema>schema, ctx);
	}
	if ("anyOf" in schema) {
		return __anyOf(x, <AnyOfSchema>schema, ctx);
	}
	if ("allOf" in schema) {
		return __allOf(x, <AllOfSchema>schema, ctx);
	}
	if ("if" in schema && !__ifThenElse(x, <ConditionalSchema>schema, ctx)) {
		return false;
	}
	if ("type" in schema) {
		return Array.isArray(schema.type)
			? __altTypes(x, <AltSchema>schema, ctx)
			: __type(x, schema, ctx);
	}
	return true;
};

const __coerce = (x: any, schema: JSONSchema, ctx: ValidateSchemaCtx) => {
	const coerce = schema.coerce!;
	let fn: CoercionFn | undefined;
	if ($isFunction(coerce)) {
		fn = coerce;
	} else if ($isString(coerce)) {
		fn = ctx.coerce[coerce];
	} else {
		const entry: CoercionHOF = ctx.coerce[coerce[0]];
		if (entry != null) fn = entry(...coerce.slice(1));
	}
	if (!fn) {
		__schemaError(ctx, `unknown coercion`);
	}
	return fn!(x, schema);
};

/** @internal */
const __validate = (ctx: ValidateSchemaCtx, checks: Validator[], x: any) => {
	try {
		return validator(...checks)(x);
	} catch (e) {
		return __addError(ctx, (<CustomError>e).origMessage);
	}
};

/** @internal */
const __type = (x: any, schema: JSONSchema, ctx: ValidateSchemaCtx) => {
	switch (schema.type) {
		case "null":
			return __validate(ctx, [isNullish()], x);
		case "boolean":
			return __validate(ctx, [isBoolean()], x);
		case "number":
		case "integer":
			return __number(x, <NumberSchema>schema, ctx);
		case "string":
			return __string(x, <StringSchema>schema, ctx);
		case "array":
			return __array(x, <ArraySchema>schema, ctx);
		case "object":
			return __object(x, <ObjectSchema>schema, ctx);
		default:
			return __schemaError(
				ctx,
				"illegal schema type: " + (<any>schema).type
			);
	}
};

/** @internal */
const __schemaRef = (
	x: any,
	schema: SchemaRef,
	ctx: ValidateSchemaCtx
): boolean => {
	if (!ctx.visited) ctx = { ...ctx, visited: [] };
	const ref = ctx.base
		? new URL(schema.$ref, ctx.base).toString()
		: schema.$ref;
	if (ctx.visited!.includes(ref)) {
		__schemaError(
			ctx,
			`cycle detected: ${ctx.visited!.join(" -> ")} -> ${ref}`
		);
	} else {
		ctx.visited!.push(ref);
	}
	const refSchema = ctx.registry[ref];
	if (!refSchema) __schemaError(ctx, "invalid schema ref: " + schema.$ref);
	return __validateSchema(x, refSchema, ctx);
};

/** @internal */
const __altTypes = (x: any, schema: AltSchema, ctx: ValidateSchemaCtx) => {
	for (const type of schema.type) {
		if (
			__validateSchema(x, <JSONSchema>{ ...schema, type }, {
				...ctx,
				errors: [],
			})
		)
			return true;
	}
	return __addError(
		ctx,
		`value type must be one of: ${schema.type.join(",")}`
	);
};

/** @internal */
const __enum = (x: any, schema: EnumSchema, ctx: ValidateSchemaCtx) =>
	__validate(ctx, [isEnum(schema.enum)], x);

/** @internal */
const __const = (x: any, schema: ConstSchema, ctx: ValidateSchemaCtx) =>
	__validate(ctx, [isEqual(schema.const)], x);

/** @internal */
const __not = (x: any, schema: NotSchema, ctx: ValidateSchemaCtx) => {
	if (__validateSchema(x, schema.not!, { ...ctx, errors: [] })) {
		return __addError(
			ctx,
			`expected value not ${__passSchema(schema.not)}`
		);
	}
	return true;
};

/** @internal */
const __anyOf = (x: any, schema: AnyOfSchema, ctx: ValidateSchemaCtx) => {
	for (const alt of schema.anyOf!) {
		if (__validateSchema(x, alt, { ...ctx, errors: [] })) return true;
	}
	return __addError(ctx, `expected to match one of the schema options`);
};

/** @internal */
const __allOf = (x: any, schema: AllOfSchema, ctx: ValidateSchemaCtx) => {
	for (const alt of schema.allOf!) {
		if (!__validateSchema(x, alt, ctx)) return false;
	}
	return true;
};

/** @internal */
const __ifThenElse = (
	x: any,
	schema: ConditionalSchema,
	ctx: ValidateSchemaCtx
) => {
	if (__validateSchema(x, schema.if, { ...ctx, errors: [] })) {
		if (schema.then) return __validateSchema(x, schema.then, ctx);
	} else if (schema.else) {
		return __validateSchema(x, schema.else, ctx);
	}
	return true;
};

/** @internal */
const __number = (x: any, schema: NumberSchema, ctx: ValidateSchemaCtx) => {
	const checks = [schema.type === "integer" ? isInteger() : isNumber()];
	let {
		multipleOf,
		minimum: min,
		maximum: max,
		exclusiveMinimum: minOpen,
		exclusiveMaximum: maxOpen,
	} = schema;
	if (min != null || max != null) {
		min = min ?? -Infinity;
		max = max ?? Infinity;
		checks.push(isInClosedInterval(min, max));
	}
	if (minOpen != null || maxOpen != null) {
		minOpen = minOpen ?? -Infinity;
		maxOpen = maxOpen ?? Infinity;
		checks.push(isInOpenInterval(minOpen, maxOpen));
	}
	if (multipleOf != null) {
		checks.push(isMultipleOf(multipleOf));
	}
	return __validate(ctx, checks, x);
};

/** @internal */
const FORMATS: Record<FormatPreset, RegExp> = {
	date: /\d{4}-(0\d|1[012])-([012]\d|30|31)/,
	"date-time":
		/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|([+-]\d{2}:\d{2}))/,
	email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i,
	time: /\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|([+-]\d{2}:\d{2}))/,
	uri: /^[a-z][a-z0-9+.-]*:(\/\/)?[^\s]+$/i,
	uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
};

/** @internal */
const __string = (x: any, schema: StringSchema, ctx: ValidateSchemaCtx) => {
	let { format, pattern, minLength: min, maxLength: max } = schema;
	const checks = [isString()];
	if (min != null || max != null) {
		checks.push(isMinMaxLength(min ?? 0, max ?? Infinity));
	}
	if (pattern) {
		checks.push(matchesRegexp(new RegExp(pattern)));
	}
	if (format) {
		const re = FORMATS[format];
		if (!re) __schemaError(ctx, `unsupported format preset: ${format}`);
		checks.push(matchesRegexp(re, `expected ${format} format`));
	}
	return __validate(ctx, checks, x);
};

/** @internal */
const __array = (x: any, schema: ArraySchema, ctx: ValidateSchemaCtx) => {
	let {
		prefixItems,
		items,
		minItems = prefixItems?.length ?? 0,
		maxItems = items !== false ? Infinity : (prefixItems?.length ?? 0),
		contains,
		minContains = 1,
		maxContains = Infinity,
		uniqueItems,
	} = schema;
	if (!__validate(ctx, [isArray()], x)) return false;
	let passed = __validate(ctx, [isMinMaxLength(minItems, maxItems)], x);
	if (prefixItems) {
		for (let i = 0; i < prefixItems.length; i++) {
			passed =
				__validateSchema(x[i], prefixItems[i], {
					...ctx,
					path: [...ctx.path, i],
				}) && passed;
		}
	}
	if (items) {
		for (let i = prefixItems?.length ?? 0; i < x.length; i++) {
			passed =
				__validateSchema(x[i], items, {
					...ctx,
					path: [...ctx.path, i],
				}) && passed;
		}
	}
	if (contains) {
		let found = 0;
		const $ctx = { ...ctx, errors: [] };
		for (let i = 0, n = x.length; i < n; i++) {
			$ctx.path = [...ctx.path, i];
			if (__validateSchema(x[i], contains, $ctx)) {
				found++;
				if (found > maxContains) {
					__addError(
						ctx,
						`expected max. ${maxContains} values ${__passSchema(contains)}`
					);
					passed = false;
					break;
				}
			}
		}
		if (found < minContains) {
			__addError(
				ctx,
				`expected min. ${minContains} values ${__passSchema(contains)}`
			);
			passed = false;
		}
	}
	if (uniqueItems && new Set(x).size !== x.length) {
		__addError(ctx, "expected unique items");
		passed = false;
	}
	return passed;
};

/** @internal */
const __object = (x: any, schema: ObjectSchema, ctx: ValidateSchemaCtx) => {
	const {
		additionalProperties: additional,
		dependentRequired,
		dependentSchemas,
		patternProperties,
		properties,
		propertyNames,
		required,
		minProperties: min = 0,
		maxProperties: max = Infinity,
	} = schema;
	if (!__validate(ctx, [isObject()], x)) return false;
	const checks: Validator[] = [];
	if (required && required.length) {
		checks.push(hasRequiredKeys(required, false, false));
	}
	if (min > 0 || max < Infinity) {
		checks.push({
			valid: (x) => {
				const n = Object.keys(x).length;
				return n >= min && n <= max;
			},
			msg:
				min !== max
					? `expected ${min}-${max} properties`
					: `expected ${min} properties`,
		});
	}
	let passed = checks.length ? __validate(ctx, checks, x) : true;
	const $ctx = { ...ctx };
	let $patterns: Map<RegExp, JSONSchema> | undefined;
	if (patternProperties) {
		$patterns = new Map();
		for (let pk in patternProperties) {
			$patterns.set(new RegExp(pk), patternProperties[pk]);
		}
	}
	for (const k in x) {
		$ctx.path = [...ctx.path, k];
		if (
			propertyNames &&
			!__validateSchema(k, { ...propertyNames, type: "string" }, $ctx)
		) {
			passed = false;
			continue;
		}
		let isNameOk = false;
		if (properties && k in properties) {
			isNameOk = true;
			passed = __validateSchema(x[k], properties[k], $ctx) && passed;
			continue;
		} else if ($patterns) {
			for (const [p, pschema] of $patterns) {
				if (p.test(k)) {
					isNameOk = true;
					passed = __validateSchema(x[k], pschema, $ctx) && passed;
					break;
				}
			}
		}
		const depProps = dependentRequired?.[k];
		if (depProps) {
			passed =
				__validate(
					$ctx,
					[
						hasRequiredKeys(
							depProps,
							false,
							false,
							`required dependent properties: ${depProps}`
						),
					],
					x
				) && passed;
		}
		const depSchema = dependentSchemas?.[k];
		if (depSchema) {
			passed =
				__validateSchema(x, { type: "object", ...depSchema }, ctx) &&
				passed;
		}
		if (!isNameOk) {
			if (additional === false) {
				__addError($ctx, "property not allowed");
				passed = false;
			} else if (additional) {
				passed = __validateSchema(x[k], additional, $ctx) && passed;
			}
		}
	}
	for (const k in properties ?? {}) {
		if (k in x) continue;
		$ctx.path = [...ctx.path, k];
		__validateSchema({}, properties![k], { ...$ctx, errors: [] });
	}
	return passed;
};

/** @internal */
const __mergeDefs = (
	ctx: ValidateSchemaCtx,
	defs: Record<string, JSONSchema>
) => {
	const registry = { ...ctx.registry };
	const add = (key: string, schema: JSONSchema) => {
		if (ctx.base) key = new URL(key, ctx.base).toString();
		registry[key] = schema;
	};
	for (let k in defs) {
		const schema = defs[k];
		if (schema.$anchor) add("#" + schema.$anchor, schema);
		else if (schema.$id) add(schema.$id, schema);
		add("#/$defs/" + k, schema);
	}
	return { ...ctx, registry };
};

/** @internal */
const __addError = (ctx: ValidateSchemaCtx, msg: string) => {
	ctx.errors.push({ path: [...ctx.path], msg });
	return false;
};

/** @internal */
const __withPath = (ctx: ValidateSchemaCtx, msg: string) =>
	msg + (ctx.path.length ? ` (path: ${ctx.path.join("/")})` : "");

/** @internal */
const __passSchema = (schema: JSONSchema) =>
	`to pass schema: ${JSON.stringify(schema)}`;

/** @internal */
const __schemaError = (ctx: ValidateSchemaCtx, msg: string) => {
	throw new SchemaError(__withPath(ctx, msg));
};
