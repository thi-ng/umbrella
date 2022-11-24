// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface A extends WasmTypeBase {
	/**
	 * Zig type: `u16`
	 */
	a: number;
}

export const $A: WasmTypeConstructor<A> = (mem) => ({
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

export interface B extends WasmTypeBase {
	/**
	 * Zig type: `U8Slice`
	 */
	slice: Uint8Array;
	/**
	 * Zig type: `ConstU8Slice`
	 */
	constSlice: Uint8Array;
	/**
	 * Zig type: `*u8`
	 */
	ptr: Pointer<number>;
	/**
	 * Zig type: `*const u8`
	 */
	constPtr: Pointer<number>;
	/**
	 * Zig type: `*[2]u8`
	 */
	ptr2: Pointer<Uint8Array>;
	/**
	 * Zig type: `*[2:0]u8`
	 */
	ptr2sentinel: Pointer<Uint8Array>;
	/**
	 * Zig type: `*const [2]u8`
	 */
	constPtr2: Pointer<Uint8Array>;
	/**
	 * Zig type: `*const [2:0]u8`
	 */
	constPtr2sentinel: Pointer<Uint8Array>;
	/**
	 * Multi pointer: `[*]u8`
	 * 
	 * @remarks
	 * Only the pointer's target address can be accessed
	 */
	ptrMulti: number;
	/**
	 * Multi pointer: `[*:255]u8`
	 * 
	 * @remarks
	 * Only the pointer's target address can be accessed
	 */
	ptrMultiSentinel: number;
	/**
	 * Multi pointer: `[*]const u8`
	 * 
	 * @remarks
	 * Only the pointer's target address can be accessed
	 */
	constPtrMulti: number;
	/**
	 * Multi pointer: `[*:255]const u8`
	 * 
	 * @remarks
	 * Only the pointer's target address can be accessed
	 */
	constPtrMultiSentinel: number;
	/**
	 * Zig type: `[2]i32`
	 */
	array: Int32Array;
	/**
	 * Zig type: `[2:0]i32`
	 */
	arraySentinel: Int32Array;
	aSingle: A;
	aSlice: A[];
	constASlice: A[];
	aPtr: Pointer<A>;
	aPtr2: Pointer<A[]>;
	/**
	 * Multiple A's
	 * 
	 * @remarks
	 * Multi pointer: `[*]A`
	 * Only the pointer's target address can be accessed
	 */
	aPtrMulti: number;
}

export const $B: WasmTypeConstructor<B> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 108;
	},
	instance: (base) => {
		let $ptr: Pointer<number> | null = null;
		let $constPtr: Pointer<number> | null = null;
		let $ptr2: Pointer<Uint8Array> | null = null;
		let $ptr2sentinel: Pointer<Uint8Array> | null = null;
		let $constPtr2: Pointer<Uint8Array> | null = null;
		let $constPtr2sentinel: Pointer<Uint8Array> | null = null;
		let $aPtr: Pointer<A> | null = null;
		let $aPtr2: Pointer<A[]> | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 108);
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
			get ptrMulti(): number {
				return mem.u32[(base + 40) >>> 2];
			},
			set ptrMulti(x: number) {
				mem.u32[(base + 40) >>> 2] = x;
			},
			get ptrMultiSentinel(): number {
				return mem.u32[(base + 44) >>> 2];
			},
			set ptrMultiSentinel(x: number) {
				mem.u32[(base + 44) >>> 2] = x;
			},
			get constPtrMulti(): number {
				return mem.u32[(base + 48) >>> 2];
			},
			set constPtrMulti(x: number) {
				mem.u32[(base + 48) >>> 2] = x;
			},
			get constPtrMultiSentinel(): number {
				return mem.u32[(base + 52) >>> 2];
			},
			set constPtrMultiSentinel(x: number) {
				mem.u32[(base + 52) >>> 2] = x;
			},
			get array(): Int32Array {
				const addr = (base + 56) >>> 2;
				return mem.i32.subarray(addr, addr + 2);
			},
			get arraySentinel(): Int32Array {
				const addr = (base + 64) >>> 2;
				return mem.i32.subarray(addr, addr + 2);
			},
			get aSingle(): A {
				return $A(mem).instance((base + 76));
			},
			set aSingle(x: A) {
				mem.u8.set(x.__bytes, (base + 76));
			},
			get aSlice(): A[] {
				const addr = mem.u32[(base + 80) >>> 2];
				const len = mem.u32[(base + 84) >>> 2];
				const inst = $A(mem);
				const buf: A[] = [];
				for(let i = 0; i < len; i++) buf.push(inst.instance(addr + i * 2));
				return buf;
			},
			get constASlice(): A[] {
				const addr = mem.u32[(base + 88) >>> 2];
				const len = mem.u32[(base + 92) >>> 2];
				const inst = $A(mem);
				const buf: A[] = [];
				for(let i = 0; i < len; i++) buf.push(inst.instance(addr + i * 2));
				return buf;
			},
			get aPtr(): Pointer<A> {
				return $aPtr || ($aPtr = new Pointer<A>(mem, (base + 96),
				(addr) => $A(mem).instance(addr)
				));
			},
			get aPtr2(): Pointer<A[]> {
				return $aPtr2 || ($aPtr2 = new Pointer<A[]>(mem, (base + 100),
				(addr) => {
					const inst = $A(mem);
					const buf: A[] = [];
					for(let i = 0; i < 2; i++) buf.push(inst.instance(addr + i * 2));
					return buf;
				}
				));
			},
			get aPtrMulti(): number {
				return mem.u32[(base + 104) >>> 2];
			},
			set aPtrMulti(x: number) {
				mem.u32[(base + 104) >>> 2] = x;
			},
		};
	}
});
