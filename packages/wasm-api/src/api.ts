import type {
	BigType,
	FloatType,
	Fn,
	Fn2,
	IDeref,
	ILength,
	IObjectOf,
} from "@thi.ng/api";
import type { Pow2 } from "@thi.ng/binary";
import type { WasmBridge } from "./bridge.js";

export const PKG_NAME = "@thi.ng/wasm-api";

export const EVENT_MEMORY_CHANGED = "memory-changed";

export type BigIntArray = bigint[] | BigInt64Array | BigUint64Array;

/**
 * Common interface for WASM/JS child APIs which will be used in combination
 * with a parent {@link WasmBridge}.
 *
 * @remarks
 * The generic type param is optional and only used if the API is requiring
 * certain exports declared by WASM module.
 */
export interface IWasmAPI<T extends WasmExports = WasmExports> {
	/**
	 * Called by {@link WasmBridge.init} to initialize all child APIs (async)
	 * after the WASM module has been instantiated. If the method returns false
	 * the overall initialization process will be stopped/terminated.
	 *
	 * @param parent
	 */
	init(parent: WasmBridge<T>): Promise<boolean>;
	/**
	 * Returns an object of this child API's declared WASM imports. Be aware
	 * imports from all child APIs will be merged into a single flat namespace,
	 * it's recommended to use naming prefixes to avoid clashes.
	 */
	getImports(): WebAssembly.ModuleImports;
}

/**
 * Base interface of exports declared by the WASM module. At the very least, a
 * compatible module needs to export its memory and the functions defined in
 * this interface.
 *
 * @remarks
 * This interface is supposed to be extended with the concrete exports defined
 * by your WASM module and is used as generic type param for {@link WasmBridge}
 * and any {@link IWasmAPI} bridge modules. These exports can obtained via
 * {@link WasmBridge.exports} where they will be stored during the execution of
 * {@link WasmBridge.init}.
 */
export interface WasmExports {
	/**
	 * The WASM module's linear memory buffer. The `WasmBridge` automatically
	 * creates various typed views of that memory (i.e. u8, u16, u32, f32 etc.)
	 */
	memory: WebAssembly.Memory;
	/**
	 * Implementation specific WASM memory allocation function. If successful
	 * returns address of new memory block, or zero if unsuccessful.
	 *
	 * @remarks
	 * #### Zig
	 *
	 * Using the supplied Zig bindings (see `/include/wasmapi.zig`), it's the
	 * user's responsibility to define a public `WASM_ALLOCATOR` in the root
	 * source file to enable allocations, e.g. using the
	 * [`std.heap.GeneralPurposeAllocator`](https://ziglang.org/documentation/master/#Choosing-an-Allocator)
	 * (which also automatically handles growing the WASM memory). However, as
	 * mentioned, the underlying mechanism is purposefully left to the actual
	 * WASM-side implementation. If no allocator is defined this function
	 * returns zero, which in turn will cause {@link WasmBridge.allocate} to
	 * throw an error.
	 *
	 * #### C/C++
	 *
	 * Using the supplied C bindings (see `/include/wasmapi.h`), it's the user's
	 * responsibility to enable allocation support by defining the
	 * `WASMAPI_MALLOC` symbol (and compiling the WASM module with a malloc
	 * implementation).
	 */
	_wasm_allocate(numBytes: number): number;
	/**
	 * Implementation specific function to free a previously allocated chunk of
	 * of WASM memory (allocated via {@link WasmExports._wasm_allocate}, also
	 * see remarks for that function).
	 *
	 * @param addr
	 * @param numBytes
	 */
	_wasm_free(addr: number, numBytes: number): void;
}

export interface IWasmMemoryAccess {
	i8: Int8Array;
	u8: Uint8Array;
	i16: Int16Array;
	u16: Uint16Array;
	i32: Int32Array;
	u32: Uint32Array;
	i64: BigInt64Array;
	u64: BigUint64Array;
	f32: Float32Array;
	f64: Float64Array;

	/**
	 * Initializes and/or updates the various typed WASM memory views (e.g.
	 * after growing the WASM memory and the previous buffer becoming detached).
	 */
	ensureMemory(): void;

	/**
	 * Reads UTF-8 encoded string from given address and optional byte length.
	 * The default length is 0, which will be interpreted as a zero-terminated
	 * string. Returns string.
	 *
	 * @param addr
	 * @param len
	 */
	getString(addr: number, len?: number): string;

	/**
	 * Encodes given string as UTF-8 and writes it to WASM memory starting at
	 * `addr`. By default the string will be zero-terminated and only `maxBytes`
	 * will be written. Returns the number of bytes written.
	 *
	 * @remarks
	 * An error will be thrown if the encoded string doesn't fully fit into the
	 * designated memory region (also note that there might need to be space for
	 * the additional sentinel/termination byte).
	 *
	 * @param str
	 * @param addr
	 * @param maxBytes
	 * @param terminate
	 */
	setString(
		str: string,
		addr: number,
		maxBytes: number,
		terminate?: boolean
	): number;
}

/**
 * Core API of WASM imports defined by the {@link WasmBridge}. The same
 * functions are declared as bindings in `/zig/core.zig`. Also see this file for
 * documentation of each function...
 */
export interface CoreAPI extends WebAssembly.ModuleImports {
	printI8: Fn<number, void>;
	printU8: Fn<number, void>;
	printU8Hex: Fn<number, void>;
	printI16: Fn<number, void>;
	printU16: Fn<number, void>;
	printU16Hex: Fn<number, void>;
	printI32: Fn<number, void>;
	printU32: Fn<number, void>;
	printU32Hex: Fn<number, void>;
	printI64: Fn<bigint, void>;
	printU64: Fn<bigint, void>;
	printU64Hex: Fn<bigint, void>;
	printF32: Fn<number, void>;
	printF64: Fn<number, void>;
	_printI8Array: (addr: number, len: number) => void;
	_printU8Array: (addr: number, len: number) => void;
	_printI16Array: (addr: number, len: number) => void;
	_printU16Array: (addr: number, len: number) => void;
	_printI32Array: (addr: number, len: number) => void;
	_printU32Array: (addr: number, len: number) => void;
	_printI64Array: (addr: number, len: number) => void;
	_printU64Array: (addr: number, len: number) => void;
	_printF32Array: (addr: number, len: number) => void;
	_printF64Array: (addr: number, len: number) => void;
	_printStr0: (addr: number) => void;
	_printStr: (addr: number, len: number) => void;
	debug: () => void;
	_panic: (addr: number, len: number) => void;
	timer: () => number;
	epoch: () => bigint;
}

export interface WasmTypeBase {
	/**
	 * Base address in linear WASM memory.
	 */
	readonly __base: number;
	/**
	 * Obtain as byte buffer
	 */
	readonly __bytes: Uint8Array;
}

export interface WasmType<T> {
	readonly align: number;
	readonly size: number;
	instance: Fn<number, T>;
}

export type WasmTypeConstructor<T> = Fn<IWasmMemoryAccess, WasmType<T>>;

export type WasmInt = "i8" | "i16" | "i32" | "i64";
export type WasmUint = "u8" | "u16" | "u32" | "u64";
export type WasmFloat = FloatType;
export type WasmPrim = WasmInt | WasmUint | WasmFloat;
export type WasmPrim32 = Exclude<WasmPrim, BigType>;

export type ReadonlyWasmString = IDeref<string> &
	ILength & {
		readonly addr: number;
	};

export type TypeColl = Record<string, TopLevelType>;

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
	doc?: string;
	/**
	 * Type / kind
	 */
	type: "enum" | "struct" | "union";
	/**
	 * Optional object of user provided source codes to be injected into the
	 * generated type. Keys are language IDs (same name as respective codegen).
	 *
	 * @remarks
	 * Currently only supported by the {@link ZIG} codegen, ignored otherwise.
	 */
	body?: IObjectOf<string>;
}

export interface Struct extends TopLevelType {
	type: "struct";
	/**
	 * Array of struct fields (might be re-ordered if {@link Struct.auto} is
	 * enabled).
	 */
	fields: StructField[];
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
	 * Optional qualifier for the kind of struct to be emitted (codegen specific
	 * interpretation, currently only used by {@link ZIG}).
	 */
	tag?: "extern" | "packed";
	/**
	 * Optional user supplied {@link AlignStrategy}. By default uses
	 * {@link ALIGN_C} or {@link ALIGN_PACKED} (if using "packed" structs).
	 */
	align?: AlignStrategy;
}

export type FieldTag = "scalar" | "array" | "ptr" | "slice" | "vec";

export interface StructField extends TypeInfo {
	/**
	 * Field name (prefix: "__" is reserved)
	 */
	name: string;
	/**
	 * Field docstring (can be multiline, will be formatted)
	 */
	doc?: string;
	/**
	 * Field type tag/qualifier (note: `slice` & `vec` are only supported by Zig
	 * & TS).
	 *
	 * @remarks
	 * - Array & vector fields are statically sized (using
	 *   {@link StructField.len})
	 * - Pointers are emitted as single-value pointers (where this distinction
	 *   exist), i.e. even if they're pointing to multiple values, there's no
	 *   explicit length encoded/available
	 * - Zig slices are essentially a pointer w/ associated length
	 * - Zig vectors will be processed using SIMD (if enabled in WASM target)
	 *   and therefore will have stricter (larger) alignment requirements.
	 *
	 * @defaultValue "scalar"
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
	 * TODO `opaque` currently unsupported.
	 */
	type: WasmPrim | "string" | "opaque" | string;
	/**
	 * Const qualifier (default is true for `string`, false for all other
	 * types). Only used for pointers or slices.
	 */
	const?: boolean;
	/**
	 * Currently only supported for {@link ZIG} arrays & slices, otherwise
	 * ignored!
	 */
	sentinel?: number;
	/**
	 * Array or vector length (see {@link StructField.tag})
	 */
	len?: number;
	/**
	 * Currently only supported for {@link ZIG} scalar & string values,
	 * otherwise ignored!
	 */
	default?: number;
	/**
	 * If defined and > 0, the field will be considered for padding purposes
	 * only and the value provided is the number of bytes used. All other config
	 * for this field will be ignored!
	 */
	pad?: number;
}

export interface Union extends TopLevelType {
	type: "union";
	/**
	 * Array of union fields.
	 */
	fields: StructField[];
	/**
	 * Optional qualifier for the kind of struct to be emitted (codegen specific
	 * interpretation, currently only used by {@link ZIG}).
	 */
	tag?: "extern" | "packed";
	/**
	 * Optional user supplied {@link AlignStrategy}. By default uses
	 * {@link ALIGN_C} or {@link ALIGN_PACKED} (if using "packed" union).
	 */
	align?: AlignStrategy;
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

export interface AlignStrategy {
	/**
	 * Returns implementation specific alignment for given struct field.
	 */
	align: Fn<StructField, Pow2>;
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
	pre?: string;
	/**
	 * Optional string to be injected after generated type defs (but before
	 * codegen's own epilogue, if any)
	 */
	post?: string;
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
	 * literals are slices (8 bytes), in C just plain pointers (4 bytes).
	 *
	 * @defaultValue "slice"
	 */
	stringType: "slice" | "ptr";
	/**
	 * If true (default), forces uppercase enum identifiers
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
	 * Optional prelude source, to be prepended before any generated type defs.
	 */
	pre?: Fn<CodeGenOpts, string>;
	/**
	 * Optional source code to be appended after any generated type defs.
	 */
	post?: Fn<CodeGenOpts, string>;
	/**
	 * Docstring codegen
	 */
	doc: (
		doc: string,
		acc: string[],
		opts: CodeGenOpts,
		topLevel?: boolean
	) => void;
	/**
	 * Codegen for enum types.
	 */
	enum: (
		type: Enum,
		types: TypeColl,
		acc: string[],
		opts: CodeGenOpts
	) => void;
	/**
	 * Codegen for struct types.
	 */
	struct: (
		type: Struct,
		types: TypeColl,
		acc: string[],
		opts: CodeGenOpts
	) => void;
	/**
	 * Codegen for union types.
	 */
	union: (
		type: Union,
		types: TypeColl,
		acc: string[],
		opts: CodeGenOpts
	) => void;
}

export interface WasmTarget {
	usize: "u32" | "u64";
	usizeBytes: number;
}

/**
 * WASM32 target spec
 */
export const WASM32: WasmTarget = {
	usize: "u32",
	usizeBytes: 4,
};

/**
 * WASM64 target spec
 */
export const WASM64: WasmTarget = {
	usize: "u64",
	usizeBytes: 8,
};
