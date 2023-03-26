// @ts-ignore possibly includes unused imports
import { Pointer, WasmStringPtr, type MemorySlice, type WasmTypeBase, type WasmTypeConstructor } from "@thi.ng/wasm-api";

export enum A {
	FOO,
	BAR,
	BAZ = 10,
}

export interface B extends WasmTypeBase {
	single: A;
	array: Int32Array;
	slice: Int32Array;
	ptr: Pointer<A>;
	ptr2: Pointer<Int32Array>;
}

export const $B: WasmTypeConstructor<B> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 28;
	},
	instanceArray(base, num) {
		const items: B[] = [];
		for (; num --> 0; base += 28) items.push(this.instance(base));
		return items;
	},
	instance: (base) => {
		let $ptr: Pointer<A> | null = null;
		let $ptr2: Pointer<Int32Array> | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 28);
			},
			get single(): A {
				return mem.i32[base >>> 2];
			},
			set single(x: A) {
				mem.i32[base >>> 2] = x;
			},
			get array(): Int32Array {
				const addr = (base + 4) >>> 2;
				return mem.i32.subarray(addr, addr + 2);
			},
			get slice(): Int32Array {
				const addr = mem.u32[(base + 12) >>> 2];
				const len = mem.u32[(base + 16) >>> 2];
				return mem.i32.subarray(addr, addr + len);
			},
			get ptr(): Pointer<A> {
				return $ptr || ($ptr = new Pointer<A>(mem, (base + 20),
				(addr) => mem.i32[addr >>> 2]
				));
			},
			get ptr2(): Pointer<Int32Array> {
				return $ptr2 || ($ptr2 = new Pointer<Int32Array>(mem, (base + 24),
				(addr) => mem.i32.subarray(addr, addr + 2)
				));
			},
		};
	}
});
