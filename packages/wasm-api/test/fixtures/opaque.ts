// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringSlice, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface A extends WasmTypeBase {
	/**
	 * WASM type: u32
	 */
	a: number;
	/**
	 * WASM type: *u32
	 */
	ptr: Pointer<number>;
	/**
	 * WASM type: []u32
	 */
	slice: Uint32Array;
	/**
	 * WASM type: [3]u32
	 */
	array: Uint32Array;
}

export const $A: WasmTypeConstructor<A> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 28;
	},
	instance: (base) => {
		let $ptr: Pointer<number> | null = null;
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
				return $ptr || ($ptr = new Pointer<number>(mem, (base + 4), (base) => mem.u32[base >>> 2]));
			},
			get slice(): Uint32Array {
				const len = mem.u32[(base + 12) >>> 2];
				const addr = mem.u32[(base + 8) >>> 2] >>> 2;
				return mem.u32.subarray(addr, addr + len);
			},
			get array(): Uint32Array {
				const addr = (base + 16) >>> 2;
				return mem.u32.subarray(addr, addr + 3);
			},
		};
	}
});
