import type { FnU2, TypedArray } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import { U16, U32, U8 } from "@thi.ng/hex";
import type { ILogger } from "@thi.ng/logger";
import { ConsoleLogger } from "@thi.ng/logger/console";
import type { CoreAPI, IWasmAPI } from "./api.js";

export class WasmBridge {
	i8!: Int8Array;
	u8!: Uint8Array;
	i16!: Int16Array;
	u16!: Uint16Array;
	i32!: Int32Array;
	u32!: Uint32Array;
	f32!: Float32Array;
	f64!: Float64Array;
	utf8Decoder: TextDecoder = new TextDecoder();
	utf8Encoder: TextEncoder = new TextEncoder();
	core: CoreAPI;

	constructor(
		public modules: Record<string, IWasmAPI> = {},
		public logger: ILogger = new ConsoleLogger("wasm")
	) {
		const logN = (x: number) => this.logger.debug(x);
		const logA =
			(method: FnU2<number, TypedArray>) => (addr: number, len: number) =>
				this.logger.debug(method(addr, len).join(", "));
		this.core = {
			printI8: logN,
			printU8: logN,
			printU8Hex: (x: number) => this.logger.debug(`0x${U8(x)}`),
			printI16: logN,
			printU16: logN,
			printU16Hex: (x: number) => this.logger.debug(`0x${U16(x)}`),
			printI32: logN,
			printU32: logN,
			printU32Hex: (x: number) => this.logger.debug(`0x${U32(x)}`),
			printF32: logN,
			printF64: logN,

			_printI8Array: logA(this.getI8Array.bind(this)),
			_printU8Array: logA(this.getU8Array.bind(this)),
			_printI16Array: logA(this.getI16Array.bind(this)),
			_printU16Array: logA(this.getU16Array.bind(this)),
			_printI32Array: logA(this.getI32Array.bind(this)),
			_printU32Array: logA(this.getU32Array.bind(this)),
			_printF32Array: logA(this.getF32Array.bind(this)),
			_printF64Array: logA(this.getF64Array.bind(this)),

			_printStr0: (addr: number) =>
				this.logger.debug(this.getString(addr, 0)),

			_printStr: (addr: number, len: number) =>
				this.logger.debug(this.getString(addr, len)),
		};
	}

	async init(mem: WebAssembly.Memory) {
		this.i8 = new Int8Array(mem.buffer);
		this.u8 = new Uint8Array(mem.buffer);
		this.i16 = new Int16Array(mem.buffer);
		this.u16 = new Uint16Array(mem.buffer);
		this.i32 = new Int32Array(mem.buffer);
		this.u32 = new Uint32Array(mem.buffer);
		this.f32 = new Float32Array(mem.buffer);
		this.f64 = new Float64Array(mem.buffer);
		for (let id in this.modules) {
			this.logger.debug(`initializing API module: ${id}`);
			const status = await this.modules[id].init(this);
			if (!status) return false;
		}
		return true;
	}

	/**
	 * Returns object of all WASM imports declared in the bridge core API and
	 * any provided child APIs.
	 */
	getImports() {
		const env = { ...this.core };
		for (let id in this.modules) {
			Object.assign(env, this.modules[id].getImports());
		}
		return { env };
	}

	getI8Array(ptr: number, len: number): Int8Array {
		return this.i8.subarray(ptr, ptr + len);
	}

	getU8Array(ptr: number, len: number): Uint8Array {
		return this.u8.subarray(ptr, ptr + len);
	}

	getI16Array(ptr: number, len: number): Int16Array {
		ptr >>= 1;
		return this.i16.subarray(ptr, ptr + len);
	}

	getU16Array(ptr: number, len: number): Uint16Array {
		ptr >>= 1;
		return this.u16.subarray(ptr, ptr + len);
	}

	getI32Array(ptr: number, len: number): Int32Array {
		ptr >>= 2;
		return this.i32.subarray(ptr, ptr + len);
	}

	getU32Array(ptr: number, len: number): Uint32Array {
		ptr >>= 2;
		return this.u32.subarray(ptr, ptr + len);
	}

	getF32Array(ptr: number, len: number): Float32Array {
		ptr >>= 2;
		return this.f32.subarray(ptr, ptr + len);
	}

	getF64Array(ptr: number, len: number): Float64Array {
		ptr >>= 3;
		return this.f64.subarray(ptr, ptr + len);
	}

	derefI8(ptr: number) {
		return this.i8[ptr];
	}

	derefU8(ptr: number) {
		return this.u8[ptr];
	}

	derefI16(ptr: number) {
		return this.i16[ptr >> 1];
	}

	derefU16(ptr: number) {
		return this.u16[ptr >> 1];
	}

	derefI32(ptr: number) {
		return this.i32[ptr >> 2];
	}

	derefU32(ptr: number) {
		return this.u32[ptr >> 2];
	}

	derefF32(ptr: number) {
		return this.f32[ptr >> 2];
	}

	derefF64(ptr: number) {
		return this.f64[ptr >> 3];
	}

	getString(addr: number, len = 0) {
		return this.utf8Decoder.decode(
			this.u8.subarray(
				addr,
				len > 0 ? addr + len : this.u8.indexOf(0, addr)
			)
		);
	}

	getElementById(addr: number, len = 0) {
		const id = this.getString(addr, len);
		const el = document.getElementById(id);
		assert(!!el, `missing DOM element #${id}`);
		return el;
	}

	setString(
		str: string,
		addr: number,
		maxBytes: number,
		terminate = true
	): number {
		maxBytes = Math.min(maxBytes, this.u8.length - addr);
		const len = this.utf8Encoder.encodeInto(
			str,
			this.u8.subarray(addr, addr + maxBytes)
		).written!;
		assert(
			len != null && len < maxBytes + (terminate ? 0 : 1),
			`error writing string to 0x${U32(addr)}`
		);
		if (terminate) {
			this.u8[addr + len!] = 0;
			return len! + 1;
		}
		return len!;
	}
}
