const OBJP = Object.getPrototypeOf({});
const FN = "function";
const STR = "string";

export const equiv = (a: any, b: any): boolean => {
	let proto;
	if (a === b) {
		return true;
	}
	if (a != null) {
		if (typeof a.equiv === FN) {
			return a.equiv(b);
		}
	} else {
		return a == b;
	}
	if (b != null) {
		if (typeof b.equiv === FN) {
			return b.equiv(a);
		}
	} else {
		return a == b;
	}
	if (typeof a === STR || typeof b === STR) {
		return false;
	}
	if (
		((proto = Object.getPrototypeOf(a)), proto == null || proto === OBJP) &&
		((proto = Object.getPrototypeOf(b)), proto == null || proto === OBJP)
	) {
		return equivObject(a, b);
	}
	if (
		typeof a !== FN &&
		a.length !== undefined &&
		typeof b !== FN &&
		b.length !== undefined
	) {
		return equivArrayLike(a, b);
	}
	if (a instanceof Set && b instanceof Set) {
		return equivSet(a, b);
	}
	if (a instanceof Map && b instanceof Map) {
		return equivMap(a, b);
	}
	if (a instanceof Date && b instanceof Date) {
		return a.getTime() === b.getTime();
	}
	if (a instanceof RegExp && b instanceof RegExp) {
		return a.toString() === b.toString();
	}
	// NaN
	return a !== a && b !== b;
};

export const equivArrayLike = (
	a: ArrayLike<any>,
	b: ArrayLike<any>,
	_equiv = equiv
) => {
	let l = a.length;
	if (l === b.length) {
		while (l-- > 0 && _equiv(a[l], b[l]));
	}
	return l < 0;
};

export const equivSet = (a: Set<any>, b: Set<any>, _equiv = equiv) =>
	a.size === b.size && _equiv([...a.keys()].sort(), [...b.keys()].sort());

export const equivMap = (a: Map<any, any>, b: Map<any, any>, _equiv = equiv) =>
	a.size === b.size && _equiv([...a].sort(), [...b].sort());

export const equivObject = (a: any, b: any, _equiv = equiv) => {
	if (Object.keys(a).length !== Object.keys(b).length) {
		return false;
	}
	for (let k in a) {
		if (!b.hasOwnProperty(k) || !_equiv(a[k], b[k])) {
			return false;
		}
	}
	return true;
};
