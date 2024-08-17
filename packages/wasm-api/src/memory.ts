import type {
	IWasmMemoryAccess,
	MemoryView,
	WasmType,
	WasmTypeConstructor,
} from "./api.js";

/** @internal */
export const __instanceArray = <T>(
	type: WasmType<T>,
	base: number,
	num: number
) => {
	const items: T[] = [];
	for (; num-- > 0; base += type.size) items.push(type.instance(base));
	return items;
};

/** @internal */
export const __array = <T>(
	mem: IWasmMemoryAccess,
	ctor: WasmTypeConstructor<T>,
	addr: number,
	len: number
) => {
	const buf: T[] = [];
	const inst = ctor(mem);
	const size = inst.size;
	for (let i = 0; i < len; i++) buf.push(inst.instance(addr + i * size));
	return buf;
};

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
