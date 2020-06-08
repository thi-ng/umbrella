import { maskL } from "./mask";

export const bitNot = (x: number) => ~x;

export const bitAnd = (a: number, b: number) => a & b;

export const bitNand = (a: number, b: number) => ~(a & b);

export const bitOr = (a: number, b: number) => a | b;

export const bitNor = (a: number, b: number) => ~(a | b);

export const bitXor = (a: number, b: number) => a ^ b;

export const bitXnor = (a: number, b: number) => ~(a ^ b);

export const bitImply = (a: number, b: number) => ~a | b;

export const bitAoi21 = (a: number, b: number, c: number) => ~(a | (b & c));

export const bitOai21 = (a: number, b: number, c: number) => ~(a & (b | c));

export const bitAoi22 = (a: number, b: number, c: number, d: number) =>
    ~((a & b) | (c & d));

export const bitOai22 = (a: number, b: number, c: number, d: number) =>
    ~((a | b) & (c | d));

export const bitMux = (a: number, b: number, s: number) =>
    ((a & ~s) | (b & s)) >>> 0;

export const bitDemux = (a: number, b: number, s: number): [number, number] => [
    (a & ~s) >>> 0,
    (b & s) >>> 0,
];

export const bitNotM = (n: number, x: number) => maskL(n, ~x);

export const bitAndM = (n: number, a: number, b: number) => maskL(n, a & b);

export const bitNandM = (n: number, a: number, b: number) => maskL(n, ~(a & b));

export const bitOrM = (n: number, a: number, b: number) => maskL(n, a | b);

export const bitNorM = (n: number, a: number, b: number) => maskL(n, ~(a | b));

export const bitXorM = (n: number, a: number, b: number) => maskL(n, a ^ b);

export const bitXnorM = (n: number, a: number, b: number) => maskL(n, ~(a ^ b));

export const bitImplyM = (n: number, a: number, b: number) => maskL(n, ~a | b);

export const bitAoi21M = (n: number, a: number, b: number, c: number) =>
    maskL(n, ~(a | (b & c)));

export const bitOai21M = (n: number, a: number, b: number, c: number) =>
    maskL(n, ~(a & (b | c)));

export const bitAoi22M = (
    n: number,
    a: number,
    b: number,
    c: number,
    d: number
) => maskL(n, ~((a & b) | (c & d)));

export const bitOai22M = (
    n: number,
    a: number,
    b: number,
    c: number,
    d: number
) => maskL(n, ~((a | b) & (c | d)));

export const bitMuxM = (n: number, a: number, b: number, s: number) =>
    maskL(n, (a & ~s) | (b & s));

export const bitDemuxM = (
    n: number,
    a: number,
    b: number,
    s: number
): [number, number] => [maskL(n, a & ~s), maskL(n, b & s)];
