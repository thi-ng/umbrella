import { base64Decode } from "@thi.ng/transducers-binary";
import { SIMD } from "./api";
import { BINARY } from "./binary";

export const init = (memory: WebAssembly.Memory): SIMD | undefined => {
    try {
        const buf = memory.buffer;
        return <SIMD>{
            ...new WebAssembly.Instance(
                new WebAssembly.Module(
                    new Uint8Array([...base64Decode(BINARY)])
                ),
                {
                    env: {
                        memory,
                        abort(_: any, file: any, line: number, column: number) {
                            console.error(
                                `abort called in ${file}: ${line}:${column}`
                            );
                        }
                    }
                }
            ).exports,
            f32: new Float32Array(buf),
            f64: new Float64Array(buf),
            u32: new Uint32Array(buf),
            i32: new Int32Array(buf),
            u16: new Uint16Array(buf),
            i16: new Int16Array(buf),
            u8: new Uint8Array(buf),
            i8: new Int8Array(buf)
        };
    } catch (e) {
        console.warn(e);
    }
};
