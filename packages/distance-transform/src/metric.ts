import type { DTMetric } from "./api.js";

export const EUCLEDIAN_SQ: DTMetric = {
    dist: (x, i, gi) => (x - i) * (x - i) + gi * gi,
    sep: (i, u, gi, gu) =>
        Math.floor((u * u - i * i + gu * gu - gi * gi) / (2 * (u - i))),
};

export const EUCLEDIAN: DTMetric = {
    ...EUCLEDIAN_SQ,
    post: Math.sqrt,
};

export const MANHATTAN: DTMetric = {
    dist: (x, i, gi) => Math.abs(x - i) + gi,
    sep: (i, u, gi, gu) =>
        gu >= gi + u - i
            ? Infinity
            : gi > gu + u - i
            ? -Infinity
            : Math.floor((gu - gi + u + i) / 2),
};

export const CHEBYSHEV: DTMetric = {
    dist: (x, i, gi) => Math.max(Math.abs(x - i), gi),
    sep: (i, u, gi, gu) =>
        gi <= gu
            ? Math.max(i + gu, (i + u) >> 1)
            : Math.min(u - gi, (i + u) >> 1),
};
