/**
 * Computes min / max values of given array.
 *
 * @param window -
 */
export const bounds = (window: number[]) => {
	let min = window[0];
	let max = min;
	for (let i = window.length - 1; i > 0; i--) {
		const v = window[i];
		min = Math.min(min, v);
		max = Math.max(max, v);
	}
	return [min, max];
};
