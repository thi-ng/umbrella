// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface A extends WasmTypeBase {
	/**
	 * Zig type: `u32`
	 */
	a: number;
	/**
	 * Zig type: `*u32`
	 */
	ptr: Pointer<number>;
	/**
	 * Zig type: `*[2]u32`
	 */
	ptr2: Pointer<Uint32Array>;
	/**
	 * Zig type: `*const u32`
	 */
	constPtr: Pointer<number>;
	/**
	 * Zig type: `U32Slice`
	 */
	slice: Uint32Array;
	/**
	 * Zig type: `ConstU32Slice`
	 */
	constSlice: Uint32Array;
	/**
	 * Zig type: `[3]u32`
	 */
	array: Uint32Array;
	/**
	 * Zig type: `[3]u32`
	 */
	constArray: Uint32Array;
}

export const $A: WasmTypeConstructor<A> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 56;
	},
	instanceArray(base, num) {
		const items: A[] = [];
		for (; num --> 0; base += 56) items.push(this.instance(base));
		return items;
	},
	instance: (base) => {
		let $ptr: Pointer<number> | null = null;
		let $ptr2: Pointer<Uint32Array> | null = null;
		let $constPtr: Pointer<number> | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 56);
			},
			get a(): number {
				return mem.u32[base >>> 2];
			},
			set a(x: number) {
				mem.u32[base >>> 2] = x;
			},
			get ptr(): Pointer<number> {
				return $ptr || ($ptr = new Pointer<number>(mem, (base + 4),
				(addr) => mem.u32[addr >>> 2]
				));
			},
			get ptr2(): Pointer<Uint32Array> {
				return $ptr2 || ($ptr2 = new Pointer<Uint32Array>(mem, (base + 8),
				(addr) => mem.u32.subarray(addr, addr + 2)
				));
			},
			get constPtr(): Pointer<number> {
				return $constPtr || ($constPtr = new Pointer<number>(mem, (base + 12),
				(addr) => mem.u32[addr >>> 2]
				));
			},
			get slice(): Uint32Array {
				const addr = mem.u32[(base + 16) >>> 2];
				const len = mem.u32[(base + 20) >>> 2];
				return mem.u32.subarray(addr, addr + len);
			},
			get constSlice(): Uint32Array {
				const addr = mem.u32[(base + 24) >>> 2];
				const len = mem.u32[(base + 28) >>> 2];
				return mem.u32.subarray(addr, addr + len);
			},
			get array(): Uint32Array {
				const addr = (base + 32) >>> 2;
				return mem.u32.subarray(addr, addr + 3);
			},
			get constArray(): Uint32Array {
				const addr = (base + 44) >>> 2;
				return mem.u32.subarray(addr, addr + 3);
			},
		};
	}
});
