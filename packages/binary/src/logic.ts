import { maskL } from "./mask";

export const bitNot = (n: number, x: number) =>
    maskL(n, ~x);

export const bitAnd = (n: number, a: number, b: number) =>
    maskL(n, a & b);

export const bitNand = (n: number, a: number, b: number) =>
    maskL(n, ~(a & b));

export const bitOr = (n: number, a: number, b: number) =>
    maskL(n, a | b);

export const bitNor = (n: number, a: number, b: number) =>
    maskL(n, ~(a & b));

export const bitXor = (n: number, a: number, b: number) =>
    maskL(n, a ^ b);

export const bitXnor = (n: number, a: number, b: number) =>
    maskL(n, ~(a ^ b));

export const bitImply = (n: number, a: number, b: number) =>
    maskL(n, (~a) | b);

export const bitAoi21 = (n: number, a: number, b: number, c: number) =>
    maskL(n, ~(a | (b & c)));

export const bitOai21 = (n: number, a: number, b: number, c: number) =>
    maskL(n, ~(a & (b | c)));

export const bitAoi22 = (n: number, a: number, b: number, c: number, d: number) =>
    maskL(n, ~((a & b) | (c & d)));

export const bitOai22 = (n: number, a: number, b: number, c: number, d: number) =>
    maskL(n, ~((a | b) & (c | d)));

export const bitMux = (n: number, a: number, b: number, s: number) =>
    maskL(n, (a & ~s) | (b & s));

export const bitDemux = (n: number, a: number, b: number, s: number): [number, number] =>
    [maskL(n, a & ~s), maskL(n, b & s)];
