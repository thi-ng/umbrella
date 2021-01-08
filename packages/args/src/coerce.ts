import { isHex, isNumericFloat, isNumericInt } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";

export const coerceFloat = (x: string) =>
    isNumericFloat(x)
        ? parseFloat(x)
        : illegalArgs(`not a numeric value: ${x}`);

export const coerceFloats = (xs: string[]) => xs.map(coerceFloat);

export const coerceHexInt = (x: string) =>
    isHex(x) ? parseInt(x, 16) : illegalArgs(`not a hex value: ${x}`);

export const coerceHexInts = (xs: string[]) => xs.map(coerceHexInt);

export const coerceInt = (x: string) =>
    isNumericInt(x) ? parseInt(x) : illegalArgs(`not an integer: ${x}`);

export const coerceInts = (xs: string[]) => xs.map(coerceInt);

export const coerceJson = <T>(x: string): T => JSON.parse(x);

export const coerceOneOf = <K extends string>(xs: readonly K[]) => (
    x: string
) => (xs.includes(<K>x) ? <K>x : illegalArgs(`invalid option: ${x}`));
