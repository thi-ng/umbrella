import { isString } from "@thi.ng/checks";

export interface SIMD {
    // prettier-ignore
    dot4(out: number, a: number, b: number, num: number, so: number, sa: number, sb: number): number;
    // prettier-ignore
    madd4(out: number, a: number, b: number, c: number, num: number, so: number, sa: number, sb: number, sc: number): number;
    // prettier-ignore
    maddN4(out: number, a: number, b: number, c: number, num: number, so: number, sa: number, sc: number): number;
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
    return wasm.exports;
};
