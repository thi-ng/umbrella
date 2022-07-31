/**
 * Computes dot product of 2 arrays. Assumes `a` and `b` are equal
 * sized, but only considers length of `a`.
 *
 * @param a -
 * @param b -
 */
export const dot = (a: number[], b: number[]) => {
	let sum = 0;
	for (let i = a.length - 1; i >= 0; i--) {
		sum += a[i] * b[i];
	}
	return sum;
};
