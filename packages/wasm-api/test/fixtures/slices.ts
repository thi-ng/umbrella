// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface A extends WasmTypeBase {
	/**
	 * WASM type: U8Slice
	 */
	slice: Uint8Array;
	/**
	 * WASM type: ConstU8Slice
	 */
	constSlice: Uint8Array;
	/**
	 * WASM type: *u8
	 */
	ptr: Pointer<number>;
	/**
	 * WASM type: *const u8
	 */
	constPtr: Pointer<number>;
	/**
	 * WASM type: *[2]u8
	 */
	ptr2: Pointer<Uint8Array>;
	/**
	 * WASM type: *[2:0]u8
	 */
	ptr2sentinel: Pointer<Uint8Array>;
	/**
	 * WASM type: *const [2]u8
	 */
	constPtr2: Pointer<Uint8Array>;
	/**
	 * WASM type: *const [2:0]u8
	 */
	constPtr2sentinel: Pointer<Uint8Array>;
	/**
	 * WASM type: [2]u8
	 */
	array: Uint8Array;
	bsingle: B;
	bslice: B[];
	constBSlice: B[];
	bptr: Pointer<B>;
	bptr2: Pointer<B[]>;
}

export const $A: WasmTypeConstructor<A> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 68;
	},
	instance: (base) => {
		let $ptr: Pointer<number> | null = null;
		let $constPtr: Pointer<number> | null = null;
		let $ptr2: Pointer<Uint8Array> | null = null;
		let $ptr2sentinel: Pointer<Uint8Array> | null = null;
		let $constPtr2: Pointer<Uint8Array> | null = null;
		let $constPtr2sentinel: Pointer<Uint8Array> | null = null;
		let $bptr: Pointer<B> | null = null;
		let $bptr2: Pointer<B[]> | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 68);
			},
			get slice(): Uint8Array {
				const addr = mem.u32[base >>> 2];
				const len = mem.u32[(base + 4) >>> 2];
				return mem.u8.subarray(addr, addr + len);
			},
			get constSlice(): Uint8Array {
				const addr = mem.u32[(base + 8) >>> 2];
				const len = mem.u32[(base + 12) >>> 2];
				return mem.u8.subarray(addr, addr + len);
			},
			get ptr(): Pointer<number> {
				return $ptr || ($ptr = new Pointer<number>(mem, (base + 16),
				(addr) => mem.u8[addr >>> 0]
				));
			},
			get constPtr(): Pointer<number> {
				return $constPtr || ($constPtr = new Pointer<number>(mem, (base + 20),
				(addr) => mem.u8[addr >>> 0]
				));
			},
			get ptr2(): Pointer<Uint8Array> {
				return $ptr2 || ($ptr2 = new Pointer<Uint8Array>(mem, (base + 24),
				(addr) => mem.u8.subarray(addr, addr + 2)
				));
			},
			get ptr2sentinel(): Pointer<Uint8Array> {
				return $ptr2sentinel || ($ptr2sentinel = new Pointer<Uint8Array>(mem, (base + 28),
				(addr) => mem.u8.subarray(addr, addr + 2)
				));
			},
			get constPtr2(): Pointer<Uint8Array> {
				return $constPtr2 || ($constPtr2 = new Pointer<Uint8Array>(mem, (base + 32),
				(addr) => mem.u8.subarray(addr, addr + 2)
				));
			},
			get constPtr2sentinel(): Pointer<Uint8Array> {
				return $constPtr2sentinel || ($constPtr2sentinel = new Pointer<Uint8Array>(mem, (base + 36),
				(addr) => mem.u8.subarray(addr, addr + 2)
				));
			},
			get array(): Uint8Array {
				const addr = (base + 40);
				return mem.u8.subarray(addr, addr + 2);
			},
			get bsingle(): B {
				return $B(mem).instance((base + 42));
			},
			set bsingle(x: B) {
				mem.u8.set(x.__bytes, (base + 42));
			},
			get bslice(): B[] {
				const addr = mem.u32[(base + 44) >>> 2];
				const len = mem.u32[(base + 48) >>> 2];
				const inst = $B(mem);
				const buf: B[] = [];
				for(let i = 0; i < len; i++) buf.push(inst.instance(addr + i * 2));
				return buf;
			},
			get constBSlice(): B[] {
				const addr = mem.u32[(base + 52) >>> 2];
				const len = mem.u32[(base + 56) >>> 2];
				const inst = $B(mem);
				const buf: B[] = [];
				for(let i = 0; i < len; i++) buf.push(inst.instance(addr + i * 2));
				return buf;
			},
			get bptr(): Pointer<B> {
				return $bptr || ($bptr = new Pointer<B>(mem, (base + 60),
				(addr) => $B(mem).instance(addr)
				));
			},
			get bptr2(): Pointer<B[]> {
				return $bptr2 || ($bptr2 = new Pointer<B[]>(mem, (base + 64),
				(addr) => {
					const inst = $B(mem);
					const buf: B[] = [];
					for(let i = 0; i < 2; i++) buf.push(inst.instance(addr + i * 2));
					return buf;
				}
				));
			},
		};
	}
});

export interface B extends WasmTypeBase {
	/**
	 * WASM type: u16
	 */
	a: number;
}

export const $B: WasmTypeConstructor<B> = (mem) => ({
	get align() {
		return 2;
	},
	get size() {
		return 2;
	},
	instance: (base) => {
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 2);
			},
			get a(): number {
				return mem.u16[base >>> 1];
			},
			set a(x: number) {
				mem.u16[base >>> 1] = x;
			},
		};
	}
});
