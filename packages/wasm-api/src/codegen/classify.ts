import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { Field } from "../api.js";
import {
	isOpaque,
	isPointer,
	isSlice,
	isWasmPrim,
	isWasmString,
} from "./utils.js";

// Reference: https://zig.news/toxi/typepointer-cheatsheet-3ne2
export type FieldClass =
	| "single"
	| "array"
	| "slice"
	| "ptrSingle"
	| "ptrFixed"
	| "ptrMulti"
	| "vec"
	| "str" // wasm.String / wasm.MutString / wasm.StringPtr / wasm.StringMutPtr
	| "strArray" // [2]wasm.String / [2]wasm.MutString / [2]u8
	| "strSlice" // []wasm.String / []wasm.MutString / [*][*:0]u8 / [*][*:0]const u8
	| "strPtr" // *wasm.String / *wasm.MutString / *[*:0]u8 / *[*:0]const u8
	| "strPtrFixed" // *[2]wasm.String / *[2]wasm.MutString / *[2][*:0]u8
	| "strPtrMulti" // [*]wasm.String / [*]wasm.MutString / [*]u8
	| "opaque" // *anyopaque
	| "opaqueArray"
	| "opaqueSlice" // wasm.OpaqueSlice / wasm.OpaqueMutSlice
	| "opaquePtr"
	| "opaquePtrFixed"
	| "opaquePtrMulti";

export const classifyField = (
	field: Pick<Field, "type" | "tag" | "len" | "const" | "sentinel">
): { classifier: FieldClass; isConst: boolean } => {
	const $isPrim = isWasmPrim(field.type);
	const $isStr = isWasmString(field.type);
	const $isSlice = isSlice(field.tag);
	const $isPtr = isPointer(field.tag);
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
		if ($isArray) {
			__ensureLength(field.len);
			id = "strArray";
		} else if ($isSlice) {
			id = "strSlice";
		} else if ($isPtr) {
			id = __selectForLength(
				field.len,
				"strPtr",
				"strPtrFixed",
				"strPtrMulti"
			);
		} else {
			id = "str";
		}
	} else if (isOpaque(field.type)) {
		if ($isArray) {
			__ensureLength(field.len);
			id = "opaqueArray";
		} else if ($isSlice) {
			id = "opaqueSlice";
		} else if ($isPtr) {
			id = __selectForLength(
				field.len,
				"opaquePtr",
				"opaquePtrFixed",
				"opaquePtrMulti"
			);
		} else {
			id = "opaque";
		}
	} else {
		if ($isArray || $isVec) {
			__ensureLength(field.len);
			id = $isArray ? "array" : "vec";
		} else if ($isSlice) {
			id = "slice";
		} else if ($isPtr) {
			id = __selectForLength(
				field.len,
				"ptrSingle",
				"ptrFixed",
				"ptrMulti"
			);
		}
	}
	return { classifier: id, isConst: $const };
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
