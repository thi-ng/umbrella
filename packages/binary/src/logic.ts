import type { FnN, FnN2, FnN3, FnN4, FnN5, FnU3, FnU4 } from "@thi.ng/api";
import { maskL } from "./mask";

export const bitNot: FnN = (x) => ~x;

export const bitAnd: FnN2 = (a, b) => a & b;

export const bitNand: FnN2 = (a, b) => ~(a & b);

export const bitOr: FnN2 = (a, b) => a | b;

export const bitNor: FnN2 = (a, b) => ~(a | b);

export const bitXor: FnN2 = (a, b) => a ^ b;

export const bitXnor: FnN2 = (a, b) => ~(a ^ b);

export const bitImply: FnN2 = (a, b) => ~a | b;

export const bitAoi21: FnN3 = (a, b, c) => ~(a | (b & c));

export const bitOai21: FnN3 = (a, b, c) => ~(a & (b | c));

export const bitAoi22: FnN4 = (a, b, c, d) => ~((a & b) | (c & d));

export const bitOai22: FnN4 = (a, b, c, d) => ~((a | b) & (c | d));

export const bitMux: FnN3 = (a, b, s) => ((a & ~s) | (b & s)) >>> 0;

export const bitDemux: FnU3<number, [number, number]> = (a, b, s) => [
    (a & ~s) >>> 0,
    (b & s) >>> 0,
];

export const bitNotM: FnN2 = (n, x) => maskL(n, ~x);

export const bitAndM: FnN3 = (n, a, b) => maskL(n, a & b);

export const bitNandM: FnN3 = (n, a, b) => maskL(n, ~(a & b));

export const bitOrM: FnN3 = (n, a, b) => maskL(n, a | b);

export const bitNorM: FnN3 = (n, a, b) => maskL(n, ~(a | b));

export const bitXorM: FnN3 = (n, a, b) => maskL(n, a ^ b);

export const bitXnorM: FnN3 = (n, a, b) => maskL(n, ~(a ^ b));

export const bitImplyM: FnN3 = (n, a, b) => maskL(n, ~a | b);

export const bitAoi21M: FnN4 = (n, a, b, c) => maskL(n, ~(a | (b & c)));

export const bitOai21M: FnN4 = (n, a, b, c) => maskL(n, ~(a & (b | c)));

export const bitAoi22M: FnN5 = (n, a, b, c, d) =>
    maskL(n, ~((a & b) | (c & d)));

export const bitOai22M: FnN5 = (n, a, b, c, d) =>
    maskL(n, ~((a | b) & (c | d)));

export const bitMuxM: FnN4 = (n, a, b, s) => maskL(n, (a & ~s) | (b & s));

export const bitDemuxM: FnU4<number, [number, number]> = (n, a, b, s) => [
    maskL(n, a & ~s),
    maskL(n, b & s),
];
