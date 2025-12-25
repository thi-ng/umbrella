// SPDX-License-Identifier: Apache-2.0
// thing:no-export
export const F64 = new Float64Array(1);
export const F32 = new Float32Array(F64.buffer);

export const I8 = new Int8Array(F64.buffer);
export const U8 = new Uint8Array(F64.buffer);

export const I16 = new Int16Array(F64.buffer);
export const U16 = new Uint16Array(F64.buffer);

export const I32 = new Int32Array(F64.buffer);
export const U32 = new Uint32Array(F64.buffer);

export const I64 = new BigInt64Array(F64.buffer);
export const U64 = new BigUint64Array(F64.buffer);
