import { IRandom, SYSTEM } from "@thi.ng/random";
import { ReadonlyVec, VecOpSOO, VecOpSOOO, VecOpSVO } from "./api";
import { defHofOpS, SARGS_VV } from "./internal/codegen";
import { normalizeS2, normalizeS3, normalizeS4 } from "./normalizes";

/**
 * Randomizes `v` with each component in interval `[n..m)`. If no `rnd`
 * instance is given, uses {@link @thi.ng/random#SYSTEM}, i.e.
 * `Math.random`.
 *
 * @param v -
 * @param n - default -1
 * @param m - default 1
 * @param rnd -
 * @param ia -
 * @param sa -
 */
export const [randomS2, randomS3, randomS4] = defHofOpS<
    VecOpSOOO<number, number, IRandom>
>(
    SYSTEM,
    ([a]) => `${a}=rnd.minmax(n,m);`,
    "a,n=-1,m=1,rnd=op,ia=0,sa=1",
    "a",
    "a",
    "!a && (a=[]);"
);

const $norm = (
    normalize: VecOpSVO<number>,
    random: VecOpSOOO<number, number, IRandom>
): VecOpSOO<number, IRandom> => (a, n = 1, rnd?, ia = 0, sa = 1) =>
    normalize((a = random(a, -1, 1, rnd, ia, sa)), a, n, ia, ia, sa, sa);

/**
 * Sets `v` to random vector, normalized to length `n` (default: 1). If
 * no `rnd` instance is given, uses {@link @thi.ng/random#SYSTEM}, i.e.
 * `Math.random`.
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
export const randNormS2 = $norm(normalizeS2, randomS2);

export const randNormS3 = $norm(normalizeS3, randomS3);

export const randNormS4 = $norm(normalizeS4, randomS4);

/**
 * Sets `out` to random vector with each component in the semi-open
 * interval defined by [min,max).
 *
 * @param out -
 * @param min -
 * @param max -
 * @param rnd -
 */
export const [randMinMaxS2, randMinMaxS3, randMinMaxS4] = defHofOpS<
    VecOpSOOO<ReadonlyVec, ReadonlyVec, IRandom>
>(
    SYSTEM,
    ([o, a, b]) => `${o}=rnd.minmax(${a},${b});`,
    `o,a,b,rnd=op,${SARGS_VV}`,
    "o,a,b"
);
