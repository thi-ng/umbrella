// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface A extends WasmTypeBase {
	/**
	 * Zig type: `u8`
	 */
	a: number;
	/**
	 * Zig type: `u32`
	 */
	b: number;
	/**
	 * Zig type: `*[3]u16`
	 */
	c: Pointer<Uint16Array>;
	/**
	 * Zig type: `f64`
	 */
	d: number;
}

export const $A: WasmTypeConstructor<A> = (mem) => ({
	get align() {
		return 8;
	},
	get size() {
		return 24;
	},
	instance: (base) => {
		let $c: Pointer<Uint16Array> | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 24);
			},
			get a(): number {
				return mem.u8[base];
			},
			set a(x: number) {
				mem.u8[base] = x;
			},
			get b(): number {
				return mem.u32[(base + 4) >>> 2];
			},
			set b(x: number) {
				mem.u32[(base + 4) >>> 2] = x;
			},
			get c(): Pointer<Uint16Array> {
				return $c || ($c = new Pointer<Uint16Array>(mem, (base + 8),
				(addr) => mem.u16.subarray(addr, addr + 3)
				));
			},
			get d(): number {
				return mem.f64[(base + 16) >>> 3];
			},
			set d(x: number) {
				mem.f64[(base + 16) >>> 3] = x;
			},
		};
	}
});

export interface B extends WasmTypeBase {
	a: A[];
	/**
	 * Zig type: `u64`
	 */
	b: bigint;
}

export const $B: WasmTypeConstructor<B> = (mem) => ({
	get align() {
		return 8;
	},
	get size() {
		return 72;
	},
	instance: (base) => {
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 72);
			},
			get a(): A[] {
				const addr = base;
				const inst = $A(mem);
				const buf: A[] = [];
				for(let i = 0; i < 3; i++) buf.push(inst.instance(addr + i * 24));
				return buf;
			},
			get b(): bigint {
				return mem.u64[base >>> 3];
			},
			set b(x: bigint) {
				mem.u64[base >>> 3] = x;
			},
		};
	}
});
