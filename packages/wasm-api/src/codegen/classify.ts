import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { Field, TypeColl } from "../api.js";
import {
	isEnum,
	isOpaque,
	isPadding,
	isPointer,
	isSlice,
	isWasmPrim,
	isWasmString,
} from "./utils.js";

// Reference: https://zig.news/toxi/typepointer-cheatsheet-3ne2
// prettier-ignore
export type FieldClass =
	| "pad"            // explicit padding only
	| "single"         // u8 / Foo
	| "array"          // [2]u8 / [2]Foo
	| "vec"            // @Vector(2, u8) / numeric only
	| "slice"          // U8Slice / FooSlice
	| "ptr"            // *u8 / *Foo
	| "ptrFixed"       // *[2]u8 / *[2]Foo (no C support)
	| "ptrMulti"       // [*]u8 / [*]Foo (no TS support)
	| "str"            // wasm.String / wasm.StringPtr
	| "strArray"       // [2]wasm.String / [2]wasm.StringPtr
	| "strSlice"       // wasm.StringSlice / wasm.StringPtrSlice
	| "strPtr"         // *wasm.String / *wasm.StringPtr
	| "strPtrFixed"    // *[2]wasm.String / *[2]wasm.StringPtr
	| "strPtrMulti"    // [*]wasm.String / [*]wasm.StringPtr
	| "opaque"         // wasm.OpaquePtr
	| "opaqueArray"    // [2]wasm.OpaquePtr
	| "opaqueSlice"    // wasm.OpaquePtrSlice
	| "opaquePtr"      // *wasm.OpaquePtr
	| "opaquePtrFixed" // *[2]wasm.OpaquePtr
	| "opaquePtrMulti" // [*]wasm.OpaquePtr
	| "enum"           // Foo
	| "enumArray"      // [2]Foo
	| "enumSlice"      // FooSlice
	| "enumPtr"        // *Foo
	| "enumPtrFixed"   // *[2]Foo
	| "enumPtrMulti"; // [*]Foo

/**
 * Analyses and classifies given field and returns a classifier constant used by
 * each codegen to emit the relevant syntax.
 *
 * @param field
 * @param coll
 *
 * @internal
 */
export const classifyField = (
	field: Pick<Field, "type" | "tag" | "len" | "const" | "sentinel" | "pad">,
	coll: TypeColl
): { classifier: FieldClass; isConst: boolean } => {
	if (isPadding(field)) return { classifier: "pad", isConst: false };
	const $isPrim = isWasmPrim(field.type);
	const $isStr = isWasmString(field.type);
	const $isSlice = isSlice(field.tag);
	const $isPtr = isPointer(field.tag);
	const $isEnum = isEnum(field.type, coll);
	const $isArray = field.tag === "array";
	const $isVec = field.tag === "vec";
	if ($isVec && !$isPrim) {
		illegalArgs("only vectors of numeric types allowed");
	}
	if (field.sentinel != null && !$isPrim) {
		illegalArgs("sentinels only supported for numeric types");
	}
	let id: FieldClass = "single";
	let $const = !!field.const;
	if ($isStr) {
		$const = field.const !== false;
		id = __classifyType("str", $isArray, $isSlice, $isPtr, field.len);
	} else if (isOpaque(field.type)) {
		id = __classifyType("opaque", $isArray, $isSlice, $isPtr, field.len);
	} else if ($isEnum) {
		id = __classifyType("enum", $isArray, $isSlice, $isPtr, field.len);
	} else {
		if ($isArray || $isVec) {
			__ensureLength(field.len);
			id = $isArray ? "array" : "vec";
		} else if ($isSlice) {
			id = "slice";
		} else if ($isPtr) {
			id = __selectForLength(field.len, "ptr", "ptrFixed", "ptrMulti");
		}
	}
	return { classifier: id, isConst: $const };
};

const __classifyType = (
	base: string,
	$isArray: boolean,
	$isSlice: boolean,
	$isPtr: boolean,
	len?: number
) => {
	if ($isArray) {
		__ensureLength(len);
		return <FieldClass>(base + "Array");
	} else if ($isSlice) {
		return <FieldClass>(base + "Slice");
	} else if ($isPtr) {
		return __selectForLength(
			len,
			<FieldClass>(base + "Ptr"),
			<FieldClass>(base + "PtrFixed"),
			<FieldClass>(base + "PtrMulti")
		);
	}
	return <FieldClass>base;
};

/** @internal */
const __selectForLength = (
	len: number | undefined,
	single: FieldClass,
	fixed: FieldClass,
	multi: FieldClass
) => (len != null ? (len > 0 ? fixed : multi) : single);

/** @internal */
const __ensureLength = (len: number | undefined) => {
	if (len == null || len < 1)
		illegalArgs("missing or invalid array/vec length");
};
