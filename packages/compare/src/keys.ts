import type { Comparator, Fn, Keys, Val1 } from "@thi.ng/api";
import { compare } from "./compare.js";

const getKey = (k: string | Fn<any, any>) =>
	typeof k === "function" ? k : (x: any) => x[k];

/**
 * HOF comparator. Returns new comparator to sort objects by given `key`
 * and with optional comparator `cmp` (default: {@link compare}).
 *
 * @param key -
 * @param cmp -
 */
export function compareByKey<T, K extends Keys<T>>(
	key: K,
	cmp?: Comparator<Val1<T, K>>
): Comparator<T>;
export function compareByKey<T, A>(
	a: Fn<T, A>,
	cmp?: Comparator<A>
): Comparator<T>;
export function compareByKey(
	key: string | Fn<any, any>,
	cmp: Comparator<any> = compare
): Comparator<any> {
	const kfn = getKey(key);
	return (x, y) => cmp(kfn(x), kfn(y));
}

/**
 * HOF comparator. Returns new comparator to sort objects by given keys
 * `a` (major), `b` (minor) and with optional comparators (default for
 * each: {@link compare}).
 *
 * @param major -
 * @param minor -
 * @param cmpA -
 * @param cmpB -
 */
export function compareByKeys2<T, A extends Keys<T>, B extends Keys<T>>(
	major: A,
	minor: B,
	cmpA?: Comparator<Val1<T, A>>,
	cmpB?: Comparator<Val1<T, B>>
): Comparator<T>;
export function compareByKeys2<T, A, B>(
	major: Fn<T, A>,
	minor: Fn<T, B>,
	cmpA?: Comparator<A>,
	cmpB?: Comparator<B>
): Comparator<T>;
export function compareByKeys2(
	a: string | Fn<any, any>,
	b: string | Fn<any, any>,
	cmpA: Comparator<any> = compare,
	cmpB: Comparator<any> = compare
): Comparator<any> {
	const ka = getKey(a);
	const kb = getKey(b);
	return (x, y) => {
		let res = cmpA(ka(x), ka(y));
		return res === 0 ? cmpB(kb(x), kb(y)) : res;
	};
}

/**
 * Same as {@link compareByKeys2}, but for 3 sort keys / comparators.
 *
 * @param major -
 * @param minor -
 * @param patch -
 * @param cmpA -
 * @param cmpB -
 * @param cmpC -
 */
export function compareByKeys3<
	T,
	A extends Keys<T>,
	B extends Keys<T>,
	C extends Keys<T>
>(
	major: A,
	minor: B,
	patch: C,
	cmpA?: Comparator<Val1<T, A>>,
	cmpB?: Comparator<Val1<T, B>>,
	cmpC?: Comparator<Val1<T, C>>
): Comparator<T>;
export function compareByKeys3<T, A, B, C>(
	major: Fn<T, A>,
	minor: Fn<T, B>,
	patch: Fn<T, C>,
	cmpA?: Comparator<A>,
	cmpB?: Comparator<B>,
	cmpC?: Comparator<C>
): Comparator<T>;
export function compareByKeys3(
	a: string | Fn<any, any>,
	b: string | Fn<any, any>,
	c: string | Fn<any, any>,
	cmpA: Comparator<any> = compare,
	cmpB: Comparator<any> = compare,
	cmpC: Comparator<any> = compare
): Comparator<any> {
	const ka = getKey(a);
	const kb = getKey(b);
	const kc = getKey(c);
	return (x, y) => {
		let res = cmpA(ka(x), ka(y));
		return res === 0
			? (res = cmpB(kb(x), kb(y))) === 0
				? cmpC(kc(x), kc(y))
				: res
			: res;
	};
}

/**
 * Same as {@link compareByKeys2}, but for 4 sort keys / comparators.
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param cmpA -
 * @param cmpB -
 * @param cmpC -
 * @param cmpD -
 */
export function compareByKeys4<
	T,
	A extends Keys<T>,
	B extends Keys<T>,
	C extends Keys<T>,
	D extends Keys<T>
>(
	a: A,
	b: B,
	c: C,
	d: D,
	cmpA?: Comparator<Val1<T, A>>,
	cmpB?: Comparator<Val1<T, B>>,
	cmpC?: Comparator<Val1<T, C>>,
	cmpD?: Comparator<Val1<T, D>>
): Comparator<T>;
export function compareByKeys4<T, A, B, C, D>(
	a: Fn<T, A>,
	b: Fn<T, B>,
	c: Fn<T, C>,
	d: Fn<T, D>,
	cmpA?: Comparator<A>,
	cmpB?: Comparator<B>,
	cmpC?: Comparator<C>,
	cmpD?: Comparator<D>
): Comparator<T>;
export function compareByKeys4(
	a: string | Fn<any, any>,
	b: string | Fn<any, any>,
	c: string | Fn<any, any>,
	d: string | Fn<any, any>,
	cmpA: Comparator<any> = compare,
	cmpB: Comparator<any> = compare,
	cmpC: Comparator<any> = compare,
	cmpD: Comparator<any> = compare
): Comparator<any> {
	const ka = getKey(a);
	const kb = getKey(b);
	const kc = getKey(c);
	const kd = getKey(d);
	return (x, y) => {
		let res = cmpA(ka(x), ka(y));
		return res === 0
			? (res = cmpB(kb(x), kb(y))) === 0
				? (res = cmpC(kc(x), kc(y))) === 0
					? cmpD(kd(x), kd(y))
					: res
				: res
			: res;
	};
}
