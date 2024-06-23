export function* repeat<T>(x: T, n = Infinity) {
	while (n-- > 0) {
		yield x;
	}
}
