import type { VecOpSGN, VecOpSN } from "./api.js";

/**
 * Sets all components of nD strided vector to scalar value `n`.
 *
 * @param out - output vector
 * @param n - scalar
 * @param size - scalar
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const setNS: VecOpSGN = (o, n, size, io = 0, so = 1) => {
	!o && (o = []);
	while (size-- > 0) o[io + size * so] = n;
	return o;
};

/**
 * Sets all components of 2D strided vector to scalar value `n`.
 *
 * @param out - output vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const setNS2: VecOpSN = (o, n, io = 0, so = 1) => {
	!o && (o = []);
	o[io] = n;
	o[io + so] = n;
	return o;
};

/**
 * Sets all components of 3D strided vector to scalar value `n`.
 *
 * @param out - output vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const setNS3: VecOpSN = (o, n, io = 0, so = 1) => {
	!o && (o = []);
	o[io] = n;
	o[io + so] = n;
	o[io + 2 * so] = n;
	return o;
};

/**
 * Sets all components of 4D strided vector to scalar value `n`.
 *
 * @param out - output vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const setNS4: VecOpSN = (o, n, io = 0, so = 1) => {
	!o && (o = []);
	o[io] = n;
	o[io + so] = n;
	o[io + 2 * so] = n;
	o[io + 3 * so] = n;
	return o;
};
