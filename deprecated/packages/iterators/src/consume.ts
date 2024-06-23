export const consume = (iter: Iterator<any>, n = Infinity) => {
	while (n-- > 0 && !iter.next().done) {}
	return iter;
};
