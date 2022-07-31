/**
 * Computes mean square error of given array.
 *
 * @param window -
 * @param mean -
 */
export const mse = (window: number[], mean: number) => {
	let sum = 0;
	for (let i = window.length - 1; i >= 0; i--) {
		sum += Math.pow(window[i] - mean, 2);
	}
	return sum;
};
