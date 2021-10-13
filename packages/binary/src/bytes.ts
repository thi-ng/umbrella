import { floatToUintBits, floatToUintBits64 } from "./float.js";

export const bytes16 = (x: number, le = false) => {
    const b0 = x & 0xff;
    const b1 = (x >> 8) & 0xff;
    return le ? [b0, b1] : [b1, b0];
};

export const bytes24 = (x: number, le = false) => {
    const b0 = x & 0xff;
    const b1 = (x >> 8) & 0xff;
    const b2 = (x >> 16) & 0xff;
    return le ? [b0, b1, b2] : [b2, b1, b0];
};

export const bytes32 = (x: number, le = false) => {
    const b0 = x & 0xff;
    const b1 = (x >> 8) & 0xff;
    const b2 = (x >> 16) & 0xff;
    const b3 = (x >> 24) & 0xff;
    return le ? [b0, b1, b2, b3] : [b3, b2, b1, b0];
};

export const bytes64 = (hi: number, lo: number, le = false) => {
    return le
        ? bytes32(lo, le).concat(bytes32(hi, le))
        : bytes32(hi, le).concat(bytes32(lo, le));
};

export const bytesF32 = (x: number, le = false) =>
    bytes32(floatToUintBits(x), le);

export const bytesF64 = (x: number, le = false) =>
    //@ts-ignore
    bytes64(...floatToUintBits64(x), le);
