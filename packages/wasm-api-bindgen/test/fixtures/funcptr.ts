// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface B extends WasmTypeBase {
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
	 * Zig type: `[2]u32`
	 */
	array: Uint32Array;
	/**
	 * Zig type: `U32Slice`
	 */
	slice: Uint32Array;
}

export const $B: WasmTypeConstructor<B> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 28;
	},
	instance: (base) => {
		let $ptr: Pointer<number> | null = null;
		let $ptr2: Pointer<Uint32Array> | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 28);
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
			get array(): Uint32Array {
				const addr = (base + 12) >>> 2;
				return mem.u32.subarray(addr, addr + 2);
			},
			get slice(): Uint32Array {
				const addr = mem.u32[(base + 20) >>> 2];
				const len = mem.u32[(base + 24) >>> 2];
				return mem.u32.subarray(addr, addr + len);
			},
		};
	}
});
