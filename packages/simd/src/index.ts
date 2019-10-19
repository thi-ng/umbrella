import { isString } from "@thi.ng/checks";

export interface SIMD {
    /**
     * WASM memory instance given to `init()`.
     */
    memory: WebAssembly.Memory;
    /**
     * Float64 view of WASM memory.
     */
    f64: Float64Array;
    /**
     * Float32 view of WASM memory.
     */
    f32: Float32Array;
    /**
     * Uint32 view of WASM memory.
     */
    u32: Uint32Array;
    /**
     * Int32 view of WASM memory.
     */
    i32: Int32Array;
    /**
     * Uint16 of WASM memory.
     */
    u16: Uint16Array;
    /**
     * Int16 view of WASM memory.
     */
    i16: Int16Array;
    /**
     * Uint8 view of WASM memory.
     */
    u8: Uint8Array;
    /**
     * Int8 view of WASM memory.
     */
    i8: Int8Array;

    /**
     * Takes two densely packed vec2 AOS buffers `a` and `b`, computes their
     * 2D dot products and stores results in `out`. Computes two results per
     * iteration, hence `num` must be an even number or else the last vector
     * will not be processed. `so` should be 1 for packed result buffer.
     *
     * `a` & `b` should be aligned to 16, `out` to multiples of 4.
     *
     * @param out
     * @param a
     * @param b
     * @param num
     * @param so
     */
    // prettier-ignore
    dot2_f32_aos(out: number, a: number, b: number, num: number, so: number): number;

    /**
     * Takes two vec4 AOS buffers, computes their dot products and stores
     * results in `out`. `so` should be 1 for packed result buffer. `sa` and
     * `sb` indicate the stride lengths (in floats) between each vector in
     * each respective buffer and should be a multiple of 4.
     *
     * @param out
     * @param a
     * @param b
     * @param num
     * @param so
     * @param sa
     * @param sb
     */
    // prettier-ignore
    dot4_f32_aos(out: number, a: number, b: number, num: number, so: number, sa: number, sb: number): number;

    // prettier-ignore
    dot4_f32_soa(out: number, a: number, b: number, num: number, sa: number, sb: number): number;

    /**
     * Takes three vec4 buffers, computes componentwise `a * b + c` and stores
     * results in `out`. Both AOS / SOA layouts are supported, as long as
     * all buffers are using the same layout.
     *
     * All strides must by multiples of 4. All pointers should be aligned to
     * multiples of 16. Returns `out` pointer.
     *
     * @param out
     * @param a
     * @param b
     * @param c
     * @param num number of vec4
     * @param so out element stride
     * @param sa A element stride
     * @param sb B element stride
     * @param sc C element stride
     */
    // prettier-ignore
    madd4_f32(out: number, a: number, b: number, c: number, num: number, so: number, sa: number, sb: number, sc: number): number;

    // prettier-ignore
    maddn4_f32(out: number, a: number, b: number, c: number, num: number, so: number, sa: number, sc: number): number;
}

export const init = async (
    src: string | Buffer,
    memory: WebAssembly.Memory
): Promise<SIMD> => {
    let wasm: WebAssembly.Instance;
    const imports: any = {
        env: {
            memory,
            abort(_: any, file: any, line: number, column: number) {
                console.error(`abort called in ${file}: ${line}:${column}`);
            }
        }
    };
    if (isString(src)) {
        wasm = (await (<any>WebAssembly).instantiateStreaming(
            fetch(src),
            imports
        )).instance;
    } else {
        wasm = await WebAssembly.instantiate(
            new WebAssembly.Module(src),
            imports
        );
    }
    const buf = memory.buffer;
    return <SIMD>{
        ...wasm.exports,
        f32: new Float32Array(buf),
        f64: new Float64Array(buf),
        u32: new Uint32Array(buf),
        i32: new Int32Array(buf),
        u16: new Uint16Array(buf),
        i16: new Int16Array(buf),
        u8: new Uint8Array(buf),
        i8: new Int8Array(buf)
    };
};
