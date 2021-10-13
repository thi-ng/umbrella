import type { Fn, FnU2 } from "@thi.ng/api";
import type { Template } from "../api.js";

type HOFTpl = Fn<string, Template>;
type HOFTpl2 = FnU2<string, Template>;

/** @internal */
export const ARGS_V = "o,a";
/** @internal */
export const ARGS_VV = "o,a,b";
/** @internal */
export const ARGS_VVV = "o,a,b,c";
/** @internal */
export const ARGS_VN = "o,a,n";
/** @internal */
export const ARGS_VNV = "o,a,n,b";
/** @internal */
export const ARGS_VVN = "o,a,b,n";

/** @internal */
export const SARGS_V = "io=0,ia=0,so=1,sa=1";
/** @internal */
export const SARGS_VV = "io=0,ia=0,ib=0,so=1,sa=1,sb=1";
/** @internal */
export const SARGS_VVV = "io=0,ia=0,ib=0,ic=0,so=1,sa=1,sb=1,sc=1";

/** @internal */
export const DEFAULT_OUT = "!o&&(o=a);";
/** @internal */
export const NEW_OUT = "!o&&(o=[]);";

/** @internal */
// prettier-ignore
export const MATH: HOFTpl = (op) => ([o, a, b]) => `${o}=${a}${op}${b};`;
/** @internal */
// prettier-ignore
export const MATH_N: HOFTpl = (op) => ([o, a]) => `${o}=${a}${op}n;`;
/** @internal */
// prettier-ignore
export const MATH2: HOFTpl2 = (op1, op2) => ([o, a, b, c]) => `${o}=(${a}${op1}${b})${op2}${c};`;
/** @internal */
// prettier-ignore
export const MATH2_N: HOFTpl2 = (op1, op2) => ([o, a, b]) => `${o}=(${a}${op1}${b})${op2}n;`;
/** @internal */
// prettier-ignore
export const MATH2A_N: HOFTpl2 = (op1, op2) => ([o, a, b]) => `${o}=(${a}${op1}n)${op2}${b};`;
/** @internal */
// prettier-ignore
export const SIGNED: HOFTpl = (op) => ([o, a, b]) => `${o}=(${a}${op}${b})|0;`;
/** @internal */
// prettier-ignore
export const UNSIGNED: HOFTpl = (op) => ([o, a, b]) => `${o}=(${a}${op}${b})>>>0;`;
/** @internal */
// prettier-ignore
export const SIGNED_N: HOFTpl = (op) => ([o, a]) => `${o}=(${a}${op}n)|0;`;
/** @internal */
// prettier-ignore
export const UNSIGNED_N: HOFTpl = (op) => ([o, a]) => `${o}=(${a}${op}n)>>>0;`;
/** @internal */
// prettier-ignore
export const FN = (op="op"): Template => ([o, a]) => `${o}=${op}(${a});`;
/** @internal */
// prettier-ignore
export const FN2 = (op="op"): Template => ([o, a, b]) => `${o}=${op}(${a},${b});`;
/** @internal */
// prettier-ignore
export const FN3 = (op="op"): Template => ([o, a, b, c]) => `${o}=${op}(${a},${b},${c});`;
/** @internal */
// prettier-ignore
export const FN5 = (op = "op"): Template => ([o, a, b, c, d, e]) => `${o}=${op}(${a},${b},${c},${d},${e});`;
/** @internal */
// prettier-ignore
export const FN_N = (op="op"): Template => ([o, a]) => `${o}=${op}(${a},n);`;

/** @internal */
export const DOT: Template = ([a, b]) => `${a}*${b}`;
/** @internal */
export const DOT_G: Template = ([a, b]) => `s+=${a}*${b};`;
/** @internal */
export const SET: Template = ([o, a]) => `${o}=${a};`;
/** @internal */
export const SET_N: Template = ([a]) => `${a}=n;`;

/** @internal */
export const MIX: Template = ([o, a, b, c]) => `${o}=${a}+(${b}-${a})*${c};`;
/** @internal */
export const MIX_N: Template = ([o, a, b]) => `${o}=${a}+(${b}-${a})*n;`;
