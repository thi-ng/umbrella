import { clamp } from "@thi.ng/math";
import type { JSBuiltinsInt } from "../api";

export const INT: JSBuiltinsInt<number> = {
    abs: Math.abs,
    add: (a, b) => (a + b) | 0,
    bitand: (a, b) => a & b,
    bitnot1: (a) => ~a,
    bitor: (a, b) => a | b,
    bitxor: (a, b) => a ^ b,
    clamp,
    dec: (a) => (a - 1) | 0,
    div: (a, b) => (a / b) | 0,
    inc: (a) => (a + 1) | 0,
    lshift: (a, b) => a << b,
    max: Math.max,
    min: Math.min,
    modi: (a, b) => a % b,
    mul: (a, b) => (a * b) | 0,
    rshift: (a, b) => a >> b,
    sign: Math.sign,
    sub: (a, b) => (a - b) | 0,
    sub1: (a) => -a | 0,
};
