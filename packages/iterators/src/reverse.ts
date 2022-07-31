export function* reverse<T>(input: Iterable<T>) {
	if (!(input.constructor === Array || (<T[]>input).length !== undefined)) {
		input = [...input];
	}
	let n = (<T[]>input).length;
	while (n-- > 0) {
		yield (<any>input)[n];
	}
}
