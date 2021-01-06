import { illegalArgs } from "@thi.ng/errors";

export const int = (xs: string) => parseInt(xs);

export const ints = (xs: string[]) => xs.map((x) => parseInt(x));

export const json = <T>(x: string): T => JSON.parse(x);

export const oneOf = (xs: string[]) => (x: string) =>
    xs.includes(x) ? x : illegalArgs(`invalid option: ${x}`);
