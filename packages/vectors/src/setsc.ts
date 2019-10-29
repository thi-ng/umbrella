import { Vec } from "./api";

export const setSC2 = (
    out: Vec | null,
    x: number,
    y: number,
    io = 0,
    so = 1
) => (!out && (out = []), (out[io] = x), (out[io + so] = y), out);

export const setSC3 = (
    out: Vec | null,
    x: number,
    y: number,
    z: number,
    io = 0,
    so = 1
) => (
    !out && (out = []),
    (out[io] = x),
    (out[io + so] = y),
    (out[io + 2 * so] = z),
    out
);

export const setSC4 = (
    out: Vec | null,
    x: number,
    y: number,
    z: number,
    w: number,
    io = 0,
    so = 1
) => (
    !out && (out = []),
    (out[io] = x),
    (out[io + so] = y),
    (out[io + 2 * so] = z),
    (out[io + 3 * so] = w),
    out
);
