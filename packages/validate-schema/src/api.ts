export type JSONSchema =
	| AltSchema
	| NullSchema
	| BooleanSchema
	| NumberSchema
	| StringSchema
	| ArraySchema
	| ObjectSchema
	| EnumSchema
	| SchemaRef;

export interface BaseSchema {
	$schema?: string;
	$id?: string;
	$anchor?: string;
	$defs?: Record<string, JSONSchema>;
	title?: string;
	description?: string;
	not?: JSONSchema;
	allOf?: JSONSchema[];
	anyOf?: JSONSchema[];
	oneOf?: JSONSchema[];
}

export interface SchemaRef extends BaseSchema {
	$ref: string;
}

export interface ConstSchema extends BaseSchema {
	const?: any;
}

export interface EnumSchema extends BaseSchema {
	enum: any[];
}

export interface AltSchema extends BaseSchema {
	type: (
		| "null"
		| "boolean"
		| "number"
		| "integer"
		| "string"
		| "array"
		| "object"
	)[];
}

export interface NullSchema extends BaseSchema {
	type: "null";
}

export interface BooleanSchema extends BaseSchema {
	type: "boolean";
}

export interface NumberSchema extends BaseSchema {
	type: "number" | "integer";
	multipleOf?: number;
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;
}

export interface StringSchema extends BaseSchema {
	type: "string";
	minLength?: number;
	maxLength?: number;
	pattern?: string;
}

export interface ArraySchema extends BaseSchema {
	type: "array";
	prefixItems?: JSONSchema[];
	items?: JSONSchema;
	minItems?: number;
	maxItems?: number;
	uniqueItems?: boolean;
	contains?: any;
	minContains?: number;
	maxContains?: number;
}

export interface ObjectSchema extends BaseSchema {
	type: "object";
	properties: Record<string, JSONSchema>;
	additionalProperties?: Record<string, JSONSchema>;
	patternProperties?: Record<string, JSONSchema>;
	propertyNames?: JSONSchema;
	required?: string[];
}

export interface ValidateSchemaCtx {
	base: string;
	registry: Record<string, JSONSchema>;
	path: (number | string)[];
	errors: ErrorReport[];
	/**
	 * Used for cycle breaking & infinite recursion avoidance in `anyOf`,
	 * `allOf`, `$ref` constructs etc.
	 */
	visited?: string[];
}

export interface ErrorReport {
	path: (number | string)[];
	msg: string;
}

export const OK = Object.freeze({ valid: true, errors: [] });
