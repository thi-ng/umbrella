export const MATH = (op: string) => ([o, a, b]) => `${o}=${a}${op}${b};`
export const MATH_N = (op: string) => ([o, a]) => `${o}=${a}${op}n;`
export const FN = (op: string) => ([o, a]) => `${o}=${op}(${a});`
export const FN2 = (op: string) => ([o, a, b]) => `${o}=${op}(${a},${b});`
export const FN_N = (op: string) => ([o, a]) => `${o}=${op}(${a},n);`

export const DOT = ([a, b]) => `${a}*${b}`;
export const DOT_G = ([a, b]) => `s+=${a}*${b};`;
export const SET = ([o, a]) => `${o}=${a};`;
export const SET_N = ([a]) => `${a}=n;`

export const HOF_VVV = ([o, a, b, c]) => `${o}=op(${a},${b},${c});`;

export const ADDM = ([o, a, b, c]) => `${o}=(${a}+${b})*${c};`;
export const ADDM_N = ([o, a, b]) => `${o}=(${a}+${b})*n;`;
export const MADD = ([o, a, b, c]) => `${o}=${a}+${b}*${c};`;
export const MADD_N = ([o, a, b]) => `${o}=${a}+${b}*n;`;
export const MIX = ([o, a, b, c]) => `${o}=${a}+(${b}-${a})*${c};`;
export const MIX_N = ([o, a, b]) => `${o}=${a}+(${b}-${a})*n;`
export const SUBM = ([o, a, b, c]) => `${o}=(${a}-${b})*${c};`;
export const SUBM_N = ([o, a, b]) => `${o}=(${a}-${b})*n;`;
