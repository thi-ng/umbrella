import { Template } from "../api";

export const MATH = (op: string): Template => ([o, a, b]) =>
    `${o}=${a}${op}${b};`;
export const MATH_N = (op: string): Template => ([o, a]) => `${o}=${a}${op}n;`;
export const FN = (op: string): Template => ([o, a]) => `${o}=${op}(${a});`;
export const FN2 = (op: string): Template => ([o, a, b]) =>
    `${o}=${op}(${a},${b});`;
export const FN_N = (op: string): Template => ([o, a]) => `${o}=${op}(${a},n);`;

export const DOT: Template = ([a, b]) => `${a}*${b}`;
export const DOT_G: Template = ([a, b]) => `s+=${a}*${b};`;
export const SET: Template = ([o, a]) => `${o}=${a};`;
export const SET_N: Template = ([a]) => `${a}=n;`;

export const HOF_V: Template = ([o, a]) => `${o}=op(${a});`;
export const HOF_VVV: Template = ([o, a, b, c]) => `${o}=op(${a},${b},${c});`;
export const HOF_VVVVV: Template = ([o, a, b, c, d, e]) =>
    `${o}=op(${a},${b},${c},${d},${e});`;

export const ADDM: Template = ([o, a, b, c]) => `${o}=(${a}+${b})*${c};`;
export const ADDM_N: Template = ([o, a, b]) => `${o}=(${a}+${b})*n;`;
export const MADD: Template = ([o, a, b, c]) => `${o}=${a}+${b}*${c};`;
export const MADD_N: Template = ([o, a, b]) => `${o}=${a}+${b}*n;`;
export const MIX: Template = ([o, a, b, c]) => `${o}=${a}+(${b}-${a})*${c};`;
export const MIX_N: Template = ([o, a, b]) => `${o}=${a}+(${b}-${a})*n;`;
export const SUBM: Template = ([o, a, b, c]) => `${o}=(${a}-${b})*${c};`;
export const SUBM_N: Template = ([o, a, b]) => `${o}=(${a}-${b})*n;`;
