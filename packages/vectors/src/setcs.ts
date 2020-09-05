import type { Vec } from "./api";

export const setCS2 = (
    out: Vec | null,
    x: number,
    y: number,
    io = 0,
    so = 1
) => (!out && (out = []), (out[io] = x), (out[io + so] = y), out);

export const setCS3 = (
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

export const setCS4 = (
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
