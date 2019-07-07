import { Template } from "../api";

// prettier-ignore
export const MATH = (op: string): Template => ([o, a, b]) => `${o}=${a}${op}${b};`;
// prettier-ignore
export const MATH_N = (op: string): Template => ([o, a]) => `${o}=${a}${op}n;`;
// prettier-ignore
export const SIGNED = (op: string): Template => ([o, a, b]) => `${o}=(${a}${op}${b})|0;`;
// prettier-ignore
export const UNSIGNED = (op: string): Template => ([o, a, b]) => `${o}=(${a}${op}${b})>>>0;`;
// prettier-ignore
export const SIGNED_N = (op: string): Template => ([o, a]) => `${o}=(${a}${op}n)|0;`;
// prettier-ignore
export const UNSIGNED_N = (op: string): Template => ([o, a]) => `${o}=(${a}${op}n)>>>0;`;
// prettier-ignore
export const FN = (op="op"): Template => ([o, a]) => `${o}=${op}(${a});`;
// prettier-ignore
export const FN2 = (op="op"): Template => ([o, a, b]) => `${o}=${op}(${a},${b});`;
// prettier-ignore
export const FN3 = (op="op"): Template => ([o, a, b, c]) => `${o}=${op}(${a},${b},${c});`;
// prettier-ignore
export const FN5 = (op = "op"): Template => ([o, a, b, c, d, e]) => `${o}=${op}(${a},${b},${c},${d},${e});`;
// prettier-ignore
export const FN_N = (op="op"): Template => ([o, a]) => `${o}=${op}(${a},n);`;

export const DOT: Template = ([a, b]) => `${a}*${b}`;
export const DOT_G: Template = ([a, b]) => `s+=${a}*${b};`;
export const SET: Template = ([o, a]) => `${o}=${a};`;
export const SET_N: Template = ([a]) => `${a}=n;`;

export const ADDM: Template = ([o, a, b, c]) => `${o}=(${a}+${b})*${c};`;
export const ADDM_N: Template = ([o, a, b]) => `${o}=(${a}+${b})*n;`;
export const MADD: Template = ([o, a, b, c]) => `${o}=${a}*${b}+${c};`;
export const MADD_N: Template = ([o, a, b]) => `${o}=${a}*n+${b};`;
export const MIX: Template = ([o, a, b, c]) => `${o}=${a}+(${b}-${a})*${c};`;
export const MIX_N: Template = ([o, a, b]) => `${o}=${a}+(${b}-${a})*n;`;
export const SUBM: Template = ([o, a, b, c]) => `${o}=(${a}-${b})*${c};`;
export const SUBM_N: Template = ([o, a, b]) => `${o}=(${a}-${b})*n;`;
