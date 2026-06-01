export type SchemaType =
	| "null"
	| "boolean"
	| "number"
	| "integer"
	| "string"
	| "array"
	| "object";

export interface BaseSchema {
	$schema?: string;
	$id?: string;
	$anchor?: string;
	$defs?: Record<string, JSONSchema>;
	$ref?: string;

	type?: SchemaType | SchemaType[];
	title?: string;
	description?: string;
}

export interface JSONSchema extends BaseSchema {
	not?: JSONSchema;
	allOf?: JSONSchema[];
	anyOf?: JSONSchema[];
	oneOf?: JSONSchema[];

	const?: any;
	enum?: any[];

	multipleOf?: number;
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;

	minLength?: number;
	maxLength?: number;
	pattern?: string;

	prefixItems?: JSONSchema[];
	items?: JSONSchema;
	minItems?: number;
	maxItems?: number;
	uniqueItems?: boolean;
	contains?: any;
	minContains?: number;
	maxContains?: number;

	properties?: Record<string, JSONSchema>;
	additionalProperties?: JSONSchema | false;
	patternProperties?: Record<string, JSONSchema>;
	propertyNames?: JSONSchema;
	required?: string[];
}

export type SchemaRef = JSONSchema & Required<Pick<JSONSchema, "$ref">>;

export type ConstSchema = JSONSchema & Required<Pick<JSONSchema, "const">>;

export type EnumSchema = JSONSchema & Required<Pick<JSONSchema, "enum">>;

export type NotSchema = JSONSchema & Required<Pick<JSONSchema, "not">>;

export type AnyOfSchema = JSONSchema & Required<Pick<JSONSchema, "anyOf">>;

export type AllOfSchema = JSONSchema & Required<Pick<JSONSchema, "allOf">>;

export interface AltSchema extends JSONSchema {
	type: SchemaType[];
}

export interface NullSchema extends BaseSchema {
	type: "null";
}

export interface BooleanSchema extends JSONSchema {
	type: "boolean";
}

export interface NumberSchema extends JSONSchema {
	type: "number" | "integer";
}

export interface StringSchema extends JSONSchema {
	type: "string";
}

export interface ArraySchema extends JSONSchema {
	type: "array";
}

export interface ObjectSchema extends JSONSchema {
	type: "object";
}

export interface ValidateSchemaCtx {
	base: string;
	registry: Record<string, JSONSchema>;
	path: (number | string)[];
	errors: ErrorReport[];

	/**
	 * Used for cycle breaking & infinite recursion avoidance in `anyOf`,
	 * `allOf`, `$ref` schemas.
	 */
	visited?: string[];
}

export interface ErrorReport {
	path: (number | string)[];
	msg: string;
}

export const OK = Object.freeze({ valid: true, errors: [] });
