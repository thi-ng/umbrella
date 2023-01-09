/**
 * Computes factorial for `n`. Throws an error if `n < 0`.
 *
 * @param n
 */
export const factorial = (n: number) => {
	if (n < 0) throw new Error(`illegal argument: ${n}`);
	let res = 1;
	for (let i = 1; i <= n; i++) res *= i;
	return res;
};

/**
 * Computes `n ** k`
 *
 * @param n number of choices
 * @param k number of selected
 */
export const permutationsWithRep = (n: number, k: number) => n ** k;

/**
 * Computes `n! / (n - k)!`
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Permutation#k-permutations_of_n
 *
 * @param n number of choices
 * @param k number of selected
 */
export const permutationsWithoutRep = (n: number, k: number) =>
	factorial(n) / factorial(n - k);

/**
 * Computes `(n + k - 1)! / (k! * (n - 1)!)`
 *
 * @param n number of choices
 * @param k number of selected
 */
export const combinationsWithRep = (n: number, k: number) =>
	factorial(n + k - 1) / (factorial(k) * factorial(n - 1));

/**
 * Computes `n! / (k! * (n - k)!)`
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Combination#Number_of_k-combinations
 *
 * @param n number of choices
 * @param k number of selected
 */
export const combinationsWithoutRep = (n: number, k: number) =>
	factorial(n) / (factorial(k) * factorial(n - k));
