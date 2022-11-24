import type {
	BigType,
	FloatType,
	Fn,
	Fn2,
	IObjectOf,
	NumOrString,
} from "@thi.ng/api";
import type { Pow2 } from "@thi.ng/binary";

export const PKG_NAME = "@thi.ng/wasm-api-bindgen";

export type WasmInt = "i8" | "i16" | "i32" | "i64";
export type WasmUint = "u8" | "u16" | "u32" | "u64";
export type WasmFloat = FloatType;
export type WasmPrim = WasmInt | WasmUint | WasmFloat;
export type WasmPrim32 = Exclude<WasmPrim, BigType>;

export type TypeColl = IObjectOf<TopLevelType>;

export interface TypeInfo {
	/**
	 * Auto-computed size (in bytes)
	 *
	 * @internal
	 */
	__size?: number;
	/**
	 * Auto-computed offset (in bytes) in parent struct.
	 *
	 * @internal
	 */
	__offset?: number;
	/**
	 * Auto-computed alignment (in bytes) actually used.
	 *
	 * @internal
	 */
	__align?: Pow2;
}

export interface TopLevelType extends TypeInfo {
	/**
	 * Type name
	 */
	name: string;
	/**
	 * Optional (multi-line) docstring for this type
	 */
	doc?: string | string[];
	/**
	 * Type / kind.
	 *
	 * @remarks
	 * The {@link TYPESCRIPT} codegen doesn't emit function pointer types
	 * themselves and only supports them indirectly, e.g. as struct fields.
	 */
	type: "enum" | "funcptr" | "struct" | "union";
	/**
	 * Optional object of user provided source codes to be injected into the
	 * generated type (language dependent, only structs or unions, after
	 * generated fields). Keys of this object are language IDs (`ts` for
	 * {@link TYPESCRIPT}, `zig` for {@link ZIG}).
	 *
	 * @remarks
	 * Currently only supported by the code gens mentioned, ignored otherwise.
	 */
	body?: IObjectOf<string | string[] | InjectedBody>;
	/**
	 * Optional array of language IDs for which code generation of this type
	 * will be skipped.
	 */
	skip?: string[];
}

export interface InjectedBody {
	decl?: string | string[];
	impl?: string | string[];
}

export interface Struct extends TopLevelType {
	type: "struct";
	/**
	 * Array of struct fields (might be re-ordered if {@link Struct.auto} is
	 * enabled).
	 */
	fields: Field[];
	/**
	 * If true, struct fields will be re-ordered in descending order based on
	 * their {@link TypeInfo.__align} size. This might result in overall smaller
	 * structs due to minimizing implicit inter-field padding caused by
	 * alignment requirements. **If this option is enabled, then the struct MUST
	 * NOT contain any padding fields!**
	 *
	 * @defaultValue false
	 */
	auto?: boolean;
	/**
	 * Optional user supplied {@link AlignStrategy}. By default uses
	 * {@link ALIGN_C}.
	 */
	align?: AlignStrategy;
}

export interface Union extends TopLevelType {
	type: "union";
	/**
	 * Array of union fields.
	 */
	fields: Field[];
	/**
	 * Optional user supplied {@link AlignStrategy}. By default uses
	 * {@link ALIGN_C}.
	 */
	align?: AlignStrategy;
}

export type FieldTag = "single" | "array" | "ptr" | "slice" | "vec";

export interface Field extends TypeInfo {
	/**
	 * Field name (prefix: "__" is reserved)
	 */
	name: string;
	/**
	 * Field docstring (can be multiline, will be formatted)
	 */
	doc?: string | string[];
	/**
	 * Field type tag/qualifier. `vec` is only supported by Zig & TS. `slice`
	 * fields will be polyfilled using auto-generated wrappers.
	 *
	 * @remarks
	 * - Array & vector fields are statically sized (using {@link Field.len})
	 * - If `pointer` and no `len` is given, pointers are emitted as
	 *   single-value pointers (where this distinction exist)
	 * - If `pointer` and `len` is > 0, pointers are emitted as pointing to N
	 *   values (for languages supporting this distinction, e.g. Zig)
	 * - If `pointer` and `len = 0`, pointers are emitted as pointing to an
	 *   unspecified number of items (where this distinction is supported). In
	 *   TypeScript only the target address of these pointers can be accessed.
	 * - `slice` will result in a struct consisting of a pointer, followed by
	 *   length field. In Zig this struct also provides coercion functions
	 *   to/from "normal" Zig slices.
	 * - Zig vectors will be processed using SIMD (if enabled in WASM target)
	 *   and therefore will have stricter (larger) alignment requirements.
	 *
	 * @defaultValue `"single"`
	 */
	tag?: FieldTag;
	/**
	 * Field base type. If not a {@link WasmPrim}, `string` or `opaque`, the
	 * value is interpreted as another type name in the {@link TypeColl}.
	 *
	 * @remarks
	 * Please see {@link CodeGenOpts.stringType} and consult package readme for
	 * further details re: string handling.
	 *
	 * Since `opaque` types have unknown size, they'll be **always** defined &
	 * interpreted as pointers. In TypeScript these fields can only be accessed
	 * as numbers (aka the pointers' target addresses).
	 */
	type: WasmPrim | "isize" | "usize" | "string" | "opaque" | string;
	/**
	 * **Only used for pointers or slices.** Const qualifier (default is true
	 * for `string`, false for all other types).
	 *
	 * @remarks
	 * In our context, constness **always** refers to the target data, never to
	 * the pointer or slice itself (i.e. the pointer itself will always be
	 * mutable).
	 */
	const?: boolean;
	/**
	 * Optional type qualifier. Currently only supported (as type) in
	 * {@link ZIG} for pointers (incl. `opaque`). In C/TypeScript the equivalent
	 * semantics are that the value will be zero if there's no value, otherwise
	 * the value is the pointer's target address.
	 *
	 * @defaultValue false
	 */
	optional?: boolean;
	/**
	 * Currently only supported for {@link ZIG} arrays & slices, otherwise
	 * ignored!
	 */
	sentinel?: number;
	/**
	 * Array or vector length (see {@link Field.tag})
	 */
	len?: number;
	/**
	 * Currently only supported for {@link ZIG}, otherwise ignored!
	 *
	 * @remarks
	 * The object form allows for different default values per language (in
	 * theory). So if given as object, the keys refer to the lang ID and the
	 * values as the defaults for those languages.
	 */
	default?: NumOrString | IObjectOf<NumOrString>;
	/**
	 * If defined and > 0, the field will be considered for padding purposes
	 * only and the value provided is the number of bytes used. All other config
	 * for this field will be ignored!
	 */
	pad?: number;
	/**
	 * If true (default: false), code generation of this field will be skipped
	 * for WASM host environment languages (i.e. TypeScript).
	 *
	 * @remarks
	 * This is useful if some fields of a struct/union aren't actually used for
	 * WASM<>JS interop and thus can reduce the API surface & file size of the
	 * generated wrappers.
	 *
	 * @defaultValue false
	 */
	skip?: boolean;
}

export interface Enum extends TopLevelType {
	type: "enum";
	/**
	 * No i64/u64 support, due to Typescript not supporting bigint enum values.
	 * For C compatibility only i32 or u32 is allowed.
	 *
	 * @defaultValue "i32"
	 */
	tag: Exclude<WasmPrim32, FloatType>;
	/**
	 * List of possible values/IDs. Use {@link EnumValue}s for more detailed
	 * config.
	 */
	values: (string | EnumValue)[];
}

export interface EnumValue {
	/**
	 * Enum value name/ID
	 */
	name: string;
	/**
	 * Optional associated numeric value
	 */
	value?: number;
	/**
	 * Optional docstring for this value
	 */
	doc?: string;
}

export interface FuncPointer extends TopLevelType {
	type: "funcptr";
	/**
	 * Return type spec (subset of {@link Field}).
	 */
	rtype: "void" | Pick<Field, "const" | "len" | "sentinel" | "tag" | "type">;
	/**
	 * Function arg specs (subset of {@link Field}).
	 */
	args: Pick<Field, "const" | "len" | "name" | "sentinel" | "tag" | "type">[];
}

export interface AlignStrategy {
	/**
	 * Returns implementation specific alignment for given struct field.
	 */
	align: Fn<Field, Pow2>;
	/**
	 * Returns possibly rounded value for given base size & alignment.
	 */
	size: Fn2<number, Pow2, number>;
	/**
	 * Returns possibly rounded value for given base offset & alignment.
	 */
	offset: Fn2<number, Pow2, number>;
}

export interface CodeGenOptsBase {
	/**
	 * Optional string to be injected before generated type defs (but after
	 * codegen's own prelude, if any)
	 */
	pre?: string | string[];
	/**
	 * Optional string to be injected after generated type defs (but before
	 * codegen's own epilogue, if any)
	 */
	post?: string | string[];
}

/**
 * Global/shared code generator options.
 */
export interface CodeGenOpts extends CodeGenOptsBase {
	/**
	 * WASM target specification.
	 *
	 * @defaultValue {@link WASM32}
	 */
	target: WasmTarget;
	/**
	 * Identifier how strings are stored on WASM side, e.g. in Zig string
	 * literals are slices (8 bytes), in C just plain pointers (4 bytes) to
	 * zero-terminated char sequences.
	 *
	 * @defaultValue "ptr"
	 */
	stringType: "slice" | "ptr";
	/**
	 * If true (default), forces uppercase enum identifiers.
	 *
	 * @remarks
	 * This option is ignored in {@link ZIG} since it's idiomatic for that
	 * language to only use lowercase/camelCase enum IDs.
	 *
	 * @defaultValue true
	 */
	uppercaseEnums: boolean;
	/**
	 * Unless set to false, the generated output will be prefixed with a header
	 * line comment of generator meta data
	 */
	header: boolean;
	/**
	 * If true, codegens MAY generate various additional struct & struct field
	 * analysis functions (sizes, alignment, offsets etc.).
	 *
	 * @defaultValue false
	 */
	debug: boolean;
	/**
	 * Target line width for word wrapping doc strings
	 *
	 * @defaultValue 80
	 */
	lineWidth: number;
}

export interface ICodeGen {
	/**
	 * Unique language ID. E.g. used to suppress generation for types utilizing
	 * {@link TopLevelType.skip}.
	 */
	id: string;
	/**
	 * Optional prelude source, to be prepended before any generated type defs.
	 */
	pre?: Fn2<TypeColl, CodeGenOpts, string>;
	/**
	 * Optional source code to be appended after any generated type defs.
	 */
	post?: Fn2<TypeColl, CodeGenOpts, string>;
	/**
	 * Docstring codegen
	 */
	doc: (
		doc: string | string[],
		acc: string[],
		opts: CodeGenOpts,
		topLevel?: boolean
	) => void;
	/**
	 * Codegen for enum types.
	 */
	enum: (
		type: Enum,
		coll: TypeColl,
		acc: string[],
		opts: CodeGenOpts
	) => void;
	/**
	 * Codegen for struct types.
	 */
	struct: (
		type: Struct,
		coll: TypeColl,
		acc: string[],
		opts: CodeGenOpts
	) => void;
	/**
	 * Codegen for union types.
	 */
	union: (
		type: Union,
		coll: TypeColl,
		acc: string[],
		opts: CodeGenOpts
	) => void;

	funcptr: (
		type: FuncPointer,
		coll: TypeColl,
		acc: string[],
		opts: CodeGenOpts
	) => void;
}

export interface WasmTarget {
	isize: "i32" | "i64";
	usize: "u32" | "u64";
	sizeBytes: number;
}

/**
 * WASM32 target spec
 */
export const WASM32: WasmTarget = {
	isize: "i32",
	usize: "u32",
	sizeBytes: 4,
};

/**
 * WASM64 target spec
 */
export const WASM64: WasmTarget = {
	isize: "i64",
	usize: "u64",
	sizeBytes: 8,
};
