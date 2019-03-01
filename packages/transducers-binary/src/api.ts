export const enum Type {
    I8,
    I8_ARRAY,
    U8,
    U8_ARRAY,
    I16,
    I16_ARRAY,
    U16,
    U16_ARRAY,
    I32,
    I32_ARRAY,
    U32,
    U32_ARRAY,
    F32,
    F32_ARRAY,
    F64,
    F64_ARRAY,
    STR
}

export type BinStructItem =
    | [Type.I8, number]
    | [Type.I8_ARRAY, ArrayLike<number>]
    | [Type.U8, number]
    | [Type.U8_ARRAY, ArrayLike<number>]
    | [Type.I16, number, boolean?]
    | [Type.I16_ARRAY, ArrayLike<number>, boolean?]
    | [Type.U16, number, boolean?]
    | [Type.U16_ARRAY, ArrayLike<number>, boolean?]
    | [Type.I32, number, boolean?]
    | [Type.I32_ARRAY, ArrayLike<number>, boolean?]
    | [Type.U32, number, boolean?]
    | [Type.U32_ARRAY, ArrayLike<number>, boolean?]
    | [Type.F32, number, boolean?]
    | [Type.F32_ARRAY, ArrayLike<number>, boolean?]
    | [Type.F64, number, boolean?]
    | [Type.F64_ARRAY, ArrayLike<number>, boolean?]
    | [Type.STR, string];

export interface HexDumpOpts {
    /**
     * Number of bytes per line.
     * Default: 16
     */
    cols: number;
    /**
     * Start address.
     * Default: 0
     */
    address: number;
}
