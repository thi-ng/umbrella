export type Range = [number, number];

export type Range0_1 = 0 | 1;

export type Range0_3 = Range0_1 | 2 | 3;

export type Range0_7 = Range0_3 | Range4_7;

export type Range0_15 = Range0_7 | Range8_15;

export type Range0_23 = Range0_15 | Range16_23;

export type Range0_31 = Range0_15 | Range16_31;

export type Range0_47 = Range0_31 | Range32_47;

export type Range0_63 = Range0_31 | Range32_63;

export type Range1_2 = 1 | 2;

export type Range1_4 = Range1_2 | 3 | 4;

export type Range1_8 = Range1_4 | Range4_7 | 8;

export type Range1_16 = Range1_8 | Range8_15 | 16;

export type Range1_24 = Range1_16 | Range16_23 | 24;

export type Range1_32 = Range1_16 | Range16_31 | 32;

export type Range1_48 = Range1_32 | Range32_47 | 48;

export type Range1_64 = Range1_32 | Range32_63 | 64;

export type Range4_7 = 4 | 5 | 6 | 7;

export type Range8_15 = 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type Range16_23 = 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;

export type Range16_31 = Range16_23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

// prettier-ignore
export type Range32_47 =
    | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47;

// prettier-ignore
export type Range48_63 =
    | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63;

export type Range32_63 = Range32_47 | Range48_63;

/**
 * Type LUT of allowed range values `[0..n)` for given range size `n`.
 *
 * @example
 * ```
 * RangeValueMap[4] -> 0 | 1 | 2 | 3
 * ```
 */
export interface RangeValueMap {
    1: 0;
    2: Range0_1;
    3: Range0_1 | 2;
    4: Range0_3;
    5: Range0_3 | 4;
    6: Range0_3 | 4 | 5;
    7: Range0_3 | 4 | 5 | 6;
    8: Range0_7;
    9: Range0_7 | 8;
    10: Range0_7 | 8 | 9;
    11: Range0_7 | 8 | 9 | 10;
    12: Range0_7 | 8 | 9 | 10 | 11;
    13: Range0_7 | 8 | 9 | 10 | 11 | 12;
    14: Range0_7 | 8 | 9 | 10 | 11 | 12 | 13;
    15: Range0_7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    16: Range0_15;
    17: Range0_15 | 16;
    18: Range0_15 | 16 | 17;
    19: Range0_15 | 16 | 17 | 18;
    20: Range0_15 | 16 | 17 | 18 | 19;
    21: Range0_15 | 16 | 17 | 18 | 19 | 20;
    22: Range0_15 | 16 | 17 | 18 | 19 | 20 | 21;
    23: Range0_15 | 16 | 17 | 18 | 19 | 20 | 21 | 22;
    24: Range0_15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
    25: Exclude<Range0_31, 25 | 26 | 27 | 28 | 29 | 30 | 31>;
    26: Exclude<Range0_31, 26 | 27 | 28 | 29 | 30 | 31>;
    27: Exclude<Range0_31, 27 | 28 | 29 | 30 | 31>;
    28: Exclude<Range0_31, 28 | 29 | 30 | 31>;
    29: Exclude<Range0_31, 29 | 30 | 31>;
    30: Exclude<Range0_31, 30 | 31>;
    31: Exclude<Range0_31, 31>;
    32: Range0_31;
    33: Range0_31 | 32;
    34: Range0_31 | 32 | 33;
    35: Range0_31 | 32 | 33 | 34;
    36: Range0_31 | 32 | 33 | 34 | 35;
    37: Range0_31 | 32 | 33 | 34 | 35 | 36;
    38: Range0_31 | 32 | 33 | 34 | 35 | 36 | 37;
    39: Range0_31 | 32 | 33 | 34 | 35 | 36 | 37 | 38;
    40: Range0_31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39;
    41: Exclude<Range0_47, 41 | 42 | 43 | 44 | 45 | 46 | 47>;
    42: Exclude<Range0_47, 42 | 43 | 44 | 45 | 46 | 47>;
    43: Exclude<Range0_47, 43 | 44 | 45 | 46 | 47>;
    44: Exclude<Range0_47, 44 | 45 | 46 | 47>;
    45: Exclude<Range0_47, 45 | 46 | 47>;
    46: Exclude<Range0_47, 46 | 47>;
    47: Exclude<Range0_47, 47>;
    48: Range0_47;
    49: Range0_47 | 48;
    50: Range0_47 | 48 | 49;
    51: Range0_47 | 48 | 49 | 50;
    52: Range0_47 | 48 | 49 | 50 | 51;
    53: Range0_47 | 48 | 49 | 50 | 51 | 52;
    54: Range0_47 | 48 | 49 | 50 | 51 | 52 | 53;
    55: Range0_47 | 48 | 49 | 50 | 51 | 52 | 53 | 54;
    56: Range0_47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55;
    57: Exclude<Range0_63, 57 | 58 | 59 | 60 | 61 | 62 | 63>;
    58: Exclude<Range0_63, 58 | 59 | 60 | 61 | 62 | 63>;
    59: Exclude<Range0_63, 59 | 60 | 61 | 62 | 63>;
    60: Exclude<Range0_63, 60 | 61 | 62 | 63>;
    61: Exclude<Range0_63, 61 | 62 | 63>;
    62: Exclude<Range0_63, 62 | 63>;
    63: Exclude<Range0_63, 63>;
    64: Range0_63;
}
