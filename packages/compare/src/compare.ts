export const compare = (a: any, b: any): number => {
	if (a === b) {
		return 0;
	}
	if (a == null) {
		return b == null ? 0 : -1;
	}
	if (b == null) {
		return a == null ? 0 : 1;
	}
	if (typeof a.compare === "function") {
		return a.compare(b);
	}
	if (typeof b.compare === "function") {
		return -b.compare(a);
	}
	return a < b ? -1 : a > b ? 1 : 0;
};
