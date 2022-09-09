// @ts-ignore possibly includes unused imports
import { Pointer, WasmStringPtr, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export enum Bar {
	A,
	B = 16,
	C,
	D = 32,
}

export interface Foo extends WasmTypeBase {
	single: WasmStringPtr;
	multi: WasmStringPtr[];
	singlePtr: Pointer<WasmStringPtr>;
	multiPtr: Pointer<WasmStringPtr[]>;
	kind: Bar;
}

export const $Foo: WasmTypeConstructor<Foo> = (mem) => ({
	get align() {
		return 4;
	},
	get size() {
		return 36;
	},
	instance: (base) => {
		let $singlePtr: Pointer<WasmStringPtr> | null = null;
		let $multiPtr: Pointer<WasmStringPtr[]> | null = null;
		let $single: WasmStringPtr | null = null;
		let $multi: WasmStringPtr[] | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 36);
			},
			get single(): WasmStringPtr {
				return $single || ($single = new WasmStringPtr(mem, base, true));
			},
			get multi(): WasmStringPtr[] {
				if ($multi) return $multi;
				const addr = (base + 8);
				$multi = [];
				for(let i = 0; i < 2; i++) $multi.push(new WasmStringPtr(mem, addr + i * 4, true));
				return $multi;
			},
			get singlePtr(): Pointer<WasmStringPtr> {
				return $singlePtr || ($singlePtr = new Pointer<WasmStringPtr>(mem, (base + 24),
				(addr) => new WasmStringPtr(mem, addr, true)
				));
			},
			get multiPtr(): Pointer<WasmStringPtr[]> {
				return $multiPtr || ($multiPtr = new Pointer<WasmStringPtr[]>(mem, (base + 28),
				(addr) => {
					const $buf: WasmStringPtr[] = [];
					for(let i = 0; i < 2; i++) $buf.push(new WasmStringPtr(mem, addr + i * 4, true));
					return $buf;
				}
				));
			},
			get kind(): Bar {
				return mem.i32[(base + 32) >>> 2];
			},
			set kind(x: Bar) {
				mem.i32[(base + 32) >>> 2] = x;
			},
		};
	}
});
