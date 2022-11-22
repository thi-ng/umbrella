// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface Foo extends WasmTypeBase {
	single: WasmStringPtr;
	singleMut: WasmStringPtr;
	multi: WasmStringPtr[];
	singlePtr: Pointer<WasmStringPtr>;
	multiPtr: Pointer<WasmStringPtr[]>;
	slice: WasmStringPtr[];
	mutSlice: WasmStringPtr[];
}

export const $Foo: WasmTypeConstructor<Foo> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 56;
	},
	instance: (base) => {
		let $singlePtr: Pointer<WasmStringPtr> | null = null;
		let $multiPtr: Pointer<WasmStringPtr[]> | null = null;
		let $single: WasmStringPtr | null = null;
		let $singleMut: WasmStringPtr | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 56);
			},
			get single(): WasmStringPtr {
				return $single || ($single = new WasmStringPtr(mem, base, true));
			},
			get singleMut(): WasmStringPtr {
				return $singleMut || ($singleMut = new WasmStringPtr(mem, (base + 8), false));
			},
			get multi(): WasmStringPtr[] {
				const addr = (base + 16);
				const $multi: WasmStringPtr[] = [];
				for(let i = 0; i < 2; i++) $multi.push(new WasmStringPtr(mem, addr + i * 4, true));
				return $multi;
			},
			get singlePtr(): Pointer<WasmStringPtr> {
				return $singlePtr || ($singlePtr = new Pointer<WasmStringPtr>(mem, (base + 32),
				(addr) => new WasmStringPtr(mem, addr, true)
				));
			},
			get multiPtr(): Pointer<WasmStringPtr[]> {
				return $multiPtr || ($multiPtr = new Pointer<WasmStringPtr[]>(mem, (base + 36),
				(addr) => {
					const $buf: WasmStringPtr[] = [];
					for(let i = 0; i < 2; i++) $buf.push(new WasmStringPtr(mem, addr + i * 4, true));
					return $buf;
				}
				));
			},
			get slice(): WasmStringPtr[] {
				const addr = mem.u32[(base + 40) >>> 2];
				const len = mem.u32[(base + 44) >>> 2];
				const $slice: WasmStringPtr[] = [];
				for(let i = 0; i < len; i++) $slice.push(new WasmStringPtr(mem, addr + i * 4, true));
				return $slice;
			},
			get mutSlice(): WasmStringPtr[] {
				const addr = mem.u32[(base + 48) >>> 2];
				const len = mem.u32[(base + 52) >>> 2];
				const $mutSlice: WasmStringPtr[] = [];
				for(let i = 0; i < len; i++) $mutSlice.push(new WasmStringPtr(mem, addr + i * 4, false));
				return $mutSlice;
			},
		};
	}
});
