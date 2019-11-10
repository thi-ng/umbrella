export type Range0_1 = 0 | 1;

export type Range0_3 = Range0_1 | 2 | 3;

export type Range0_7 = Range0_3 | Range4_7;

export type Range0_15 = Range0_7 | Range8_15;

export type Range0_31 = Range0_15 | Range16_31;

export type Range0_63 = Range0_31 | Range32_63;

export type Range1_2 = 1 | 2;

export type Range1_4 = Range1_2 | 3 | 4;

export type Range1_8 = Range1_4 | Range4_7 | 8;

export type Range1_16 = Range1_8 | Range8_15 | 16;

export type Range1_32 = Range1_16 | Range16_31 | 32;

export type Range1_64 = Range1_32 | Range32_63 | 64;

export type Range4_7 = 4 | 5 | 6 | 7;

export type Range8_15 = 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

// prettier-ignore
export type Range16_31 =
    | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

// prettier-ignore
export type Range32_63 =
    | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47
    | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63;
