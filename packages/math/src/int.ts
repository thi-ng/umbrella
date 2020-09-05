import type { FnN, FnN2 } from "@thi.ng/api";

const M8 = 0xff;
const M16 = 0xffff;

export const signExtend8: FnN = (a) => ((a &= M8), a & 0x80 ? a | ~M8 : a);
export const signExtend16: FnN = (a) => ((a &= M16), a & 0x8000 ? a | ~M16 : a);

export const addi8: FnN2 = (a, b) => signExtend8((a | 0) + (b | 0));
export const divi8: FnN2 = (a, b) => signExtend8((a | 0) / (b | 0));
export const muli8: FnN2 = (a, b) => signExtend8((a | 0) * (b | 0));
export const subi8: FnN2 = (a, b) => signExtend8((a | 0) - (b | 0));
export const andi8: FnN2 = (a, b) => signExtend8((a | 0) & (b | 0));
export const ori8: FnN2 = (a, b) => signExtend8(a | 0 | (b | 0));
export const xori8: FnN2 = (a, b) => signExtend8((a | 0) ^ (b | 0));
export const noti8: FnN = (a) => signExtend8(~a);
export const lshifti8: FnN2 = (a, b) => signExtend8((a | 0) << (b | 0));
export const rshifti8: FnN2 = (a, b) => signExtend8((a | 0) >> (b | 0));

export const addi16: FnN2 = (a, b) => signExtend16((a | 0) + (b | 0));
export const divi16: FnN2 = (a, b) => signExtend16((a | 0) / (b | 0));
export const muli16: FnN2 = (a, b) => signExtend16((a | 0) * (b | 0));
export const subi16: FnN2 = (a, b) => signExtend16((a | 0) - (b | 0));
export const andi16: FnN2 = (a, b) => signExtend16((a | 0) & (b | 0));
export const ori16: FnN2 = (a, b) => signExtend16(a | 0 | (b | 0));
export const xori16: FnN2 = (a, b) => signExtend16((a | 0) ^ (b | 0));
export const noti16: FnN = (a) => signExtend16(~a);
export const lshifti16: FnN2 = (a, b) => signExtend16((a | 0) << (b | 0));
export const rshifti16: FnN2 = (a, b) => signExtend16((a | 0) >> (b | 0));

export const addi32: FnN2 = (a, b) => ((a | 0) + (b | 0)) | 0;
export const divi32: FnN2 = (a, b) => ((a | 0) / (b | 0)) | 0;
export const muli32: FnN2 = (a, b) => ((a | 0) * (b | 0)) | 0;
export const subi32: FnN2 = (a, b) => ((a | 0) - (b | 0)) | 0;
export const andi32: FnN2 = (a, b) => (a | 0) & (b | 0);
export const ori32: FnN2 = (a, b) => a | 0 | (b | 0);
export const xori32: FnN2 = (a, b) => (a | 0) ^ (b | 0);
export const lshifti32: FnN2 = (a, b) => (a | 0) << (b | 0);
export const rshifti32: FnN2 = (a, b) => (a | 0) >> (b | 0);
export const noti32: FnN = (a) => ~a;

export const addu8: FnN2 = (a, b) => ((a & M8) + (b & M8)) & M8;
export const divu8: FnN2 = (a, b) => ((a & M8) / (b & M8)) & M8;
export const mulu8: FnN2 = (a, b) => ((a & M8) * (b & M8)) & M8;
export const subu8: FnN2 = (a, b) => ((a & M8) - (b & M8)) & M8;
export const andu8: FnN2 = (a, b) => a & M8 & (b & M8) & M8;
export const oru8: FnN2 = (a, b) => ((a & M8) | (b & M8)) & M8;
export const xoru8: FnN2 = (a, b) => ((a & M8) ^ (b & M8)) & M8;
export const notu8: FnN = (a) => ~a & M8;
export const lshiftu8: FnN2 = (a, b) => ((a & M8) << (b & M8)) & M8;
export const rshiftu8: FnN2 = (a, b) => ((a & M8) >>> (b & M8)) & M8;

export const addu16: FnN2 = (a, b) => ((a & M16) + (b & M16)) & M16;
export const divu16: FnN2 = (a, b) => ((a & M16) / (b & M16)) & M16;
export const mulu16: FnN2 = (a, b) => ((a & M16) * (b & M16)) & M16;
export const subu16: FnN2 = (a, b) => ((a & M16) - (b & M16)) & M16;
export const andu16: FnN2 = (a, b) => a & M16 & (b & M16) & M16;
export const oru16: FnN2 = (a, b) => ((a & M16) | (b & M16)) & M16;
export const xoru16: FnN2 = (a, b) => ((a & M16) ^ (b & M16)) & M16;
export const notu16: FnN = (a) => ~a & M16;
export const lshiftu16: FnN2 = (a, b) => ((a & M16) << (b & M16)) & M16;
export const rshiftu16: FnN2 = (a, b) => ((a & M16) >>> (b & M16)) & M16;

export const addu32: FnN2 = (a, b) => ((a >>> 0) + (b >>> 0)) >>> 0;
export const divu32: FnN2 = (a, b) => ((a >>> 0) / (b >>> 0)) >>> 0;
export const mulu32: FnN2 = (a, b) => ((a >>> 0) * (b >>> 0)) >>> 0;
export const subu32: FnN2 = (a, b) => ((a >>> 0) - (b >>> 0)) >>> 0;
export const andu32: FnN2 = (a, b) => ((a >>> 0) & (b >>> 0)) >>> 0;
export const oru32: FnN2 = (a, b) => ((a >>> 0) | (b >>> 0)) >>> 0;
export const xoru32: FnN2 = (a, b) => ((a >>> 0) ^ (b >>> 0)) >>> 0;
export const notu32: FnN = (a) => ~a >>> 0;
export const lshiftu32: FnN2 = (a, b) => ((a >>> 0) << (b >>> 0)) >>> 0;
export const rshiftu32: FnN2 = (a, b) => ((a >>> 0) >>> (b >>> 0)) >>> 0;
