import { IObjectOf } from "@thi.ng/api";
import { BlockCtor, Type } from "./api";

const CTORS: IObjectOf<BlockCtor> = {
    [Type.U8]: (buf, addr, num) => new Uint8Array(buf, addr, num),
    [Type.U8C]: (buf, addr, num) => new Uint8ClampedArray(buf, addr, num),
    [Type.I8]: (buf, addr, num) => new Int8Array(buf, addr, num),
    [Type.U16]: (buf, addr, num) => new Uint16Array(buf, addr, num),
    [Type.I16]: (buf, addr, num) => new Int16Array(buf, addr, num),
    [Type.U32]: (buf, addr, num) => new Uint32Array(buf, addr, num),
    [Type.I32]: (buf, addr, num) => new Int32Array(buf, addr, num),
    [Type.F32]: (buf, addr, num) => new Float32Array(buf, addr, num),
    [Type.F64]: (buf, addr, num) => new Float64Array(buf, addr, num),
};

export const wrap =
    (type: Type, buf: ArrayBuffer, addr: number, num: number) =>
        CTORS[type](buf, addr, num);
