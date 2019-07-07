const M8 = 0xff;
const M16 = 0xffff;

export const signExtend8 = (a: number) => ((a &= M8), a & 0x80 ? a | ~M8 : a);

export const signExtend16 = (a: number) => (
    (a &= M16), a & 0x8000 ? a | ~M16 : a
);

export const addi8 = (a: number, b: number) => signExtend8((a | 0) + (b | 0));
export const divi8 = (a: number, b: number) => signExtend8((a | 0) / (b | 0));
export const muli8 = (a: number, b: number) => signExtend8((a | 0) * (b | 0));
export const subi8 = (a: number, b: number) => signExtend8((a | 0) - (b | 0));
export const andi8 = (a: number, b: number) => signExtend8((a | 0) & (b | 0));
export const ori8 = (a: number, b: number) => signExtend8(a | 0 | (b | 0));
export const xori8 = (a: number, b: number) => signExtend8((a | 0) ^ (b | 0));
export const noti8 = (a: number) => signExtend8(~a);
// prettier-ignore
export const lshifti8 = (a: number, b: number) => signExtend8((a | 0) << (b | 0));
// prettier-ignore
export const rshifti8 = (a: number, b: number) => signExtend8((a | 0) >> (b | 0));

export const addi16 = (a: number, b: number) => signExtend16((a | 0) + (b | 0));
export const divi16 = (a: number, b: number) => signExtend16((a | 0) / (b | 0));
export const muli16 = (a: number, b: number) => signExtend16((a | 0) * (b | 0));
export const subi16 = (a: number, b: number) => signExtend16((a | 0) - (b | 0));
export const andi16 = (a: number, b: number) => signExtend16((a | 0) & (b | 0));
export const ori16 = (a: number, b: number) => signExtend16(a | 0 | (b | 0));
export const xori16 = (a: number, b: number) => signExtend16((a | 0) ^ (b | 0));
export const noti16 = (a: number) => signExtend16(~a);
// prettier-ignore
export const lshifti16 = (a: number, b: number) => signExtend16((a | 0) << (b | 0));
// prettier-ignore
export const rshifti16 = (a: number, b: number) => signExtend16((a | 0) >> (b | 0));

export const addi32 = (a: number, b: number) => ((a | 0) + (b | 0)) | 0;
export const divi32 = (a: number, b: number) => ((a | 0) / (b | 0)) | 0;
export const muli32 = (a: number, b: number) => ((a | 0) * (b | 0)) | 0;
export const subi32 = (a: number, b: number) => ((a | 0) - (b | 0)) | 0;
export const andi32 = (a: number, b: number) => (a | 0) & (b | 0);
export const ori32 = (a: number, b: number) => a | 0 | (b | 0);
export const xori32 = (a: number, b: number) => (a | 0) ^ (b | 0);
export const lshifti32 = (a: number, b: number) => (a | 0) << (b | 0);
export const rshifti32 = (a: number, b: number) => (a | 0) >> (b | 0);
export const noti32 = (a: number) => ~a;

// prettier-ignore
export const addu8 = (a: number, b: number) => ((a & M8) + (b & M8)) & M8;
// prettier-ignore
export const divu8 = (a: number, b: number) => ((a & M8) / (b & M8)) & M8;
// prettier-ignore
export const mulu8 = (a: number, b: number) => ((a & M8) * (b & M8)) & M8;
// prettier-ignore
export const subu8 = (a: number, b: number) => ((a & M8) - (b & M8)) & M8;
// prettier-ignore
export const andu8 = (a: number, b: number) => ((a & M8) & (b & M8)) & M8;
// prettier-ignore
export const oru8 = (a: number, b: number) => ((a & M8) | (b & M8)) & M8;
// prettier-ignore
export const xoru8 = (a: number, b: number) => ((a & M8) ^ (b & M8)) & M8;
export const notu8 = (a: number) => ~a & M8;
export const lshiftu8 = (a: number, b: number) => ((a & M8) << (b & M8)) & M8;
export const rshiftu8 = (a: number, b: number) => ((a & M8) >>> (b & M8)) & M8;

// prettier-ignore
export const addu16 = (a: number, b: number) => ((a & M16) + (b & M16)) & M16;
// prettier-ignore
export const divu16 = (a: number, b: number) => ((a & M16) / (b & M16)) & M16;
// prettier-ignore
export const mulu16 = (a: number, b: number) => ((a & M16) * (b & M16)) & M16;
// prettier-ignore
export const subu16 = (a: number, b: number) => ((a & M16) - (b & M16)) & M16;
// prettier-ignore
export const andu16 = (a: number, b: number) => ((a & M16) & (b & M16)) & M16;
// prettier-ignore
export const oru16 = (a: number, b: number) => ((a & M16) | (b & M16)) & M16;
// prettier-ignore
export const xoru16 = (a: number, b: number) => ((a & M16) ^ (b & M16)) & M16;
export const notu16 = (a: number) => ~a & M16;
// prettier-ignore
export const lshiftu16 = (a: number, b: number) => ((a & M16) << (b & M16)) & M16;
// prettier-ignore
export const rshiftu16 = (a: number, b: number) => ((a & M16) >>> (b & M16)) & M16;

export const addu32 = (a: number, b: number) => ((a >>> 0) + (b >>> 0)) >>> 0;
export const divu32 = (a: number, b: number) => ((a >>> 0) / (b >>> 0)) >>> 0;
export const mulu32 = (a: number, b: number) => ((a >>> 0) * (b >>> 0)) >>> 0;
export const subu32 = (a: number, b: number) => ((a >>> 0) - (b >>> 0)) >>> 0;
export const andu32 = (a: number, b: number) => ((a >>> 0) & (b >>> 0)) >>> 0;
export const oru32 = (a: number, b: number) => ((a >>> 0) | (b >>> 0)) >>> 0;
export const xoru32 = (a: number, b: number) => ((a >>> 0) ^ (b >>> 0)) >>> 0;
export const notu32 = (a: number) => ~a >>> 0;
// prettier-ignore
export const lshiftu32 = (a: number, b: number) => ((a >>> 0) << (b >>> 0)) >>> 0;
// prettier-ignore
export const rshiftu32 = (a: number, b: number) => ((a >>> 0) >>> (b >>> 0)) >>> 0;
