export const MATH = (op: string) => ([o, a, b]) => `${o}=${a}${op}${b};`
export const MATH_N = (op: string) => ([o, a]) => `${o}=${a}${op}n;`
export const FN = (op: string) => ([o, a]) => `${o}=${op}(${a});`

export const DOT = ([a, b]) => `${a}*${b}`;
export const DOT_G = ([a, b]) => `sum+=${a}*${b};`;
export const SET = ([o, a]) => `${o}=${a};`;
export const SET_N = ([a]) => `${a}=n;`
