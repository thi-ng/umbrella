import { SIZEOF } from "@thi.ng/api/typedarray";
import type { Pow2 } from "@thi.ng/binary";
import { align as $align } from "@thi.ng/binary/align";
import { ceilPow2 } from "@thi.ng/binary/pow";
import type { AlignStrategy, Struct, TopLevelType, WasmPrim } from "../api.js";

/**
 * C ABI compatible alignment
 */
export const ALIGN_C: AlignStrategy = {
	align: (field) => {
		let align = SIZEOF[<WasmPrim>field.type];
		if (field.tag === "vec") {
			align *= ceilPow2(field.len!);
		}
		return <Pow2>align;
	},
	size: (size, align) => $align(size, align),
	offset: (offset, align) => $align(offset, align),
};

export const ALIGN_PACKED: AlignStrategy = {
	align: () => 1,
	size: (size) => size,
	offset: (offset) => offset,
};

/**
 * Returns a suitable alignment strategy for given type, either via user
 * supplied impl defined for the type or derived via a struct's tag.
 *
 * @param type
 */
export const selectAlignment = (type: TopLevelType) => {
	if (type.type === "struct") {
		let struct = <Struct>type;
		return (
			struct.align || (struct.tag === "packed" ? ALIGN_PACKED : ALIGN_C)
		);
	}
	return ALIGN_C;
};
