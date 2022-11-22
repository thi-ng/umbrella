// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringSlice, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface Foo extends WasmTypeBase {
	single: WasmStringSlice;
	singleMut: WasmStringSlice;
	multi: WasmStringSlice[];
	singlePtr: Pointer<WasmStringSlice>;
	multiPtr: Pointer<WasmStringSlice[]>;
	slice: WasmStringSlice[];
	mutSlice: WasmStringSlice[];
}

export const $Foo: WasmTypeConstructor<Foo> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 56;
	},
	instance: (base) => {
		let $singlePtr: Pointer<WasmStringSlice> | null = null;
		let $multiPtr: Pointer<WasmStringSlice[]> | null = null;
		let $single: WasmStringSlice | null = null;
		let $singleMut: WasmStringSlice | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 56);
			},
			get single(): WasmStringSlice {
				return $single || ($single = new WasmStringSlice(mem, base, true));
			},
			get singleMut(): WasmStringSlice {
				return $singleMut || ($singleMut = new WasmStringSlice(mem, (base + 8), false));
			},
			get multi(): WasmStringSlice[] {
				const addr = (base + 16);
				const $multi: WasmStringSlice[] = [];
				for(let i = 0; i < 2; i++) $multi.push(new WasmStringSlice(mem, addr + i * 8, true));
				return $multi;
			},
			get singlePtr(): Pointer<WasmStringSlice> {
				return $singlePtr || ($singlePtr = new Pointer<WasmStringSlice>(mem, (base + 32),
				(addr) => new WasmStringSlice(mem, addr, true)
				));
			},
			get multiPtr(): Pointer<WasmStringSlice[]> {
				return $multiPtr || ($multiPtr = new Pointer<WasmStringSlice[]>(mem, (base + 36),
				(addr) => {
					const $buf: WasmStringSlice[] = [];
					for(let i = 0; i < 2; i++) $buf.push(new WasmStringSlice(mem, addr + i * 8, true));
					return $buf;
				}
				));
			},
			get slice(): WasmStringSlice[] {
				const addr = mem.u32[(base + 40) >>> 2];
				const len = mem.u32[(base + 44) >>> 2];
				const $slice: WasmStringSlice[] = [];
				for(let i = 0; i < len; i++) $slice.push(new WasmStringSlice(mem, addr + i * 8, true));
				return $slice;
			},
			get mutSlice(): WasmStringSlice[] {
				const addr = mem.u32[(base + 48) >>> 2];
				const len = mem.u32[(base + 52) >>> 2];
				const $mutSlice: WasmStringSlice[] = [];
				for(let i = 0; i < len; i++) $mutSlice.push(new WasmStringSlice(mem, addr + i * 8, false));
				return $mutSlice;
			},
		};
	}
});
