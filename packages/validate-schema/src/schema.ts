import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
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
	ValidationError,
	validator,
} from "@thi.ng/validate/validators";
import type {
	AltSchema,
	ArraySchema,
	EnumSchema,
	JSONSchema,
	NumberSchema,
	ObjectSchema,
	SchemaRef,
	StringSchema,
	ValidateSchemaCtx,
} from "./api.js";

export const validateSchema = (
	x: any,
	schema: JSONSchema,
	ctx?: Partial<ValidateSchemaCtx>
) => __validateSchema(x, schema, { base: "", registry: {}, path: [], ...ctx });

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
		return validateSchemaRef(x, schema, ctx);
	}
	if ("enum" in schema) {
		return validator(isEnum(schema.enum))(x);
	}
	if ("const" in schema) {
		return validator(isEqual(schema.const))(x);
	}
	if ("not" in schema) {
		let passed = false;
		try {
			passed = __validateSchema(x, schema.not!, ctx);
		} catch (e) {}
		if (passed) {
			throw new ValidationError(
				__withPath(ctx, "expected schema to fail")
			);
		}
	}
	if (Array.isArray(schema.type)) {
		return validateAltTypes(x, <AltSchema>schema, ctx);
	}
	return validateType(x, schema, ctx);
};

const validateType = (x: any, schema: JSONSchema, ctx: ValidateSchemaCtx) => {
	const $schema = <Exclude<JSONSchema, AltSchema | EnumSchema | SchemaRef>>(
		schema
	);
	switch ($schema.type) {
		case "null":
			return validator(isNullish(__withPath(ctx, "required null value")))(
				x
			);
		case "boolean":
			return validator(
				isBoolean(__withPath(ctx, "required boolean value"))
			)(x);
		case "number":
		case "integer":
			return validateNumber(x, $schema, ctx);
		case "string":
			return validateString(x, $schema, ctx);
		case "array":
			return validateArray(x, $schema, ctx);
		case "object":
			return validateObject(x, $schema, ctx);
		default:
			// TODO error wrong type
			return false;
	}
};

const validateSchemaRef = (
	x: any,
	schema: SchemaRef,
	ctx: ValidateSchemaCtx
): boolean => {
	const ref = ctx.base
		? new URL(schema.$ref, ctx.base).toString()
		: schema.$ref;
	const refSchema = ctx.registry[ref];
	if (!refSchema) illegalArgs(__withPath(ctx, "schema ref: " + schema.$ref));
	return __validateSchema(x, refSchema, ctx);
};

const validateAltTypes = (
	x: any,
	schema: AltSchema,
	ctx: ValidateSchemaCtx
) => {
	for (let type of schema.type) {
		try {
			return __validateSchema(x, <JSONSchema>{ ...schema, type }, ctx);
		} catch (e) {}
	}
	throw new ValidationError(
		__withPath(ctx, `type must match one of: ${schema.type.join(",")}`)
	);
};

const validateNumber = (
	x: any,
	schema: NumberSchema,
	ctx: ValidateSchemaCtx
) => {
	schema;
	const checks = [
		schema.type === "integer"
			? isInteger(__withPath(ctx, `required integer value`))
			: isNumber(__withPath(ctx, `required number value`)),
	];
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
		checks.push(
			isInClosedInterval(
				min,
				max,
				__withPath(ctx, `value not in closed interval [${min},${max}]`)
			)
		);
	}
	if (minOpen != null || maxOpen != null) {
		minOpen = minOpen ?? -Infinity;
		maxOpen = maxOpen ?? Infinity;
		checks.push(
			isInOpenInterval(
				minOpen,
				maxOpen,
				__withPath(ctx, `value not in range [${minOpen},${maxOpen}]`)
			)
		);
	}
	if (multipleOf != null) {
		checks.push(
			isMultipleOf(
				multipleOf,
				undefined,
				__withPath(
					ctx,
					`required number value to be multiple of ${multipleOf}`
				)
			)
		);
	}
	return validator(...checks)(x);
};

const validateString = (
	x: any,
	schema: StringSchema,
	ctx: ValidateSchemaCtx
) => {
	let { pattern, minLength: min, maxLength: max } = schema;
	const checks = [isString(__withPath(ctx, `required string value`))];
	if (min != null || max != null) {
		min = min ?? -Infinity;
		max = max ?? Infinity;
		checks.push(
			isMinMaxLength(
				min,
				max,
				__withPath(ctx, `length in [${min},${max}] range`)
			)
		);
	}
	if (pattern) {
		checks.push(
			matchesRegexp(
				new RegExp(pattern),
				__withPath(ctx, `doesn't match pattern: ${pattern}`)
			)
		);
	}
	return validator(...checks)(x);
};

const validateArray = (x: any, schema: ArraySchema, ctx: ValidateSchemaCtx) => {
	let {
		prefixItems,
		items,
		minItems = prefixItems?.length ?? 0,
		maxItems = Infinity,
	} = schema;
	const checks = [
		isArray(__withPath(ctx, `required array value`)),
		isMinMaxLength(
			minItems,
			maxItems,
			__withPath(
				ctx,
				`array length not in [${minItems},${maxItems}] range`
			)
		),
	];
	validator(...checks)(x);
	if (prefixItems) {
		for (let i = 0; i < prefixItems.length; i++) {
			__validateSchema(x[i], prefixItems[i], {
				...ctx,
				path: [...ctx.path, i],
			});
		}
	}
	if (items) {
		for (let i = prefixItems?.length ?? 0; i < x.length; i++) {
			__validateSchema(x[i], items, {
				...ctx,
				path: [...ctx.path, i],
			});
		}
	}
	return true;
};

const validateObject = (
	x: any,
	schema: ObjectSchema,
	ctx: ValidateSchemaCtx
) => {
	const { properties, required } = schema;
	const checks = [isObject(__withPath(ctx, "require object value"))];
	if (required) {
		checks.push(
			hasRequiredKeys(
				required,
				false,
				false,
				__withPath(ctx, `require keys: ${required.join(",")}`)
			)
		);
	}
	validator(...checks)(x);
	const $ctx = { ...ctx };
	if (properties) {
		for (let k in properties) {
			$ctx.path = [...ctx.path, k];
			__validateSchema(x[k], properties[k], $ctx);
		}
	}
	return true;
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
const __withPath = (ctx: ValidateSchemaCtx, msg: string) =>
	msg + (ctx.path.length ? ` (key: ${ctx.path.join(".")})` : "");
