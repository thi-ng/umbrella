import { EPS } from "./api";

/**
 * Checks if `|a - b| <= ε`.
 *
 * @param a left value
 * @param b right value
 * @param eps epsilon / tolerance
 */
export const eqDelta = (a: number, b: number, eps = EPS) => {
    const d = a - b;
    return (d < 0 ? -d : d) <= eps;
};
