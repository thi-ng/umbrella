// SPDX-License-Identifier: Apache-2.0
export type SchemaType =
	| "null"
	| "boolean"
	| "number"
	| "integer"
	| "string"
	| "array"
	| "object";

export type FormatPreset =
	| "date"
	| "date-time"
	| "email"
	| "time"
	| "uri"
	| "uuid";

export interface BaseSchema {
	$schema?: string;
	$id?: string;
	$anchor?: string;
	$comment?: string;
	$defs?: Record<string, JSONSchema>;
	$ref?: string;

	type?: SchemaType | SchemaType[];
	title?: string;
	default?: any;
	description?: string;
	examples?: any[];

	deprecated?: boolean;
	readOnly?: boolean;
	writeOnly?: boolean;
}

export interface JSONSchema extends BaseSchema {
	not?: JSONSchema;
	allOf?: JSONSchema[];
	anyOf?: JSONSchema[];
	oneOf?: JSONSchema[];

	if?: JSONSchema;
	then?: JSONSchema;
	else?: JSONSchema;

	const?: any;
	enum?: any[];
	default?: any;

	multipleOf?: number;
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;

	format?: FormatPreset;
	minLength?: number;
	maxLength?: number;
	pattern?: string;

	prefixItems?: JSONSchema[];
	items?: JSONSchema | false;
	minItems?: number;
	maxItems?: number;
	uniqueItems?: boolean;
	contains?: JSONSchema;
	minContains?: number;
	maxContains?: number;

	additionalProperties?: JSONSchema | false;
	dependentRequired?: Record<string, string[]>;
	dependentSchemas?: Record<string, JSONSchema>;
	minProperties?: number;
	maxProperties?: number;
	patternProperties?: Record<string, JSONSchema>;
	properties?: Record<string, JSONSchema>;
	propertyNames?: JSONSchema;
	required?: string[];

	/**
	 * Coercion function, registered coercion ID or higher-order registered
	 * coercion ID. If specified, a value to be validated will be first passed
	 * to the coercion function. If that function returns a non-nullish result,
	 * that returned value will be used for validation instead and also be
	 * recorded in the {@link ValidationResult.value}.
	 *
	 * If a coercion function returns a nullish result, validation fails.
	 *
	 * @remarks
	 * Custom coercion functions can be registered via the
	 * {@link ValidateSchemaCtx.coerce} option given to {@link validateSchema}.
	 * See there for more details & examples.
	 *
	 * An error will be thrown during validation if an unknown coercion ID is
	 * specified here.
	 */
	coerce?: CoercionFn | string | [string, ...any[]];
}

export type SchemaRef = JSONSchema & Required<Pick<JSONSchema, "$ref">>;

export type ConstSchema = JSONSchema & Required<Pick<JSONSchema, "const">>;

export type EnumSchema = JSONSchema & Required<Pick<JSONSchema, "enum">>;

export type NotSchema = JSONSchema & Required<Pick<JSONSchema, "not">>;

export type AnyOfSchema = JSONSchema & Required<Pick<JSONSchema, "anyOf">>;

export type AllOfSchema = JSONSchema & Required<Pick<JSONSchema, "allOf">>;

export type ConditionalSchema = JSONSchema &
	Required<Pick<JSONSchema, "if" | "then"> | Pick<JSONSchema, "if" | "else">>;

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

export type CoercionFn = (x: any, schema: JSONSchema) => any;

export type CoercionHOF = (...xs: any[]) => CoercionFn;

export type CoercionRegistry = Record<string, CoercionFn | CoercionHOF>;

export type Path = (number | string)[];

export interface ValidationResult {
	/**
	 * True, if validation succeeded without errors.
	 */
	valid: boolean;
	/**
	 * Root value given to {@link validateSchema}, possibly being immutably
	 * updated via coercions.
	 */
	value: any;
	/**
	 * List of error reports and their access paths.
	 */
	errors: ErrorReport[];
	/**
	 * List of collected default values and their access paths.
	 */
	defaults: DefaultValue[];
}

export interface ValidateSchemaCtx {
	base: string;
	registry: Record<string, JSONSchema>;
	/**
	 * An object of known coercion functions which can be referenced vis
	 * {@link JSONSchema.coerce}. By default, only the coercions defined in
	 * {@link DEFAULT_COERCIONS} are used.
	 */
	coerce: CoercionRegistry;
	path: Path;
	errors: ErrorReport[];
	defaults: DefaultValue[];

	/**
	 * Reference to root context (used for immutably updating
	 * {@link ValidateSchemaCtx.value} when applying coercions)
	 *
	 * @internal */
	root: ValidateSchemaCtx;
	/**
	 * Root value given to {@link validateSchema}, possibly being immutably
	 * updated via coercions and returned as part of {@link ValidationResult}.
	 *
	 * @internal
	 */
	value: any;
	/**
	 * Used for cycle breaking & infinite recursion avoidance in `anyOf`,
	 * `allOf`, `$ref` schemas.
	 *
	 * @internal
	 */
	visited?: string[];
}

export interface ErrorReport {
	path: Path;
	msg: string;
}

export interface DefaultValue {
	path: Path;
	value: any;
}

export const OK = Object.freeze({ valid: true, errors: [], defaults: [] });
