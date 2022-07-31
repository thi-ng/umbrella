import { base64Decode } from "@thi.ng/transducers-binary/base64";
import type { SIMD } from "./api.js";
import { BINARY } from "./binary.js";

export * from "./api.js";

/**
 * Creates a new WASM module instance w/ user supplied memory. The WASM
 * module itself doesn't use any memory itself and the full address
 * space of the given memory instance is freely available for use. The
 * returned object exposes all SIMD functions defined by this package,
 * as well as various views of the provided memory. See {@link SIMD} interface
 * in api.ts for details.
 *
 * The initialization method used here is synchronous and the WASM
 * binary is inlined as base64 string in this package (The `binary.ts`
 * file is generated during build time).
 *
 * ```
 * // create instance w/ 1MB memory (16 * 64KB)
 * simd = init(new WebAssembly.Memory({ initial: 16 }));
 * ```
 *
 * Function will throw an error if WASM is unavailable or underlying
 * runtime doesn't yet support SIMD instructions.
 *
 * @param memory -
 */
export const init = (memory: WebAssembly.Memory): SIMD | undefined => {
	const buf = memory.buffer;
	return <SIMD>{
		...new WebAssembly.Instance(
			new WebAssembly.Module(base64Decode(BINARY)),
			{
				env: {
					memory,
					abort(_: any, file: any, line: number, column: number) {
						console.error(
							`abort called in ${file}: ${line}:${column}`
						);
					},
				},
			}
		).exports,
		f32: new Float32Array(buf),
		f64: new Float64Array(buf),
		u32: new Uint32Array(buf),
		i32: new Int32Array(buf),
		u16: new Uint16Array(buf),
		i16: new Int16Array(buf),
		u8: new Uint8Array(buf),
		i8: new Int8Array(buf),
	};
};
