// @ts-ignore possibly includes unused imports
import { Pointer, WasmStringSlice, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface Foo extends WasmTypeBase {
	single: WasmStringSlice;
	multi: WasmStringSlice[];
	singlePtr: Pointer<WasmStringSlice>;
	multiPtr: Pointer<WasmStringSlice[]>;
}

export const $Foo: WasmTypeConstructor<Foo> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 32;
	},
	instance: (base) => {
		let $singlePtr: Pointer<WasmStringSlice> | null = null;
		let $multiPtr: Pointer<WasmStringSlice[]> | null = null;
		let $single: WasmStringSlice | null = null;
		let $multi: WasmStringSlice[] | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 32);
			},
			get single(): WasmStringSlice {
				return $single || ($single = new WasmStringSlice(mem, base, true));
			},
			get multi(): WasmStringSlice[] {
				if ($multi) return $multi;
				const addr = (base + 8);
				$multi = [];
				for(let i = 0; i < 2; i++) $multi.push(new WasmStringSlice(mem, addr + i * 8, true));
				return $multi;
			},
			get singlePtr(): Pointer<WasmStringSlice> {
				return $singlePtr || ($singlePtr = new Pointer<WasmStringSlice>(mem, (base + 24),
				(addr) => new WasmStringSlice(mem, addr, true)
				));
			},
			get multiPtr(): Pointer<WasmStringSlice[]> {
				return $multiPtr || ($multiPtr = new Pointer<WasmStringSlice[]>(mem, (base + 28),
				(addr) => {
					const $buf: WasmStringSlice[] = [];
					for(let i = 0; i < 2; i++) $buf.push(new WasmStringSlice(mem, addr + i * 8, true));
					return $buf;
				}
				));
			},
		};
	}
});
