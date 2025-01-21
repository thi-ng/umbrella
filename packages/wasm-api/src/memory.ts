// SPDX-License-Identifier: Apache-2.0
import type {
	IWasmMemoryAccess,
	MemoryView,
	WasmType,
	WasmTypeConstructor,
} from "./api.js";

/** @internal */
export const __instanceArray = <T>(
	type: WasmType<T>,
	addr: number,
	num: number,
	size = type.size
) => {
	const items: T[] = [];
	for (; num-- > 0; addr += size) items.push(type.instance(addr));
	return items;
};

/** @internal */
export const __array = <T>(
	mem: IWasmMemoryAccess,
	ctor: WasmTypeConstructor<T>,
	addr: number,
	len: number
) => __instanceArray(ctor(mem), addr, len);

/** @internal */
export const __slice32 = <T>(
	mem: IWasmMemoryAccess,
	ctor: WasmTypeConstructor<T>,
	offset: number
) => {
	return __array(
		mem,
		ctor,
		mem.u32[offset >>> 2],
		mem.u32[(offset + 4) >>> 2]
	);
};

/** @internal */
export const __slice64 = <T>(
	mem: IWasmMemoryAccess,
	ctor: WasmTypeConstructor<T>,
	offset: number
) => {
	return __array(
		mem,
		ctor,
		Number(mem.u64[offset >>> 3]),
		Number(mem.u64[(offset + 8) >>> 3])
	);
};

/** @internal */
export const __primslice32 = <T extends MemoryView>(
	mem: IWasmMemoryAccess,
	view: T,
	offset: number,
	shift: number
) => {
	const addr = mem.u32[offset >>> 2] >>> shift;
	const len = mem.u32[(offset + 4) >>> 2];
	return <T>view.subarray(addr, addr + len);
};

/** @internal */
export const __primslice64 = <T extends MemoryView>(
	mem: IWasmMemoryAccess,
	view: T,
	offset: number,
	shift: number
) => {
	const addr = Number(mem.u64[offset >>> 3]) >>> shift;
	const len = Number(mem.u64[(offset + 8) >>> 3]);
	return <T>view.subarray(addr, addr + len);
};
